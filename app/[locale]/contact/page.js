import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronRight, Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import { mailHref, safeHref, telHref, waHref } from '@/lib/cms/format';
import ContactForm from '@/components/ContactForm';
import ConsentGatedMap from '@/components/ConsentGatedMap';
import { WhatsAppIcon } from '@/components/WhatsAppButton';

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const c = await getSiteContent();
  return { title: pick(c.contactPage.hero.badge, locale), description: pick(c.contactPage.hero.subtitle, locale) };
}

export default async function ContactPage(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const [c, t, tc] = await Promise.all([getSiteContent(), getTranslations('common'), getTranslations('contact')]);
  const tr = (v) => pick(v, locale);
  const p = c.contactPage;
  const ct = c.site.contact;

  const cards = [
    { icon: Phone, label: tc('info.phone'), value: ct.phone, href: telHref(ct.phone), color: 'bg-sage-100 text-sage-700', ltr: true },
    { icon: Mail, label: tc('info.email'), value: ct.email, href: mailHref(ct.email), color: 'bg-gold-100 text-gold-700', ltr: true },
    { icon: MapPin, label: tc('info.location'), value: tr(ct.address), color: 'bg-navy-100 text-navy-700' },
    { icon: Clock, label: tc('info.hours'), value: tr(ct.hours), color: 'bg-sage-100 text-sage-700' },
  ];

  return (
    <main>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-sage-700 transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <span className="text-navy-950 font-medium">{t('contact')}</span>
        </div>
      </div>

      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.hero.image.url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            {tr(p.hero.badge)}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">{tr(p.hero.title)}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{tr(p.hero.subtitle)}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cards.map(({ icon: Icon, label, value, href, color, ltr }) => (
              <div key={label} className="card-hover p-6 text-center space-y-3">
                <div className={`w-11 h-11 mx-auto rounded-lg ${color} flex items-center justify-center`}><Icon className="w-5 h-5" /></div>
                <h3 className="font-bold text-sm text-navy-950">{label}</h3>
                {href ? (
                  <a href={href} dir={ltr ? 'ltr' : undefined} className="text-sm text-gray-600 hover:text-sage-700 transition-colors break-all">{value}</a>
                ) : (
                  <p className="text-sm text-gray-600">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold font-display text-navy-950 mb-6">{tr(p.formTitle)}</h2>
              <ContactForm className="space-y-5 relative" buttonClass="btn-gold w-full" />
            </div>

            <div className="lg:col-span-2 space-y-6">
              {ct.whatsapp && (
                <div className="card-hover p-6 bg-white space-y-4">
                  <h3 className="font-bold text-navy-950">{tr(p.whatsapp.title)}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tr(p.whatsapp.text)}</p>
                  <a href={waHref(ct.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] transition-colors">
                    <WhatsAppIcon />
                    {tr(p.whatsapp.button)}
                  </a>
                </div>
              )}

              <div className="card-hover overflow-hidden bg-white">
                <div className="h-64 overflow-hidden">
                  <ConsentGatedMap src={ct.mapEmbedUrl} title={t('mapTitle')} />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tr(ct.address)}</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">{tr(ct.hours)}</p>
                  </div>
                  {ct.mapsUrl && (
                    <a href={safeHref(ct.mapsUrl)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-sage-700 hover:text-sage-800 transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                      {t('openMaps')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">{tr(p.cta.title)}</h2>
          <p className="text-gray-300 max-w-lg mx-auto">{tr(p.cta.text)}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#faqs" className="btn-gold">
              {t('viewFaqs')}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </Link>
            <Link href="/services" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
              {t('ourServices')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
