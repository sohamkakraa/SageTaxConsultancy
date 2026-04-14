'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';

const CONTACT_INFO = [
  { icon: Phone, label: 'contact.info.phone', value: '+971 58 570 4140', link: 'tel:+971585704140' },
  { icon: Mail, label: 'contact.info.email', value: 'info@sageconsultancy.ae', link: 'mailto:info@sageconsultancy.ae' },
  { icon: MapPin, label: 'contact.info.location', value: 'Dubai, U.A.E' },
  { icon: Clock, label: 'contact.info.hours', valueKey: 'contact.info.hoursValue' },
];

export default function ContactSection({ locale }) {
  const t = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: t('contact.success') });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ type: 'error', message: t('contact.error') });
      }
    } catch {
      setStatus({ type: 'error', message: t('contact.error') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-white" id="contact">
      <div className="container-narrow">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <span className="badge">{t('contact.badge')}</span>
              <h2 className="section-heading">{t('contact.title')}</h2>
              <p className="section-subheading">{t('contact.subtitle')}</p>
            </div>

            <div className="space-y-3">
              {CONTACT_INFO.map(({ icon: Icon, label, value, valueKey, link }) => (
                <div key={label} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-sage-50 text-sage-700 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">{t(label)}</p>
                    {link ? (
                      <a href={link} className="text-sm font-semibold text-navy-950 hover:text-sage-700 transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold text-navy-950">{valueKey ? t(valueKey) : value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="card border-gray-200 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t('contact.name')} name="name" value={formData.name} onChange={handleChange} required />
                <FormField label={t('contact.email')} name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label={t('contact.phone')} name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                <FormField label={t('contact.subject')} name="subject" value={formData.subject} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy-950 mb-1.5">{t('contact.message')}</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all resize-none"
                />
              </div>

              {status.message && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                  status.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {status.message}
                </div>
              )}

              <button type="submit" disabled={submitting} className="btn-primary w-full">
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />{t('contact.sending')}</>
                ) : (
                  <><Send className="w-4 h-4" />{t('contact.send')}</>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, name, type = 'text', value, onChange, required = false }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-navy-950 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all"
      />
    </div>
  );
}
