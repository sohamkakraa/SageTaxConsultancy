import { notFound } from 'next/navigation';
import { getServiceBySlug } from '@/lib/content';
import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import { SERVICE_IMAGES } from '@/lib/images';
import {
  ArrowRight, ChevronRight, FileCheck, CheckCircle2,
  Phone, Clock, Shield, FileText,
} from 'lucide-react';

const SERVICE_SLUGS = [
  'vat', 'corporate-tax', 'excise-tax',
  'accounting-services', 'bookkeeping-services',
  'internal-auditing', 'external-auditing', 'statutory-auditing',
  'vat-auditing', 'corporate-tax-auditing', 'forensic-auditing',
  'company-registration', 'trademark-registration', 'business-bank-account',
  'pro-services', 'golden-visa', 'company-reconstruction',
];

// Auto-populated documents per service slug
const SERVICE_DOCUMENTS = {
  vat: [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Emirates ID of authorized signatory', ar: 'الهوية الإماراتية للموقع المفوض' },
    { en: 'Passport copy of owner/partners', ar: 'نسخة جواز سفر المالك/الشركاء' },
    { en: 'Bank account details / IBAN letter', ar: 'تفاصيل الحساب المصرفي / خطاب الآيبان' },
    { en: 'Proof of business activity (contracts/invoices)', ar: 'إثبات النشاط التجاري (عقود/فواتير)' },
    { en: 'Memorandum of Association (MOA)', ar: 'عقد التأسيس' },
  ],
  'corporate-tax': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Audited Financial Statements', ar: 'البيانات المالية المدققة' },
    { en: 'Emirates ID of authorized signatory', ar: 'الهوية الإماراتية للموقع المفوض' },
    { en: 'Memorandum of Association', ar: 'عقد التأسيس' },
    { en: 'Shareholder details and ownership structure', ar: 'تفاصيل المساهمين وهيكل الملكية' },
    { en: 'Transfer pricing documentation (if applicable)', ar: 'وثائق التسعير التحويلي (إن وجد)' },
  ],
  'excise-tax': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Product list with HS codes', ar: 'قائمة المنتجات مع رموز النظام المنسق' },
    { en: 'Import/export documentation', ar: 'وثائق الاستيراد/التصدير' },
    { en: 'Customs registration certificate', ar: 'شهادة التسجيل الجمركي' },
    { en: 'Emirates ID and passport of signatory', ar: 'الهوية الإماراتية وجواز سفر الموقع' },
  ],
  'accounting-services': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Bank statements (12 months)', ar: 'كشوف حساب بنكية (12 شهراً)' },
    { en: 'Sales and purchase invoices', ar: 'فواتير المبيعات والمشتريات' },
    { en: 'Existing chart of accounts (if any)', ar: 'دليل الحسابات الحالي (إن وجد)' },
    { en: 'Payroll records', ar: 'سجلات الرواتب' },
    { en: 'Previous financial statements (if available)', ar: 'البيانات المالية السابقة (إن وجدت)' },
  ],
  'bookkeeping-services': [
    { en: 'Bank statements', ar: 'كشوف الحسابات البنكية' },
    { en: 'Sales invoices and receipts', ar: 'فواتير المبيعات والإيصالات' },
    { en: 'Purchase invoices and bills', ar: 'فواتير المشتريات والفواتير' },
    { en: 'Petty cash records', ar: 'سجلات المصروفات النثرية' },
    { en: 'Payroll details', ar: 'تفاصيل الرواتب' },
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
  ],
  'internal-auditing': [
    { en: 'Organizational structure chart', ar: 'مخطط الهيكل التنظيمي' },
    { en: 'Internal policies and procedures', ar: 'السياسات والإجراءات الداخلية' },
    { en: 'Previous audit reports', ar: 'تقارير التدقيق السابقة' },
    { en: 'Financial statements (last 2 years)', ar: 'البيانات المالية (آخر سنتين)' },
    { en: 'Risk register (if available)', ar: 'سجل المخاطر (إن وجد)' },
  ],
  'external-auditing': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Trial balance and general ledger', ar: 'ميزان المراجعة ودفتر الأستاذ العام' },
    { en: 'Bank statements and confirmations', ar: 'كشوف الحسابات البنكية والتأكيدات' },
    { en: 'Accounts receivable/payable aging', ar: 'جدول أعمار الذمم المدينة/الدائنة' },
    { en: 'Fixed asset register', ar: 'سجل الأصول الثابتة' },
    { en: 'Memorandum of Association', ar: 'عقد التأسيس' },
  ],
  'statutory-auditing': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Complete financial records', ar: 'السجلات المالية الكاملة' },
    { en: 'Bank statements and confirmations', ar: 'كشوف الحسابات البنكية والتأكيدات' },
    { en: 'Board resolutions', ar: 'قرارات مجلس الإدارة' },
    { en: 'Shareholder agreements', ar: 'اتفاقيات المساهمين' },
    { en: 'Memorandum of Association', ar: 'عقد التأسيس' },
  ],
  'vat-auditing': [
    { en: 'VAT returns filed (all periods)', ar: 'إقرارات ضريبة القيمة المضافة المقدمة (جميع الفترات)' },
    { en: 'Sales and purchase invoices', ar: 'فواتير المبيعات والمشتريات' },
    { en: 'Tax credit notes and debit notes', ar: 'إشعارات الخصم والائتمان الضريبية' },
    { en: 'Import/export declarations', ar: 'إقرارات الاستيراد/التصدير' },
    { en: 'Bank statements', ar: 'كشوف الحسابات البنكية' },
  ],
  'corporate-tax-auditing': [
    { en: 'Corporate tax registration certificate', ar: 'شهادة التسجيل لضريبة الشركات' },
    { en: 'Audited financial statements', ar: 'البيانات المالية المدققة' },
    { en: 'Transfer pricing documentation', ar: 'وثائق التسعير التحويلي' },
    { en: 'Related party transaction details', ar: 'تفاصيل معاملات الأطراف ذات الصلة' },
    { en: 'Tax computation workings', ar: 'أوراق عمل الحسابات الضريبية' },
  ],
  'forensic-auditing': [
    { en: 'Complete financial records', ar: 'السجلات المالية الكاملة' },
    { en: 'Bank statements (all accounts)', ar: 'كشوف الحسابات البنكية (جميع الحسابات)' },
    { en: 'Employee records and access logs', ar: 'سجلات الموظفين وسجلات الوصول' },
    { en: 'Contracts and agreements', ar: 'العقود والاتفاقيات' },
    { en: 'Communication records (if applicable)', ar: 'سجلات الاتصالات (إن وجدت)' },
  ],
  'company-registration': [
    { en: 'Passport copies of all shareholders', ar: 'نسخ جوازات سفر جميع المساهمين' },
    { en: 'Proof of address (home country)', ar: 'إثبات العنوان (البلد الأصلي)' },
    { en: 'Proposed company name (3 options)', ar: 'اسم الشركة المقترح (3 خيارات)' },
    { en: 'Business activity description', ar: 'وصف النشاط التجاري' },
    { en: 'No Objection Certificate (NOC) if employed', ar: 'شهادة عدم ممانعة إذا كنت موظفاً' },
    { en: 'Initial approval from relevant authority', ar: 'الموافقة المبدئية من الجهة المختصة' },
  ],
  'trademark-registration': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Trademark logo/word mark in digital format', ar: 'شعار العلامة التجارية بصيغة رقمية' },
    { en: 'List of goods/services classes', ar: 'قائمة فئات السلع/الخدمات' },
    { en: 'Power of Attorney', ar: 'التوكيل الرسمي' },
    { en: 'Passport copy of applicant', ar: 'نسخة جواز سفر مقدم الطلب' },
  ],
  'business-bank-account': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Memorandum of Association', ar: 'عقد التأسيس' },
    { en: 'Passport and Emirates ID of signatories', ar: 'جواز سفر والهوية الإماراتية للموقعين' },
    { en: 'Board resolution for account opening', ar: 'قرار مجلس الإدارة لفتح الحساب' },
    { en: 'Proof of business address', ar: 'إثبات عنوان العمل' },
    { en: 'Company profile / business plan', ar: 'ملف الشركة / خطة العمل' },
  ],
  'pro-services': [
    { en: 'Trade License copy', ar: 'نسخة من الرخصة التجارية' },
    { en: 'Passport copies of employees', ar: 'نسخ جوازات سفر الموظفين' },
    { en: 'Emirates ID copies', ar: 'نسخ الهوية الإماراتية' },
    { en: 'Visa application forms', ar: 'نماذج طلب التأشيرة' },
    { en: 'Tenancy contract (Ejari)', ar: 'عقد الإيجار (إيجاري)' },
  ],
  'golden-visa': [
    { en: 'Valid passport (6+ months validity)', ar: 'جواز سفر ساري المفعول (صلاحية 6+ أشهر)' },
    { en: 'Current UAE visa copy (if applicable)', ar: 'نسخة التأشيرة الحالية (إن وجدت)' },
    { en: 'Proof of investment or property ownership', ar: 'إثبات الاستثمار أو ملكية العقار' },
    { en: 'Bank statements (6 months)', ar: 'كشوف حساب بنكية (6 أشهر)' },
    { en: 'Health insurance document', ar: 'وثيقة التأمين الصحي' },
    { en: 'Emirates ID (if available)', ar: 'الهوية الإماراتية (إن وجدت)' },
    { en: 'Title deed or investment certificate', ar: 'سند الملكية أو شهادة الاستثمار' },
  ],
  'company-reconstruction': [
    { en: 'Current Trade License', ar: 'الرخصة التجارية الحالية' },
    { en: 'Memorandum of Association', ar: 'عقد التأسيس' },
    { en: 'Board/shareholder resolutions', ar: 'قرارات مجلس الإدارة/المساهمين' },
    { en: 'Audited financial statements (last 2 years)', ar: 'البيانات المالية المدققة (آخر سنتين)' },
    { en: 'Debt and liability statements', ar: 'بيانات الديون والالتزامات' },
    { en: 'Proposed restructuring plan', ar: 'خطة إعادة الهيكلة المقترحة' },
  ],
};

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
  if (!service) return { title: 'Service Not Found' };

  const title = locale === 'ar' ? (service.meta_title_ar || service.name_ar) : (service.meta_title_en || service.name_en);
  const description = locale === 'ar' ? (service.meta_description_ar || service.description_ar) : (service.meta_description_en || service.description_en);

  return { title, description, openGraph: { title, description, type: 'article' } };
}

export default async function ServicePage({ params }) {
  const { slug, locale } = params;
  unstable_setRequestLocale(locale);
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const isAr = locale === 'ar';
  const name = isAr ? service.name_ar : service.name_en;
  const desc = isAr ? service.description_ar : service.description_en;
  const longDesc = isAr ? service.long_description_ar : service.long_description_en;
  const features = service.features || [];
  const flowSteps = service.flow_steps || [];
  const faqs = service.faqs || [];

  // Use auto-populated documents, fallback to DB documents
  const autoDocuments = SERVICE_DOCUMENTS[slug] || [];
  const dbDocuments = service.documents || [];

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${locale}/services`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الخدمات' : 'Services'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{name}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        {SERVICE_IMAGES[slug] && (
          <>
            <div className="absolute inset-0">
              <img src={SERVICE_IMAGES[slug]} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-navy-950/85" />
            </div>
          </>
        )}
        <div className="relative container-max max-w-4xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/20 text-xs font-semibold text-gold-300 tracking-wide uppercase mb-6">
            <Shield className="w-3 h-3" />
            {isAr ? 'خدمة متخصصة' : 'Specialized Service'}
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
                      {isAr ? feat.name_ar : feat.name_en}
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
      {(autoDocuments.length > 0 || dbDocuments.length > 0) && (
        <section className="section-padding bg-sage-50">
          <div className="container-max max-w-4xl">
            <div className="flex items-center gap-2 mb-8">
              <FileCheck className="w-5 h-5 text-sage-700" />
              <h2 className="text-xl font-bold text-navy-950">{isAr ? 'المستندات المطلوبة' : 'Required Documents'}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {(autoDocuments.length > 0 ? autoDocuments : dbDocuments).map((doc, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-sage-200/60">
                  <FileText className="w-4 h-4 text-sage-600 flex-shrink-0" />
                  <span className="text-sm text-navy-950 font-medium">
                    {autoDocuments.length > 0
                      ? (isAr ? doc.ar : doc.en)
                      : (isAr ? (doc.name_ar || doc.en) : (doc.name_en || doc.en))
                    }
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
            {isAr ? 'هل أنت مستعد للبدء؟' : 'Ready to Get Started?'}
          </h2>
          <p className="text-gray-300">
            {isAr ? 'احجز استشارة مجانية مع أحد خبرائنا اليوم' : 'Book a free consultation with one of our experts today'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/contact`} className="btn-gold">
              {isAr ? 'حدد موعدًا الآن' : 'Schedule Now'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+971585704140" className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10">
              <Phone className="w-4 h-4" />
              +971 58 570 4140
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
