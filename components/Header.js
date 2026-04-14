'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
<<<<<<< Updated upstream
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
=======
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  FileText,
  Building2,
  Receipt,
  BookOpen,
  Search,
  ShieldCheck,
  Landmark,
  Stamp,
  CreditCard,
  UserCheck,
  Award,
  RefreshCcw,
  ClipboardList,
  BarChart3,
  Scale,
  ArrowRight,
} from 'lucide-react';

const SERVICE_CATEGORIES = {
  tax: {
    icon: Receipt,
    items: [
      { label: 'VAT', labelAr: 'ضريبة القيمة المضافة', slug: 'vat', icon: Receipt },
      { label: 'Corporate Tax', labelAr: 'ضريبة الشركات', slug: 'corporate-tax', icon: Building2 },
      { label: 'Excise Tax', labelAr: 'الضريبة الانتقائية', slug: 'excise-tax', icon: FileText },
    ],
  },
  accounting: {
    icon: BookOpen,
    items: [
      { label: 'Accounting Services', labelAr: 'خدمات المحاسبة', slug: 'accounting-services', icon: BookOpen },
      { label: 'Bookkeeping', labelAr: 'مسك الدفاتر', slug: 'bookkeeping-services', icon: ClipboardList },
      { label: 'Internal Auditing', labelAr: 'التدقيق الداخلي', slug: 'internal-auditing', icon: Search },
      { label: 'External Auditing', labelAr: 'التدقيق الخارجي', slug: 'external-auditing', icon: ShieldCheck },
      { label: 'Statutory Auditing', labelAr: 'التدقيق القانوني', slug: 'statutory-auditing', icon: Scale },
      { label: 'VAT Auditing', labelAr: 'تدقيق ضريبة القيمة المضافة', slug: 'vat-auditing', icon: BarChart3 },
      { label: 'Corporate Tax Auditing', labelAr: 'تدقيق ضريبة الشركات', slug: 'corporate-tax-auditing', icon: FileText },
      { label: 'Forensic Auditing', labelAr: 'التدقيق الجنائي', slug: 'forensic-auditing', icon: Search },
    ],
  },
  corporate: {
    icon: Building2,
    items: [
      { label: 'Company Registration', labelAr: 'تسجيل الشركات', slug: 'company-registration', icon: Landmark },
      { label: 'Trademark Registration', labelAr: 'تسجيل العلامات التجارية', slug: 'trademark-registration', icon: Stamp },
      { label: 'Business Bank Account', labelAr: 'حساب مصرفي تجاري', slug: 'business-bank-account', icon: CreditCard },
      { label: 'PRO Services', labelAr: 'خدمات العلاقات الحكومية', slug: 'pro-services', icon: UserCheck },
      { label: 'Golden Visa', labelAr: 'الإقامة الذهبية', slug: 'golden-visa', icon: Award },
      { label: 'Company Reconstruction', labelAr: 'إعادة هيكلة الشركات', slug: 'company-reconstruction', icon: RefreshCcw },
    ],
  },
};
>>>>>>> Stashed changes

export default function Header({ locale = 'en' }) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
<<<<<<< Updated upstream
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
=======
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimeout = useRef(null);
>>>>>>> Stashed changes

  const isRTL = locale === 'ar';
  const base = locale === 'en' ? '' : `/${locale}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

<<<<<<< Updated upstream
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
=======
  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const switchLanguage = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const stripped = pathname.replace(`/${locale}`, '').replace(/^\//, '');
    const newUrl = newLocale === 'en' ? `/${stripped}` : `/${newLocale}/${stripped}`;
    router.push(newUrl === '//' ? '/' : newUrl);
  };

  const handleDropdownEnter = (key) => {
    clearTimeout(dropdownTimeout.current);
    setActiveDropdown(key);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setActiveDropdown(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : 'bg-white'
        } ${isRTL ? 'rtl' : 'ltr'}`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={base || '/'} className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-8 h-8 bg-sage-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base text-navy-950 leading-tight">Sage Tax</span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase leading-tight">Consultancy</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              <NavItem href={base || '/'} label={t('nav.home')} />
              <NavItem href={`${base}/about`} label={t('nav.about')} />

              {/* Service Dropdowns */}
              {[
                { key: 'tax', label: t('nav.taxConsultancy') },
                { key: 'accounting', label: t('nav.accountingAuditing') },
                { key: 'corporate', label: t('nav.corporateServices') },
              ].map(({ key, label }) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(key)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-600 hover:text-navy-950 transition-colors rounded-lg hover:bg-gray-50">
                    {label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === key ? 'rotate-180' : ''}`} />
                  </button>

                  {activeDropdown === key && (
                    <div
                      className={`absolute top-full ${isRTL ? 'right-0' : 'left-0'} mt-1 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-fade-in`}
                      onMouseEnter={() => handleDropdownEnter(key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {SERVICE_CATEGORIES[key].items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.slug}
                            href={`${base}/services/${item.slug}`}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-navy-950 hover:bg-sage-50 transition-colors"
                          >
                            <Icon className="w-4 h-4 text-sage-600 flex-shrink-0" />
                            <span>{isRTL ? item.labelAr : item.label}</span>
                          </Link>
                        );
                      })}
                      <div className="border-t border-gray-100 mt-1 pt-1">
                        <Link
                          href={`${base}/services`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-sage-700 hover:bg-sage-50 transition-colors"
                        >
                          <ArrowRight className="w-4 h-4" />
                          <span>{isRTL ? 'عرض الكل' : 'View All Services'}</span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <NavItem href={`${base}/blog`} label={t('nav.blog')} />
              <NavItem href={`${base}/contact`} label={t('nav.contact')} />
            </nav>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={switchLanguage}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-500 hover:text-navy-950 transition-colors rounded-lg hover:bg-gray-50"
>>>>>>> Stashed changes
              >
                <Globe className="w-4 h-4" />
                {locale === 'en' ? 'العربية' : 'English'}
              </button>
<<<<<<< Updated upstream
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
=======
              <Link href={`${base}/contact`} className="btn-primary text-sm py-2 px-5">
                {t('nav.getStarted')}
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={switchLanguage}
                className="p-2 text-gray-500 hover:text-navy-950 transition-colors"
>>>>>>> Stashed changes
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
<<<<<<< Updated upstream
                onClick={() => setDrawerOpen(true)}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
=======
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-gray-600 hover:text-navy-950 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
>>>>>>> Stashed changes
              </button>
            </div>

          </div>
        </div>
<<<<<<< Updated upstream
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
=======

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white max-h-[80vh] overflow-y-auto">
            <div className="container-max py-4 space-y-1">
              <MobileLink href={base || '/'} label={t('nav.home')} onClick={() => setMobileOpen(false)} />
              <MobileLink href={`${base}/about`} label={t('nav.about')} onClick={() => setMobileOpen(false)} />

              {[
                { key: 'tax', label: t('nav.taxConsultancy') },
                { key: 'accounting', label: t('nav.accountingAuditing') },
                { key: 'corporate', label: t('nav.corporateServices') },
              ].map(({ key, label }) => (
                <div key={key}>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    {label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded === key ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpanded === key && (
                    <div className={`${isRTL ? 'pr-4' : 'pl-4'} space-y-0.5`}>
                      {SERVICE_CATEGORIES[key].items.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link
                            key={item.slug}
                            href={`${base}/services/${item.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-600 hover:text-navy-950 hover:bg-sage-50 rounded-lg transition-colors"
                          >
                            <Icon className="w-3.5 h-3.5 text-sage-600" />
                            {isRTL ? item.labelAr : item.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <MobileLink href={`${base}/blog`} label={t('nav.blog')} onClick={() => setMobileOpen(false)} />
              <MobileLink href={`${base}/contact`} label={t('nav.contact')} onClick={() => setMobileOpen(false)} />

              <div className="pt-3 border-t border-gray-100">
                <Link
                  href={`${base}/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="block btn-primary w-full text-center"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header spacer */}
      <div className="h-16" />
>>>>>>> Stashed changes
    </>
  );
}

function NavItem({ href, label }) {
  return (
    <Link
      href={href}
      className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-navy-950 transition-colors rounded-lg hover:bg-gray-50"
    >
      {label}
    </Link>
  );
}

function MobileLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
    >
      {label}
    </Link>
  );
}
