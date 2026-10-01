import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  const { data, error } = await supabaseAdmin
    .from('contact_submissions')
    .select('id, name, email, phone, subject, message, is_read, consent_given, created_at')
    .order('created_at', { ascending: false })
    .limit(300);
  if (error) return jsonError(error.message, 500);
  return NextResponse.json({ messages: data || [] });
}
