const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sageconsultancy.ae';

const SERVICE_SLUGS = [
  'vat',
  'corporate-tax',
  'excise-tax',
  'accounting-services',
  'bookkeeping-services',
  'internal-auditing',
  'external-auditing',
  'statutory-auditing',
  'vat-auditing',
  'corporate-tax-auditing',
  'forensic-auditing',
  'company-registration',
  'trademark-registration',
  'business-bank-account',
  'pro-services',
  'golden-visa',
  'company-reconstruction',
];

const STATIC_PAGES = ['', 'about', 'services', 'blog', 'contact', 'privacy-policy', 'terms'];

export default function sitemap() {
  const now = new Date();
  const entries = [];

  // Static pages for each locale
  for (const page of STATIC_PAGES) {
    for (const locale of ['en', 'ar']) {
      const path = locale === 'en'
        ? `/${page}`
        : `/${locale}${page ? `/${page}` : ''}`;

      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: page === '' ? 'daily' : page === 'blog' ? 'daily' : 'monthly',
        priority: page === '' ? 1.0 : page === 'services' ? 0.9 : page === 'blog' ? 0.8 : 0.7,
      });
    }
  }

  // Service pages for each locale
  for (const slug of SERVICE_SLUGS) {
    for (const locale of ['en', 'ar']) {
      const path = locale === 'en'
        ? `/services/${slug}`
        : `/${locale}/services/${slug}`;

      entries.push({
        url: `${baseUrl}${path}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
