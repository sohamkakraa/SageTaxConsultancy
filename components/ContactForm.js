'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, Loader2 } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { useSite } from '@/components/SiteContent';

const EMPTY = { name: '', email: '', phone: '', subject: '', message: '', website: '' };

export default function ContactForm({ className = 'card border-gray-200 space-y-5', buttonClass = 'btn-primary w-full' }) {
  const t = useTranslations();
  const { locale } = useSite();
  const [form, setForm] = useState(EMPTY);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!consent) {
      setStatus({ type: 'error', message: t('contact.consentRequired') });
      return;
    }
    setSubmitting(true);
    setStatus({ type: '', message: '' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, consent: true, locale }),
      });
      if (res.ok) {
        setStatus({ type: 'success', message: t('contact.success') });
        setForm(EMPTY);
        setConsent(false);
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus({ type: 'error', message: res.status === 400 && data.error ? data.error : t('contact.error') });
      }
    } catch {
      setStatus({ type: 'error', message: t('contact.error') });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className={`relative ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t('contact.name')} name="name" value={form.name} onChange={onChange} required maxLength={100} autoComplete="name" />
        <Field label={t('contact.email')} name="email" type="email" value={form.email} onChange={onChange} required maxLength={200} autoComplete="email" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label={t('contact.phone')} name="phone" type="tel" value={form.phone} onChange={onChange} maxLength={40} autoComplete="tel" />
        <Field label={t('contact.subject')} name="subject" value={form.subject} onChange={onChange} required maxLength={200} />
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-xs font-semibold text-navy-950 mb-1.5">{t('contact.message')} *</label>
        <textarea
          id="cf-message"
          name="message"
          value={form.message}
          onChange={onChange}
          required
          minLength={10}
          maxLength={5000}
          rows="4"
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all resize-none"
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots */}
      <div aria-hidden="true" className="absolute top-0 start-0 w-px h-px overflow-hidden opacity-0 pointer-events-none" style={{ clipPath: 'inset(50%)' }}>
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={onChange} />
        </label>
      </div>

      <label className="flex items-start gap-2.5 text-xs text-gray-600 leading-relaxed cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          required
          className="mt-0.5 w-4 h-4 rounded border-gray-300 text-sage-700 focus:ring-sage-500 flex-shrink-0"
        />
        <span>
          {t('contact.consentPrefix')}{' '}
          <Link href="/privacy-policy" className="font-semibold text-sage-700 underline underline-offset-2">{t('footer.privacyPolicy')}</Link>
          {t('contact.consentSuffix')}
        </span>
      </label>

      {status.message && (
        <div role="status" className={`p-3 rounded-lg text-sm font-medium ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
          {status.message}
        </div>
      )}

      <button type="submit" disabled={submitting} className={`${buttonClass} disabled:opacity-60 disabled:cursor-not-allowed`}>
        {submitting ? (<><Loader2 className="w-4 h-4 animate-spin" />{t('contact.sending')}</>) : (<><Send className="w-4 h-4" />{t('contact.send')}</>)}
      </button>
    </form>
  );
}

function Field({ label, name, type = 'text', value, onChange, required = false, ...rest }) {
  return (
    <div>
      <label htmlFor={`cf-${name}`} className="block text-xs font-semibold text-navy-950 mb-1.5">{label}{required ? ' *' : ''}</label>
      <input
        id={`cf-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-100 transition-all"
        {...rest}
      />
    </div>
  );
}
