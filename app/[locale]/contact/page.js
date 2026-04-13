'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage({ params }) {
  const { locale } = params;
  const isArabic = locale === 'ar';
  const router = useRouter();

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
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

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <span className="text-navy-900 font-medium">{isArabic ? 'اتصل بنا' : 'Contact Us'}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow text-center">
          <span className="badge bg-gold-500 text-navy-900">{isArabic ? 'اتصل بنا' : 'Get in Touch'}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">
            {isArabic ? 'نحن هنا لمساعدتك' : "We're Here to Help"}
          </h1>
          <p className="text-xl text-navy-100 max-w-2xl mx-auto">
            {isArabic ? 'اتصل بنا اليوم للحصول على استشارة مجانية حول خدماتنا' : 'Contact us today for a free consultation about our services'}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Phone */}
            <div className="card bg-navy-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <Phone className="text-gold-600" size={24} />
                </div>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">
                {isArabic ? 'الهاتف' : 'Phone'}
              </h3>
              <p className="text-navy-700">
                <a href="tel:+971XXXXXXXXX" className="hover:text-gold-600 transition-colors">
                  +971 4 XXX XXXX
                </a>
              </p>
            </div>

            {/* Email */}
            <div className="card bg-navy-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <Mail className="text-gold-600" size={24} />
                </div>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">
                {isArabic ? 'البريد الإلكتروني' : 'Email'}
              </h3>
              <p className="text-navy-700">
                <a href="mailto:info@sagetax.ae" className="hover:text-gold-600 transition-colors">
                  info@sagetax.ae
                </a>
              </p>
            </div>

            {/* Address */}
            <div className="card bg-navy-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <MapPin className="text-gold-600" size={24} />
                </div>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">
                {isArabic ? 'العنوان' : 'Address'}
              </h3>
              <p className="text-navy-700 text-sm">
                Dubai, UAE
              </p>
            </div>

            {/* Hours */}
            <div className="card bg-navy-50 p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gold-100 rounded-full">
                  <Clock className="text-gold-600" size={24} />
                </div>
              </div>
              <h3 className="font-bold text-navy-900 mb-2">
                {isArabic ? 'ساعات العمل' : 'Business Hours'}
              </h3>
              <p className="text-navy-700 text-sm">
                {isArabic ? 'السبت - الخميس: 9am - 6pm' : 'Sat - Thu: 9am - 6pm'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="section-heading text-navy-900 mb-8">
              {isArabic ? 'أرسل لنا رسالة' : 'Send us a Message'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  {isArabic ? 'الاسم' : 'Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder={isArabic ? 'اسمك الكامل' : 'Your full name'}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    {isArabic ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-900 mb-2">
                    {isArabic ? 'رقم الهاتف' : 'Phone'}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                    placeholder="+971 XX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  {isArabic ? 'الموضوع' : 'Subject'}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder={isArabic ? 'موضوع الاستفسار' : 'Subject of inquiry'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-900 mb-2">
                  {isArabic ? 'الرسالة' : 'Message'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                  placeholder={isArabic ? 'أخبرنا عن احتياجاتك' : 'Tell us about your needs'}
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-4 bg-sage-100 text-sage-800 rounded-lg">
                  {isArabic ? 'تم إرسال رسالتك بنجاح. سنتصل بك قريباً.' : 'Your message has been sent successfully. We will contact you soon.'}
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-4 bg-red-100 text-red-800 rounded-lg">
                  {isArabic ? 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.' : 'An error occurred while sending your message. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full bg-navy-900 text-white hover:bg-navy-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? isArabic ? 'جاري الإرسال...' : 'Sending...'
                  : isArabic ? 'أرسل الرسالة' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Location Info */}
          <div>
            <h2 className="section-heading text-navy-900 mb-8">
              {isArabic ? 'موقعنا' : 'Our Location'}
            </h2>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg h-full min-h-[500px] flex flex-col">
              {/* Map Placeholder */}
              <div className="flex-1 bg-gradient-to-br from-navy-100 to-navy-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto mb-4 text-navy-600" size={48} />
                  <p className="text-navy-700 font-semibold">{isArabic ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, United Arab Emirates'}</p>
                </div>
              </div>

              {/* Address Details */}
              <div className="p-8 bg-white border-t border-navy-200">
                <h3 className="font-bold text-navy-900 mb-4">
                  {isArabic ? 'معلومات الاتصال' : 'Contact Information'}
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <Phone className="text-gold-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-navy-600 mb-1">
                        {isArabic ? 'الهاتف' : 'Phone'}
                      </p>
                      <a href="tel:+971XXXXXXXXX" className="text-navy-900 font-semibold hover:text-gold-600">
                        +971 4 XXX XXXX
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Mail className="text-gold-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <p className="text-sm text-navy-600 mb-1">
                        {isArabic ? 'البريد الإلكتروني' : 'Email'}
                      </p>
                      <a href="mailto:info@sagetax.ae" className="text-navy-900 font-semibold hover:text-gold-600">
                        info@sagetax.ae
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="section-padding bg-white">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="section-heading text-navy-900 mb-6">
            {isArabic ? 'أسئلة متكررة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-lg text-navy-700 mb-8">
            {isArabic ? 'لم تجد الإجابة التي تبحث عنها؟ تحقق من أسئلتنا الشائعة' : "Can't find the answer you're looking for? Check out our FAQs"}
          </p>
          <Link href={`/${locale}/#faqs`} className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block">
            {isArabic ? 'عرض الأسئلة الشائعة' : 'View FAQs'}
          </Link>
        </div>
      </section>
    </main>
  );
}
