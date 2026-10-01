// Client-side consent store (UAE PDPL: consent must be specific, informed, unambiguous and withdrawable).
// Stored in a first-party cookie so it can be read on the next visit; no consent = non-essential off.
import { PRIVACY_VERSION } from './site';

export const CONSENT_COOKIE = 'sga_consent';
export const CONSENT_EVENT = 'sga-consent-change';
export const OPEN_SETTINGS_EVENT = 'sga-open-cookie-settings';
const MAX_AGE_DAYS = 365;

export const CATEGORIES = ['necessary', 'analytics', 'media'];

export function readConsent() {
  if (typeof document === 'undefined') return null;
  try {
    const raw = document.cookie.split('; ').find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!raw) return null;
    const value = JSON.parse(decodeURIComponent(raw.slice(CONSENT_COOKIE.length + 1)));
    if (value?.v !== PRIVACY_VERSION) return null; // policy changed → ask again
    return { necessary: true, analytics: Boolean(value.analytics), media: Boolean(value.media), ts: value.ts, v: value.v };
  } catch {
    return null;
  }
}

export function writeConsent({ analytics, media }) {
  const value = { v: PRIVACY_VERSION, analytics: Boolean(analytics), media: Boolean(media), ts: new Date().toISOString() };
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  if (!value.analytics) clearAnalyticsCookies();
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: { necessary: true, ...value } }));
  return value;
}

/** Remove Google Analytics cookies when consent is withdrawn. */
function clearAnalyticsCookies() {
  const names = document.cookie.split('; ').map((c) => c.split('=')[0]).filter((n) => n === '_ga' || n.startsWith('_ga_') || n === '_gid' || n.startsWith('_gat'));
  const host = location.hostname;
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) for (const d of domains) document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ''}`;
}

export function hasConsent(category) {
  if (category === 'necessary') return true;
  return Boolean(readConsent()?.[category]);
}
