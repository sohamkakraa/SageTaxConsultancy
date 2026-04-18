import { headers } from 'next/headers';
import './globals.css';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1a3328',
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sageadvisory.ae'),
  title: {
    default: 'Sage Advisory | Expert Tax Advisory in UAE',
    template: '%s | Sage Advisory',
  },
  description: "UAE's trusted advisory firm. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai. Helping businesses grow with confidence.",
  keywords: [
    'tax consultancy UAE',
    'VAT consultant Dubai',
    'corporate tax UAE',
    'accounting services Dubai',
    'tax advisory UAE',
    'financial advisory Dubai',
    'business setup Dubai',
    'audit services UAE',
    'bookkeeping Dubai',
    'golden visa UAE',
  ],
  authors: [{ name: 'Sage Advisory' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logo_dark.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://sageadvisory.ae',
    siteName: 'Sage Advisory',
    title: 'Sage Advisory | Expert Tax Advisory in UAE',
    description: "UAE's trusted advisory firm. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sage Advisory',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sage Advisory | Expert Tax Advisory in UAE',
    description: "UAE's trusted advisory firm. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://sageadvisory.ae',
    languages: {
      en: 'https://sageadvisory.ae',
      ar: 'https://sageadvisory.ae/ar',
    },
  },
};

export default async function RootLayout({ children }) {
  // Read locale from middleware header to set lang/dir at the server level
  // This prevents the flash/glitch when switching between EN and AR
  const headersList = await headers();
  const lang = headersList.get('x-locale') || 'en';
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster loading across all browsers */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Cairo:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Ensure proper rendering on all browsers */}
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
