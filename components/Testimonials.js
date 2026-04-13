'use client';

import { useTranslations } from 'next-intl';

const StarRating = ({ rating }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300'}`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-gold-400 opacity-50" fill="currentColor" viewBox="0 0 24 24">
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5s-7 3.75-7 5c0 1.972 .75 7 7 8zm14 0c3 0 7-1 7-8V5c0-1.25-4.5-5-7-5s-7 3.75-7 5c0 1.972 .75 7 7 8z" />
  </svg>
);

export default function Testimonials() {
  const t = useTranslations();

  const testimonials = [
    {
      quote:
        'Sage guided us through an FTA VAT inspection—zero penalties, zero stress. Their team knew the regulations inside out.',
      author: 'Fatima Al-Suwaidi',
      title: 'Finance Director',
      rating: 5,
    },
    {
      quote:
        'From bookkeeping to our first external audit, Sage scaled their services as we grew. True partners, not just providers.',
      author: 'Arjun Mehta',
      title: 'Founder, Tectonic DMCC',
      rating: 5,
    },
    {
      quote:
        'Golden Visa, trade license, bank account—Sage handled our entire corporate setup in under three weeks.',
      author: 'Lina Haddad',
      title: 'Partner, Vida Interiors',
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow space-y-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="badge">{t('testimonials.badge')}</span>
          <h2 className="section-heading mt-4 mb-6">{t('testimonials.title')}</h2>
          <p className="section-subheading text-gray-700">
            {t('testimonials.subtitle')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="card group hover:shadow-lg transition-all duration-300 hover:border-sage-200 flex flex-col"
            >
              <div className="flex-grow space-y-4">
                <QuoteIcon />
                <p className="text-gray-700 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div>
                  <p className="font-bold text-navy-950">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
                <StarRating rating={testimonial.rating} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
