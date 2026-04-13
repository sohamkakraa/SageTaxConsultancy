'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function Header({ locale = 'en' }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isRTL = locale === 'ar';
  const baseUrl = locale === 'en' ? '' : `/${locale}`;

  const taxConsultancyItems = [
    { label: 'VAT', slug: 'vat' },
    { label: 'Corporate Tax', slug: 'corporate-tax' },
    { label: 'Excise Tax', slug: 'excise-tax' },
  ];

  const accountingAuditingItems = [
    { label: 'Accounting Services', slug: 'accounting-services' },
    { label: 'Bookkeeping', slug: 'bookkeeping-services' },
    { label: 'Internal Auditing', slug: 'internal-auditing' },
    { label: 'External Auditing', slug: 'external-auditing' },
    { label: 'Statutory Auditing', slug: 'statutory-auditing' },
    { label: 'VAT Auditing', slug: 'vat-auditing' },
    { label: 'Corporate Tax Auditing', slug: 'corporate-tax-auditing' },
    { label: 'Forensic Auditing', slug: 'forensic-auditing' },
  ];

  const corporateServicesItems = [
    { label: 'Company Registration', slug: 'company-registration' },
    { label: 'Trademark Registration', slug: 'trademark-registration' },
    { label: 'Business Bank Account', slug: 'business-bank-account' },
    { label: 'PRO Services', slug: 'pro-services' },
    { label: 'Golden Visa', slug: 'golden-visa' },
    { label: 'Company Reconstruction', slug: 'company-reconstruction' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPathname = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    const newUrl = newLocale === 'en' ? `/${newPathname}` : `/${newLocale}/${newPathname}`;
    router.push(newUrl === '//' ? '/' : newUrl);
  };

  const NavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      onClick={onClick}
      className="text-gray-700 hover:text-sage-700 transition-colors font-medium"
    >
      {children}
    </Link>
  );

  const MobileNavLink = ({ href, children, onClick }) => (
    <Link
      href={href}
      onClick={onClick}
      className="block py-2 text-gray-700 hover:text-sage-700 transition-colors"
    >
      {children}
    </Link>
  );

  const DropdownMenu = ({ label, items, isOpen, onToggle, onClose }) => (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="text-gray-700 hover:text-sage-700 transition-colors font-medium flex items-center gap-1 py-2"
      >
        {label}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute ${isRTL ? 'right-0' : 'left-0'} mt-0 w-56 bg-white rounded-lg shadow-xl z-50 py-2`}>
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`${baseUrl}/services/${item.slug}`}
              onClick={onClose}
              className="block px-4 py-2 text-gray-700 hover:bg-sage-50 hover:text-sage-700 transition-colors text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <>
      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'
        } ${isRTL ? 'rtl' : 'ltr'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href={baseUrl || '/'} className="flex-shrink-0 flex items-center gap-2">
              <Image src="/assets/logo.png" alt="Sage Tax Consultancy" width={40} height={40} className="rounded-lg" />
              <Image src="/assets/name.svg" alt="Sage" width={80} height={28} className="object-contain" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href={baseUrl || '/'}>{t('nav.home')}</NavLink>
              <NavLink href={`${baseUrl}/about`}>{t('nav.about')}</NavLink>

              {/* Tax Consultancy Dropdown */}
              <DropdownMenu
                label={t('nav.taxConsultancy')}
                items={taxConsultancyItems}
                isOpen={openDropdown === 'tax'}
                onToggle={() => setOpenDropdown(openDropdown === 'tax' ? null : 'tax')}
                onClose={() => setOpenDropdown(null)}
              />

              {/* Accounting & Auditing Dropdown */}
              <DropdownMenu
                label={t('nav.accountingAuditing')}
                items={accountingAuditingItems}
                isOpen={openDropdown === 'accounting'}
                onToggle={() => setOpenDropdown(openDropdown === 'accounting' ? null : 'accounting')}
                onClose={() => setOpenDropdown(null)}
              />

              {/* Corporate Services Dropdown */}
              <DropdownMenu
                label={t('nav.corporateServices')}
                items={corporateServicesItems}
                isOpen={openDropdown === 'corporate'}
                onToggle={() => setOpenDropdown(openDropdown === 'corporate' ? null : 'corporate')}
                onClose={() => setOpenDropdown(null)}
              />

              <NavLink href={`${baseUrl}/blog`}>{t('nav.blog')}</NavLink>
              <NavLink href={`${baseUrl}/contact`}>{t('nav.contact')}</NavLink>
            </nav>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={switchLanguage}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-sage-700 transition-colors border border-gray-300 rounded-md hover:border-sage-700"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
              <Link
                href={`${baseUrl}/contact`}
                className="px-6 py-2 bg-gold hover:bg-gold/90 text-navy-950 font-semibold rounded-lg transition-colors"
              >
                {t('hero.cta')}
              </Link>
            </div>

            {/* Mobile Menu Button & Language Toggle */}
            <div className="lg:hidden flex items-center gap-4">
              <button
                onClick={switchLanguage}
                className="text-sm font-medium text-gray-700 hover:text-sage-700 transition-colors"
              >
                {locale === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-sage-700 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-6 pb-6 border-t border-gray-200">
              <div className="flex flex-col gap-6 mt-6">
                <MobileNavLink href={baseUrl || '/'} onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.home')}
                </MobileNavLink>
                <MobileNavLink href={`${baseUrl}/about`} onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.about')}
                </MobileNavLink>

                {/* Tax Consultancy Mobile */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'tax-m' ? null : 'tax-m')}
                    className="text-gray-700 hover:text-sage-700 transition-colors font-medium flex items-center gap-1 w-full"
                  >
                    {t('nav.taxConsultancy')}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === 'tax-m' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  {openDropdown === 'tax-m' && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {taxConsultancyItems.map((item) => (
                        <MobileNavLink
                          key={item.slug}
                          href={`${baseUrl}/services/${item.slug}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.label}
                        </MobileNavLink>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accounting & Auditing Mobile */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'acc-m' ? null : 'acc-m')}
                    className="text-gray-700 hover:text-sage-700 transition-colors font-medium flex items-center gap-1 w-full"
                  >
                    {t('nav.accountingAuditing')}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === 'acc-m' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  {openDropdown === 'acc-m' && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {accountingAuditingItems.map((item) => (
                        <MobileNavLink
                          key={item.slug}
                          href={`${baseUrl}/services/${item.slug}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.label}
                        </MobileNavLink>
                      ))}
                    </div>
                  )}
                </div>

                {/* Corporate Services Mobile */}
                <div>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === 'corp-m' ? null : 'corp-m')}
                    className="text-gray-700 hover:text-sage-700 transition-colors font-medium flex items-center gap-1 w-full"
                  >
                    {t('nav.corporateServices')}
                    <svg
                      className={`w-4 h-4 transition-transform ${openDropdown === 'corp-m' ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                  {openDropdown === 'corp-m' && (
                    <div className="pl-4 mt-2 flex flex-col gap-2">
                      {corporateServicesItems.map((item) => (
                        <MobileNavLink
                          key={item.slug}
                          href={`${baseUrl}/services/${item.slug}`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                        >
                          {item.label}
                        </MobileNavLink>
                      ))}
                    </div>
                  )}
                </div>

                <MobileNavLink href={`${baseUrl}/blog`} onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.blog')}
                </MobileNavLink>
                <MobileNavLink href={`${baseUrl}/contact`} onClick={() => setMobileMenuOpen(false)}>
                  {t('nav.contact')}
                </MobileNavLink>

                <Link
                  href={`${baseUrl}/contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-2 bg-gold hover:bg-gold/90 text-navy-950 font-semibold rounded-lg transition-colors text-center"
                >
                  {t('hero.cta')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
