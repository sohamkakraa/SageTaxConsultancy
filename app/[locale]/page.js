import { setRequestLocale } from 'next-intl/server';
import Hero from '@/components/Hero';
import Counters from '@/components/Counters';
import About from '@/components/About';
import Services from '@/components/Services';
import Testimonials from '@/components/Testimonials';
import NewsSection from '@/components/NewsSection';
import FAQ from '@/components/FAQ';
import ContactSection from '@/components/ContactSection';

export default async function HomePage(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Counters />
      <About />
      <Services />
      <Testimonials />
      <NewsSection locale={locale} />
      <FAQ />
      <ContactSection />
    </>
  );
}
