// Single source of truth for the canonical site URL.
// Edge-safe: no Node-only imports.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://sageglobaladvisory.com').replace(/\/$/, '');
export const SITE_HOST = new URL(SITE_URL).host;

// Old hosts that should permanently redirect to SITE_URL once the new domain is live.
// Enabled by setting REDIRECT_LEGACY_DOMAINS=true (so the old domain keeps working until DNS is ready).
export const LEGACY_HOSTS = [
  'sagetaxconsultancy.com',
  'www.sagetaxconsultancy.com',
  'sageadvisory.ae',
  'www.sageadvisory.ae',
  `www.${SITE_HOST.replace(/^www\./, '')}`,
];

// Bump when the privacy/cookie policy materially changes — visitors are asked for consent again.
export const PRIVACY_VERSION = '2026-10-01';
