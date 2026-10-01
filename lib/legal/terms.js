// Website Terms & Conditions — governed by UAE federal law as applied in the Emirate of Dubai.
// Review with UAE counsel before relying on it.

export const TERMS_UPDATED = { en: '1 October 2026', ar: '1 أكتوبر 2026' };

export function termsAndConditions(d, locale) {
  if (locale === 'ar') {
    return {
      title: 'الشروط والأحكام',
      badge: 'الشروط القانونية',
      updated: TERMS_UPDATED.ar,
      intro: [`تحكم هذه الشروط استخدامك لموقع ${d.site} («الموقع») الذي تديره **${d.company.ar}** («نحن»)${d.licenseNumber ? `، رخصة تجارية رقم ${d.licenseNumber}` : ''}. باستخدامك للموقع فإنك توافق على هذه الشروط. إذا لم توافق عليها، يرجى عدم استخدام الموقع.`],
      sections: [
        { h: 'طبيعة المعلومات — ليست استشارة مهنية', p: ['المحتوى المنشور على الموقع (بما في ذلك المقالات والأسئلة الشائعة والملخصات الضريبية والأخبار) هو لأغراض المعلومات العامة فقط، ولا يُعد استشارة ضريبية أو محاسبية أو قانونية أو مالية. تتغير التشريعات الضريبية في الإمارات وقرارات الهيئة الاتحادية للضرائب باستمرار، وقد لا يعكس المحتوى أحدث التعديلات. لا تنشأ علاقة مهنية بيننا إلا بموجب خطاب تعاقد موقّع، ويجب الحصول على استشارة مخصصة قبل اتخاذ أي قرار.'] },
        { h: 'خدماتنا', p: ['تخضع أي خدمة نقدمها لخطاب تعاقد مكتوب يحدد النطاق والأتعاب والمسؤوليات. في حال التعارض بين هذه الشروط وخطاب التعاقد، يسود خطاب التعاقد. الإشارة إلى «استشارة مجانية» تعني جلسة تعريفية أولية دون التزام، ولا تتضمن رأياً مهنياً مكتوباً.'] },
        {
          h: 'الاستخدام المقبول',
          p: ['تلتزم بعدم:'],
          ul: [
            'استخدام الموقع بأي طريقة مخالفة للقانون، بما في ذلك المرسوم بقانون اتحادي رقم (34) لسنة 2021 في شأن مكافحة الشائعات والجرائم الإلكترونية؛',
            'محاولة الوصول غير المصرح به إلى الموقع أو أنظمته أو لوحة إدارة المحتوى، أو تعطيلها أو اختبار ثغراتها دون إذن كتابي؛',
            'إرسال محتوى ضار أو مزعج أو برمجيات خبيثة، أو استخدام أدوات آلية لجمع البيانات بكميات كبيرة؛',
            'انتحال صفة أي شخص أو تقديم معلومات كاذبة عبر نموذج التواصل.',
          ],
        },
        { h: 'الملكية الفكرية', p: [`جميع المحتويات والتصاميم والشعارات والعلامات التجارية على الموقع مملوكة لـ ${d.company.ar} أو مرخصة لها، ومحمية بموجب قوانين الملكية الفكرية في الدولة. يُسمح بعرض المحتوى وطباعته للاستخدام الشخصي غير التجاري مع الإشارة إلى المصدر، ويُحظر أي استخدام آخر دون موافقة كتابية مسبقة.`] },
        { h: 'روابط ومحتوى الأطراف الثالثة', p: ['يتضمن الموقع روابط لمواقع حكومية ومصادر إخبارية وخدمات خارجية (مثل خرائط جوجل وواتساب). يتم توفيرها للتسهيل فقط، ولا نتحمل مسؤولية محتواها أو توفرها أو سياسات الخصوصية الخاصة بها. الأخبار المعروضة تلقائياً مصدرها جهات النشر الأصلية.'] },
        { h: 'إخلاء المسؤولية', p: ['يُقدَّم الموقع «كما هو» و«حسب التوفر». نبذل عناية معقولة لضمان دقة المعلومات، لكننا لا نضمن خلوها من الأخطاء أو استمرار توفر الموقع دون انقطاع.'] },
        { h: 'حدود المسؤولية', p: ['إلى أقصى حد يسمح به القانون، بما في ذلك قانون المعاملات المدنية الاتحادي، لا نتحمل المسؤولية عن أي خسارة أو ضرر غير مباشر أو تبعي ينشأ عن استخدام الموقع أو الاعتماد على محتواه دون تعاقد. لا يحد هذا البند من أي مسؤولية لا يجوز قانوناً تحديدها أو استبعادها، بما في ذلك المسؤولية عن الغش أو الخطأ الجسيم، ولا من حقوقك بموجب القانون الاتحادي رقم (15) لسنة 2020 بشأن حماية المستهلك حيث ينطبق.'] },
        { h: 'التعويض', p: ['توافق على تعويضنا عن أي مطالبات أو خسائر تنشأ عن مخالفتك لهذه الشروط أو إساءة استخدامك للموقع.'] },
        { h: 'الخصوصية وملفات تعريف الارتباط', p: ['تخضع معالجة بياناتك الشخصية لسياسة الخصوصية وسياسة ملفات تعريف الارتباط، وهما جزء لا يتجزأ من هذه الشروط.'] },
        { h: 'المراسلات الإلكترونية', p: ['توافق على أن المراسلات بيننا عبر البريد الإلكتروني أو نموذج التواصل أو تطبيقات المراسلة تُعد مراسلات مكتوبة صحيحة، وفقاً للمرسوم بقانون اتحادي رقم (46) لسنة 2021 بشأن المعاملات الإلكترونية وخدمات الثقة.'] },
        { h: 'التعديلات', p: ['قد نعدّل هذه الشروط في أي وقت بنشر نسخة محدثة على هذه الصفحة. استمرارك في استخدام الموقع بعد التعديل يعني قبولك للشروط المعدلة.'] },
        { h: 'القانون الواجب التطبيق والاختصاص القضائي', p: ['تخضع هذه الشروط وتُفسَّر وفقاً لقوانين دولة الإمارات العربية المتحدة الاتحادية كما تُطبَّق في إمارة دبي. تختص محاكم دبي حصرياً بالنظر في أي نزاع ينشأ عنها، دون الإخلال بحق أي طرف في اللجوء إلى الوسائل الودية أولاً.'] },
        { h: 'اللغة', p: ['هذه الشروط متاحة باللغتين العربية والإنجليزية. في حال وجود أي تعارض، تسود النسخة العربية.'] },
        { h: 'التواصل', p: [`${d.company.ar} — ${d.address.ar}. البريد الإلكتروني: ${d.email} — الهاتف: ${d.phone}.`] },
      ],
    };
  }

  return {
    title: 'Terms & Conditions',
    badge: 'Legal',
    updated: TERMS_UPDATED.en,
    intro: [`These terms govern your use of ${d.site} (the "Website"), operated by **${d.company.en}** ("we", "us")${d.licenseNumber ? `, trade licence no. ${d.licenseNumber}` : ''}. By using the Website you agree to these terms. If you do not agree, please do not use the Website.`],
    sections: [
      { h: 'Information only — not professional advice', p: ['Content on the Website (including articles, FAQs, tax summaries and news) is general information only and is not tax, accounting, legal or financial advice. UAE tax legislation and Federal Tax Authority guidance change frequently and the content may not reflect the latest amendments. No adviser–client relationship is created except under a signed engagement letter, and you should obtain advice specific to your circumstances before acting.'] },
      { h: 'Our services', p: ['Any service we provide is governed by a written engagement letter setting out scope, fees and responsibilities. If these terms conflict with an engagement letter, the engagement letter prevails. A "free consultation" means a no-obligation introductory session and does not include a written professional opinion.'] },
      {
        h: 'Acceptable use',
        p: ['You agree not to:'],
        ul: [
          'use the Website unlawfully, including in breach of Federal Decree-Law No. 34 of 2021 on Combating Rumours and Cybercrimes;',
          'attempt unauthorised access to the Website, its systems or its content-management area, disrupt it, or probe it for vulnerabilities without our written permission;',
          'submit harmful, abusive or spam content or malware, or scrape the Website with automated tools;',
          'impersonate anyone or submit false information through the contact form.',
        ],
      },
      { h: 'Intellectual property', p: [`All content, designs, logos and trademarks on the Website are owned by or licensed to ${d.company.en} and protected by UAE intellectual-property laws. You may view and print content for personal, non-commercial use with attribution; any other use requires our prior written consent.`] },
      { h: 'Third-party links and content', p: ['The Website links to government sites, news sources and third-party services (such as Google Maps and WhatsApp) for convenience only. We are not responsible for their content, availability or privacy practices. Automatically displayed news items belong to their original publishers.'] },
      { h: 'Disclaimer', p: ['The Website is provided "as is" and "as available". We take reasonable care to keep information accurate but do not guarantee it is error-free or that the Website will be uninterrupted.'] },
      { h: 'Limitation of liability', p: ['To the maximum extent permitted by law, including the UAE Civil Transactions Law, we are not liable for indirect or consequential loss arising from use of the Website or reliance on its content outside an engagement. Nothing in these terms limits liability that cannot lawfully be limited or excluded, including for fraud or gross negligence, or your rights under Federal Law No. 15 of 2020 on Consumer Protection where it applies.'] },
      { h: 'Indemnity', p: ['You agree to indemnify us against claims or losses arising from your breach of these terms or misuse of the Website.'] },
      { h: 'Privacy and cookies', p: ['Our Privacy Policy and Cookie Policy explain how we handle personal data and form part of these terms.'] },
      { h: 'Electronic communications', p: ['You agree that communications between us by email, contact form or messaging apps are valid written communications, in line with Federal Decree-Law No. 46 of 2021 on Electronic Transactions and Trust Services.'] },
      { h: 'Changes', p: ['We may update these terms at any time by posting a new version on this page. Continued use of the Website after an update means you accept the updated terms.'] },
      { h: 'Governing law and jurisdiction', p: ['These terms are governed by the federal laws of the United Arab Emirates as applied in the Emirate of Dubai. The courts of Dubai have exclusive jurisdiction over any dispute arising from them, without prejudice to the parties first seeking an amicable settlement.'] },
      { h: 'Language', p: ['These terms are available in Arabic and English. If there is any inconsistency, the Arabic version prevails.'] },
      { h: 'Contact', p: [`${d.company.en} — ${d.address.en}. Email: ${d.email} — Phone: ${d.phone}.`] },
    ],
  };
}
