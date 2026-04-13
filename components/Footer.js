'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer({ locale = 'en' }) {
  const t = useTranslations();
  const isRTL = locale === 'ar';
  const baseUrl = locale === 'en' ? '' : `/${locale}`;
  const currentYear = new Date().getFullYear();

  const taxConsultancyServices = [
    { label: 'VAT', slug: 'vat' },
    { label: 'Corporate Tax', slug: 'corporate-tax' },
    { label: 'Excise Tax', slug: 'excise-tax' },
  ];

  const accountingAuditingServices = [
    { label: 'Accounting Services', slug: 'accounting-services' },
    { label: 'Bookkeeping', slug: 'bookkeeping-services' },
    { label: 'Internal Auditing', slug: 'internal-auditing' },
    { label: 'External Auditing', slug: 'external-auditing' },
    { label: 'Statutory Auditing', slug: 'statutory-auditing' },
    { label: 'VAT Auditing', slug: 'vat-auditing' },
    { label: 'Corporate Tax Auditing', slug: 'corporate-tax-auditing' },
    { label: 'Forensic Auditing', slug: 'forensic-auditing' },
  ];

  const corporateServices = [
    { label: 'Company Registration', slug: 'company-registration' },
    { label: 'Trademark Registration', slug: 'trademark-registration' },
    { label: 'Business Bank Account', slug: 'business-bank-account' },
    { label: 'PRO Services', slug: 'pro-services' },
    { label: 'Golden Visa', slug: 'golden-visa' },
    { label: 'Company Reconstruction', slug: 'company-reconstruction' },
  ];

  return (
    <footer className={`bg-navy-950 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Main Footer Content */}
      <div className="border-b border-navy-800 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
            {/* Logo & Tagline */}
            <div className="lg:col-span-1">
              <Link href={baseUrl || '/'} className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 bg-gradient-to-br from-sage-500 to-sage-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="font-bold text-lg text-white group-hover:text-sage-400 transition-colors">Sage</span>
              </Link>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {t('footer.tagline')}
              </p>

              {/* Social Links */}
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/sage-tax-consultancy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-sage-600 flex items-center justify-center transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sage-tax-consultancy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-sage-600 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.069-3.259-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/971585704140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-navy-800 hover:bg-sage-600 flex items-center justify-center transition-colors"
                  aria-label="WhatsApp"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.75 5.404 2.177 7.697L2.185 23l8.31-2.17c2.25 1.227 4.788 1.871 7.355 1.871 5.423 0 9.852-4.401 9.652-9.854-.149-5.175-4.557-9.357-9.652-9.357z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wide">
                {t('footer.quickLinks')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href={baseUrl || '/'} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('nav.home')}
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/about`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('nav.about')}
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/services`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('nav.services')}
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/blog`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('nav.blog')}
                  </Link>
                </li>
                <li>
                  <Link href={`${baseUrl}/contact`} className="text-gray-400 hover:text-white transition-colors text-sm">
                    {t('nav.contact')}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services - Tax Consultancy */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wide">
                {t('nav.taxConsultancy')}
              </h4>
              <ul className="space-y-3">
                {taxConsultancyServices.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`${baseUrl}/services/${service.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - Accounting & Auditing */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wide">
                {t('nav.accountingAuditing')}
              </h4>
              <ul className="space-y-3">
                {accountingAuditingServices.slice(0, 4).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`${baseUrl}/services/${service.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services - Corporate Services */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-6 uppercase tracking-wide">
                {t('nav.corporateServices')}
              </h4>
              <ul className="space-y-3">
                {corporateServices.slice(0, 4).map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`${baseUrl}/services/${service.slug}`}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-navy-800">
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {t('contact.info.phone')}
              </h4>
              <a
                href="tel:+971585704140"
                className="text-gray-400 hover:text-sage-400 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 00.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 00.684-.948V5a2 2 0 00-2-2h-2.28a1 1 0 00-.948.684l-.5 1.5A2 2 0 0015 4c-5.523 0-10-4.477-10-10z" />
                </svg>
                +971 58 570 4140
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {t('contact.info.email')}
              </h4>
              <a
                href="mailto:info@sageconsultancy.ae"
                className="text-gray-400 hover:text-sage-400 transition-colors text-sm flex items-center gap-2"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@sageconsultancy.ae
              </a>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wide">
                {t('contact.info.location')}
              </h4>
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Dubai, U.A.E
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {t('footer.copyright')}. {t('footer.madeIn')}
            </p>
            <div className="flex gap-8">
              <Link
                href={`${baseUrl}/privacy`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
              <Link
                href={`${baseUrl}/terms`}
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                {t('footer.termsConditions')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
