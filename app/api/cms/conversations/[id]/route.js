import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { deleteConversation, getConversation, getMessages } from '@/lib/cms/memory';

export const dynamic = 'force-dynamic';

export async function GET(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  const conversation = await getConversation(params.id);
  if (!conversation) return jsonError('Not found', 404);
  return NextResponse.json({ conversation, messages: await getMessages(params.id) });
}

export async function DELETE(request, props) {
  const params = await props.params;
  const { response } = await requireAdmin(request);
  if (response) return response;
  await deleteConversation(params.id);
  return NextResponse.json({ ok: true });
}
