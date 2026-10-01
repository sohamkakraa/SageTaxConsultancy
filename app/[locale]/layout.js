import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ConsentGatedGA from '@/components/ConsentGatedGA';
import WhatsAppButton from '@/components/WhatsAppButton';
import DirectionSetter from '@/components/DirectionSetter';
import LoadingScreen from '@/components/LoadingScreen';
import { SiteContentProvider } from '@/components/SiteContent';
import { getServiceMenu, getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import { SITE_URL } from '@/lib/site';
import { locales } from '../../lib/i18n-config';

// Safety net: pages refresh at least hourly even if an on-demand refresh was missed.
export const revalidate = 3600;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const c = await getSiteContent();
  return {
    title: { absolute: pick(c.site.seoTitle, locale) },
    description: pick(c.site.seoDescription, locale),
    alternates: {
      canonical: `${SITE_URL}${locale === 'en' ? '' : `/${locale}`}`,
      languages: { en: SITE_URL, ar: `${SITE_URL}/ar`, 'x-default': SITE_URL },
    },
  };
}

function structuredData(c) {
  const name = pick(c.site.brandName, 'en');
  const phone = c.site.contact.phone.replace(/[^\d+]/g, '');
  const sameAs = [c.site.social.linkedin, c.site.social.instagram].filter(Boolean);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'AccountingService'],
        '@id': `${SITE_URL}/#business`,
        name,
        alternateName: [pick(c.site.brandName, 'ar'), 'Sage Advisory'],
        description: pick(c.site.seoDescription, 'en'),
        url: SITE_URL,
        telephone: phone,
        email: c.site.contact.email,
        address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressRegion: 'Dubai', addressCountry: 'AE' },
        image: `${SITE_URL}/assets/logo_dark.svg`,
        currenciesAccepted: 'AED',
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '09:00', closes: '18:00' },
        ],
        sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name,
        publisher: { '@id': `${SITE_URL}/#org` },
        inLanguage: ['en', 'ar'],
      },
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#org`,
        name,
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/logo_dark.svg` },
        contactPoint: [{ '@type': 'ContactPoint', contactType: 'customer service', telephone: phone, email: c.site.contact.email, availableLanguage: ['English', 'Arabic'], areaServed: 'AE' }],
        sameAs,
      },
    ],
  };
}

export default async function LocaleLayout(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const {
    children
  } = props;

  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);

  const [messages, content, serviceMenu] = await Promise.all([getMessages(), getSiteContent(), getServiceMenu()]);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaEnabled = gaId && /^G-[A-Z0-9]{4,}$/i.test(gaId) && !/^G-X+$/i.test(gaId);

  return (
    <>
      <script
        type="application/ld+json"
        // JSON.stringify output with "<" escaped so CMS text can never break out of the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(content)).replace(/</g, '\\u003c') }}
      />
      <div className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteContentProvider content={content} serviceMenu={serviceMenu} locale={locale}>
            <DirectionSetter />
            <LoadingScreen />
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
            <CookieConsent />
            {gaEnabled && <ConsentGatedGA gaId={gaId} />}
          </SiteContentProvider>
        </NextIntlClientProvider>
      </div>
    </>
  );
}
