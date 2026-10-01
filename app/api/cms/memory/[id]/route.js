import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { removeMemory } from '@/lib/cms/memory';

export const dynamic = 'force-dynamic';

export async function DELETE(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  const id = Number(params.id);
  if (!Number.isInteger(id)) return jsonError('Invalid id');
  await removeMemory(id);
  return NextResponse.json({ ok: true });
}
