import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { getSiteContentFresh, updateContentPaths } from '@/lib/cms/store';
import { SECTION_GUIDE } from '@/lib/cms/defaults';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  return NextResponse.json({ content: await getSiteContentFresh(), sections: SECTION_GUIDE });
}

/** Body: { changes: [{ path, value }], summary } — used by the manual editor. */
export async function PUT(request) {
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  try {
    const body = await request.json();
    const changes = Array.isArray(body?.changes) ? body.changes.slice(0, 200) : [];
    if (!changes.length) return jsonError('Nothing to save');
    const ids = await updateContentPaths(
      changes.map((c) => ({ path: String(c.path), value: c.value })),
      { source: 'editor', actor: admin.email, summary: String(body.summary || 'Edited in the content editor').slice(0, 200) }
    );
    return NextResponse.json({ ok: true, revisionIds: ids });
  } catch (e) {
    return jsonError(e.message);
  }
}
