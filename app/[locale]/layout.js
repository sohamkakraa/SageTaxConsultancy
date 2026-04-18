import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import ConsentGatedGA from '@/components/ConsentGatedGA';
import WhatsAppButton from '@/components/WhatsAppButton';
import DirectionSetter from '@/components/DirectionSetter';
import LoadingScreen from '@/components/LoadingScreen';
import { locales } from '../../lib/i18n-config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }) {
  return {
    alternates: {
      canonical: `https://sageadvisory.ae${locale === 'en' ? '' : '/' + locale}`,
      languages: {
        en: 'https://sageadvisory.ae',
        ar: 'https://sageadvisory.ae/ar',
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
  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'AccountingService'],
        '@id': 'https://sageadvisory.ae/#business',
        name: 'Sage Advisory',
        alternateName: ['Sage Advisory', 'Sage Consultancy', 'سيج أدفايزري'],
        description: "UAE's trusted advisory firm offering expert VAT, Corporate Tax, Accounting & Auditing services in Dubai. Serving 950+ clients across 35+ industries.",
        url: 'https://sageadvisory.ae',
        telephone: '+971585704140',
        email: 'info@sageadvisory.ae',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Dubai',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          postalCode: '',
          addressCountry: 'AE',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 25.2048,
          longitude: 55.2708,
        },
        image: 'https://sageadvisory.ae/assets/logo_dark.svg',
        priceRange: '$$',
        currenciesAccepted: 'AED',
        paymentAccepted: 'Cash, Credit Card, Bank Transfer',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Ahmed Al Mansoori' },
            reviewBody: 'Excellent VAT consultancy services. Sage Advisory helped our company navigate the complex UAE tax regulations with ease. Highly recommended for businesses in Dubai.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Sarah Thompson' },
            reviewBody: 'Professional corporate tax advisory. They handled our company registration and tax setup efficiently. Great team with deep knowledge of FTA regulations.',
          },
          {
            '@type': 'Review',
            reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
            author: { '@type': 'Person', name: 'Khalid Bin Rashid' },
            reviewBody: 'Outstanding audit services. Their attention to detail and thorough approach to our financial audit gave us complete confidence in our compliance status.',
          },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '18:00',
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/sage-advisory',
          'https://www.instagram.com/sageadvisory.ae',
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Tax & Business Services',
          itemListElement: [
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'VAT Registration & Filing', description: 'Expert VAT registration, return filing, and compliance services in Dubai UAE' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Tax Advisory', description: 'UAE corporate tax registration, planning, and compliance for businesses' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Accounting & Auditing', description: 'IFRS-compliant accounting, bookkeeping, and statutory audit services' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Company Registration', description: 'Business setup, trade license, and company formation in Dubai and UAE free zones' } },
            { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Golden Visa Services', description: 'UAE Golden Visa application assistance for investors and entrepreneurs' } },
          ],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://sageadvisory.ae/#website',
        url: 'https://sageadvisory.ae',
        name: 'Sage Advisory',
        description: 'Expert Tax Advisory & Business Services in UAE',
        publisher: { '@id': 'https://sageadvisory.ae/#org' },
        inLanguage: ['en', 'ar'],
      },
      {
        '@type': 'Organization',
        '@id': 'https://sageadvisory.ae/#org',
        name: 'Sage Advisory',
        url: 'https://sageadvisory.ae',
        logo: {
          '@type': 'ImageObject',
          url: 'https://sageadvisory.ae/assets/logo_dark.svg',
          width: 512,
          height: 512,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+971585704140',
            email: 'info@sageadvisory.ae',
            availableLanguage: ['English', 'Arabic'],
            areaServed: 'AE',
          },
        ],
        sameAs: [
          'https://www.linkedin.com/company/sage-advisory',
          'https://www.instagram.com/sageadvisory.ae',
        ],
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
      {/* lang/dir are now set server-side in the root layout via middleware header */}
      <div className="min-h-screen flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <DirectionSetter />
          <LoadingScreen />
          <Header locale={locale} />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <WhatsAppButton />
          <CookieConsent locale={locale} />
          {process.env.NEXT_PUBLIC_GA_ID && /^G-[A-Z0-9]+$/i.test(process.env.NEXT_PUBLIC_GA_ID) && (
            <ConsentGatedGA gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
        </NextIntlClientProvider>
      </div>
    </>
  );
}
