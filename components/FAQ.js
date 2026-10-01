'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useSite } from '@/components/SiteContent';

export default function FAQ() {
  const { c, tr, isAr } = useSite();
  const faq = c.home.faq;
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="section-padding bg-gray-50" id="faqs">
      <div className="container-narrow space-y-10">
        <div className="max-w-2xl space-y-4">
          <span className="badge">{tr(faq.badge)}</span>
          <h2 className="section-heading">{tr(faq.title)}</h2>
          <p className="section-subheading">{tr(faq.subtitle)}</p>
        </div>

        <div className="space-y-2">
          {faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200/80 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 p-5 text-start hover:bg-gray-50 transition-colors min-h-[44px]"
                >
                  <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-sage-700' : 'text-gray-400'}`} />
                  <span className="flex-grow font-semibold text-sm text-navy-950">{tr(item.question)}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                    <div className={isAr ? 'pr-8' : 'pl-8'}>{tr(item.answer)}</div>
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
