'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'What is the UAE corporate tax rate?',
    qAr: 'ما هو معدل ضريبة الشركات في الإمارات؟',
    a: 'The standard rate is 9% on taxable income exceeding AED 375,000. Income up to that threshold is taxed at 0%. Qualifying Free Zone businesses may benefit from a 0% rate on qualifying income.',
    aAr: 'المعدل القياسي هو 9% على الدخل الخاضع للضريبة الذي يتجاوز 375,000 درهم إماراتي. الدخل حتى هذا الحد يخضع للضريبة بمعدل 0%. قد تستفيد الشركات المؤهلة في المناطق الحرة من معدل 0% على الدخل المؤهل.',
  },
  {
    q: 'Do I need to register for VAT in the UAE?',
    qAr: 'هل أحتاج إلى التسجيل لضريبة القيمة المضافة في الإمارات؟',
    a: 'VAT registration is mandatory if your taxable supplies and imports exceed AED 375,000 annually. Voluntary registration is available if they exceed AED 187,500. Sage can handle your full registration process.',
    aAr: 'التسجيل في ضريبة القيمة المضافة إلزامي إذا تجاوزت إمداداتك ووارداتك الخاضعة للضريبة 375,000 درهم سنوياً. التسجيل الطوعي متاح إذا تجاوزت 187,500 درهم. يمكن لسيج التعامل مع عملية التسجيل الكاملة.',
  },
  {
    q: 'What records must I maintain for FTA compliance?',
    qAr: 'ما السجلات التي يجب أن أحتفظ بها للامتثال لهيئة الضرائب الاتحادية؟',
    a: "Businesses must maintain financial records, invoices, credit/debit notes, import/export documents, and VAT returns for at least 5 years. Sage's bookkeeping services ensure full compliance.",
    aAr: 'يجب على الشركات الاحتفاظ بالسجلات المالية والفواتير وإشعارات الخصم/الائتمان ووثائق الاستيراد/التصدير وإقرارات ضريبة القيمة المضافة لمدة 5 سنوات على الأقل. خدمات مسك الدفاتر من سيج تضمن الامتثال الكامل.',
  },
  {
    q: 'How can Sage help during a tax audit?',
    qAr: 'كيف يمكن لسيج المساعدة أثناء التدقيق الضريبي؟',
    a: 'We provide end-to-end audit support — from preparing documentation and reconciling records to representing you before the FTA. Our goal is zero penalties.',
    aAr: 'نقدم دعم تدقيق شامل — من إعداد الوثائق ومطابقة السجلات إلى تمثيلك أمام هيئة الضرائب الاتحادية. هدفنا هو صفر غرامات.',
  },
  {
    q: 'Do Free Zone companies pay corporate tax?',
    qAr: 'هل تدفع شركات المناطق الحرة ضريبة الشركات؟',
    a: "Qualifying Free Zone Persons can benefit from a 0% corporate tax rate on qualifying income, provided they meet specific substance requirements and don't elect to be taxed at the standard rate.",
    aAr: 'يمكن للأشخاص المؤهلين في المناطق الحرة الاستفادة من معدل ضريبة شركات بنسبة 0% على الدخل المؤهل، شريطة استيفاء متطلبات الجوهر المحددة وعدم اختيار الخضوع للضريبة بالمعدل القياسي.',
  },
];

export default function FAQ({ locale }) {
  const t = useTranslations();
  const isArabic = locale === 'ar';
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-narrow space-y-10">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{t('faq.badge')}</span>
          <h2 className="section-heading">{t('faq.title')}</h2>
          <p className="section-subheading">{t('faq.subtitle')}</p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-sage-700' : 'text-gray-400'}`} />
                  <span className="flex-grow font-semibold text-sm text-navy-950">
                    {isArabic ? faq.qAr : faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pl-13 text-sm text-gray-600 leading-relaxed">
                    <div className={`${isArabic ? 'pr-8' : 'pl-8'}`}>
                      {isArabic ? faq.aAr : faq.a}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
