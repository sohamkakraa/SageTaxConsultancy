import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { getBlogPost, saveBlogPost } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function GET(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  try {
    const post = await getBlogPost(params.id);
    return post ? NextResponse.json({ post }) : jsonError('Not found', 404);
  } catch (e) {
    return jsonError(e.message);
  }
}

export async function PUT(request, props) {
  const params = await props.params;
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  try {
    const body = await request.json();
    const result = await saveBlogPost(params.id, body.fields, { source: 'editor', actor: admin.email });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return jsonError(e.message);
  }
}
