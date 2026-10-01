'use client';

import { Star, Quote } from 'lucide-react';
import { useSite } from '@/components/SiteContent';

export default function Testimonials() {
  const { c, tr } = useSite();
  const t = c.home.testimonials;
  if (!t.items?.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="container-max space-y-12">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{tr(t.badge)}</span>
          <h2 className="section-heading">{tr(t.title)}</h2>
          <p className="section-subheading">{tr(t.subtitle)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.items.map((item, idx) => (
            <div key={idx} className="card-hover flex flex-col">
              <div className="flex-grow space-y-4">
                <Quote className="w-8 h-8 text-gold-300" />
                <p className="text-gray-700 leading-relaxed text-sm">&ldquo;{tr(item.quote)}&rdquo;</p>
              </div>
              <div className="pt-5 mt-5 border-t border-gray-100">
                <div className="flex items-center gap-1 mb-2" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />
                  ))}
                </div>
                <p className="font-bold text-sm text-navy-950">{item.author}</p>
                <p className="text-xs text-gray-500">{tr(item.role)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
