'use client';

import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Phone, Mail, MapPin } from 'lucide-react';

const SERVICES = {
  tax: [
    { label: 'VAT', slug: 'vat' },
    { label: 'Corporate Tax', slug: 'corporate-tax' },
    { label: 'Excise Tax', slug: 'excise-tax' },
  ],
  accounting: [
    { label: 'Accounting', slug: 'accounting-services' },
    { label: 'Bookkeeping', slug: 'bookkeeping-services' },
    { label: 'Internal Auditing', slug: 'internal-auditing' },
    { label: 'External Auditing', slug: 'external-auditing' },
  ],
  corporate: [
    { label: 'Company Registration', slug: 'company-registration' },
    { label: 'Golden Visa', slug: 'golden-visa' },
    { label: 'PRO Services', slug: 'pro-services' },
    { label: 'Trademark', slug: 'trademark-registration' },
  ],
};

export default function Footer({ locale = 'en' }) {
  const t = useTranslations();
  const isRTL = locale === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className={`bg-navy-950 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <div className="container-max py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center">
              <Image src="/assets/logo_light.svg" alt="Sage Advisory" width={120} height={48} className="object-contain" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>

            {/* Social */}
            <div className="flex gap-2 pt-2">
              <SocialLink href="https://www.linkedin.com/company/sage-advisory" label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/sageadvisory.ae" label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
              </SocialLink>
              <SocialLink href="https://wa.me/971585704140" label="WhatsApp">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </SocialLink>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: t('nav.home') },
                { href: '/about', label: t('nav.about') },
                { href: '/services', label: t('nav.services') },
                { href: '/blog', label: t('nav.blog') },
                { href: '/contact', label: t('nav.contact') },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tax & Audit */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('nav.taxConsultancy')}</h4>
            <ul className="space-y-2.5">
              {[...SERVICES.tax, ...SERVICES.accounting].map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Corporate */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('nav.corporateServices')}</h4>
            <ul className="space-y-2.5">
              {SERVICES.corporate.map(({ label, slug }) => (
                <li key={slug}>
                  <Link href={`/services/${slug}`} className="text-sm text-gray-400 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — span full width on mobile so email doesn't overflow */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">{t('contact.badge')}</h4>
            <div className="space-y-3 min-w-0">
              <a href="tel:+971585704140" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors min-w-0">
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">+971 58 570 4140</span>
              </a>
              <a href="mailto:info@sageadvisory.ae" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors min-w-0">
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="break-all">info@sageadvisory.ae</span>
              </a>
              <p className="flex items-center gap-2 text-sm text-gray-400 min-w-0">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />Dubai, U.A.E
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="container-max py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">&copy; {year} Sage Advisory. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="text-xs text-gray-500 hover:text-white transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">{t('footer.termsConditions')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
      {children}
    </a>
  );
}
