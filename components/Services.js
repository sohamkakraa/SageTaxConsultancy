'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Receipt, BookOpen, Building2, ArrowRight } from 'lucide-react';
import { useSite } from '@/components/SiteContent';

const CARD_STYLES = [
  { icon: Receipt, accent: 'bg-sage-50 border-sage-200 hover:border-sage-300', iconBg: 'bg-sage-100 text-sage-700' },
  { icon: BookOpen, accent: 'bg-navy-50 border-navy-200 hover:border-navy-300', iconBg: 'bg-navy-100 text-navy-700' },
  { icon: Building2, accent: 'bg-gold-50 border-gold-200 hover:border-gold-300', iconBg: 'bg-gold-100 text-gold-700' },
];

export default function Services() {
  const t = useTranslations();
  const { c, tr } = useSite();
  const s = c.home.services;

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{tr(s.badge)}</span>
          <h2 className="section-heading">{tr(s.title)}</h2>
          <p className="section-subheading">{tr(s.subtitle)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {s.cards.map((card, i) => {
            const { icon: Icon, accent, iconBg } = CARD_STYLES[i % CARD_STYLES.length];
            const slug = /^[a-z0-9-]+$/.test(card.slug) ? card.slug : '';
            return (
              <Link
                key={i}
                href={slug ? `/services/${slug}` : '/services'}
                className={`group rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${accent}`}
              >
                <div className="h-40 overflow-hidden">
                  <img src={card.image.url} alt={tr(card.image.alt)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBg}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-950">{tr(card.title)}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tr(card.text)}</p>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-sage-700 pt-2">
                    <span>{t('services.learnMore')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center">
          <Link href="/services" className="btn-secondary">
            {t('services.viewAll')}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
