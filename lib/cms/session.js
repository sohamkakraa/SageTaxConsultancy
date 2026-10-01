// Signed CMS session cookie. Edge-runtime safe (Web Crypto only) so middleware can verify it.
// Format: base64url(JSON payload) + "." + base64url(HMAC-SHA256(payload, CMS_SESSION_SECRET))

export const SESSION_COOKIE = 'sga_cms_session';
export const SESSION_TTL_SECONDS = 12 * 60 * 60; // 12 hours

const enc = new TextEncoder();

function b64url(bytes) {
  let bin = '';
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let i = 0; i < arr.length; i++) bin += String.fromCharCode(arr[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(str) {
  const b64 = str.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((str.length + 3) % 4);
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function getSecret() {
  const secret = process.env.CMS_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('CMS_SESSION_SECRET must be set (32+ characters)');
  return secret;
}

async function hmacKey() {
  return crypto.subtle.importKey('raw', enc.encode(getSecret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function createSessionToken(email) {
  const payload = { e: email.toLowerCase(), iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(), enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

/** Returns { email } when the token is valid, unexpired and the email is still on the allowlist. */
export async function verifySessionToken(token) {
  try {
    if (!token || typeof token !== 'string' || token.length > 2048) return null;
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;
    const ok = await crypto.subtle.verify('HMAC', await hmacKey(), fromB64url(sig), enc.encode(body));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    if (!payload?.e || !payload?.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    if (!isAllowedAdmin(payload.e)) return null;
    return { email: payload.e };
  } catch {
    return null;
  }
}

export function adminAllowlist() {
  return (process.env.CMS_ADMIN_EMAILS || process.env.ADMIN_EMAIL || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
}

export function isAllowedAdmin(email) {
  return adminAllowlist().includes(String(email || '').toLowerCase());
}

export function sessionCookieOptions(maxAge = SESSION_TTL_SECONDS) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge,
  };
}
