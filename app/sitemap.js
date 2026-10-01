import { SITE_URL } from '@/lib/site';
import { getServices } from '@/lib/content';

export const revalidate = 3600;

const STATIC_PAGES = ['', 'about', 'services', 'blog', 'contact', 'privacy-policy', 'terms', 'cookie-policy'];
const url = (locale, path) => `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}${path ? `/${path}` : ''}`;

export default async function sitemap() {
  const now = new Date();
  const services = await getServices();
  const entries = [];
  for (const page of STATIC_PAGES) {
    entries.push({
      url: url('en', page),
      lastModified: now,
      changeFrequency: page === '' || page === 'blog' ? 'daily' : 'monthly',
      priority: page === '' ? 1.0 : page === 'services' ? 0.9 : page === 'blog' ? 0.8 : 0.6,
      alternates: { languages: { en: url('en', page), ar: url('ar', page) } },
    });
  }
  for (const s of services) {
    const path = `services/${s.slug}`;
    entries.push({
      url: url('en', path),
      lastModified: s.updated_at ? new Date(s.updated_at) : now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: { languages: { en: url('en', path), ar: url('ar', path) } },
    });
  }
  return entries;
}
