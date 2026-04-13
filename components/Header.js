'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';

const NAV_GROUPS = [
  {
    key: 'tax',
    labelKey: 'nav.taxConsultancy',
    items: [
      { label: 'VAT', slug: 'vat' },
      { label: 'Corporate Tax', slug: 'corporate-tax' },
      { label: 'Excise Tax', slug: 'excise-tax' },
    ],
  },
  {
    key: 'accounting',
    labelKey: 'nav.accountingAuditing',
    items: [
      { label: 'Accounting Services', slug: 'accounting-services' },
      { label: 'Bookkeeping', slug: 'bookkeeping-services' },
      { label: 'Internal Auditing', slug: 'internal-auditing' },
      { label: 'External Auditing', slug: 'external-auditing' },
      { label: 'Statutory Auditing', slug: 'statutory-auditing' },
      { label: 'VAT Auditing', slug: 'vat-auditing' },
      { label: 'Corporate Tax Auditing', slug: 'corporate-tax-auditing' },
      { label: 'Forensic Auditing', slug: 'forensic-auditing' },
    ],
  },
  {
    key: 'corporate',
    labelKey: 'nav.corporateServices',
    items: [
      { label: 'Company Registration', slug: 'company-registration' },
      { label: 'Trademark Registration', slug: 'trademark-registration' },
      { label: 'Business Bank Account', slug: 'business-bank-account' },
      { label: 'PRO Services', slug: 'pro-services' },
      { label: 'Golden Visa', slug: 'golden-visa' },
      { label: 'Company Reconstruction', slug: 'company-reconstruction' },
    ],
  },
];

export default function Header({ locale = 'en' }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const isRTL = locale === 'ar';
  const base = locale === 'en' ? '' : `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setExpanded(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const stripped = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    const url = newLocale === 'en' ? `/${stripped}` : `/${newLocale}/${stripped}`;
    router.push(url === '//' ? '/' : url);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-sm border-b border-gray-100'
            : 'bg-white/95 backdrop-blur-md'
        } ${isRTL ? 'rtl' : 'ltr'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href={base || '/'} className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="Sage Tax Consultancy"
                width={36}
                height={36}
                className="rounded-lg"
              />
              <Image
                src="/assets/name.svg"
                alt="Sage"
                width={76}
                height={24}
                className="object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              <Link
                href={base || '/'}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link
                href={`${base}/about`}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.about')}
              </Link>

              {NAV_GROUPS.map((group) => (
                <div key={group.key} className="relative group/nav">
                  <button className="flex items-center gap-1 px-3.5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-800 transition-colors">
                    {t(group.labelKey)}
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 transition-transform duration-200 group-hover/nav:rotate-180" />
                  </button>

                  {/* CSS-only hover dropdown */}
                  <div
                    className={`
                      absolute ${isRTL ? 'right-0' : 'left-0'} top-full pt-2
                      opacity-0 invisible translate-y-1
                      group-hover/nav:opacity-100 group-hover/nav:visible group-hover/nav:translate-y-0
                      transition-all duration-200 ease-out
                    `}
                  >
                    <div className="bg-white rounded-xl shadow-xl shadow-gray-200/60 border border-gray-100 py-1.5 min-w-[210px]">
                      {group.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`${base}/services/${item.slug}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:bg-sage-50 hover:text-sage-800 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <Link
                href={`${base}/blog`}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.blog')}
              </Link>
              <Link
                href={`${base}/contact`}
                className="px-3.5 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* Desktop right actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={switchLanguage}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600 border border-gray-200 rounded-lg hover:border-sage-500 hover:text-sage-700 transition-all"
              >
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
              <Link
                href={`${base}/contact`}
                className="px-5 py-2 bg-sage-800 text-white text-sm font-semibold rounded-lg hover:bg-sage-900 hover:shadow-md transition-all"
              >
                {t('hero.cta')}
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={switchLanguage}
                className="px-2.5 py-1 text-xs font-semibold text-gray-600 border border-gray-200 rounded-md hover:text-sage-700 transition-colors"
              >
                {locale === 'en' ? 'AR' : 'EN'}
              </button>
              <button
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-16" />

      {/* Mobile drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Panel */}
          <div
            className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} h-full w-72 bg-white shadow-2xl flex flex-col`}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-gray-100 flex-shrink-0">
              <Link
                href={base || '/'}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2"
              >
                <Image src="/assets/logo.png" alt="Sage" width={30} height={30} className="rounded-md" />
                <Image src="/assets/name.svg" alt="Sage" width={64} height={22} className="object-contain" />
              </Link>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto divide-y divide-gray-50">
              <Link
                href={base || '/'}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.home')}
              </Link>
              <Link
                href={`${base}/about`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.about')}
              </Link>

              {NAV_GROUPS.map((group) => (
                <div key={group.key}>
                  <button
                    onClick={() => setExpanded(expanded === group.key ? null : group.key)}
                    className="flex items-center justify-between w-full px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
                  >
                    {t(group.labelKey)}
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                        expanded === group.key ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {expanded === group.key && (
                    <div className="bg-gray-50">
                      {group.items.map((item) => (
                        <Link
                          key={item.slug}
                          href={`${base}/services/${item.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className="flex items-center gap-3 pl-8 pr-5 py-2.5 text-sm text-gray-600 hover:text-sage-800 hover:bg-sage-50 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-sage-400 flex-shrink-0" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href={`${base}/blog`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.blog')}
              </Link>
              <Link
                href={`${base}/contact`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center px-5 py-3.5 text-sm font-medium text-gray-700 hover:bg-sage-50 hover:text-sage-800 transition-colors"
              >
                {t('nav.contact')}
              </Link>
            </nav>

            {/* CTA */}
            <div className="px-5 py-5 border-t border-gray-100 flex-shrink-0">
              <Link
                href={`${base}/contact`}
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-center w-full py-3 bg-sage-800 text-white text-sm font-semibold rounded-xl hover:bg-sage-900 transition-colors"
              >
                {t('hero.cta')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
