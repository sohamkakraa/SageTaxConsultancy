'use client';

import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useSite } from '@/components/SiteContent';
import ContactForm from '@/components/ContactForm';
import { mailHref, telHref } from '@/lib/cms/format';

export default function ContactSection() {
  const t = useTranslations();
  const { c, tr } = useSite();
  const s = c.home.contact;
  const ct = c.site.contact;

  const info = [
    { icon: Phone, label: t('contact.info.phone'), value: ct.phone, link: telHref(ct.phone), ltr: true },
    { icon: Mail, label: t('contact.info.email'), value: ct.email, link: mailHref(ct.email), ltr: true },
    { icon: MapPin, label: t('contact.info.location'), value: tr(ct.address) },
    { icon: Clock, label: t('contact.info.hours'), value: tr(ct.hours) },
  ];

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="badge">{tr(s.badge)}</span>
              <h2 className="section-heading">{tr(s.title)}</h2>
              <p className="section-subheading">{tr(s.subtitle)}</p>
            </div>
            <div className="space-y-3">
              {info.map(({ icon: Icon, label, value, link, ltr }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{label}</p>
                    {link ? (
                      <a href={link} dir={ltr ? 'ltr' : undefined} className="text-sm font-semibold text-navy-950 hover:text-sage-700 transition-colors break-all">{value}</a>
                    ) : (
                      <p className="text-sm font-semibold text-navy-950">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
