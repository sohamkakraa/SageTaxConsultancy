import { getLocale } from 'next-intl/server';
import { getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import { SITE_URL } from '@/lib/site';
import { Inter, Plus_Jakarta_Sans, Cairo } from 'next/font/google';
import './globals.css';

// Self-hosted at build time: visitors' browsers never contact Google Fonts (no IP sharing before consent).
const inter = Inter({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-inter', display: 'swap' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-jakarta', display: 'swap' });
const cairo = Cairo({ subsets: ['arabic', 'latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-cairo', display: 'swap' });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a3328',
};

export async function generateMetadata() {
  const c = await getSiteContent();
  const name = pick(c.site.brandName, 'en');
  const title = pick(c.site.seoTitle, 'en');
  const description = pick(c.site.seoDescription, 'en');
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s | ${name}` },
    description,
    keywords: [
      'tax consultancy UAE', 'VAT consultant Dubai', 'corporate tax UAE', 'accounting services Dubai',
      'tax advisory UAE', 'business setup Dubai', 'audit services UAE', 'bookkeeping Dubai', 'golden visa UAE',
    ],
    authors: [{ name }],
    icons: { icon: '/favicon.ico', apple: '/assets/logo_dark.svg' },
    openGraph: {
      type: 'website',
      locale: 'en_AE',
      url: SITE_URL,
      siteName: name,
      title,
      description,
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  };
}

export default async function RootLayout({ children }) {
  let lang = 'en';
  try {
    lang = (await getLocale()) === 'ar' ? 'ar' : 'en';
  } catch {
    lang = 'en';
  }
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className={`${inter.variable} ${jakarta.variable} ${cairo.variable}`} suppressHydrationWarning>
      <head>
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>{children}</body>
    </html>
  );
}
