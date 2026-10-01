import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/cms/guard';
import { listServicesAdmin } from '@/lib/cms/store';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  return NextResponse.json({ services: await listServicesAdmin() });
}
