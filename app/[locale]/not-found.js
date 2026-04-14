'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Home, MessageSquare } from 'lucide-react';

export default function NotFound() {
  const params = useParams();
  const locale = params?.locale || 'en';
  const t = useTranslations();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-8xl font-bold text-sage-700 font-display">404</h1>
        <p className="text-xl font-bold text-navy-950">{t('errors.notFound')}</p>
        <p className="text-gray-500">
          {t('errors.notFoundDescription')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            href={`/${locale === 'en' ? '' : locale}`}
            className="btn-gold"
          >
            <Home className="w-4 h-4" />
            {t('navigation.home')}
          </Link>
          <Link
            href={`/${locale === 'en' ? '' : locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-navy-950 border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            {t('navigation.contact')}
          </Link>
        </div>
      </div>
    </div>
  );
}
