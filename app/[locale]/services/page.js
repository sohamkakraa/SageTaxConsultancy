import { unstable_setRequestLocale } from 'next-intl/server';
import { getServices } from '@/lib/content';
import Link from 'next/link';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: locale === 'ar'
      ? 'خدماتنا | سيج للاستشارات الضريبية'
      : 'Our Services | Sage Tax Consultancy',
    description: locale === 'ar'
      ? 'استكشف خدماتنا الشاملة في الضرائب والمحاسبة والتدقيق وخدمات الشركات في الإمارات'
      : 'Explore our comprehensive tax, accounting, auditing, and corporate services across the UAE. FTA-approved advisors.',
  };
}

const CATEGORIES = [
  {
    key: 'tax',
    en: 'Tax Consultancy',
    ar: 'الاستشارات الضريبية',
    descEn: 'Navigate UAE\'s evolving tax landscape with expert guidance on VAT, Corporate Tax, and Excise Tax.',
    descAr: 'تنقّل في المشهد الضريبي المتطور في الإمارات بإرشاد خبراء ضريبة القيمة المضافة والضريبة على الشركات والضريبة الانتقائية.',
    icon: '📋',
  },
  {
    key: 'accounting',
    en: 'Accounting & Auditing',
    ar: 'المحاسبة والتدقيق',
    descEn: 'IFRS-compliant financial reporting, bookkeeping, and specialized audit services to keep your business on track.',
    descAr: 'تقارير مالية متوافقة مع المعايير الدولية، ومسك الدفاتر، وخدمات التدقيق المتخصصة.',
    icon: '📊',
  },
  {
    key: 'corporate',
    en: 'Corporate Services',
    ar: 'خدمات الشركات',
    descEn: 'Company registration, PRO services, Golden Visa, and full business setup support in the UAE.',
    descAr: 'تسجيل الشركات، خدمات العلاقات الحكومية، الإقامة الذهبية، ودعم تأسيس الأعمال الكامل في الإمارات.',
    icon: '🏢',
  },
];

export default async function ServicesPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const isArabic = locale === 'ar';

  const allServices = await getServices();

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow text-center">
          <span className="badge bg-gold-500/20 text-gold-300 border-gold-500/30 mb-6 inline-block">
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold font-display mb-6">
            {isArabic ? 'حلول ضريبية وتجارية شاملة' : 'Comprehensive Tax & Business Solutions'}
          </h1>
          <p className="text-xl text-navy-200 max-w-2xl mx-auto">
            {isArabic
              ? 'من الامتثال لضريبة القيمة المضافة إلى تأسيس الشركات — استشارات شاملة مصممة لأعمال الإمارات.'
              : 'From VAT compliance to company formation — end-to-end advisory built for UAE businesses.'}
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {CATEGORIES.map((cat) => {
        const catServices = allServices.filter((s) => s.category === cat.key);
        return (
          <section key={cat.key} id={cat.key} className="section-padding bg-white even:bg-gray-50">
            <div className="container-narrow">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{cat.icon}</span>
                <h2 className="section-heading">{isArabic ? cat.ar : cat.en}</h2>
              </div>
              <p className="section-subheading mb-12">{isArabic ? cat.descAr : cat.descEn}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {catServices.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/${locale}/services/${service.slug}`}
                    className="card group cursor-pointer"
                  >
                    <h3 className="text-lg font-bold text-navy-900 mb-3 group-hover:text-sage-700 transition-colors">
                      {isArabic ? service.name_ar : service.name_en}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {isArabic ? service.description_ar : service.description_en}
                    </p>
                    <span className="text-sage-600 text-sm font-semibold group-hover:text-sage-800 transition-colors">
                      {isArabic ? 'اعرف المزيد ←' : 'Learn More →'}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="section-padding bg-gradient-to-r from-sage-800 to-navy-900 text-white">
        <div className="container-narrow text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isArabic ? 'لست متأكدًا من أين تبدأ؟' : 'Not Sure Where to Start?'}
          </h2>
          <p className="text-lg text-sage-100 mb-8">
            {isArabic
              ? 'احجز استشارة مجانية وسنوصي بأفضل الخدمات لاحتياجات عملك.'
              : 'Book a free consultation and we\'ll recommend the right services for your business needs.'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isArabic ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
          </Link>
        </div>
      </section>
    </>
  );
}
