'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Shield, Users, BarChart3, CheckCircle2, Receipt, BookOpen, Building2 } from 'lucide-react';

export default function Hero({ locale }) {
  const t = useTranslations();
  const base = locale === 'en' ? '' : `/${locale}`;

  return (
    <section className="relative overflow-hidden bg-navy-950">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-950 via-navy-900 to-sage-950 opacity-90" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sage-800/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

      <div className="relative container-max py-20 md:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10">
              <Shield className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-xs font-semibold text-gold-300 tracking-wide uppercase">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-[1.1] tracking-tight">
              {t('hero.title').split('\n').map((line, i) => (
                <span key={i}>
                  {i > 0 && <br />}
                  {i === 1 ? <span className="text-gold-400">{line}</span> : line}
                </span>
              ))}
            </h1>

            <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Link href={`${base}/contact`} className="btn-gold">
                {t('hero.cta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`${base}/services`} className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30">
                {t('hero.ctaSecondary')}
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              {[
                { icon: Users, value: '950+', label: locale === 'ar' ? 'عميل' : 'Clients' },
                { icon: BarChart3, value: '35+', label: locale === 'ar' ? 'صناعة' : 'Industries' },
                { icon: CheckCircle2, value: '12+', label: locale === 'ar' ? 'سنة' : 'Years' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={value} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-sage-400" />
                  <div>
                    <span className="text-white font-bold text-sm">{value}</span>
                    <span className="text-gray-400 text-xs ml-1">{label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side visual */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Feature cards stacked */}
              <div className="space-y-4">
                {[
                  {
                    icon: Receipt,
                    title: locale === 'ar' ? 'الامتثال الضريبي' : 'Tax Compliance',
                    desc: locale === 'ar' ? 'ضريبة القيمة المضافة وضريبة الشركات والضريبة الانتقائية' : 'VAT, Corporate Tax & Excise Tax',
                    color: 'bg-sage-800/50 border-sage-700/30',
                  },
                  {
                    icon: BookOpen,
                    title: locale === 'ar' ? 'المحاسبة والتدقيق' : 'Accounting & Audit',
                    desc: locale === 'ar' ? 'تقارير مالية متوافقة مع المعايير الدولية' : 'IFRS-compliant financial reporting',
                    color: 'bg-navy-800/50 border-navy-700/30',
                  },
                  {
                    icon: Building2,
                    title: locale === 'ar' ? 'خدمات الشركات' : 'Corporate Services',
                    desc: locale === 'ar' ? 'تأسيس الشركات والإقامة الذهبية' : 'Company formation & Golden Visa',
                    color: 'bg-gold-900/30 border-gold-700/20',
                  },
                ].map(({ icon: Icon, title, desc, color }) => (
                  <div key={title} className={`flex items-start gap-4 p-5 rounded-xl border backdrop-blur-sm ${color}`}>
                    <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{title}</h3>
                      <p className="text-gray-400 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
