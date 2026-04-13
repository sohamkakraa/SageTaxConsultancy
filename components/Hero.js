'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero({ locale }) {
  const t = useTranslations();
  const [imageError, setImageError] = useState(false);
  const baseLink = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="section-padding relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-sage-50">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sage-100 rounded-full blur-3xl opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="badge">{t('hero.badge')}</span>
              <h1 className="section-heading leading-tight">
                {t('hero.title')}
              </h1>
              <p className="section-subheading text-lg leading-relaxed text-gray-700">
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href={`${baseLink}/contact`} className="btn-primary">
                {t('hero.cta')}
              </Link>
              <Link href={`${baseLink}/services`} className="btn-secondary">
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            {/* Trust indicator */}
            <div className="flex items-center gap-3 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-600">{t('hero.trustedBy')}</p>
            </div>
          </div>

          {/* Right side: Hero image or placeholder */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden shadow-2xl">
              {!imageError ? (
                <Image
                  src="/assets/hero-image.jpg"
                  alt="Tax consultancy professionals"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              ) : null}
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-sage-200 via-gold-200 to-navy-200 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-6">
                    <svg
                      className="w-24 h-24 text-sage-600 opacity-60"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 6v6m0 0v6m0-6h6m0 0h6m-6-6H6m0 0H0"
                      />
                    </svg>
                    <div className="space-y-2 text-center">
                      <p className="text-sm font-semibold text-sage-800">
                        Professional Tax Advisory
                      </p>
                      <p className="text-xs text-sage-700">
                        FTA-Approved Expertise
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
