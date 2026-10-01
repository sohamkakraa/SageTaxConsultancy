import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createHash } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { SESSION_COOKIE, createSessionToken, isAllowedAdmin, sessionCookieOptions } from '@/lib/cms/session';

export const dynamic = 'force-dynamic';

const WINDOW_MINUTES = 15;
const MAX_FAILURES = 5;

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 32);

export async function POST(request) {
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
  try {
    if (!origin || new URL(origin).host !== host) return NextResponse.json({ error: 'Request blocked.' }, { status: 403 });
  } catch {
    return NextResponse.json({ error: 'Request blocked.' }, { status: 403 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
  const email = String(body?.email || '').trim().toLowerCase().slice(0, 200);
  const password = String(body?.password || '').slice(0, 200);
  if (!email || !password) return NextResponse.json({ error: 'Enter your email and password.' }, { status: 400 });

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  const keys = [`e:${hash(email)}`, `i:${hash(ip)}`];
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();

  const { data: recent } = await supabaseAdmin
    .from('cms_login_attempts')
    .select('key')
    .in('key', keys)
    .eq('success', false)
    .gte('created_at', since);
  const failures = Math.max(...keys.map((k) => (recent || []).filter((r) => r.key === k).length));
  if (failures >= MAX_FAILURES) {
    return NextResponse.json({ error: `Too many attempts. Please wait ${WINDOW_MINUTES} minutes and try again.` }, { status: 429 });
  }

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  const ok = !error && data?.user && isAllowedAdmin(data.user.email);

  await supabaseAdmin.from('cms_login_attempts').insert(keys.map((key) => ({ key, success: Boolean(ok) })));

  if (!ok) {
    // Same message for wrong password and non-admin accounts (no account enumeration).
    return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true, email: data.user.email });
  res.cookies.set(SESSION_COOKIE, await createSessionToken(data.user.email), sessionCookieOptions());
  // Clean up the legacy, forgeable cookie if present.
  res.cookies.set('sage-admin-session', '', { path: '/', maxAge: 0 });
  return res;
}
