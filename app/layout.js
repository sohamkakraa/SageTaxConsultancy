import './globals.css';

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://sagetaxconsultancy.com'),
  title: {
    default: 'Sage Tax Consultancy | Expert Tax Advisory in UAE',
    template: '%s | Sage Tax Consultancy',
  },
  description: "UAE's trusted tax consultancy. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai. FTA-approved advisors helping businesses grow with confidence.",
  keywords: [
    'tax consultancy UAE',
    'VAT consultant Dubai',
    'corporate tax UAE',
    'accounting services Dubai',
    'tax advisory UAE',
    'FTA approved tax agent',
    'business setup Dubai',
    'audit services UAE',
    'bookkeeping Dubai',
    'golden visa UAE',
  ],
  authors: [{ name: 'Sage Tax Consultancy' }],
  icons: {
    icon: '/favicon.ico',
    apple: '/assets/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: 'https://sagetaxconsultancy.com',
    siteName: 'Sage Tax Consultancy',
    title: 'Sage Tax Consultancy | Expert Tax Advisory in UAE',
    description: "UAE's trusted tax consultancy. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sage Tax Consultancy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sage Tax Consultancy | Expert Tax Advisory in UAE',
    description: "UAE's trusted tax consultancy. Expert VAT, Corporate Tax, Accounting & Auditing services in Dubai.",
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
    canonical: 'https://sagetaxconsultancy.com',
    languages: {
      en: 'https://sagetaxconsultancy.com',
      ar: 'https://sagetaxconsultancy.com/ar',
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
