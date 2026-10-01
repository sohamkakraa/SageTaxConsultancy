// Small rendering helpers shared by server and client components.

/** Only allow safe link schemes from CMS-provided values. */
export function safeHref(url, fallback = '#') {
  const s = String(url || '').trim();
  return /^(https:\/\/|mailto:|tel:|\/)/i.test(s) ? s : fallback;
}

export const telHref = (phone) => `tel:${String(phone || '').replace(/[^\d+]/g, '')}`;
export const mailHref = (email) => `mailto:${String(email || '').trim()}`;
export const waHref = (number) => `https://wa.me/${String(number || '').replace(/\D/g, '')}`;

/** Split CMS multi-paragraph text on blank lines. */
export const paragraphs = (text) => String(text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
