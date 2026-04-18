import Link from 'next/link';
import { ChevronRight, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | Sage Advisory',
  description: 'Privacy policy for Sage Advisory. Learn how we collect, use, and protect your personal information in compliance with UAE law.',
  robots: 'index, follow',
};

export default function PrivacyPolicyPage({ params }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            {isArabic ? 'خصوصيتك' : 'Your Privacy'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-gray-300">
            {isArabic ? 'آخر تحديث: أبريل 2026' : 'Last Updated: April 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl text-gray-600 leading-relaxed">
          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '1. مقدمة' : '1. Introduction'}
          </h2>
          <p>
            {isArabic
              ? 'تحترم شركة Sage Advisory ("الشركة" أو "نحن" أو "لنا")، المسجلة في إمارة دبي، دولة الإمارات العربية المتحدة، خصوصيتك وتلتزم بحماية بياناتك الشخصية وفقاً لـ المرسوم بقانون اتحادي رقم (45) لسنة 2021 بشأن حماية البيانات الشخصية ("قانون حماية البيانات الشخصية") ولائحته التنفيذية. توضح سياسة الخصوصية هذه كيفية جمع واستخدام وحماية معلوماتك الشخصية عند استخدام موقعنا الإلكتروني (sageadvisory.ae) وخدماتنا.'
              : 'Sage Advisory ("Company", "we", "us", or "our"), registered in the Emirate of Dubai, United Arab Emirates, respects your privacy and is committed to protecting your personal data in accordance with UAE Federal Decree-Law No. (45) of 2021 on the Protection of Personal Data ("PDPL") and its Executive Regulations. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website (sageadvisory.ae) and services.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '2. المسؤول عن البيانات' : '2. Data Controller'}
          </h2>
          <p>
            {isArabic
              ? 'Sage Advisory هي المسؤولة عن معالجة بياناتك الشخصية بصفتها "مسؤول البيانات" بموجب قانون حماية البيانات الشخصية الإماراتي. لأي استفسارات تتعلق بالخصوصية، يمكنك التواصل معنا عبر البريد الإلكتروني: info@sageadvisory.ae'
              : 'Sage Advisory is the "Data Controller" responsible for processing your personal data under the UAE PDPL. For any privacy-related inquiries, you can contact us at: info@sageadvisory.ae'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '3. المعلومات التي نجمعها' : '3. Information We Collect'}
          </h2>
          <p>
            {isArabic
              ? 'نجمع المعلومات التي تقدمها لنا طواعية من خلال نماذج الاتصال والاستشارات والخدمات الأخرى، بما في ذلك:'
              : 'We collect information that you voluntarily provide to us through contact forms, consultations, and other services, including:'}
          </p>
          <ul>
            <li>{isArabic ? 'بيانات التعريف الشخصي: الاسم والبريد الإلكتروني ورقم الهاتف وتفاصيل الهوية الإماراتية (عند الضرورة)' : 'Personal identification data: Name, email address, phone number, and Emirates ID details (where necessary)'}</li>
            <li>{isArabic ? 'معلومات العمل: اسم الشركة ورقم الرخصة التجارية والموضوع والاستفسار' : 'Business information: Company name, trade license number, subject, and inquiry'}</li>
            <li>{isArabic ? 'البيانات المالية والضريبية: التفاصيل المقدمة طوعاً لأغراض الاستشارة الضريبية والمحاسبية' : 'Financial and tax data: Details voluntarily provided for tax and accounting consultation purposes'}</li>
            <li>{isArabic ? 'البيانات التقنية: عنوان IP ونوع المتصفح ونظام التشغيل وملفات تعريف الارتباط' : 'Technical data: IP address, browser type, operating system, and cookies'}</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '4. الأساس القانوني للمعالجة' : '4. Legal Basis for Processing'}
          </h2>
          <p>
            {isArabic
              ? 'وفقاً للمادة (5) من قانون حماية البيانات الشخصية، نعالج بياناتك الشخصية بناءً على الأسس القانونية التالية:'
              : 'In accordance with Article (5) of the UAE PDPL, we process your personal data based on the following legal bases:'}
          </p>
          <ul>
            <li>{isArabic ? 'الموافقة: عند إرسال نموذج اتصال أو طلب استشارة' : 'Consent: When you submit a contact form or request a consultation'}</li>
            <li>{isArabic ? 'تنفيذ العقد: لتقديم الخدمات الاستشارية المتفق عليها' : 'Performance of contract: To provide the agreed-upon consulting services'}</li>
            <li>{isArabic ? 'الالتزام القانوني: الامتثال لقوانين الإمارات الضريبية ومتطلبات الهيئة الاتحادية للضرائب' : 'Legal obligation: Compliance with UAE tax laws and FTA requirements'}</li>
            <li>{isArabic ? 'المصلحة المشروعة: تحسين خدماتنا وحماية أعمالنا' : 'Legitimate interest: Improving our services and protecting our business'}</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '5. كيف نستخدم معلوماتك' : '5. How We Use Your Information'}
          </h2>
          <p>{isArabic ? 'نستخدم المعلومات التي نجمعها للأغراض التالية:' : 'We use the information we collect for the following purposes:'}</p>
          <ul>
            <li>{isArabic ? 'تقديم والحفاظ على خدماتنا الضريبية والمحاسبية' : 'Providing and maintaining our tax and accounting services'}</li>
            <li>{isArabic ? 'الرد على استفساراتك وطلبات الاستشارة' : 'Responding to your inquiries and consultation requests'}</li>
            <li>{isArabic ? 'إعداد الإقرارات الضريبية والتقارير المالية والتدقيق' : 'Preparing tax filings, financial reports, and audits'}</li>
            <li>{isArabic ? 'إرسال التحديثات المتعلقة بالتغييرات الضريبية والتنظيمية' : 'Sending updates about tax and regulatory changes'}</li>
            <li>{isArabic ? 'الامتثال للالتزامات القانونية والتنظيمية في الإمارات' : 'Complying with UAE legal and regulatory obligations'}</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '6. مشاركة البيانات والإفصاح' : '6. Data Sharing and Disclosure'}
          </h2>
          <p>
            {isArabic
              ? 'لا نبيع أو نؤجر بياناتك الشخصية. قد نشارك معلوماتك فقط في الحالات التالية:'
              : 'We do not sell or rent your personal data. We may share your information only in the following cases:'}
          </p>
          <ul>
            <li>{isArabic ? 'الهيئة الاتحادية للضرائب (FTA): عند التقديم نيابة عنك بناءً على تفويض خطي' : 'Federal Tax Authority (FTA): When filing on your behalf under written authorization'}</li>
            <li>{isArabic ? 'الجهات الحكومية: عند المطالبة بموجب القانون أو الأوامر القضائية' : 'Government authorities: When required by law or court orders'}</li>
            <li>{isArabic ? 'مزودي الخدمات: الاستضافة السحابية وبرامج المحاسبة، مع ضمانات حماية البيانات' : 'Service providers: Cloud hosting and accounting software, with data protection safeguards'}</li>
          </ul>
          <p className="mt-3">
            {isArabic
              ? 'لا يتم نقل بياناتك الشخصية خارج دولة الإمارات العربية المتحدة إلا وفقاً للمادة (22) من قانون حماية البيانات الشخصية، والتي تتطلب مستوى حماية كافٍ في بلد المتلقي.'
              : 'Your personal data is not transferred outside the UAE except in compliance with Article (22) of the PDPL, which requires an adequate level of protection in the recipient country.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '7. ملفات تعريف الارتباط (Cookies)' : '7. Cookies'}
          </h2>
          <p>
            {isArabic
              ? 'يستخدم موقعنا ملفات تعريف الارتباط لتحسين تجربة المستخدم وتحليل استخدام الموقع. أنواع ملفات تعريف الارتباط المستخدمة:'
              : 'Our website uses cookies to enhance user experience and analyze website usage. Types of cookies used:'}
          </p>
          <ul>
            <li>{isArabic ? 'ملفات ضرورية: لا غنى عنها لعمل الموقع الأساسي' : 'Essential cookies: Necessary for basic website functionality'}</li>
            <li>{isArabic ? 'ملفات التحليل (Google Analytics): لفهم أنماط استخدام الموقع' : 'Analytics cookies (Google Analytics): To understand website usage patterns'}</li>
          </ul>
          <p className="mt-3">
            {isArabic
              ? 'يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك. قد يؤثر تعطيلها على بعض وظائف الموقع.'
              : 'You can control cookie settings through your browser. Disabling them may affect some website functionality.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '8. أمان البيانات' : '8. Data Security'}
          </h2>
          <p>
            {isArabic
              ? 'وفقاً للمادة (17) من قانون حماية البيانات الشخصية، نتخذ إجراءات أمنية تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية، بما في ذلك التشفير والوصول المحدود وتسجيل الاختراقات.'
              : 'In accordance with Article (17) of the PDPL, we implement appropriate technical and organizational security measures to protect your personal data, including encryption, access controls, and breach logging.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '9. الاحتفاظ بالبيانات' : '9. Data Retention'}
          </h2>
          <p>
            {isArabic
              ? 'نحتفظ ببياناتك المالية والضريبية لمدة لا تقل عن 5 سنوات، وفقاً لمتطلبات الهيئة الاتحادية للضرائب وقانون ضريبة القيمة المضافة (المرسوم بقانون اتحادي رقم 8 لسنة 2017) وقانون ضريبة الشركات (المرسوم بقانون اتحادي رقم 47 لسنة 2022). يتم حذف بيانات الاتصال العامة عند الطلب، ما لم يكن هناك التزام قانوني بالاحتفاظ بها.'
              : 'We retain your financial and tax records for a minimum of 5 years, as required by the Federal Tax Authority, the VAT Law (Federal Decree-Law No. 8 of 2017), and the Corporate Tax Law (Federal Decree-Law No. 47 of 2022). General contact data is deleted upon request, unless there is a legal obligation to retain it.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '10. حقوقك بموجب قانون حماية البيانات الشخصية' : '10. Your Rights Under the UAE PDPL'}
          </h2>
          <p>
            {isArabic
              ? 'بموجب المواد (13-17) من قانون حماية البيانات الشخصية، لديك الحقوق التالية:'
              : 'Under Articles (13-17) of the UAE PDPL, you have the following rights:'}
          </p>
          <ul>
            <li>{isArabic ? 'الحق في الوصول إلى بياناتك الشخصية والحصول على نسخة منها' : 'Right to access your personal data and obtain a copy'}</li>
            <li>{isArabic ? 'الحق في تصحيح البيانات غير الدقيقة أو غير المكتملة' : 'Right to rectify inaccurate or incomplete data'}</li>
            <li>{isArabic ? 'الحق في طلب حذف بياناتك الشخصية (مع مراعاة فترات الاحتفاظ القانونية)' : 'Right to request deletion of your personal data (subject to legal retention periods)'}</li>
            <li>{isArabic ? 'الحق في الاعتراض على معالجة بياناتك أو تقييدها' : 'Right to object to or restrict processing of your data'}</li>
            <li>{isArabic ? 'الحق في نقل بياناتك إلى مزود خدمة آخر' : 'Right to data portability to another service provider'}</li>
            <li>{isArabic ? 'الحق في سحب الموافقة في أي وقت' : 'Right to withdraw consent at any time'}</li>
          </ul>
          <p className="mt-3">
            {isArabic
              ? 'لممارسة حقوقك، يرجى التواصل معنا عبر البريد الإلكتروني: info@sageadvisory.ae — سنرد على طلبك خلال 14 يوم عمل.'
              : 'To exercise your rights, please contact us at: info@sageadvisory.ae — we will respond to your request within 14 business days.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '11. حقوق إضافية للمقيمين في الاتحاد الأوروبي (GDPR)' : '11. Additional Rights for EU Residents (GDPR)'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كنت مقيماً في الاتحاد الأوروبي أو المنطقة الاقتصادية الأوروبية، فإنك تتمتع بحقوق إضافية بموجب اللائحة العامة لحماية البيانات (GDPR). نحن ملتزمون بالامتثال لمتطلبات GDPR عند معالجة بيانات المقيمين في الاتحاد الأوروبي.'
              : 'If you are a resident of the European Union or European Economic Area, you have additional rights under the General Data Protection Regulation (GDPR). We are committed to GDPR compliance when processing data of EU residents.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '12. الروابط الخارجية' : '12. External Links'}
          </h2>
          <p>
            {isArabic
              ? 'قد يحتوي موقعنا على روابط لمواقع خارجية بما في ذلك الهيئة الاتحادية للضرائب والبوابات الحكومية والمصادر الإخبارية. لسنا مسؤولين عن ممارسات الخصوصية لتلك المواقع.'
              : 'Our website may contain links to external websites including the Federal Tax Authority, government portals, and news sources. We are not responsible for the privacy practices of those sites.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '13. تقديم الشكاوى' : '13. Filing Complaints'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كنت تعتقد أن حقوقك في حماية البيانات قد انتُهكت، يحق لك تقديم شكوى إلى مكتب حماية البيانات في الإمارات (UAE Data Office) وفقاً لأحكام المرسوم بقانون اتحادي رقم (45) لسنة 2021.'
              : 'If you believe your data protection rights have been violated, you have the right to file a complaint with the UAE Data Office in accordance with the provisions of Federal Decree-Law No. (45) of 2021.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '14. الاتصال بنا' : '14. Contact Us'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات معالجة البيانات، يرجى الاتصال بنا:'
              : 'If you have any questions about this Privacy Policy or our data processing practices, please contact us:'}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-2">
            <p className="font-semibold text-navy-950">Sage Advisory</p>
            <p className="text-gray-600">
              {isArabic ? 'البريد الإلكتروني' : 'Email'}:{' '}
              <a href="mailto:info@sageadvisory.ae" className="text-sage-700 hover:text-sage-800">info@sageadvisory.ae</a>
            </p>
            <p className="text-gray-600">
              {isArabic ? 'الهاتف' : 'Phone'}:{' '}
              <a href="tel:+971585704140" className="text-sage-700 hover:text-sage-800">+971 58 570 4140</a>
            </p>
            <p className="text-gray-600">{isArabic ? 'العنوان' : 'Address'}: Dubai, UAE</p>
          </div>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '15. التعديلات على هذه السياسة' : '15. Changes to This Policy'}
          </h2>
          <p>
            {isArabic
              ? 'قد نقوم بتحديث سياسة الخصوصية هذه من وقت إلى آخر. سيتم نشر التعديلات على هذه الصفحة وتحديث تاريخ "آخر تحديث". يعتبر استمرار استخدامك للموقع بعد نشر التعديلات قبولاً لسياسة الخصوصية المحدثة.'
              : 'We may update this Privacy Policy from time to time. Changes will be posted on this page and the "Last Updated" date will be revised. Your continued use of the site after posting updates constitutes your acceptance of the updated Privacy Policy.'}
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              {isArabic ? 'آخر تحديث: أبريل 2026' : 'Last Updated: April 2026'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {isArabic
                ? 'متوافقة مع المرسوم بقانون اتحادي رقم (45) لسنة 2021 بشأن حماية البيانات الشخصية (الإمارات)'
                : 'Compliant with UAE Federal Decree-Law No. (45) of 2021 on the Protection of Personal Data (PDPL)'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isArabic ? 'أسئلة حول خصوصيتك؟' : 'Questions About Your Privacy?'}
          </h2>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isArabic ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </main>
  );
}
