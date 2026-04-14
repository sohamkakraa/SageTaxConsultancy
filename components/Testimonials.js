'use client';

import { useTranslations } from 'next-intl';
import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote: 'Sage guided us through an FTA VAT inspection — zero penalties, zero stress. Their team knew the regulations inside out.',
    quoteAr: 'أرشدنا فريق سيج خلال تفتيش ضريبة القيمة المضافة من الهيئة الاتحادية — بدون غرامات وبدون ضغوط. فريقهم يعرف اللوائح من الداخل والخارج.',
    author: 'Fatima Al-Suwaidi',
    title: 'Finance Director',
    titleAr: 'مديرة مالية',
  },
  {
    quote: 'From bookkeeping to our first external audit, Sage scaled their services as we grew. True partners, not just providers.',
    quoteAr: 'من مسك الدفاتر إلى أول تدقيق خارجي لنا، وسّع فريق سيج خدماتهم مع نمونا. شركاء حقيقيون وليسوا مجرد مقدمي خدمات.',
    author: 'Arjun Mehta',
    title: 'Founder, Tectonic DMCC',
    titleAr: 'مؤسس Tectonic DMCC',
  },
  {
    quote: 'Golden Visa, trade license, bank account — Sage handled our entire corporate setup in under three weeks.',
    quoteAr: 'الإقامة الذهبية، الرخصة التجارية، الحساب المصرفي — تعامل فريق سيج مع إعداد شركتنا بالكامل في أقل من ثلاثة أسابيع.',
    author: 'Lina Haddad',
    title: 'Partner, Vida Interiors',
    titleAr: 'شريكة، فيدا إنتيريورز',
  },
];

export default function Testimonials({ locale }) {
  const t = useTranslations();
  const isArabic = locale === 'ar';

  return (
    <section className="section-padding bg-white">
      <div className="container-max space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{t('testimonials.badge')}</span>
          <h2 className="section-heading">{t('testimonials.title')}</h2>
          <p className="section-subheading">{t('testimonials.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className="card-hover flex flex-col">
              <div className="flex-grow space-y-4">
                <Quote className="w-8 h-8 text-gold-300" />
                <p className="text-gray-700 leading-relaxed text-sm">
                  &ldquo;{isArabic ? item.quoteAr : item.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-gray-100">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="font-bold text-sm text-navy-950">{item.author}</p>
                <p className="text-xs text-gray-500">{isArabic ? item.titleAr : item.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
