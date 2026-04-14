'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, Users, Monitor, Banknote, Zap, Target, Eye, User } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, titleKey: 'about.features.ftaApproved', descKey: 'about.features.ftaApprovedDesc' },
  { icon: Users, titleKey: 'about.features.sectorSpecialized', descKey: 'about.features.sectorSpecializedDesc' },
  { icon: Monitor, titleKey: 'about.features.techDriven', descKey: 'about.features.techDrivenDesc' },
  { icon: Banknote, titleKey: 'about.features.transparentFees', descKey: 'about.features.transparentFeesDesc' },
  { icon: Zap, titleKey: 'about.features.boutiqueAgility', descKey: 'about.features.boutiqueAgilityDesc' },
];

const LEADERSHIP = [
  {
    name: 'Jay Kakra',
    nameAr: 'جاي كاكرا',
    title: 'Managing Partner',
    titleAr: 'الشريك الإداري',
    bio: 'Leading strategic direction and client advisory with deep expertise in UAE tax regulations and corporate compliance.',
    bioAr: 'يقود التوجه الاستراتيجي والاستشارات للعملاء مع خبرة عميقة في اللوائح الضريبية الإماراتية والامتثال المؤسسي.',
  },
  {
    name: 'Aashna Malkhani',
    nameAr: 'آشنا مالخاني',
    title: 'Partner',
    titleAr: 'شريك',
    bio: 'Overseeing accounting, audit operations, and client engagement with a focus on delivering exceptional service quality.',
    bioAr: 'تشرف على عمليات المحاسبة والتدقيق وإدارة العملاء مع التركيز على تقديم جودة خدمة استثنائية.',
  },
];

export default function About({ locale }) {
  const t = useTranslations();
  const isArabic = locale === 'ar';

  return (
    <section className="section-padding bg-white">
      <div className="container-max space-y-20">
        {/* Why Sage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <span className="badge">{t('about.badge')}</span>
            <h2 className="section-heading">{t('about.title')}</h2>
            <p className="section-subheading text-gray-600 leading-relaxed">
              {t('about.description')}
            </p>

            {/* Mission & Vision compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-sage-50 rounded-lg">
                <Target className="w-5 h-5 text-sage-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-navy-950">{t('about.mission')}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t('about.missionText')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gold-50 rounded-lg">
                <Eye className="w-5 h-5 text-gold-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-navy-950">{t('about.vision')}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{t('about.visionText')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Features list */}
          <div className="space-y-3">
            {FEATURES.map(({ icon: Icon, titleKey, descKey }) => (
              <div key={titleKey} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-navy-950">{t(titleKey)}</h3>
                  <p className="text-sm text-gray-500 mt-0.5 leading-relaxed">{t(descKey)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <span className="badge">{isArabic ? 'القيادة' : 'Leadership'}</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">
              {isArabic ? 'فريق القيادة' : 'Our Leadership'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="card-hover text-center space-y-4 p-8">
                {/* Placeholder headshot */}
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-sage-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">
                    {isArabic ? leader.nameAr : leader.name}
                  </h3>
                  <p className="text-sm font-medium text-sage-700">
                    {isArabic ? leader.titleAr : leader.title}
                  </p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {isArabic ? leader.bioAr : leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
