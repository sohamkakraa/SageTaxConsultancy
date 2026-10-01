import { NextResponse } from 'next/server';
import { requireAdmin, jsonError } from '@/lib/cms/guard';
import { openai, TEXT_MODEL } from '@/lib/cms/openai';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

/** Body: { text, to: 'ar' | 'en' } → { text } — professional website translation. */
export async function POST(request) {
  const { response } = await requireAdmin(request);
  if (response) return response;
  try {
    const { text, to } = await request.json();
    const src = String(text || '').slice(0, 6000);
    if (!src.trim()) return jsonError('Nothing to translate');
    const target = to === 'en' ? 'English' : 'Modern Standard Arabic';
    const res = await openai().responses.create({
      model: TEXT_MODEL,
      instructions: `Translate website copy for Sage Global Advisory, a UAE tax and advisory firm, into natural, professional ${target}. Keep the meaning, tone, line breaks, numbers, names and brand names. Return only the translation.`,
      input: src,
      max_output_tokens: 4000,
    });
    return NextResponse.json({ text: (res.output_text || '').trim() });
  } catch (e) {
    return jsonError(e.message, 500);
  }
}
