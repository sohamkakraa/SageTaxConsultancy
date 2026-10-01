import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { updateService } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function PUT(request, props) {
  const params = await props.params;
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  try {
    const body = await request.json();
    const id = await updateService(params.slug, body.fields, { source: 'editor', actor: admin.email, summary: body.summary || `Edited service ${params.slug}` });
    return NextResponse.json({ ok: true, revisionId: id });
  } catch (e) {
    return jsonError(e.message);
  }
}
