import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { listMedia, saveMedia, MAX_UPLOAD_BYTES } from '@/lib/cms/media';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  return NextResponse.json({ media: await listMedia(200) });
}

export async function POST(request) {
  const { admin, response } = await requireAdmin(request);
  if (response) return response;

  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_UPLOAD_BYTES + 1024 * 64) return jsonError('Image is larger than 15 MB', 413);

  let form;
  try {
    form = await request.formData();
  } catch {
    return jsonError('Upload failed — please try again.');
  }
  const file = form.get('file');
  if (!file || typeof file === 'string') return jsonError('No file received');
  try {
    const buffer = Buffer.from(await file.arrayBuffer());
    const saved = await saveMedia({ buffer, source: 'upload', originalName: file.name, actor: admin.email });
    return NextResponse.json({ media: { id: saved.id, url: saved.url, width: saved.width, height: saved.height } });
  } catch (e) {
    return jsonError(e.message);
  }
}
