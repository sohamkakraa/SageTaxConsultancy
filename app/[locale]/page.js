import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Counters from '@/components/Counters';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import NewsSection from '@/components/NewsSection';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';

export async function generateMetadata({ params: { locale } }) {
  const isArabic = locale === 'ar';
  return {
    title: isArabic
      ? 'سيج للاستشارات الضريبية | مستشارون ضريبيون خبراء في الإمارات'
      : 'Sage Tax Consultancy | Expert Tax Advisory in UAE',
    description: isArabic
      ? 'استشارات ضريبية موثوقة في الإمارات. معتمدة من هيئة الضرائب الاتحادية.'
      : "UAE's trusted tax consultancy. FTA-approved advisors specializing in corporate tax, VAT, accounting, and business setup.",
  };
}

export default function HomePage({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <Counters />
      <About locale={locale} />
      <Services locale={locale} />
      <Testimonials locale={locale} />
      <NewsSection locale={locale} />
      <FAQ locale={locale} />
      <ContactSection locale={locale} />
    </>
  );
}
