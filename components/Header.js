'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname } from '@/lib/navigation';
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
  Phone,
} from 'lucide-react';

const SOLUTIONS = [
  {
    key: 'tax',
    label: 'Tax Consultancy',
    labelAr: 'الاستشارات الضريبية',
    description: 'VAT, Corporate & Excise Tax advisory',
    descriptionAr: 'استشارات ضريبة القيمة المضافة والشركات والانتقائية',
    icon: Receipt,
    items: [
      { label: 'VAT', labelAr: 'ضريبة القيمة المضافة', slug: 'vat', icon: Receipt },
      { label: 'Corporate Tax', labelAr: 'ضريبة الشركات', slug: 'corporate-tax', icon: Building2 },
      { label: 'Excise Tax', labelAr: 'الضريبة الانتقائية', slug: 'excise-tax', icon: FileText },
    ],
  },
  {
    key: 'accounting',
    label: 'Accounting & Auditing',
    labelAr: 'المحاسبة والتدقيق',
    description: 'IFRS-compliant reporting & audit services',
    descriptionAr: 'تقارير متوافقة مع المعايير الدولية وخدمات التدقيق',
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
  {
    key: 'corporate',
    label: 'Corporate Services',
    labelAr: 'الخدمات الإدارية',
    description: 'Business setup, visa & PRO services',
    descriptionAr: 'تأسيس الشركات والتأشيرات والخدمات الحكومية',
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
];

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const megaTimeout = useRef(null);

  const isRTL = locale === 'ar';
  // next-intl's usePathname returns the path without locale prefix,
  // and next-intl's Link auto-handles locale prefixing — no manual base needed.
  const isHomepage = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close everything on route change
  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const switchLanguage = () => {
    // next-intl's useRouter handles locale prefixing automatically.
    // usePathname already returns the path without the locale prefix.
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.push(pathname, { locale: newLocale });
  };

  const handleMegaEnter = () => {
    clearTimeout(megaTimeout.current);
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setMegaOpen(false), 200);
  };

  // Adaptive text color
  const isTransparent = isHomepage && !scrolled && !mobileOpen;
  const textClass = isTransparent
    ? 'text-white/80 hover:text-white'
    : 'text-gray-600 hover:text-navy-950';

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || mobileOpen || megaOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
            : isHomepage
              ? 'bg-transparent'
              : 'bg-white'
        } ${isRTL ? 'rtl' : 'ltr'}`}
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src={isTransparent && !megaOpen ? '/assets/logo_light.svg' : '/assets/logo_dark.svg'}
                alt="Sage Advisory"
                width={130}
                height={52}
                className="object-contain transition-all duration-300"
                priority
              />
            </Link>

            {/* Desktop Nav — compact: Solutions mega-menu + About + Insights */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Solutions Mega-dropdown Trigger */}
              <div
                className="relative"
                onMouseEnter={handleMegaEnter}
                onMouseLeave={handleMegaLeave}
              >
                <button
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
                    megaOpen
                      ? 'text-sage-700 bg-sage-50'
                      : isTransparent
                        ? 'text-white/80 hover:text-white hover:bg-white/10'
                        : 'text-gray-600 hover:text-navy-950 hover:bg-gray-50'
                  }`}
                >
                  {isRTL ? 'الحلول' : 'Solutions'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <NavLink href={`/about`} label={isRTL ? 'عن الشركة' : 'About'} transparent={isTransparent && !megaOpen} />
              <NavLink href={`/blog`} label={isRTL ? 'المقالات' : 'Insights'} transparent={isTransparent && !megaOpen} />
            </nav>

            {/* Right Side — lang + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={switchLanguage}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors rounded-md border ${
                  isTransparent && !megaOpen
                    ? 'text-white/70 border-white/20 hover:text-white hover:border-white/40'
                    : 'text-gray-400 border-gray-200 hover:text-navy-950 hover:border-gray-300'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                {locale === 'en' ? 'AR' : 'EN'}
              </button>

              <Link
                href={`/contact`}
                className={`inline-flex items-center gap-2 text-sm py-2.5 px-5 rounded-lg font-semibold transition-all duration-200 ${
                  isTransparent && !megaOpen
                    ? 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                    : 'bg-navy-800 text-white hover:bg-navy-900 shadow-sm hover:shadow-md'
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                {isRTL ? 'احجز مكالمة' : 'Book a Call'}
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="lg:hidden flex items-center gap-1">
              <button
                onClick={switchLanguage}
                className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors rounded-lg ${
                  isTransparent ? 'text-white/70 hover:text-white' : 'text-gray-500 hover:text-navy-950'
                }`}
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center transition-colors rounded-lg ${
                  isTransparent ? 'text-white/70 hover:text-white' : 'text-gray-600 hover:text-navy-950'
                }`}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* ─── Desktop Mega Menu ─── */}
        {megaOpen && (
          <div
            className="hidden lg:block border-t border-gray-100 bg-white animate-fade-in"
            onMouseEnter={handleMegaEnter}
            onMouseLeave={handleMegaLeave}
          >
            <div className="container-max py-8">
              <div className="grid grid-cols-3 gap-8">
                {SOLUTIONS.map((category) => {
                  const CatIcon = category.icon;
                  return (
                    <div key={category.key}>
                      {/* Category Header */}
                      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-gray-100">
                        <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
                          <CatIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-navy-950">
                            {isRTL ? category.labelAr : category.label}
                          </h3>
                          <p className="text-xs text-gray-400">
                            {isRTL ? category.descriptionAr : category.description}
                          </p>
                        </div>
                      </div>

                      {/* Service Links */}
                      <ul className="space-y-0.5">
                        {category.items.map((item) => {
                          const Icon = item.icon;
                          return (
                            <li key={item.slug}>
                              <Link
                                href={`/services/${item.slug}`}
                                className="group flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm text-gray-600 hover:text-navy-950 hover:bg-sage-50/70 transition-colors"
                              >
                                <Icon className="w-4 h-4 text-gray-300 group-hover:text-sage-600 transition-colors flex-shrink-0" />
                                {isRTL ? item.labelAr : item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              {/* Mega Menu Footer */}
              <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/services`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 hover:text-sage-900 transition-colors"
                >
                  {isRTL ? 'عرض جميع الخدمات' : 'View All Services'}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
                <p className="text-xs text-gray-400">
                  {isRTL ? 'خدمة أكثر من 950 شركة في الإمارات' : 'Serving 950+ businesses across the UAE'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── Mobile Full-Screen Overlay ─── */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 overflow-y-auto">
            <div className="container-max py-6 space-y-6">

              {/* Solutions Accordion */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-3">
                  {isRTL ? 'الحلول' : 'Solutions'}
                </p>
                <div className="space-y-1">
                  {SOLUTIONS.map((category) => {
                    const CatIcon = category.icon;
                    const isExpanded = mobileExpanded === category.key;
                    return (
                      <div key={category.key}>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : category.key)}
                          className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                            isExpanded ? 'bg-sage-100 text-sage-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                            <CatIcon className="w-4.5 h-4.5" />
                          </div>
                          <div className={`flex-1 text-${isRTL ? 'right' : 'left'}`}>
                            <span className="text-sm font-semibold text-navy-950">
                              {isRTL ? category.labelAr : category.label}
                            </span>
                            <p className="text-xs text-gray-400">
                              {isRTL ? category.descriptionAr : category.description}
                            </p>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-gray-300 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>

                        {isExpanded && (
                          <div className={`${isRTL ? 'pr-12' : 'pl-12'} pb-2 space-y-0.5 animate-fade-in`}>
                            {category.items.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.slug}
                                  href={`/services/${item.slug}`}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-500 hover:text-navy-950 hover:bg-sage-50 rounded-lg transition-colors"
                                >
                                  <Icon className="w-3.5 h-3.5 text-sage-500 flex-shrink-0" />
                                  {isRTL ? item.labelAr : item.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Quick Links */}
              <div className="space-y-1">
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-300 mb-3">
                  {isRTL ? 'الشركة' : 'Company'}
                </p>
                <MobileNavLink href={`/about`} label={isRTL ? 'عن الشركة' : 'About Us'} onClick={() => setMobileOpen(false)} />
                <MobileNavLink href={`/blog`} label={isRTL ? 'المقالات' : 'Insights'} onClick={() => setMobileOpen(false)} />
                <MobileNavLink href={`/services`} label={isRTL ? 'جميع الخدمات' : 'All Services'} onClick={() => setMobileOpen(false)} />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* CTA */}
              <div className="space-y-3">
                <Link
                  href={`/contact`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-navy-800 text-white font-semibold text-sm hover:bg-navy-900 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {isRTL ? 'احجز مكالمة' : 'Book a Call'}
                </Link>
                <a
                  href="tel:+971585704140"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium hover:border-sage-300 hover:text-sage-700 transition-colors"
                >
                  +971 58 570 4140
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Header spacer — only on non-homepage pages where header isn't transparent */}
      {!isHomepage && <div className="h-16" />}
    </>
  );
}

/* ── Subcomponents ── */

function NavLink({ href, label, transparent = false }) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium transition-colors rounded-lg ${
        transparent
          ? 'text-white/80 hover:text-white hover:bg-white/10'
          : 'text-gray-600 hover:text-navy-950 hover:bg-gray-50'
      }`}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({ href, label, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-600 hover:text-navy-950 hover:bg-gray-50 rounded-xl transition-colors"
    >
      <ArrowRight className="w-3.5 h-3.5 text-gray-300" />
      {label}
    </Link>
  );
}
