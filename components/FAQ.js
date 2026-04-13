'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

const AccordionItem = ({ question, answer, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 last:border-b-0">
    <button
      onClick={onToggle}
      className="w-full flex items-start justify-between gap-4 py-6 px-6 -mx-6 hover:bg-sage-50 transition-colors text-left group"
    >
      <span className="font-semibold text-navy-950 flex-grow">{question}</span>
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center group-hover:bg-sage-200 transition-colors">
        <svg
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </button>

    {isOpen && (
      <div className="px-6 pb-6 text-gray-700 leading-relaxed animate-in fade-in duration-300">
        {answer}
      </div>
    )}
  </div>
);

export default function FAQ() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'What is the UAE corporate tax rate?',
      answer:
        'The standard rate is 9% on taxable income exceeding AED 375,000. Income up to that threshold is taxed at 0%. Qualifying Free Zone businesses may benefit from a 0% rate on qualifying income.',
    },
    {
      question: 'Do I need to register for VAT in the UAE?',
      answer:
        'VAT registration is mandatory if your taxable supplies and imports exceed AED 375,000 annually. Voluntary registration is available if they exceed AED 187,500. Sage can handle your full registration process.',
    },
    {
      question: 'What records must I maintain for FTA compliance?',
      answer:
        'Businesses must maintain financial records, invoices, credit/debit notes, import/export documents, and VAT returns for at least 5 years. Sage\'s bookkeeping services ensure full compliance.',
    },
    {
      question: 'How can Sage help during a tax audit?',
      answer:
        'We provide end-to-end audit support—from preparing documentation and reconciling records to representing you before the FTA. Our goal is zero penalties.',
    },
    {
      question: 'Do Free Zone companies pay corporate tax?',
      answer:
        'Qualifying Free Zone Persons can benefit from a 0% corporate tax rate on qualifying income, provided they meet specific substance requirements and don\'t elect to be taxed at the standard rate.',
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-narrow space-y-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="badge">{t('faq.badge')}</span>
          <h2 className="section-heading mt-4 mb-6">{t('faq.title')}</h2>
          <p className="section-subheading text-gray-700">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="card space-y-0">
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
