import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { undoRevision } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

/** POST = undo this change */
export async function POST(request, props) {
  const params = await props.params;
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonError('Invalid change number');
  try {
    await undoRevision(id, { source: 'undo', actor: admin.email });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return jsonError(e.message);
  }
}
