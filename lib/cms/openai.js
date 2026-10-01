import 'server-only';
import OpenAI from 'openai';

export const TEXT_MODEL = process.env.CMS_TEXT_MODEL || 'gpt-6-luna';
export const IMAGE_MODEL = process.env.CMS_IMAGE_MODEL || 'gpt-image-2.5-flare-2026-09-08';
export const IMAGE_QUALITY = process.env.CMS_IMAGE_QUALITY || 'high';

let client;
export function openai() {
  if (!process.env.OPENAI_API_KEY) throw new Error('OPENAI_API_KEY is not configured');
  if (!client) client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 240_000, maxRetries: 2 });
  return client;
}
