import { setRequestLocale } from 'next-intl/server';
import { getServices } from '@/lib/content';
import { Link } from '@/lib/navigation';
import { getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import {
  Receipt, Building2, BookOpen, ArrowRight,
  ClipboardList, Search, ShieldCheck, Scale,
  BarChart3, FileText, Landmark, Stamp,
  CreditCard, UserCheck, Award, RefreshCcw,
} from 'lucide-react';

const ICON_MAP = {
  'vat': Receipt,
  'corporate-tax': Building2,
  'excise-tax': FileText,
  'accounting-services': BookOpen,
  'bookkeeping-services': ClipboardList,
  'internal-auditing': Search,
  'external-auditing': ShieldCheck,
  'statutory-auditing': Scale,
  'vat-auditing': BarChart3,
  'corporate-tax-auditing': FileText,
  'forensic-auditing': Search,
  'company-registration': Landmark,
  'trademark-registration': Stamp,
  'business-bank-account': CreditCard,
  'pro-services': UserCheck,
  'golden-visa': Award,
  'company-reconstruction': RefreshCcw,
};

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const c = await getSiteContent();
  return { title: pick(c.servicesPage.hero.badge, locale), description: pick(c.servicesPage.hero.subtitle, locale) };
}

const CATEGORIES = [
  { key: 'tax', icon: Receipt, iconColor: 'bg-sage-100 text-sage-700' },
  { key: 'accounting', icon: BookOpen, iconColor: 'bg-navy-100 text-navy-700' },
  { key: 'corporate', icon: Building2, iconColor: 'bg-gold-100 text-gold-700' },
];

export default async function ServicesPage(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const isArabic = locale === 'ar';
  const [allServices, c] = await Promise.all([getServices(), getSiteContent()]);
  const tr = (v) => pick(v, locale);
  const p = c.servicesPage;

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.hero.image.url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            {tr(p.hero.badge)}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {tr(p.hero.title)}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {tr(p.hero.subtitle)}
          </p>
        </div>
      </section>

      {/* Service Categories */}
      {CATEGORIES.map((cat, catIdx) => {
        const catServices = allServices.filter((s) => s.category === cat.key);
        if (!catServices.length) return null;
        const CatIcon = cat.icon;
        return (
          <section key={cat.key} id={cat.key} className={`section-padding ${catIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
            <div className="container-max">
              <div className="flex items-start gap-4 mb-10">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${cat.iconColor}`}>
                  <CatIcon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">
                    {tr(p.categories[cat.key]?.title)}
                  </h2>
                  <p className="text-gray-500 mt-1">{tr(p.categories[cat.key]?.text)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
                {catServices.map((service) => {
                  const ServiceIcon = ICON_MAP[service.slug] || FileText;
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="group card-hover flex items-start gap-4"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${cat.iconColor}`}>
                        <ServiceIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-sm text-navy-950 group-hover:text-sage-700 transition-colors">
                          {isArabic ? service.name_ar : service.name_en}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {isArabic ? service.description_ar : service.description_en}
                        </p>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-sage-700 mt-2">
                          {isArabic ? 'المزيد' : 'Learn More'}
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {tr(p.cta.title)}
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            {tr(p.cta.text)}
          </p>
          <Link href="/contact" className="btn-gold">
            {tr(p.cta.button)}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
