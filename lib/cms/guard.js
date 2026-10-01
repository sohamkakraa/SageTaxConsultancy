import 'server-only';
import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from './session';

/**
 * Authenticates a CMS API request.
 * - Requires a valid signed session cookie.
 * - For state-changing methods, requires the Origin header to match the request host (CSRF defence
 *   in addition to the SameSite=Strict cookie).
 * Returns { admin } on success or { response } (a 401/403 NextResponse) on failure.
 */
export async function requireAdmin(request) {
  const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
  if (!session) return { response: NextResponse.json({ error: 'Please sign in again.' }, { status: 401 }) };

  if (!['GET', 'HEAD'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');
    let originHost = null;
    try {
      originHost = origin ? new URL(origin).host : null;
    } catch {
      originHost = null;
    }
    if (!originHost || originHost !== host) {
      return { response: NextResponse.json({ error: 'Request blocked (origin mismatch).' }, { status: 403 }) };
    }
  }
  return { admin: session };
}

export function jsonError(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}
