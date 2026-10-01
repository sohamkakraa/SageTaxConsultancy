import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { archiveMedia, getMedia, updateMediaInfo } from '@/lib/cms/media';
import { getSiteContentFresh } from '@/lib/cms/store';
import { listImageSlots } from '@/lib/cms/tree';

export const dynamic = 'force-dynamic';

export async function PATCH(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  try {
    await getMedia(params.id);
    const body = await request.json();
    await updateMediaInfo(params.id, { description: body.description, altEn: body.alt_en, altAr: body.alt_ar });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return jsonError(e.message);
  }
}

export async function DELETE(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  try {
    const media = await getMedia(params.id);
    const inUse = listImageSlots(await getSiteContentFresh()).filter((s) => s.url === media.url);
    if (inUse.length) return jsonError(`This image is on the website (${inUse.map((s) => s.path).join(', ')}). Replace it there first.`, 409);
    await archiveMedia(params.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return jsonError(e.message);
  }
}
