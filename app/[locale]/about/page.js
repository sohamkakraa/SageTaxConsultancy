import Link from 'next/link';
import { ChevronRight, Award, Users, Target, Lightbulb } from 'lucide-react';

export const metadata = {
  title: 'About Us | Sage Tax Consultancy',
  description: 'Learn about Sage Tax Consultancy, our mission, vision, and commitment to UAE tax and accounting services.',
  openGraph: {
    title: 'About Us | Sage Tax Consultancy',
    description: 'Learn about Sage Tax Consultancy, our mission, vision, and commitment to UAE tax and accounting services.',
    type: 'website',
  },
};

export default function AboutPage({ params }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const values = [
    {
      icon: '🎯',
      title_en: 'Excellence',
      title_ar: 'التميز',
      description_en: 'We deliver exceptional service with meticulous attention to detail and accuracy in every engagement.',
      description_ar: 'نقدم خدمات استثنائية مع الاهتمام الدقيق بالتفاصيل والدقة في كل مشروع.',
    },
    {
      icon: '🤝',
      title_en: 'Integrity',
      title_ar: 'النزاهة',
      description_en: 'We operate with complete transparency and ethical standards in all our business dealings.',
      description_ar: 'نعمل بشفافية كاملة ومعايير أخلاقية في جميع معاملات أعمالنا.',
    },
    {
      icon: '💡',
      title_en: 'Innovation',
      title_ar: 'الابتكار',
      description_en: 'We leverage the latest technologies and methodologies to provide cutting-edge solutions.',
      description_ar: 'نستخدم أحدث التقنيات والمنهجيات لتقديم حلول متقدمة.',
    },
    {
      icon: '🌟',
      title_en: 'Client Focus',
      title_ar: 'التركيز على العميل',
      description_en: 'Your success is our priority, and we tailor our services to meet your unique needs.',
      description_ar: 'نجاحك هو أولويتنا، ونخصص خدماتنا لتلبية احتياجاتك الفريدة.',
    },
  ];

  const teamStats = [
    {
      number: '15+',
      label_en: 'Years of Experience',
      label_ar: 'سنة من الخبرة',
    },
    {
      number: '500+',
      label_en: 'Clients Served',
      label_ar: 'عميل تم خدمتهم',
    },
    {
      number: '50+',
      label_en: 'Team Members',
      label_ar: 'عضو في الفريق',
    },
    {
      number: '100%',
      label_en: 'Client Satisfaction',
      label_ar: 'رضا العملاء',
    },
  ];

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <span className="text-navy-900 font-medium">{isArabic ? 'من نحن' : 'About Us'}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow text-center">
          <span className="badge bg-gold-500 text-navy-900">{isArabic ? 'حول الشركة' : 'About Us'}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">
            {isArabic ? 'شركة استشارات ضرائب موثوقة في الإمارات' : 'Your Trusted UAE Tax & Accounting Partner'}
          </h1>
          <p className="text-xl text-navy-100 max-w-2xl mx-auto">
            {isArabic ? 'نحن متخصصون في تقديم حلول ضريبية وحسابية شاملة للشركات والأفراد في الإمارات العربية المتحدة' : 'Comprehensive tax, accounting, and business consulting services for companies and individuals across the UAE'}
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <h2 className="section-heading text-navy-900 mb-8">
            {isArabic ? 'قصتنا' : 'Our Story'}
          </h2>
          <div className="prose prose-lg max-w-none text-navy-700 space-y-6">
            <p>
              {isArabic
                ? 'تأسست شركة Sage Tax Consultancy برؤية واضحة: توفير خدمات استشارات ضريبية وحسابية عالية الجودة وموثوقة في الإمارات العربية المتحدة. على مدار السنوات، اكتسبنا سمعة قوية كشركة متخصصة في مساعدة الشركات والأفراد على التنقل عبر التعقيدات المتزايدة للقوانين والأنظمة الضريبية.'
                : 'Sage Tax Consultancy was founded with a clear vision: to provide high-quality, reliable tax and accounting consulting services in the United Arab Emirates. Over the years, we have earned a strong reputation as a trusted partner that helps businesses and individuals navigate the complexities of UAE tax regulations.'}
            </p>
            <p>
              {isArabic
                ? 'فريقنا يتكون من محترفين ذوي خبرة عميقة في الضرائب والمحاسبة والاستشارات التجارية. نحن ملتزمون بتوفير حلول مخصصة تلبي احتياجات عملائنا الفريدة، بغض النظر عن حجم أو طبيعة عملهم.'
                : 'Our team comprises experienced professionals with deep expertise in taxation, accounting, and business consulting. We are committed to delivering customized solutions that meet the unique needs of our clients, regardless of their business size or industry.'}
            </p>
            <p>
              {isArabic
                ? 'من التسجيل والامتثال الضريبي إلى التدقيق والاستشارات المالية الاستراتيجية، نغطي جميع جوانب احتياجات الشركات الضريبية والمحاسبية. رضا العميل هو أساس عملنا، ونحن فخورون بالعلاقات طويلة الأمد التي بنيناها مع عملائنا.'
                : 'From tax registration and compliance to auditing and strategic financial consulting, we cover all aspects of business tax and accounting needs. Customer satisfaction is the foundation of our work, and we are proud of the long-term relationships we have built with our clients.'}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <Target className="text-gold-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">
                  {isArabic ? 'مهمتنا' : 'Our Mission'}
                </h3>
              </div>
              <p className="text-navy-700 leading-relaxed">
                {isArabic
                  ? 'تقديم خدمات استشارات ضريبية وحسابية عالية الجودة وموثوقة تساعد العملاء على تحقيق أهدافهم المالية والعملية، مع ضمان الامتثال الكامل للقوانين واللوائح الإماراتية والدولية.'
                  : 'To deliver high-quality, reliable tax and accounting consulting services that help our clients achieve their financial and business objectives while ensuring complete compliance with UAE and international regulations.'}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <Lightbulb className="text-gold-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-navy-900">
                  {isArabic ? 'رؤيتنا' : 'Our Vision'}
                </h3>
              </div>
              <p className="text-navy-700 leading-relaxed">
                {isArabic
                  ? 'أن نكون الشركة الرائدة والموثوقة في تقديم خدمات الاستشارات الضريبية والمحاسبية في الإمارات، معروفة بتميزها وابتكارها والتزامها بنجاح عملائها.'
                  : 'To be the leading and most trusted provider of tax and accounting consulting services in the UAE, recognized for our excellence, innovation, and commitment to our clients\' success.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <h2 className="section-heading text-navy-900 mb-12 text-center">
            {isArabic ? 'إنجازاتنا' : 'Our Achievements'}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamStats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-gold-600 mb-3">
                  {stat.number}
                </div>
                <p className="text-navy-700 font-semibold">
                  {isArabic ? stat.label_ar : stat.label_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow">
          <h2 className="section-heading text-navy-900 mb-12 text-center">
            {isArabic ? 'قيمنا الأساسية' : 'Our Core Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="card bg-white p-6 text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-3">
                  {isArabic ? value.title_ar : value.title_en}
                </h3>
                <p className="text-navy-700 text-sm leading-relaxed">
                  {isArabic ? value.description_ar : value.description_en}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl">
          <h2 className="section-heading text-navy-900 mb-12 text-center">
            {isArabic ? 'لماذا تختار Sage Tax؟' : 'Why Choose Sage Tax?'}
          </h2>
          <div className="space-y-6">
            {[
              {
                title_en: 'Expert Team',
                title_ar: 'فريق متخصص',
                description_en: 'Our team includes certified tax professionals with extensive experience in UAE regulations and international standards.',
                description_ar: 'يضم فريقنا متخصصين معتمدين في الضرائب بخبرة واسعة في اللوائح الإماراتية والمعايير الدولية.',
              },
              {
                title_en: 'Comprehensive Services',
                title_ar: 'خدمات شاملة',
                description_en: 'From tax registration to auditing, we offer a full range of services to meet all your business needs.',
                description_ar: 'من التسجيل الضريبي إلى التدقيق، نقدم مجموعة شاملة من الخدمات لتلبية جميع احتياجات عملك.',
              },
              {
                title_en: 'Client-Centric Approach',
                title_ar: 'نهج موجه نحو العميل',
                description_en: 'We customize our services to your specific needs and work closely with you to achieve your goals.',
                description_ar: 'نخصص خدماتنا لاحتياجاتك المحددة ونعمل معك بشكل وثيق لتحقيق أهدافك.',
              },
              {
                title_en: 'Technology-Driven',
                title_ar: 'يعتمد على التكنولوجيا',
                description_en: 'We leverage the latest accounting and tax software to ensure efficiency and accuracy.',
                description_ar: 'نستخدم أحدث برامج المحاسبة والضرائب لضمان الكفاءة والدقة.',
              },
            ].map((reason, idx) => (
              <div key={idx} className="flex gap-4 pb-6 border-b border-navy-200 last:border-0">
                <div className="flex-shrink-0">
                  <Award className="text-gold-600 mt-1" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 mb-2">
                    {isArabic ? reason.title_ar : reason.title_en}
                  </h3>
                  <p className="text-navy-700">
                    {isArabic ? reason.description_ar : reason.description_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section Placeholder */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow text-center">
          <h2 className="section-heading text-navy-900 mb-8">
            {isArabic ? 'فريقنا' : 'Our Team'}
          </h2>
          <div className="bg-white rounded-lg p-12 border-2 border-dashed border-navy-300">
            <Users className="mx-auto text-navy-400 mb-4" size={48} />
            <p className="text-navy-700 mb-6">
              {isArabic ? 'تعرف على فريقنا المتخصص من المحترفين' : 'Meet our team of specialized professionals'}
            </p>
            <p className="text-sm text-navy-600">
              {isArabic ? 'سيتم إضافة صور وتفاصيل الفريق قريباً' : 'Team photos and details coming soon'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'جاهز لبدء رحلتك معنا؟' : 'Ready to Start Your Journey With Us?'}
          </h2>
          <p className="text-lg mb-8 text-navy-800">
            {isArabic ? 'اتصل بنا اليوم للحصول على استشارة مجانية' : 'Contact us today for a free consultation'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block">
            {isArabic ? 'اتصل بنا الآن' : 'Get in Touch'}
          </Link>
        </div>
      </section>
    </main>
  );
}
