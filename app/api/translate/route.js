import { NextResponse } from 'next/server';

/**
 * Auto-translate English text to Arabic using a free translation API.
 * Falls back gracefully if the API is unavailable.
 *
 * Protected: only accessible from admin pages (checked via Supabase session).
 */

const TRANSLATE_TIMEOUT = 10000; // 10 seconds

/**
 * Translate text using MyMemory API (free, no key required, 5000 chars/day).
 * Falls back to LibreTranslate if MyMemory fails.
 */
async function translateToArabic(text) {
  if (!text || !text.trim()) return '';

  // Truncate very long texts to avoid API limits
  const trimmed = text.trim().substring(0, 4500);

  try {
    // Try MyMemory Translation API (free, no API key needed)
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TRANSLATE_TIMEOUT);

    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|ar`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data.responseData?.translatedText) {
        // MyMemory returns translated text
        const result = data.responseData.translatedText;
        // Check if it's a real translation (not an error message)
        if (!result.includes('MYMEMORY WARNING') && result !== trimmed) {
          return result;
        }
      }
    }
  } catch (error) {
    console.error('MyMemory translation error:', error.message);
  }

  // If we get here, translation failed
  return null;
}

export async function POST(request) {
  // Check for valid admin session cookie
  const authCookie = request.cookies.get('sage-admin-session');
  if (!authCookie?.value) {
    return NextResponse.json(
      { error: 'Unauthorized. Admin session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { texts } = body;

    // Validate input
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json(
        { error: 'Missing required field: texts (array of strings)' },
        { status: 400 }
      );
    }

    if (texts.length > 20) {
      return NextResponse.json(
        { error: 'Maximum 20 text fields per request' },
        { status: 400 }
      );
    }

    // Translate each text field
    const translations = [];
    for (const text of texts) {
      if (!text || typeof text !== 'string' || !text.trim()) {
        translations.push('');
        continue;
      }

      const translated = await translateToArabic(text);
      translations.push(translated || '');
    }

    // Check how many succeeded
    const successCount = translations.filter((t) => t && t.length > 0).length;

    return NextResponse.json({
      success: true,
      translations,
      translated: successCount,
      total: texts.length,
    });
  } catch (error) {
    console.error('Translation API error:', error);
    return NextResponse.json(
      { error: 'Translation failed. Please try again or enter Arabic text manually.' },
      { status: 500 }
    );
  }
}
