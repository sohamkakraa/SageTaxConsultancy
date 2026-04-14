import Link from 'next/link';
import { unstable_setRequestLocale } from 'next-intl/server';
import {
  ChevronRight, Award, Users, Target, Eye, User,
  ShieldCheck, Zap, Heart, Lightbulb, ArrowRight,
} from 'lucide-react';

export async function generateMetadata({ params: { locale } }) {
  return {
    title: locale === 'ar' ? 'من نحن | سيج للاستشارات الضريبية' : 'About Us | Sage Tax Consultancy',
    description: locale === 'ar'
      ? 'تعرف على سيج للاستشارات الضريبية ورسالتنا ورؤيتنا والتزامنا بالخدمات الضريبية'
      : 'Learn about Sage Tax Consultancy, our mission, vision, and commitment to UAE tax and accounting services.',
  };
}

const LEADERSHIP = [
  {
    name: 'Jay Kakra',
    nameAr: 'جاي كاكرا',
    role: 'Managing Partner',
    roleAr: 'الشريك الإداري',
    bio: 'Leading strategic direction and client advisory with deep expertise in UAE tax regulations and corporate compliance.',
    bioAr: 'يقود التوجه الاستراتيجي والاستشارات للعملاء مع خبرة عميقة في اللوائح الضريبية الإماراتية.',
  },
  {
    name: 'Aashna Malkhani',
    nameAr: 'آشنا مالخاني',
    role: 'Partner',
    roleAr: 'شريك',
    bio: 'Overseeing accounting, audit operations, and client engagement with a focus on delivering exceptional service quality.',
    bioAr: 'تشرف على عمليات المحاسبة والتدقيق وإدارة العملاء مع التركيز على جودة الخدمة.',
  },
];

const VALUES = [
  { icon: Target, en: 'Excellence', ar: 'التميز', descEn: 'Meticulous attention to detail and accuracy in every engagement.', descAr: 'اهتمام دقيق بالتفاصيل والدقة في كل مشروع.' },
  { icon: Heart, en: 'Integrity', ar: 'النزاهة', descEn: 'Complete transparency and ethical standards in all dealings.', descAr: 'شفافية كاملة ومعايير أخلاقية في جميع المعاملات.' },
  { icon: Lightbulb, en: 'Innovation', ar: 'الابتكار', descEn: 'Latest technologies and methodologies for cutting-edge solutions.', descAr: 'أحدث التقنيات والمنهجيات لحلول متقدمة.' },
  { icon: Users, en: 'Client Focus', ar: 'التركيز على العميل', descEn: 'Your success is our priority — services tailored to your needs.', descAr: 'نجاحك أولويتنا — خدمات مخصصة لاحتياجاتك.' },
];

export default function AboutPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const isAr = locale === 'ar';

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">{isAr ? 'الرئيسية' : 'Home'}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isAr ? 'من نحن' : 'About Us'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            {isAr ? 'حول الشركة' : 'About Us'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isAr ? 'شريكك الضريبي الموثوق في الإمارات' : 'Your Trusted UAE Tax Partner'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAr ? 'حلول ضريبية ومحاسبية شاملة للشركات والأفراد' : 'Comprehensive tax and accounting solutions for companies and individuals across the UAE'}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold font-display text-navy-950">{isAr ? 'قصتنا' : 'Our Story'}</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>{isAr ? 'تأسست Sage Tax Consultancy برؤية واضحة: توفير خدمات استشارات ضريبية ومحاسبية عالية الجودة في الإمارات. اكتسبنا سمعة قوية كشريك موثوق يساعد الشركات على التنقل في تعقيدات القوانين الضريبية.' : 'Sage Tax Consultancy was founded with a clear vision: to provide high-quality tax and accounting consulting services in the UAE. We have earned a strong reputation as a trusted partner helping businesses navigate the complexities of tax regulations.'}</p>
            <p>{isAr ? 'فريقنا يتكون من محترفين ذوي خبرة عميقة في الضرائب والمحاسبة. نحن ملتزمون بتوفير حلول مخصصة تلبي احتياجات عملائنا الفريدة.' : 'Our team comprises experienced professionals with deep expertise in taxation, accounting, and business consulting. We deliver customized solutions that meet each client\'s unique needs.'}</p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card-hover flex items-start gap-4 p-6">
              <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 mb-2">{isAr ? 'رسالتنا' : 'Our Mission'}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{isAr ? 'تقديم خدمات استشارات ضريبية ومحاسبية عالية الجودة تساعد العملاء على تحقيق أهدافهم مع ضمان الامتثال الكامل.' : 'To deliver high-quality tax and accounting consulting that helps clients achieve their objectives while ensuring complete regulatory compliance.'}</p>
              </div>
            </div>
            <div className="card-hover flex items-start gap-4 p-6">
              <div className="w-10 h-10 rounded-lg bg-gold-100 text-gold-700 flex items-center justify-center flex-shrink-0">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-navy-950 mb-2">{isAr ? 'رؤيتنا' : 'Our Vision'}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{isAr ? 'أن نكون الشركة الرائدة والموثوقة في تقديم الاستشارات الضريبية في الإمارات، معروفة بالتميز والابتكار.' : 'To be the leading and most trusted provider of tax consulting in the UAE, recognized for excellence, innovation, and commitment to client success.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-padding bg-white">
        <div className="container-narrow space-y-10">
          <div className="text-center space-y-3">
            <span className="badge">{isAr ? 'القيادة' : 'Leadership'}</span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">{isAr ? 'فريق القيادة' : 'Our Leadership'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {LEADERSHIP.map((leader) => (
              <div key={leader.name} className="card-hover text-center space-y-4 p-8">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                  <User className="w-10 h-10 text-sage-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-navy-950">{isAr ? leader.nameAr : leader.name}</h3>
                  <p className="text-sm font-medium text-sage-700">{isAr ? leader.roleAr : leader.role}</p>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{isAr ? leader.bioAr : leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">{isAr ? 'قيمنا' : 'Our Values'}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map(({ icon: Icon, en, ar, descEn, descAr }) => (
              <div key={en} className="card-hover text-center p-6 space-y-3">
                <div className="w-11 h-11 mx-auto rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-navy-950">{isAr ? ar : en}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{isAr ? descAr : descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">{isAr ? 'جاهز للبدء معنا؟' : 'Ready to Work With Us?'}</h2>
          <p className="text-sage-200 max-w-lg mx-auto">{isAr ? 'اتصل بنا اليوم للحصول على استشارة مجانية' : 'Contact us today for a free consultation'}</p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isAr ? 'اتصل بنا' : 'Get in Touch'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
