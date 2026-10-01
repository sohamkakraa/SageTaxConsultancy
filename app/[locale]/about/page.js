import { Link } from '@/lib/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ChevronRight, Target, Eye, Users, Heart, Lightbulb, ArrowRight } from 'lucide-react';
import { getSiteContent } from '@/lib/cms/store';
import { pick } from '@/lib/cms/tree';
import { paragraphs } from '@/lib/cms/format';
import TeamGrid from '@/components/TeamGrid';

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const c = await getSiteContent();
  return {
    title: pick(c.aboutPage.hero.badge, locale),
    description: pick(c.aboutPage.hero.subtitle, locale),
  };
}

const VALUE_ICONS = [Target, Heart, Lightbulb, Users];

export default async function AboutPage(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const [c, t] = await Promise.all([getSiteContent(), getTranslations('common')]);
  const tr = (v) => pick(v, locale);
  const p = c.aboutPage;

  return (
    <main>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-sage-700 transition-colors">{t('home')}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <span className="text-navy-950 font-medium">{tr(p.hero.badge)}</span>
        </div>
      </div>

      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={p.hero.image.url} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/80" />
        </div>
        <div className="relative container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">{tr(p.hero.badge)}</span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">{tr(p.hero.title)}</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">{tr(p.hero.subtitle)}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-display text-navy-950">{tr(p.story.title)}</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                {paragraphs(tr(p.story.body)).map((para, i) => <p key={i}>{para}</p>)}
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden h-72 shadow-lg bg-sage-50">
              <img src={p.story.image.url} alt={tr(p.story.image.alt)} className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[{ icon: Target, box: 'bg-sage-100 text-sage-700', d: p.mission }, { icon: Eye, box: 'bg-gold-100 text-gold-700', d: p.vision }].map(({ icon: Icon, box, d }, i) => (
              <div key={i} className="card-hover flex items-start gap-4 p-6">
                <div className={`w-10 h-10 rounded-lg ${box} flex items-center justify-center flex-shrink-0`}><Icon className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold text-navy-950 mb-2">{tr(d.title)}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{tr(d.text)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <TeamGrid />
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-narrow space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">{tr(p.values.title)}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {p.values.items.map((v, i) => {
              const Icon = VALUE_ICONS[i % VALUE_ICONS.length];
              return (
                <div key={i} className="card-hover text-center p-6 space-y-3">
                  <div className="w-11 h-11 mx-auto rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center"><Icon className="w-5 h-5" /></div>
                  <h3 className="font-bold text-sm text-navy-950">{tr(v.title)}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{tr(v.text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">{tr(p.cta.title)}</h2>
          <p className="text-gray-300 max-w-lg mx-auto">{tr(p.cta.text)}</p>
          <Link href="/contact" className="btn-gold">
            {tr(p.cta.button)}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </main>
  );
}
