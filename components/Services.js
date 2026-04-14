'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Receipt, BookOpen, Building2, ArrowRight } from 'lucide-react';
import IMAGES from '@/lib/images';

const SERVICE_CARDS = [
  {
    icon: Receipt,
    titleKey: 'services.tax.title',
    descKey: 'services.tax.description',
    slug: 'vat',
    accent: 'bg-sage-50 border-sage-200 hover:border-sage-300',
    iconBg: 'bg-sage-100 text-sage-700',
    image: IMAGES.taxCompliance,
  },
  {
    icon: BookOpen,
    titleKey: 'services.accounting.title',
    descKey: 'services.accounting.description',
    slug: 'accounting-services',
    accent: 'bg-navy-50 border-navy-200 hover:border-navy-300',
    iconBg: 'bg-navy-100 text-navy-700',
    image: IMAGES.accounting,
  },
  {
    icon: Building2,
    titleKey: 'services.corporate.title',
    descKey: 'services.corporate.description',
    slug: 'company-registration',
    accent: 'bg-gold-50 border-gold-200 hover:border-gold-300',
    iconBg: 'bg-gold-100 text-gold-700',
    image: IMAGES.corporate,
  },
];

export default function Services({ locale }) {
  const t = useTranslations();
  const base = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{t('services.badge')}</span>
          <h2 className="section-heading">{t('services.title')}</h2>
          <p className="section-subheading">{t('services.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_CARDS.map(({ icon: Icon, titleKey, descKey, slug, accent, iconBg, image }) => (
            <Link
              key={slug}
              href={`${base}/services/${slug}`}
              className={`group rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${accent}`}
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={image}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 space-y-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold text-navy-950">{t(titleKey)}</h3>

                <p className="text-sm text-gray-600 leading-relaxed">{t(descKey)}</p>

                <div className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 pt-2">
                  <span>{t('services.learnMore')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link href={`${base}/services`} className="btn-secondary">
            {t('services.viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
