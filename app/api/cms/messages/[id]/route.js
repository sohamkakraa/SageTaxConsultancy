import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function PATCH(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  const body = await request.json().catch(() => ({}));
  const { error } = await supabaseAdmin.from('contact_submissions').update({ is_read: Boolean(body.is_read) }).eq('id', params.id);
  if (error) return jsonError(error.message);
  return NextResponse.json({ ok: true });
}

/** Permanently deletes an enquiry (e.g. to honour a data-erasure request under the PDPL). */
export async function DELETE(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  const { error } = await supabaseAdmin.from('contact_submissions').delete().eq('id', params.id);
  if (error) return jsonError(error.message);
  return NextResponse.json({ ok: true });
}
