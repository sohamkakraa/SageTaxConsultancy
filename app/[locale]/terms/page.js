import { Link } from '@/lib/navigation';
import { ChevronRight, FileText } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | Sage Advisory',
  description: 'Terms and conditions for using Sage Advisory website and services, governed by UAE law.',
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
            {isArabic ? 'آخر تحديث: أبريل 2026' : 'Last Updated: April 2026'}
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
              ? 'بالوصول واستخدام موقع Sage Advisory (sageadvisory.ae) وخدماتها، فإنك توافق على الالتزام بهذه الشروط والأحكام بالكامل. تخضع هذه الشروط للقوانين السارية في دولة الإمارات العربية المتحدة، بما في ذلك القانون الاتحادي رقم (5) لسنة 1985 بشأن المعاملات المدنية (قانون المعاملات المدنية) والقانون الاتحادي رقم (46) لسنة 2021 بشأن المعاملات الإلكترونية. إذا كنت لا تقبل أي من هذه الشروط، يرجى عدم استخدام الموقع أو الخدمات.'
              : 'By accessing and using Sage Advisory website (sageadvisory.ae) and services, you agree to comply fully with these Terms and Conditions. These Terms are governed by the laws of the United Arab Emirates, including Federal Law No. (5) of 1985 on Civil Transactions (Civil Transactions Law) and Federal Decree-Law No. (46) of 2021 on Electronic Transactions. If you do not accept any of these terms, please do not use the website or services.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '2. نطاق الخدمات' : '2. Scope of Services'}
          </h2>
          <p>
            {isArabic
              ? 'تقدم Sage Advisory خدمات استشارات ضريبية ومحاسبية وتدقيق وخدمات شركات في دولة الإمارات العربية المتحدة، بما في ذلك على سبيل المثال لا الحصر:'
              : 'Sage Advisory provides tax consulting, accounting, auditing, and corporate services in the United Arab Emirates, including but not limited to:'}
          </p>
          <ul>
            <li>{isArabic ? 'تسجيل وتقديم ضريبة القيمة المضافة (VAT) لدى الهيئة الاتحادية للضرائب' : 'VAT registration and filing with the Federal Tax Authority (FTA)'}</li>
            <li>{isArabic ? 'التسجيل وتقديم ضريبة الشركات (CT) لدى الهيئة الاتحادية للضرائب' : 'Corporate Tax (CT) registration and filing with the FTA'}</li>
            <li>{isArabic ? 'خدمات المحاسبة ومسك الدفاتر والتدقيق' : 'Accounting, bookkeeping, and auditing services'}</li>
            <li>{isArabic ? 'تسجيل الشركات والعلامات التجارية وفتح الحسابات البنكية' : 'Company registration, trademark registration, and bank account opening'}</li>
            <li>{isArabic ? 'خدمات العلاقات الحكومية والتأشيرات بما في ذلك الإقامة الذهبية' : 'PRO services and visa services including Golden Visa'}</li>
          </ul>
          <p className="mt-3">
            {isArabic
              ? 'تُقدم جميع الخدمات وفقاً للقوانين والأنظمة المعمول بها في الإمارات. أي اتفاق على نطاق خدمة محددة سيكون موضوع عقد خدمات منفصل.'
              : 'All services are provided in compliance with applicable UAE laws and regulations. Any agreement on specific service scope will be subject to a separate service agreement.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '3. استخدام الموقع' : '3. Use of Website'}
          </h2>
          <p>
            {isArabic
              ? 'توافق على استخدام الموقع والخدمات فقط للأغراض القانونية وبطريقة لا تنتهك حقوق الآخرين. التصرفات المحظورة تشمل:'
              : 'You agree to use the website and services only for lawful purposes and in a manner that does not infringe upon the rights of others. Prohibited actions include:'}
          </p>
          <ul>
            <li>{isArabic ? 'نشر محتوى غير قانوني أو مسيء أو ينتهك حقوق الملكية الفكرية' : 'Posting illegal, offensive, or IP-infringing content'}</li>
            <li>{isArabic ? 'محاولة اختراق الموقع أو الوصول غير المصرح إلى الأنظمة' : 'Attempting to hack the website or gain unauthorized access to systems'}</li>
            <li>{isArabic ? 'نقل فيروسات أو برامج ضارة أو أي شكل من أشكال الهجمات الإلكترونية' : 'Transmitting viruses, malware, or any form of cyberattacks'}</li>
            <li>{isArabic ? 'استخدام الموقع بطريقة تنتهك قانون مكافحة جرائم تقنية المعلومات (المرسوم بقانون اتحادي رقم 34 لسنة 2021)' : 'Using the website in violation of the UAE Cybercrime Law (Federal Decree-Law No. 34 of 2021)'}</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '4. الملكية الفكرية' : '4. Intellectual Property'}
          </h2>
          <p>
            {isArabic
              ? 'جميع محتويات الموقع، بما في ذلك النصوص والرسومات والشعارات والصور والبرامج، هي ملكية فكرية لـ Sage Advisory ومحمية بموجب القانون الاتحادي رقم (38) لسنة 2021 بشأن حق المؤلف والحقوق المجاورة. لا يُسمح بنسخ أو توزيع أو عرض أو نقل أي محتوى بدون موافقة خطية صريحة.'
              : 'All website content, including text, graphics, logos, images, and software, is the intellectual property of Sage Advisory and is protected under UAE Federal Law No. (38) of 2021 on Copyrights and Neighboring Rights. Copying, distributing, displaying, or transmitting any content without express written permission is prohibited.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '5. السرية المهنية' : '5. Professional Confidentiality'}
          </h2>
          <p>
            {isArabic
              ? 'نلتزم بالحفاظ على سرية جميع المعلومات المقدمة من العملاء. يتم التعامل مع جميع البيانات المالية والضريبية بسرية تامة وفقاً لمعايير المهنة والقوانين المعمول بها في الإمارات. لن يتم الإفصاح عن أي معلومات للغير إلا بموافقة العميل أو عند المطالبة بموجب القانون أو أمر قضائي.'
              : 'We maintain strict confidentiality of all client information. All financial and tax data is treated with complete confidentiality in accordance with professional standards and applicable UAE laws. No information will be disclosed to third parties without client consent or when required by law or court order.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '6. إخلاء المسؤولية المهنية' : '6. Professional Disclaimer'}
          </h2>
          <p>
            {isArabic
              ? 'المعلومات المقدمة على الموقع لأغراض تعليمية وإعلامية فقط ولا تشكل نصيحة قانونية أو ضريبية أو مالية احترافية. للحصول على مشورة محددة لوضعك، يرجى حجز استشارة مع فريقنا. بينما نبذل قصارى جهدنا لتقديم معلومات دقيقة ومحدثة، فإن القوانين واللوائح الضريبية في الإمارات قد تتغير. نحن غير مسؤولين عن أي قرارات تتخذها بناءً على المعلومات العامة المقدمة على الموقع.'
              : 'Information provided on the website is for educational and informational purposes only and does not constitute professional legal, tax, or financial advice. For specific advice on your situation, please book a consultation with our team. While we strive to provide accurate and up-to-date information, UAE tax laws and regulations may change. We are not responsible for any decisions you make based on general information provided on the website.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '7. تحديد المسؤولية' : '7. Limitation of Liability'}
          </h2>
          <p>
            {isArabic
              ? 'في أقصى حد يسمح به قانون المعاملات المدنية في الإمارات، لا تتحمل Sage Advisory أي مسؤولية عن:'
              : 'To the fullest extent permitted by UAE Civil Transactions Law, Sage Advisory shall not be liable for:'}
          </p>
          <ul>
            <li>{isArabic ? 'الأضرار المباشرة أو غير المباشرة الناتجة عن استخدام الموقع' : 'Direct or indirect damages resulting from use of the website'}</li>
            <li>{isArabic ? 'فقدان الأرباح أو البيانات أو الفرص التجارية' : 'Loss of profits, data, or business opportunities'}</li>
            <li>{isArabic ? 'التعطل أو الانقطاعات أو الأخطاء التقنية في الموقع' : 'Downtime, interruptions, or technical errors on the website'}</li>
            <li>{isArabic ? 'أي غرامات أو عقوبات ضريبية ناتجة عن معلومات غير مكتملة أو غير دقيقة مقدمة من العميل' : 'Any tax penalties resulting from incomplete or inaccurate information provided by the client'}</li>
          </ul>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '8. شروط الدفع' : '8. Payment Terms'}
          </h2>
          <p>
            {isArabic
              ? 'تخضع رسوم الخدمة لعقد الخدمات المتفق عليه. يجب دفع المبالغ المستحقة خلال 30 يوماً من تاريخ إصدار الفاتورة ما لم يتم الاتفاق على خلاف ذلك. الأسعار المعلنة على الموقع (إن وجدت) هي أسعار إرشادية وقد تختلف بناءً على نطاق العمل. جميع الرسوم خاضعة لضريبة القيمة المضافة بنسبة 5% وفقاً لقانون ضريبة القيمة المضافة في الإمارات.'
              : 'Service fees are subject to the agreed service agreement. Amounts due must be paid within 30 days of invoice date unless otherwise agreed. Prices displayed on the website (if any) are indicative and may vary based on the scope of work. All fees are subject to 5% VAT in accordance with UAE VAT Law.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '9. إنهاء الخدمات' : '9. Service Termination'}
          </h2>
          <p>
            {isArabic
              ? 'يجوز لأي من الطرفين إنهاء اتفاقية الخدمة بإشعار خطي مدته 30 يوماً. في حالة الإنهاء، يلتزم العميل بدفع جميع الرسوم المستحقة عن الأعمال المنجزة حتى تاريخ الإنهاء. تبقى التزامات السرية وحماية البيانات سارية حتى بعد إنهاء العلاقة التعاقدية.'
              : 'Either party may terminate the service agreement with 30 days written notice. Upon termination, the client is responsible for payment of all fees due for work completed up to the termination date. Confidentiality and data protection obligations survive termination of the contractual relationship.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '10. الروابط الخارجية' : '10. External Links'}
          </h2>
          <p>
            {isArabic
              ? 'قد يحتوي الموقع على روابط لمواقع خارجية بما في ذلك بوابات حكومية ومصادر إخبارية. لسنا مسؤولين عن محتوى أو سياسات تلك المواقع.'
              : 'The website may contain links to external websites including government portals and news sources. We are not responsible for the content or policies of those sites.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '11. القانون الحاكم والاختصاص القضائي' : '11. Governing Law and Jurisdiction'}
          </h2>
          <p>
            {isArabic
              ? 'تخضع هذه الشروط والأحكام وتُفسَّر وفقاً لقوانين دولة الإمارات العربية المتحدة، وتحديداً القوانين السارية في إمارة دبي. يخضع أي نزاع ينشأ عن هذه الشروط للاختصاص القضائي الحصري لمحاكم دبي. يتفق الطرفان على محاولة حل أي نزاع ودياً قبل اللجوء إلى القضاء.'
              : 'These Terms and Conditions are governed by and construed in accordance with the laws of the United Arab Emirates, specifically the laws applicable in the Emirate of Dubai. Any dispute arising from these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai. Both parties agree to attempt to resolve any dispute amicably before resorting to litigation.'}
          </p>

          <h2 className="text-xl font-bold text-navy-950 mt-8 mb-4">
            {isArabic ? '12. قابلية الفصل' : '12. Severability'}
          </h2>
          <p>
            {isArabic
              ? 'إذا تم اعتبار أي بند من هذه الشروط غير صحيح أو غير قابل للتنفيذ بموجب القانون الإماراتي، فإن باقي البنود تظل سارية المفعول.'
              : 'If any provision of these Terms is found to be invalid or unenforceable under UAE law, the remaining provisions will continue to be valid and enforceable.'}
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

          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-400">
              {isArabic ? 'آخر تحديث: أبريل 2026' : 'Last Updated: April 2026'}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              {isArabic
                ? 'خاضعة لقوانين دولة الإمارات العربية المتحدة واختصاص محاكم دبي'
                : 'Subject to UAE Federal Laws and the jurisdiction of Dubai Courts'}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900 text-white">
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
