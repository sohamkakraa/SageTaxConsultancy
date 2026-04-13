'use client';

import { useTranslations } from 'next-intl';

const IconShield = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconUsers = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 12H9m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconMonitor = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5a4 4 0 100-8 4 4 0 000 8z"
    />
  </svg>
);

const IconWallet = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const IconZap = () => (
  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

export default function About({ locale }) {
  const t = useTranslations();

  const features = [
    {
      icon: <IconShield />,
      titleKey: 'about.features.ftaApproved',
      descKey: 'about.features.ftaApprovedDesc',
    },
    {
      icon: <IconUsers />,
      titleKey: 'about.features.sectorSpecialized',
      descKey: 'about.features.sectorSpecializedDesc',
    },
    {
      icon: <IconMonitor />,
      titleKey: 'about.features.techDriven',
      descKey: 'about.features.techDrivenDesc',
    },
    {
      icon: <IconWallet />,
      titleKey: 'about.features.transparentFees',
      descKey: 'about.features.transparentFeesDesc',
    },
    {
      icon: <IconZap />,
      titleKey: 'about.features.boutiqueAgility',
      descKey: 'about.features.boutiqueAgilityDesc',
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow space-y-16">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="badge">{t('about.badge')}</span>
          <h2 className="section-heading mt-4 mb-6">{t('about.title')}</h2>
          <p className="section-subheading text-gray-700">
            {t('about.description')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="card group hover:shadow-lg transition-all duration-300 hover:border-sage-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
                  {feature.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-bold text-navy-950">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {t(feature.descKey)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
          <div className="card bg-sage-50 border-sage-200">
            <h3 className="text-lg font-bold text-navy-950 mb-3">
              {t('about.mission')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('about.missionText')}
            </p>
          </div>
          <div className="card bg-gold-50 border-gold-200">
            <h3 className="text-lg font-bold text-navy-950 mb-3">
              {t('about.vision')}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {t('about.visionText')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
