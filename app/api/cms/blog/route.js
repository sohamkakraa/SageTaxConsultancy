import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { listBlogPostsAdmin, saveBlogPost } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  return NextResponse.json({ posts: await listBlogPostsAdmin() });
}

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  try {
    const body = await request.json();
    const result = await saveBlogPost(null, body.fields, { source: 'editor', actor: admin.email });
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return jsonError(e.message);
  }
}
