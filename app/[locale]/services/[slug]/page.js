import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/content';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';

const SERVICE_SLUGS = [
  'vat',
  'corporate-tax',
  'excise-tax',
  'accounting-services',
  'bookkeeping-services',
  'internal-auditing',
  'external-auditing',
  'statutory-auditing',
  'vat-auditing',
  'corporate-tax-auditing',
  'forensic-auditing',
  'company-registration',
  'trademark-registration',
  'business-bank-account',
  'pro-services',
  'golden-visa',
  'company-reconstruction',
];

export async function generateStaticParams() {
  const params = [];
  for (const slug of SERVICE_SLUGS) {
    params.push({ locale: 'en', slug });
    params.push({ locale: 'ar', slug });
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'This service could not be found.',
    };
  }

  const title = locale === 'ar' ? service.meta_title_ar || service.name_ar : service.meta_title_en || service.name_en;
  const description = locale === 'ar' ? service.meta_description_ar || service.description_ar : service.meta_description_en || service.description_en;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const isArabic = locale === 'ar';
  const serviceName = isArabic ? service.name_ar : service.name_en;
  const serviceDescription = isArabic ? service.description_ar : service.description_en;
  const longDescription = isArabic ? service.long_description_ar : service.long_description_en;

  const features = service.features || [];
  const flowSteps = service.flow_steps || [];
  const documents = service.documents || [];
  const faqs = service.faqs || [];

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <span className="text-navy-300 mx-1">›</span>
          <Link href={`/${locale}/services`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الخدمات' : 'Services'}
          </Link>
          <span className="text-navy-300 mx-1">›</span>
          <span className="text-navy-900 font-medium">{serviceName}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow">
          <div className="flex items-center gap-3 mb-6">
            {service.icon && (
              <div className="text-4xl">{service.icon}</div>
            )}
            <span className="badge bg-gold-500 text-navy-900">{isArabic ? 'خدمة متخصصة' : 'Specialized Service'}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{serviceName}</h1>
          <p className="text-xl text-navy-100 max-w-2xl">{serviceDescription}</p>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <h2 className="section-heading text-navy-900 mb-8">{isArabic ? 'نظرة عامة' : 'Overview'}</h2>
          <div className="prose prose-lg max-w-none text-navy-700 leading-relaxed">
            <p>{longDescription}</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      {features.length > 0 && (
        <section className="section-padding bg-navy-50">
          <div className="container-narrow">
            <h2 className="section-heading text-navy-900 mb-12">{isArabic ? 'الميزات الرئيسية' : 'Key Features'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="card bg-white p-6 hover:shadow-lg transition-shadow">
                  {feature.icon && (
                    <div className="text-3xl mb-3">{feature.icon}</div>
                  )}
                  <h3 className="text-lg font-bold text-navy-900 mb-3">
                    {isArabic ? feature.name_ar : feature.name_en}
                  </h3>
                  <p className="text-navy-700">
                    {isArabic ? feature.description_ar : feature.description_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Flow */}
      {flowSteps.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-narrow">
            <h2 className="section-heading text-navy-900 mb-12">{isArabic ? 'عملية الخدمة' : 'Service Process'}</h2>
            <div className="space-y-6">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gold-500 text-white font-bold text-lg">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold text-navy-900 mb-2">
                      {isArabic ? step.title_ar : step.title_en}
                    </h3>
                    <p className="text-navy-700">
                      {isArabic ? step.description_ar : step.description_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Required Documents */}
      {documents.length > 0 && (
        <section className="section-padding bg-navy-50">
          <div className="container-narrow">
            <h2 className="section-heading text-navy-900 mb-12">{isArabic ? 'المستندات المطلوبة' : 'Required Documents'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-start gap-4 bg-white p-6 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sage-100">
                      <span className="text-sage-700 font-bold">✓</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">
                      {isArabic ? doc.name_ar : doc.name_en}
                    </h3>
                    <p className="text-sm text-navy-700">
                      {isArabic ? doc.description_ar : doc.description_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-narrow max-w-3xl">
            <h2 className="section-heading text-navy-900 mb-12">{isArabic ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group border border-navy-200 rounded-lg">
                  <summary className="flex cursor-pointer items-center justify-between bg-navy-50 px-6 py-4 font-bold text-navy-900 hover:bg-navy-100">
                    <span>{isArabic ? faq.question_ar : faq.question_en}</span>
                    <span className="text-gold-500 transition-transform group-open:rotate-180">▼</span>
                  </summary>
                  <div className="px-6 py-4 text-navy-700 border-t border-navy-200">
                    <p>{isArabic ? faq.answer_ar : faq.answer_en}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900">
        <div className="container-narrow text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isArabic ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-navy-800">
            {isArabic ? 'احجز استشارة مجانية مع أحد خبرائنا اليوم' : 'Book a free consultation with one of our experts today'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block">
            {isArabic ? 'حدد موعدًا الآن' : 'Schedule Now'}
          </Link>
        </div>
      </section>
    </main>
  );
}
