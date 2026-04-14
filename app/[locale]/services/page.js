import { unstable_setRequestLocale } from 'next-intl/server';
import { getServices } from '@/lib/content';
import Link from 'next/link';
import {
  Receipt, Building2, BookOpen, ArrowRight,
  ClipboardList, Search, ShieldCheck, Scale,
  BarChart3, FileText, Landmark, Stamp,
  CreditCard, UserCheck, Award, RefreshCcw,
} from 'lucide-react';

const ICON_MAP = {
  'vat': Receipt,
  'corporate-tax': Building2,
  'excise-tax': FileText,
  'accounting-services': BookOpen,
  'bookkeeping-services': ClipboardList,
  'internal-auditing': Search,
  'external-auditing': ShieldCheck,
  'statutory-auditing': Scale,
  'vat-auditing': BarChart3,
  'corporate-tax-auditing': FileText,
  'forensic-auditing': Search,
  'company-registration': Landmark,
  'trademark-registration': Stamp,
  'business-bank-account': CreditCard,
  'pro-services': UserCheck,
  'golden-visa': Award,
  'company-reconstruction': RefreshCcw,
};

export async function generateMetadata({ params: { locale } }) {
  return {
    title: locale === 'ar'
      ? 'خدماتنا | سيج للاستشارات الضريبية'
      : 'Our Services | Sage Tax Consultancy',
    description: locale === 'ar'
      ? 'استكشف خدماتنا الشاملة في الضرائب والمحاسبة والتدقيق وخدمات الشركات في الإمارات'
      : 'Explore our comprehensive tax, accounting, auditing, and corporate services across the UAE.',
  };
}

const CATEGORIES = [
  {
    key: 'tax',
    icon: Receipt,
    en: 'Tax Consultancy',
    ar: 'الاستشارات الضريبية',
    descEn: "Navigate UAE's evolving tax landscape with expert guidance on VAT, Corporate Tax, and Excise Tax.",
    descAr: 'تنقّل في المشهد الضريبي المتطور في الإمارات بإرشاد الخبراء.',
    color: 'bg-sage-50 border-sage-200',
    iconColor: 'bg-sage-100 text-sage-700',
  },
  {
    key: 'accounting',
    icon: BookOpen,
    en: 'Accounting & Auditing',
    ar: 'المحاسبة والتدقيق',
    descEn: 'IFRS-compliant financial reporting, bookkeeping, and specialized audit services.',
    descAr: 'تقارير مالية متوافقة مع المعايير الدولية وخدمات التدقيق المتخصصة.',
    color: 'bg-navy-50 border-navy-200',
    iconColor: 'bg-navy-100 text-navy-700',
  },
  {
    key: 'corporate',
    icon: Building2,
    en: 'Corporate Services',
    ar: 'خدمات الشركات',
    descEn: 'Company registration, PRO services, Golden Visa, and full business setup support.',
    descAr: 'تسجيل الشركات وخدمات العلاقات الحكومية والإقامة الذهبية.',
    color: 'bg-gold-50 border-gold-200',
    iconColor: 'bg-gold-100 text-gold-700',
  },
];

export default async function ServicesPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const isArabic = locale === 'ar';
  const allServices = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isArabic ? 'حلول ضريبية وتجارية شاملة' : 'Comprehensive Tax & Business Solutions'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isArabic
              ? 'من الامتثال لضريبة القيمة المضافة إلى تأسيس الشركات — استشارات شاملة مصممة لأعمال الإمارات.'
              : 'From VAT compliance to company formation — end-to-end advisory built for UAE businesses.'}
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {CATEGORIES.map((cat, catIdx) => {
        const catServices = allServices.filter((s) => s.category === cat.key);
        const CatIcon = cat.icon;
        return (
          <section key={cat.key} id={cat.key} className={`section-padding ${catIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container-max">
              <div className="flex items-start gap-4 mb-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.iconColor}`}>
                  <CatIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">
                    {isArabic ? cat.ar : cat.en}
                  </h2>
                  <p className="text-gray-500 mt-1">{isArabic ? cat.descAr : cat.descEn}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {catServices.map((service) => {
                  const ServiceIcon = ICON_MAP[service.slug] || FileText;
                  return (
                    <Link
                      key={service.slug}
                      href={`/${locale}/services/${service.slug}`}
                      className="group card-hover flex items-start gap-4"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${cat.iconColor}`}>
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-sm text-navy-950 group-hover:text-sage-700 transition-colors">
                          {isArabic ? service.name_ar : service.name_en}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {isArabic ? service.description_ar : service.description_en}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-700 mt-2">
                          {isArabic ? 'المزيد' : 'Learn More'}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isArabic ? 'لست متأكدًا من أين تبدأ؟' : 'Not Sure Where to Start?'}
          </h2>
          <p className="text-sage-200 max-w-lg mx-auto">
            {isArabic
              ? 'احجز استشارة مجانية وسنوصي بأفضل الخدمات لاحتياجات عملك.'
              : "Book a free consultation and we'll recommend the right services for your business."}
          </p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isArabic ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
