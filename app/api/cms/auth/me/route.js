import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/guard';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { admin, response } = await requireAdmin(request);
  if (response) return response;
  return NextResponse.json({ email: admin.email });
}
