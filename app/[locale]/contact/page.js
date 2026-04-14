'use client';

import { useState } from 'react';
import Link from 'next/link';
import IMAGES from '@/lib/images';
import {
  ChevronRight, Phone, Mail, MapPin, Clock,
  Send, Loader2, MessageSquare, ArrowRight,
} from 'lucide-react';

export default function ContactPage({ params }) {
  const { locale } = params;
  const isAr = locale === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const CONTACT_INFO = [
    {
      icon: Phone,
      label: isAr ? 'الهاتف' : 'Phone',
      value: '+971 58 570 4140',
      href: 'tel:+971585704140',
      color: 'bg-sage-100 text-sage-700',
    },
    {
      icon: Mail,
      label: isAr ? 'البريد الإلكتروني' : 'Email',
      value: 'info@sageconsultancy.ae',
      href: 'mailto:info@sageconsultancy.ae',
      color: 'bg-gold-100 text-gold-700',
    },
    {
      icon: MapPin,
      label: isAr ? 'العنوان' : 'Address',
      value: isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates',
      href: null,
      color: 'bg-navy-100 text-navy-700',
    },
    {
      icon: Clock,
      label: isAr ? 'ساعات العمل' : 'Business Hours',
      value: isAr ? 'الأحد - الخميس: 9 صباحاً - 6 مساءً' : 'Sun - Thu: 9:00 AM - 6:00 PM',
      href: null,
      color: 'bg-sage-100 text-sage-700',
    },
  ];

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isAr ? 'اتصل بنا' : 'Contact Us'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.contact} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            {isAr ? 'تواصل معنا' : 'Get in Touch'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isAr ? 'نحن هنا لمساعدتك' : "We're Here to Help"}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'اتصل بنا اليوم للحصول على استشارة مجانية حول خدماتنا الضريبية والمحاسبية'
              : 'Contact us today for a free consultation about our tax and accounting services'}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-white">
        <div className="container-max">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CONTACT_INFO.map(({ icon: Icon, label, value, href, color }) => (
              <div key={label} className="card-hover p-6 text-center space-y-3">
                <div className={`w-11 h-11 mx-auto rounded-lg ${color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-sm text-navy-950">{label}</h3>
                {href ? (
                  <a href={href} className="text-sm text-gray-600 hover:text-sage-700 transition-colors">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-600">{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + WhatsApp CTA */}
      <section className="section-padding bg-gray-50">
        <div className="container-narrow">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <h2 className="text-2xl font-bold font-display text-navy-950 mb-6">
                {isAr ? 'أرسل لنا رسالة' : 'Send us a Message'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-navy-950 mb-1.5">
                    {isAr ? 'الاسم' : 'Full Name'} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-colors"
                    placeholder={isAr ? 'اسمك الكامل' : 'Your full name'}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-navy-950 mb-1.5">
                      {isAr ? 'البريد الإلكتروني' : 'Email'} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-navy-950 mb-1.5">
                      {isAr ? 'رقم الهاتف' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-colors"
                      placeholder="+971 XX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-950 mb-1.5">
                    {isAr ? 'الموضوع' : 'Subject'} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-colors"
                    placeholder={isAr ? 'موضوع الاستفسار' : 'Subject of inquiry'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-navy-950 mb-1.5">
                    {isAr ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500 transition-colors resize-none"
                    placeholder={isAr ? 'أخبرنا عن احتياجاتك' : 'Tell us about your needs'}
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="p-4 bg-sage-50 text-sage-800 rounded-lg text-sm border border-sage-200">
                    {isAr
                      ? 'تم إرسال رسالتك بنجاح. سنتصل بك قريباً.'
                      : 'Your message has been sent successfully. We will contact you soon.'}
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
                    {isAr
                      ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.'
                      : 'An error occurred while sending your message. Please try again.'}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-gold w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {isAr ? 'جاري الإرسال...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {isAr ? 'أرسل الرسالة' : 'Send Message'}
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right side — Quick contact + Map placeholder */}
            <div className="lg:col-span-2 space-y-6">
              {/* WhatsApp Quick Contact */}
              <div className="card-hover p-6 bg-white space-y-4">
                <h3 className="font-bold text-navy-950">
                  {isAr ? 'تواصل سريع عبر واتساب' : 'Quick WhatsApp Contact'}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isAr
                    ? 'هل تفضل التواصل عبر واتساب؟ أرسل لنا رسالة مباشرة وسنرد عليك في أسرع وقت.'
                    : 'Prefer WhatsApp? Send us a direct message and we\'ll get back to you as quickly as possible.'}
                </p>
                <a
                  href="https://wa.me/971585704140"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#25D366] hover:bg-[#20BD5A] transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  {isAr ? 'راسلنا على واتساب' : 'Message on WhatsApp'}
                </a>
              </div>

              {/* Location image */}
              <div className="card-hover overflow-hidden bg-white">
                <div className="h-64 overflow-hidden relative">
                  <img src={IMAGES.dubaiAerial} alt="Dubai, UAE" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-navy-950/30 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="w-10 h-10 text-white mx-auto drop-shadow-lg" />
                      <p className="text-sm font-bold text-white drop-shadow-lg">
                        {isAr ? 'دبي، الإمارات' : 'Dubai, UAE'}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                    <a href="tel:+971585704140" className="text-sm text-gray-700 hover:text-sage-700 transition-colors">
                      +971 58 570 4140
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                    <a href="mailto:info@sageconsultancy.ae" className="text-sm text-gray-700 hover:text-sage-700 transition-colors">
                      info@sageconsultancy.ae
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-sage-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      {isAr ? 'الأحد - الخميس: 9 صباحاً - 6 مساءً' : 'Sun - Thu: 9:00 AM - 6:00 PM'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isAr ? 'لم تجد ما تبحث عنه؟' : "Can't Find What You're Looking For?"}
          </h2>
          <p className="text-sage-200 max-w-lg mx-auto">
            {isAr ? 'تحقق من صفحة الأسئلة الشائعة أو تصفح خدماتنا' : 'Check our FAQ section or browse our services'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`/${locale}/#faqs`} className="btn-gold">
              {isAr ? 'الأسئلة الشائعة' : 'View FAQs'}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href={`/${locale}/services`} className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white border border-white/20 hover:bg-white/10 transition-colors">
              {isAr ? 'خدماتنا' : 'Our Services'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
