import Link from 'next/link';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Sage Tax Consultancy',
  description: 'Terms and conditions for using Sage Tax Consultancy website and services.',
  robots: 'index, follow',
};

export default function TermsPage({ params }) {
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
          <span className="text-navy-950 font-medium">{isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <FileText className="w-3.5 h-3.5" />
            {isArabic ? 'قانوني' : 'Legal'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <p className="text-gray-300">
            {isArabic ? 'آخر تحديث: يناير 2026' : 'Last Updated: January 2026'}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl text-gray-600 leading-relaxed">
          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '1. قبول الشروط' : '1. Acceptance of Terms'}
          </h2>
          <p>
            {isArabic
              ? 'بالوصول واستخدام موقع Sage Tax Consultancy وخدماتها، فإنك توافق على الالتزام بهذه الشروط والأحكام بالكامل. إذا كنت لا تقبل أي من هذه الشروط، يرجى عدم استخدام الموقع أو الخدمات.'
              : 'By accessing and using Sage Tax Consultancy website and services, you agree to comply fully with these Terms and Conditions. If you do not accept any of these terms, please do not use the website or services.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '2. استخدام الموقع' : '2. Use of Website'}
          </h2>
          <p>
            {isArabic
              ? 'توافق على استخدام الموقع والخدمات فقط للأغراض القانونية وبطريقة لا تنتهك حقوق الآخرين أو تقيد استخدامهم وتمتعهم بالموقع. التصرفات المحظورة تشمل:'
              : 'You agree to use the website and services only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website. Prohibited actions include:'}
          </p>
          <ul>
            <li>
              {isArabic
                ? 'الإزعاج أو الإهانة أو الترهيب أو الإيذاء المنتقصة لكرامة الآخرين'
                : 'Harassing, insulting, intimidating, or demeaning others'}
            </li>
            <li>
              {isArabic
                ? 'نشر محتوى غير قانوني أو مسيء أو ينتهك حقوق الطبع والنشر'
                : 'Posting illegal, offensive, or copyright-infringing content'}
            </li>
            <li>
              {isArabic
                ? 'محاولة اختراق الموقع أو نقل الفيروسات أو البرامج الضارة'
                : 'Attempting to hack the website or transmit viruses or malware'}
            </li>
            <li>
              {isArabic ? 'التخويف أو الابتزاز' : 'Blackmail or extortion'}
            </li>
            <li>
              {isArabic
                ? 'الانخراط في أي شكل من أشكال الاحتيال أو الخداع'
                : 'Engaging in fraud or deception'}
            </li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '3. الملكية الفكرية' : '3. Intellectual Property'}
          </h2>
          <p>
            {isArabic
              ? 'جميع محتويات الموقع، بما في ذلك النصوص والرسومات والشعارات والصور ومقاطع الفيديو والبرامج، هي ملكية فكرية لـ Sage Tax Consultancy أو مرخص لها لنا. لا يُسمح بنسخ أو توزيع أو عرض أو نقل أي محتوى بدون موافقة صريحة.'
              : 'All website content, including text, graphics, logos, images, videos, and software, is the intellectual property of Sage Tax Consultancy or licensed to us. Copying, distributing, displaying, or transmitting any content without express permission is prohibited.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '4. الخدمات المقدمة' : '4. Services Provided'}
          </h2>
          <p>
            {isArabic
              ? 'نقدم خدمات استشارات الضرائب والمحاسبة والخدمات الأخرى ذات الصلة. تُقدم الخدمات على أساس "كما هي" دون أي ضمانات صريحة أو ضمنية. لا نضمن أن الخدمات ستلبي احتياجاتك المحددة أو أن الموقع سيكون خالياً من الأخطاء أو الانقطاعات.'
              : 'We provide tax consultation, accounting, and related services. Services are provided on an "as is" basis without any express or implied warranties. We do not guarantee that services will meet your specific needs or that the website will be error-free or uninterrupted.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '5. تحديد المسؤولية' : '5. Limitation of Liability'}
          </h2>
          <p>
            {isArabic
              ? 'في أقصى حد يسمح به القانون، لا تتحمل Sage Tax Consultancy أي مسؤولية عن:'
              : 'To the fullest extent permitted by law, Sage Tax Consultancy shall not be liable for:'}
          </p>
          <ul>
            <li>
              {isArabic
                ? 'الأضرار المباشرة أو غير المباشرة أو العرضية أو الخاصة أو العقابية'
                : 'Direct, indirect, incidental, special, or punitive damages'}
            </li>
            <li>
              {isArabic
                ? 'فقدان الأرباح أو البيانات أو استخدام البيانات'
                : 'Loss of profits, data, or use of data'}
            </li>
            <li>
              {isArabic
                ? 'التعطل أو الانقطاعات أو الأخطاء في الموقع'
                : 'Downtime, interruptions, or errors in the website'}
            </li>
            <li>
              {isArabic
                ? 'أي محتوى أو معلومات حصلت عليها من الموقع'
                : 'Any content or information obtained from the website'}
            </li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '6. الإخلاء من المسؤولية' : '6. Disclaimer'}
          </h2>
          <p>
            {isArabic
              ? 'المعلومات المقدمة على الموقع لأغراض تعليمية وإعلامية فقط. لا تشكل المعلومات المقدمة على الموقع نصيحة قانونية أو ضريبية أو مالية احترافية. لا تستخدمها بدلاً من استشارة محترف مؤهل. نحن غير مسؤولين عن أي قرارات تتخذها بناءً على المعلومات المقدمة على الموقع.'
              : 'Information provided on the website is for educational and informational purposes only. The information provided on the website does not constitute professional legal, tax, or financial advice. Do not use it as a substitute for consulting a qualified professional. We are not responsible for any decisions you make based on information provided on the website.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '7. تعديل الخدمات' : '7. Modification of Services'}
          </h2>
          <p>
            {isArabic
              ? 'نحتفظ بالحق في تعديل أو إيقاف الخدمات أو أي أجزاء منها في أي وقت دون إشعار. قد نفرض رسوماً على الخدمات المستقبلية. لن نتحمل أي مسؤولية تجاهك أو أي طرف ثالث عن أي تعديل أو إيقاف للخدمات.'
              : 'We reserve the right to modify or suspend services or any part of them at any time without notice. We may charge fees for future services. We will not be liable to you or any third party for any modification or suspension of services.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '8. الروابط الخارجية' : '8. External Links'}
          </h2>
          <p>
            {isArabic
              ? 'قد يحتوي الموقع على روابط إلى مواقع ويب خارجية. لسنا مسؤولين عن محتوى أو سياسات الخصوصية أو الممارسات الأخرى للمواقع الخارجية. استخدام أي موقع خارجي يكون على مسؤوليتك الخاصة.'
              : 'The website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of external websites. Your use of any external website is at your own risk.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '9. الحقوق المحفوظة' : '9. Reserved Rights'}
          </h2>
          <p>
            {isArabic
              ? 'نحتفظ بالحق في رفض الخدمة لأي شخص في أي وقت دون سبب. نحتفظ بالحق في تعديل الشروط والأحكام في أي وقت. سيتم إخطارك بأي تعديلات مهمة من خلال البريد الإلكتروني أو من خلال إشعار بارز على الموقع.'
              : 'We reserve the right to refuse service to anyone at any time without reason. We reserve the right to modify these Terms and Conditions at any time. You will be notified of any significant changes via email or prominent notice on the website.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '10. القانون والاختصاص' : '10. Governing Law and Jurisdiction'}
          </h2>
          <p>
            {isArabic
              ? 'تحكم هذه الشروط والأحكام بموجب قوانين دولة الإمارات العربية المتحدة، وتحديداً القوانين السارية في إمارة دبي. توافق على الخضوع للاختصاص القضائي الحصري للمحاكم في دبي، الإمارات العربية المتحدة. في حالة أي نزاع، ستحكمه قوانين الإمارات.'
              : 'These Terms and Conditions are governed by the laws of the United Arab Emirates, specifically the laws applicable in the Emirate of Dubai. You consent to the exclusive jurisdiction of the courts in Dubai, United Arab Emirates. In case of any dispute, it shall be governed by UAE law.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '11. الفصل' : '11. Severability'}
          </h2>
          <p>
            {isArabic
              ? 'إذا تم اعتبار أي بند من هذه الشروط والأحكام غير صحيح أو غير قابل للتنفيذ، فإن البند المتبقي سيبقى نافذاً وسارياً المفعول.'
              : 'If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions will continue to be valid and enforceable.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '12. الاتفاق الكامل' : '12. Entire Agreement'}
          </h2>
          <p>
            {isArabic
              ? 'تمثل هذه الشروط والأحكام الاتفاق الكامل بينك وبيننا بخصوص استخدام الموقع والخدمات. إذا كانت هناك أي نسخة سابقة من هذه الشروط والأحكام، فإنها يتم استبدالها بالكامل بهذه الإصدار الجديد.'
              : 'These Terms and Conditions constitute the entire agreement between you and us regarding the use of the website and services. Any previous versions of these Terms and Conditions are completely replaced by this new version.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '13. الاتصال بنا' : '13. Contact Us'}
          </h2>
          <p>
            {isArabic
              ? 'إذا كان لديك أي أسئلة حول هذه الشروط والأحكام، يرجى الاتصال بنا:'
              : 'If you have any questions about these Terms and Conditions, please contact us:'}
          </p>
          <div className="bg-gray-50 p-6 rounded-lg mt-4 space-y-2">
            <p className="font-semibold text-navy-950">Sage Tax Consultancy</p>
            <p className="text-gray-600">
              {isArabic ? 'البريد الإلكتروني' : 'Email'}:{' '}
              <a href="mailto:info@sageconsultancy.ae" className="text-sage-700 hover:text-sage-800">
                info@sageconsultancy.ae
              </a>
            </p>
            <p className="text-gray-600">
              {isArabic ? 'الهاتف' : 'Phone'}:{' '}
              <a href="tel:+971585704140" className="text-sage-700 hover:text-sage-800">
                +971 58 570 4140
              </a>
            </p>
            <p className="text-gray-600">
              {isArabic ? 'العنوان' : 'Address'}: Dubai, UAE
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              {isArabic ? 'آخر تحديث: يناير 2026' : 'Last Updated: January 2026'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isArabic ? 'هل لديك أسئلة حول شروطنا؟' : 'Have Questions About Our Terms?'}
          </h2>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isArabic ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </main>
  );
}
