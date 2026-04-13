import { unstable_setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Counters from '@/components/Counters';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import NewsSection from '@/components/NewsSection';
import ContactSection from '@/components/ContactSection';

export async function generateMetadata({ params: { locale } }) {
  const isArabic = locale === 'ar';
  return {
    title: isArabic
      ? 'سيج للاستشارات الضريبية | مستشارون ضريبيون خبراء في الإمارات'
      : 'Sage Tax Consultancy | Expert Tax Advisory in UAE',
    description: isArabic
      ? 'استشارات ضريبية موثوقة في الإمارات. معتمدة من هيئة الضرائب الاتحادية، متخصصة في الضرائب والمحاسبة والعمليات التجارية.'
      : "UAE's trusted tax consultancy. FTA-approved advisors specializing in corporate tax, VAT, accounting, and business setup. Expert guidance for individuals and corporations.",
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
      <Testimonials />
      <NewsSection locale={locale} />
      <FAQ />
      <ContactSection locale={locale} />
    </>
  );
}
