import { notFound } from 'next/navigation';
import { getServiceBySlug, getServices } from '@/lib/content';
import { getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import { telHref } from '@/lib/cms/format';
import { Link } from '@/lib/navigation';
import { setRequestLocale } from 'next-intl/server';
import { SERVICE_IMAGES } from '@/lib/images';
import {
  ArrowRight, ChevronRight, FileCheck, CheckCircle2,
  Phone, Clock, Shield, FileText,
} from 'lucide-react';

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getServices();
  return services.flatMap((s) => [{ locale: 'en', slug: s.slug }, { locale: 'ar', slug: s.slug }]);
}

export async function generateMetadata(props) {
  const params = await props.params;
  const { slug, locale } = params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };

  const title = locale === 'ar' ? (service.meta_title_ar || service.name_ar) : (service.meta_title_en || service.name_en);
  const description = locale === 'ar' ? (service.meta_description_ar || service.description_ar) : (service.meta_description_en || service.description_en);

  return { title, description, openGraph: { title, description, type: 'article' } };
}

export default async function ServicePage(props) {
  const params = await props.params;
  const { slug, locale } = params;
  setRequestLocale(locale);
  const [service, c] = await Promise.all([getServiceBySlug(slug), getSiteContent()]);
  if (!service) notFound();

  const isAr = locale === 'ar';
  const tr = (v) => pick(v, locale);
  const heroImage = service.image_url || SERVICE_IMAGES[slug];
  const phone = c.site.contact.phone;
  const name = isAr ? service.name_ar : service.name_en;
  const desc = isAr ? service.description_ar : service.description_en;
  const longDesc = isAr ? service.long_description_ar : service.long_description_en;
  const features = service.features || [];
  const flowSteps = service.flow_steps || [];
  const faqs = service.faqs || [];

  const documents = (service.documents || []).filter((d) => d && (d.name_en || d.en));

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/services" className="hover:text-sage-700 transition-colors">
            {isAr ? 'الخدمات' : 'Services'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        {heroImage && (
          <>
            <div className="absolute inset-0">
              <img src={heroImage} alt={isAr ? service.image_alt_ar || '' : service.image_alt_en || ''} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy-950/85" />
            </div>
          </>
        )}
        <div className="relative container-max max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/20 text-xs font-semibold text-gold-300 tracking-wide uppercase mb-6">
            <Shield className="w-3 h-3" />
            {tr(c.servicesPage.detailBadge)}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">{name}</h1>
          <p className="text-lg text-gray-300 max-w-2xl">{desc}</p>
        </div>
      </section>

      {/* Overview */}
      <section className="section-padding bg-white">
        <div className="container-max max-w-4xl">
          <h2 className="text-xl font-bold text-navy-950 mb-4">{isAr ? 'نظرة عامة' : 'Overview'}</h2>
          <p className="text-gray-600 leading-relaxed">{longDesc}</p>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="section-padding bg-gray-50">
          <div className="container-max max-w-4xl">
            <h2 className="text-xl font-bold text-navy-950 mb-8">{isAr ? 'ما المتضمن' : "What's Included"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200/80">
                  <CheckCircle2 className="w-5 h-5 text-sage-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-sm text-navy-950">
                      {isAr ? feat.title_ar || feat.name_ar : feat.title_en || feat.name_en}
                    </h3>
                    {(feat.description_en || feat.description_ar) && (
                      <p className="text-xs text-gray-500 mt-0.5">
                        {isAr ? feat.description_ar : feat.description_en}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      {flowSteps.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-max max-w-4xl">
            <h2 className="text-xl font-bold text-navy-950 mb-8">{isAr ? 'عملية الخدمة' : 'Our Process'}</h2>
            <div className="space-y-4">
              {flowSteps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-navy-800 text-white text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </div>
                  <div className="pt-0.5">
                    <h3 className="font-bold text-sm text-navy-950">{isAr ? step.title_ar : step.title_en}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{isAr ? step.description_ar : step.description_en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Required Documents */}
      {documents.length > 0 && (
        <section className="section-padding bg-sage-50">
          <div className="container-max max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <FileCheck className="w-5 h-5 text-sage-700" />
              <h2 className="text-xl font-bold text-navy-950">{isAr ? 'المستندات المطلوبة' : 'Required Documents'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sage-200/60">
                  <FileText className="w-4 h-4 text-sage-600 flex-shrink-0" />
                  <span className="text-sm text-navy-950 font-medium">
                    {isAr ? doc.name_ar || doc.ar || doc.name_en : doc.name_en || doc.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-max max-w-3xl">
            <h2 className="text-xl font-bold text-navy-950 mb-8">{isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</h2>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-gray-50 rounded-lg border border-gray-200/80">
                  <summary className="flex cursor-pointer items-center justify-between px-5 py-4 font-semibold text-sm text-navy-950 hover:bg-gray-100 transition-colors rounded-lg">
                    <span>{isAr ? faq.question_ar : faq.question_en}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90 flex-shrink-0" />
                  </summary>
                  <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-200/80">
                    <p className="pt-3">{isAr ? faq.answer_ar : faq.answer_en}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-navy-950 text-white">
        <div className="container-max text-center max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {tr(c.servicesPage.detailCta.title)}
          </h2>
          <p className="text-gray-300">
            {tr(c.servicesPage.detailCta.text)}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-gold">
              {tr(c.servicesPage.detailCta.button)}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={telHref(phone)} dir="ltr" className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10">
              <Phone className="w-4 h-4" />
              {phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
