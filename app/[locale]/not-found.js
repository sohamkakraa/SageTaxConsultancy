'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const params = useParams();
  const locale = params?.locale || 'en';
  const t = useTranslations();

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-md">
        {/* 404 Heading */}
        <div>
          <h1 className="text-9xl font-bold text-sage-700 mb-2">404</h1>
          <p className="text-2xl font-bold text-navy-950">{t('errors.notFound')}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg">
          {t('errors.notFoundDescription')}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href={`/${locale === 'en' ? '' : locale}`}
            className="btn-primary"
          >
            {t('navigation.home')}
          </Link>
          <Link
            href={`/${locale === 'en' ? '' : locale}/contact`}
            className="btn-secondary"
          >
            {t('navigation.contact')}
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="pt-8 text-sage-200">
          <svg
            className="w-32 h-32 mx-auto opacity-20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54h2.63l2.96 3.83c.52.68 1.58.68 2.1 0 .52-.68.52-1.78 0-2.46L13.54 9.29z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
