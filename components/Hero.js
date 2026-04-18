'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/lib/navigation';
import { ArrowRight, Shield, Receipt, BookOpen, Building2 } from 'lucide-react';
import IMAGES from '@/lib/images';

const SERVICE_PILLS = [
  {
    icon: Receipt,
    titleKey: 'Tax Compliance',
    titleAr: 'الامتثال الضريبي',
    descKey: 'VAT, Corporate Tax & Excise Tax',
    descAr: 'ضريبة القيمة المضافة وضريبة الشركات',
    color: 'from-gold-400/20 to-gold-400/5',
    iconColor: 'text-gold-400',
  },
  {
    icon: BookOpen,
    titleKey: 'Accounting & Audit',
    titleAr: 'المحاسبة والتدقيق',
    descKey: 'IFRS-compliant financial reporting',
    descAr: 'تقارير مالية متوافقة مع المعايير الدولية',
    color: 'from-sage-400/20 to-sage-400/5',
    iconColor: 'text-sage-400',
  },
  {
    icon: Building2,
    titleKey: 'Corporate Services',
    titleAr: 'خدمات الشركات',
    descKey: 'Company formation & Golden Visa',
    descAr: 'تأسيس الشركات والإقامة الذهبية',
    color: 'from-blue-400/20 to-blue-400/5',
    iconColor: 'text-blue-400',
  },
];

export default function Hero({ locale }) {
  const t = useTranslations();
  const isAr = locale === 'ar';

  return (
    <section className="relative overflow-hidden bg-navy-950 min-h-[700px] lg:min-h-[750px]">
      {/* Background image with stronger gradient */}
      <div className="absolute inset-0">
        <Image
          src={IMAGES.hero}
          alt="Dubai skyline"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/90 via-navy-950/80 to-navy-950/95" />
      </div>

      {/* Ambient glow effects */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-sage-700/8 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-gold-400/6 rounded-full blur-[100px]" />

      <div className="relative container-max pt-28 md:pt-36 lg:pt-40 pb-20 md:pb-28">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 backdrop-blur-sm">
            <Shield className="w-4 h-4 text-gold-400" />
            <span className="text-xs font-semibold text-gold-300 tracking-wide uppercase">
              {t('hero.badge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold font-display text-white leading-[1.1] tracking-tight">
            {t('hero.title').split('\n').map((line, i) => (
              <span key={i}>
                {i > 0 && <br />}
                {i === 1 ? <span className="text-gold-400">{line}</span> : line}
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link href={`/contact`} className="btn-gold text-base px-8 py-3.5">
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/services`} className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10 hover:border-white/30 text-base px-8 py-3.5">
              {t('hero.ctaSecondary')}
            </Link>
          </div>
        </div>

        {/* Service pills — horizontally centered below CTA */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {SERVICE_PILLS.map(({ icon: Icon, titleKey, titleAr, descKey, descAr, color, iconColor }) => (
            <div
              key={titleKey}
              className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${color} backdrop-blur-md border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]`}
            >
              <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                <Icon className={`w-5 h-5 ${iconColor}`} />
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-semibold text-sm">{isAr ? titleAr : titleKey}</h3>
                <p className="text-gray-400 text-xs mt-0.5 truncate">{isAr ? descAr : descKey}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
