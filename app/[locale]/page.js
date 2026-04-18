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
      ? 'سيج أدفايزري | مستشارون ضريبيون خبراء في الإمارات'
      : 'Sage Advisory | Expert Tax Advisory in UAE',
    description: isArabic
      ? 'استشارات ضريبية موثوقة في الإمارات. متخصصون في الضرائب والمحاسبة وتأسيس الشركات.'
      : "UAE's trusted advisory firm specializing in corporate tax, VAT, accounting, and business setup.",
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
