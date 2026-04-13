import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Sage Tax Consultancy',
  description: 'Privacy policy for Sage Tax Consultancy. Learn how we collect, use, and protect your personal information.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage({ params }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <span className="text-navy-900 font-medium">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-navy-100">
            {isArabic ? 'آخر تحديث: يناير 2026' : 'Last Updated: January 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl prose prose-lg text-navy-700 leading-relaxed">
          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '1. مقدمة' : '1. Introduction'}
          </h2>
          <p>
            {isArabic
              ? 'تحترم شركة Sage Tax Consultancy ("الشركة" أو "نحن" أو "لنا") خصوصيتك وملتزمة بحماية بيانات شخصية التي تختار مشاركتها معنا. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني والخدمات.'
              : 'Sage Tax Consultancy ("Company", "we", "us", or "our") respects your privacy and is committed to protecting the personal data you choose to share with us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.'}
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '2. المعلومات التي نجمعها' : '2. Information We Collect'}
          </h2>
          <p>
            {isArabic
              ? 'نجمع المعلومات التي تقدمها لنا طواعية من خلال نماذج الاتصال والاستشارات والخدمات الأخرى.'
              : 'We collect information that you voluntarily provide to us through contact forms, consultations, and other services.'}
          </p>
          <ul>
            <li>
              {isArabic ? 'المعلومات الشخصية: الاسم والبريد الإلكتروني ورقم الهاتف' : 'Personal Information: Name, email address, and phone number'}
            </li>
            <li>
              {isArabic ? 'معلومات العمل: اسم الشركة والموضوع والاستفسار أو الرسالة' : 'Business Information: Company name, subject, and inquiry or message'}
            </li>
            <li>
              {isArabic ? 'معلومات الاستشارة: التفاصيل المالية والضريبية المقدمة طوعاً لأغراض الاستشارة' : 'Consultation Information: Financial and tax details voluntarily provided for consultation purposes'}
            </li>
            <li>
              {isArabic ? 'معلومات الجهاز: عنوان IP وسجل المتصفح والملفات الدائمة' : 'Device Information: IP address, browser history, and cookies'}
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '3. كيف نستخدم معلوماتك' : '3. How We Use Your Information'}
          </h2>
          <p>
            {isArabic
              ? 'نستخدم المعلومات التي نجمعها للأغراض التالية:'
              : 'We use the information we collect for the following purposes:'}
          </p>
          <ul>
            <li>{isArabic ? 'تقديم والحفاظ على خدماتنا' : 'Providing and maintaining our services'}</li>
            <li>{isArabic ? 'الرد على استفساراتك وطلباتك' : 'Responding to your inquiries and requests'}</li>
            <li>{isArabic ? 'إرسال التحديثات والمعلومات المتعلقة بخدماتنا' : 'Sending updates and information related to our services'}</li>
            <li>{isArabic ? 'تحسين تجربة المستخدم وتخصيص الخدمات' : 'Improving user experience and personalizing services'}</li>
            <li>{isArabic ? 'الامتثال للالتزامات القانونية والتنظيمية' : 'Complying with legal and regulatory obligations'}</li>
            <li>{isArabic ? 'منع الاحتيال والحماية من المسؤولية' : 'Preventing fraud and protecting against liability'}</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '4. مشاركة البيانات مع الأطراف الثالثة' : '4. Sharing Data With Third Parties'}
          </h2>
          <p>
            {isArabic
              ? 'لا نبيع أو نؤجر أو نشارك معلوماتك الشخصية مع أطراف ثالثة بدون موافقتك، إلا في الحالات التالية:'
              : 'We do not sell, rent, or share your personal information with third parties without your consent, except in the following cases:'}
          </p>
          <ul>
            <li>{isArabic ? 'الخدمات الضرورية: مزودي الخدمات الذين يساعدوننا في تقديم الخدمات' : 'Service Providers: Vendors who assist us in providing services'}</li>
            <li>{isArabic ? 'الالتزامات القانونية: عند المطالبة من قبل السلطات المختصة' : 'Legal Obligations: When required by law or authorities'}</li>
            <li>{isArabic ? 'حماية الحقوق: لحماية حقوقنا والعملاء والعامة' : 'Protection of Rights: To protect our rights, clients, and the public'}</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '5. الملفات الدائمة (Cookies)' : '5. Cookies'}
          </h2>
          <p>
            {isArabic
              ? 'يستخدم موقعنا ملفات دائمة لتحسين تجربة المستخدم. يمكنك التحكم في قبول الملفات الدائمة من خلال إعدادات المتصفح الخاص بك. تصنف الملفات الدائمة إلى:'
              : 'Our website uses cookies to enhance user experience. You can control cookie acceptance through your browser settings. Cookies are classified as:'}
          </p>
          <ul>
            <li>
              {isArabic
                ? 'ملفات دائمة ضرورية: لا غنى عنها لعمل الموقع'
                : 'Essential Cookies: Necessary for website functionality'}
            </li>
            <li>
              {isArabic
                ? 'ملفات دائمة التحليل: لفهم كيفية استخدام الموقع'
                : 'Analytics Cookies: To understand website usage'}
            </li>
            <li>
              {isArabic
                ? 'ملفات دائمة التسويق: لتخصيص المحتوى والعروض'
                : 'Marketing Cookies: For personalized content and offers'}
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '6. أمان البيانات' : '6. Data Security'}
          </h2>
          <p>
            {isArabic
              ? 'نتخذ إجراءات أمنية تقنية وتنظيمية معقولة لحماية بياناتك الشخصية من الوصول غير المصرح والتعديل والكشف والإتلاف. ومع ذلك، لا يوجد نقل بيانات عبر الإنترنت آمن تماماً. نحن غير مسؤولين عن أي انتهاك أمني ينتج عن أفعال الغير.'
              : 'We implement reasonable technical and organizational security measures to protect your personal data from unauthorized access, modification, disclosure, and destruction. However, no data transmission over the internet is completely secure. We are not responsible for any security breaches resulting from third-party actions.'}
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '7. الاحتفاظ بالبيانات' : '7. Data Retention'}
          </h2>
          <p>
            {isArabic
              ? 'نحتفظ بسجلاتك المالية والضريبية لمدة 5 سنوات على الأقل بما يتوافق مع لوائح الإمارات العربية المتحدة. قد نحتفظ بمعلومات أخرى طالما لزم الأمر لتحقيق الأغراض المذكورة أعلاه. يمكنك طلب حذف بيانات الاتصال الخاصة بك في أي وقت.'
              : 'We retain your financial and tax records for a minimum of 5 years in compliance with UAE regulations. We may retain other information as long as necessary to achieve the purposes stated above. You can request deletion of your contact data at any time.'}
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '8. حقوقك' : '8. Your Rights'}
          </h2>
          <p>
            {isArabic
              ? 'لديك الحق في:'
              : 'You have the right to:'}
          </p>
          <ul>
            <li>{isArabic ? 'الوصول إلى بياناتك الشخصية' : 'Access your personal data'}</li>
            <li>{isArabic ? 'تصحيح البيانات غير الدقيقة' : 'Correct inaccurate data'}</li>
            <li>{isArabic ? 'طلب حذف بيانات معينة' : 'Request deletion of certain data'}</li>
            <li>{isArabic ? 'الاعتراض على معالجة بيانات معينة' : 'Object to processing of certain data'}</li>
            <li>{isArabic ? 'طلب تقييد معالجة البيانات' : 'Request data processing restrictions'}</li>
          </ul>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '9. الامتثال لقانون الحماية العام للبيانات (GDPR)' : '9. GDPR Compliance'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كنت موضوع بيانات في الاتحاد الأوروبي، فأنت تتمتع بحقوق إضافية بموجب قانون حماية البيانات العام (GDPR). نحن ملتزمون بالامتثال الكامل لمتطلبات GDPR بشأن معالجة بيانات الاتحاد الأوروبي.'
              : 'If you are a data subject in the European Union, you have additional rights under the General Data Protection Regulation (GDPR). We are committed to full compliance with GDPR requirements for processing EU data.'}
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '10. الروابط الخارجية' : '10. External Links'}
          </h2>
          <p>
            {isArabic
              ? 'قد يحتوي موقعنا على روابط إلى مواقع ويب خارجية. لسنا مسؤولين عن سياسات الخصوصية أو ممارسات تلك المواقع. ننصحك بمراجعة سياسات الخصوصية الخاصة بهم.'
              : 'Our website may contain links to external websites. We are not responsible for the privacy policies or practices of those sites. We recommend reviewing their privacy policies.'}
          </p>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '11. الاتصال بنا' : '11. Contact Us'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات معالجة البيانات، يرجى الاتصال بنا:'
              : 'If you have any questions about this Privacy Policy or our data processing practices, please contact us:'}
          </p>
          <div className="bg-navy-50 p-6 rounded-lg mt-4">
            <p className="font-semibold text-navy-900 mb-3">Sage Tax Consultancy</p>
            <p className="text-navy-700">
              {isArabic ? 'البريد الإلكتروني' : 'Email'}:{' '}
              <a href="mailto:privacy@sagetax.ae" className="text-gold-600 hover:text-gold-700">
                privacy@sagetax.ae
              </a>
            </p>
            <p className="text-navy-700">
              {isArabic ? 'الهاتف' : 'Phone'}:{' '}
              <a href="tel:+971XXXXXXXXX" className="text-gold-600 hover:text-gold-700">
                +971 4 XXX XXXX
              </a>
            </p>
            <p className="text-navy-700">
              {isArabic ? 'العنوان' : 'Address'}: Dubai, UAE
            </p>
          </div>

          <h2 className="text-2xl font-bold text-navy-900 mt-8 mb-4">
            {isArabic ? '12. التعديلات على هذه السياسة' : '12. Changes to This Policy'}
          </h2>
          <p>
            {isArabic
              ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت إلى آخر. سيتم نشر التعديلات على هذه الصفحة، وسيتم تحديث تاريخ "آخر تحديث" وفقاً لذلك. يعتبر استمرار استخدامك للموقع بعد نشر التعديلات قبولاً لسياسة الخصوصية المحدثة.'
              : 'We may update this Privacy Policy from time to time. Changes will be posted on this page, and the "Last Updated" date will be updated accordingly. Your continued use of the site after posting updates constitutes your acceptance of the updated Privacy Policy.'}
          </p>

          <div className="mt-12 pt-8 border-t border-navy-200">
            <p className="text-sm text-navy-600">
              {isArabic ? 'آخر تحديث: يناير 2026' : 'Last Updated: January 2026'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy-50">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="section-heading text-navy-900 mb-6">
            {isArabic ? 'أسئلة حول خصوصيتك؟' : 'Questions About Your Privacy?'}
          </h2>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block"
          >
            {isArabic ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </main>
  );
}
