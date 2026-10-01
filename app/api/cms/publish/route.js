import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/guard';
import { revalidateSite } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

/**
 * Refreshes the public site's cache. Called after a chat turn: revalidation triggered from inside a
 * streaming response is not applied by Next.js 14, so the chat route calls this in a fresh request.
 */
export async function POST(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  revalidateSite();
  return NextResponse.json({ ok: true });
}
