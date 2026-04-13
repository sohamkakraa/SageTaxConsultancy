import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import { locales } from '../../i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  return {
    alternates: {
      canonical: `https://sageconsultancy.ae${locale === 'en' ? '' : '/' + locale}`,
      languages: {
        en: 'https://sageconsultancy.ae',
        ar: 'https://sageconsultancy.ae/ar',
      },
    },
  };
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://sageconsultancy.ae/#business',
        name: 'Sage Tax Consultancy',
        alternateName: 'Sage Tax',
        description: "UAE's trusted tax consultancy offering expert VAT, Corporate Tax, Accounting & Auditing services in Dubai.",
        url: 'https://sageconsultancy.ae',
        telephone: '+971585704140',
        email: 'info@sageconsultancy.ae',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.2048,
          longitude: 55.2708,
        },
        image: 'https://sageconsultancy.ae/assets/logo.png',
        priceRange: '$$',
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
      },
      {
        '@type': 'ProfessionalService',
        name: 'Sage Tax Consultancy',
        serviceType: [
          'Tax Advisory',
          'VAT Consultancy',
          'Corporate Tax Advisory',
          'Accounting Services',
          'Auditing Services',
          'Company Registration',
          'Golden Visa Services',
          'Bookkeeping',
        ],
        areaServed: { '@type': 'Country', name: 'United Arab Emirates' },
        provider: { '@id': 'https://sageconsultancy.ae/#business' },
      },
      {
        '@type': 'Organization',
        '@id': 'https://sageconsultancy.ae/#org',
        name: 'Sage Tax Consultancy',
        url: 'https://sageconsultancy.ae',
        logo: 'https://sageconsultancy.ae/assets/logo.png',
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          telephone: '+971585704140',
          email: 'info@sageconsultancy.ae',
          availableLanguage: ['English', 'Arabic'],
        },
      },
    ],
  };

  return (
    <>
      <link rel="icon" href="/favicon.ico" />
      <Script
        id="schema-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga" strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${process.env.NEXT_PUBLIC_GA_ID}',{page_path:window.location.pathname});`,
            }}
          />
        </>
      )}
      <Script
        id="set-lang-dir"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang = '${locale}'; document.documentElement.dir = '${dir}';`,
        }}
      />
      <div className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <CookieConsent />
        </NextIntlClientProvider>
      </div>
    </>
  );
}
