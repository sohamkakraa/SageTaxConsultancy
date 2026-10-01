import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { PRIVACY_VERSION, SITE_URL } from '@/lib/site';

// Best-effort per-instance rate limit (serverless instances are short-lived; the honeypot and
// validation below are the main spam defences).
const requestMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function checkRateLimit(ip) {
  const now = Date.now();
  const rec = requestMap.get(ip);
  if (!rec || now > rec.resetTime) {
    requestMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    if (requestMap.size > 5000) requestMap.clear();
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  rec.count++;
  return true;
}

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);

export async function POST(request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    // Honeypot: real visitors never fill this hidden field. Pretend success so bots learn nothing.
    if (body.website) return NextResponse.json({ success: true }, { status: 200 });

    const name = clean(body.name, 100);
    const email = clean(body.email, 200).toLowerCase();
    const phone = clean(body.phone, 40);
    const subject = clean(body.subject, 200);
    const message = clean(body.message, 5000);
    const locale = body.locale === 'ar' ? 'ar' : 'en';

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Please fill in your name, email, subject and message.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }
    if (name.length < 2) return NextResponse.json({ error: 'Please enter your full name.' }, { status: 400 });
    if (message.length < 10) return NextResponse.json({ error: 'Your message is a little short — please add a few more details.' }, { status: 400 });
    if (subject.length < 3) return NextResponse.json({ error: 'Please add a subject.' }, { status: 400 });
    if (body.consent !== true) {
      return NextResponse.json({ error: 'Please confirm you agree to the Privacy Policy.' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Supabase configuration missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    // Data minimisation (PDPL): no IP address or device fingerprint is stored.
    const { error } = await supabaseAdmin.from('contact_submissions').insert({
      name,
      email,
      phone: phone || null,
      subject,
      message,
      is_read: false,
      consent_given: true,
      consent_at: new Date().toISOString(),
      privacy_version: PRIVACY_VERSION,
      locale,
    });

    if (error) {
      console.error('Contact insert error:', error.message);
      return NextResponse.json({ error: 'Failed to submit contact form' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': SITE_URL,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
