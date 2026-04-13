'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

const IconTax = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const IconAccounting = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    />
  </svg>
);

const IconCorporate = () => (
  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5.581m0 0H9m5.581 0a2.121 2.121 0 01-4.242 0M9 21h4m0 0V5"
    />
  </svg>
);

export default function Services({ locale }) {
  const t = useTranslations();
  const baseLink = locale === 'en' ? '' : `/${locale}`;

  const services = [
    {
      icon: <IconTax />,
      titleKey: 'services.tax.title',
      descKey: 'services.tax.description',
      link: `${baseLink}/services/vat`,
    },
    {
      icon: <IconAccounting />,
      titleKey: 'services.accounting.title',
      descKey: 'services.accounting.description',
      link: `${baseLink}/services/accounting-services`,
    },
    {
      icon: <IconCorporate />,
      titleKey: 'services.corporate.title',
      descKey: 'services.corporate.description',
      link: `${baseLink}/services/company-registration`,
    },
  ];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-narrow space-y-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="badge">{t('services.badge')}</span>
          <h2 className="section-heading mt-4 mb-6">{t('services.title')}</h2>
          <p className="section-subheading text-gray-700">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link
              key={idx}
              href={service.link}
              className="group card hover:shadow-xl hover:border-sage-300 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sage-50 to-gold-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative space-y-4">
                <div className="text-sage-700 group-hover:text-sage-900 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-950">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(service.descKey)}
                </p>
                <div className="flex items-center gap-2 text-sage-700 font-semibold pt-4">
                  <span>{t('services.learnMore')}</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="flex justify-center pt-8">
          <Link href={`${baseLink}/services`} className="btn-primary">
            {t('services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
}
