// Privacy Policy — UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).
// Company particulars come from the CMS (site.legal / site.contact); the wording is managed in code.
// Review with UAE counsel before relying on it; update PRIVACY_VERSION in lib/site.js on material changes.

export const PRIVACY_UPDATED = { en: '1 October 2026', ar: '1 أكتوبر 2026' };

export function privacyPolicy(d, locale) {
  const reg = d.licenseNumber
    ? { en: `, holding trade licence no. ${d.licenseNumber}${d.authority.en ? ` issued by ${d.authority.en}` : ''}`, ar: `، الحاصلة على الرخصة التجارية رقم ${d.licenseNumber}${d.authority.ar ? ` الصادرة عن ${d.authority.ar}` : ''}` }
    : { en: '', ar: '' };

  if (locale === 'ar') {
    return {
      title: 'سياسة الخصوصية',
      badge: 'خصوصيتك',
      updated: PRIVACY_UPDATED.ar,
      intro: [
        `تلتزم **${d.company.ar}** («الشركة» أو «نحن»)، ومقرها ${d.address.ar}${reg.ar}، بحماية بياناتك الشخصية وفقاً للمرسوم بقانون اتحادي رقم (45) لسنة 2021 بشأن حماية البيانات الشخصية («القانون») ولائحته التنفيذية والتشريعات المعمول بها في دولة الإمارات العربية المتحدة.`,
        `توضح هذه السياسة كيف نجمع بياناتك الشخصية ونستخدمها ونحميها عند زيارتك لموقعنا ${d.site} أو تواصلك معنا أو استخدامك لخدماتنا.`,
      ],
      sections: [
        { h: 'المسؤول عن البيانات', p: [`${d.company.ar} هي «المتحكم» في بياناتك الشخصية. للتواصل بشأن الخصوصية: **${d.privacyEmail}** أو الهاتف ${d.phone}.`] },
        {
          h: 'البيانات التي نجمعها',
          ul: [
            '**بيانات التواصل:** الاسم والبريد الإلكتروني ورقم الهاتف وموضوع الاستفسار ونص الرسالة عند استخدامك نموذج التواصل أو تواصلك عبر البريد أو الهاتف أو واتساب.',
            '**بيانات العملاء:** عند التعاقد معنا، قد نعالج وثائق الهوية والرخص التجارية والسجلات المالية والضريبية والمصرفية وغيرها مما يلزم لتقديم الخدمة. تخضع هذه البيانات أيضاً لخطاب التعاقد.',
            '**البيانات التقنية:** بيانات ضرورية لتشغيل الموقع وأمانه (مثل نوع المتصفح وسجلات الخادم المؤقتة لدى مزود الاستضافة).',
            '**بيانات التحليلات:** فقط إذا وافقت على ملفات تعريف ارتباط التحليلات (انظر سياسة ملفات تعريف الارتباط).',
          ],
          after: ['لا نجمع عمداً بيانات حساسة عبر الموقع. يرجى عدم إرسال وثائق أو معلومات مالية حساسة عبر نموذج التواصل.'],
        },
        {
          h: 'أغراض المعالجة وأساسها القانوني',
          ul: [
            '**الرد على استفسارك** وتقديم عرض أو استشارة أولية — بناءً على **موافقتك** التي تقدمها في نموذج التواصل، ولاتخاذ خطوات بناءً على طلبك قبل إبرام العقد.',
            '**تقديم الخدمات المتعاقد عليها** (الضرائب والمحاسبة والتدقيق وتأسيس الشركات وغيرها) — لتنفيذ العقد المبرم معك.',
            '**الالتزامات القانونية**، بما في ذلك متطلبات «اعرف عميلك» ومكافحة غسل الأموال بموجب المرسوم بقانون اتحادي رقم (10) لسنة 2025 ولائحته التنفيذية، ومتطلبات حفظ السجلات بموجب قانون الإجراءات الضريبية (المرسوم بقانون اتحادي رقم (28) لسنة 2022 وتعديلاته).',
            '**التحليلات وتحسين الموقع** — فقط بناءً على موافقتك، ويمكنك سحبها في أي وقت.',
          ],
          after: ['لا نبيع بياناتك الشخصية ولا نستخدمها للإعلانات الموجهة، ولا نتخذ بشأنك قرارات تعتمد كلياً على المعالجة الآلية.'],
        },
        {
          h: 'مشاركة البيانات',
          p: ['نشارك البيانات فقط عند الضرورة ومع جهات ملتزمة بالسرية:'],
          ul: [
            '**مزودو الخدمات التقنية** الذين يعالجون البيانات نيابةً عنا: استضافة الموقع (Vercel Inc.)، وقاعدة البيانات والتخزين (Supabase Inc.)، والبريد الإلكتروني ومنصات التواصل التي تختار استخدامها (مثل واتساب).',
            '**Google** لتحليلات الموقع وخرائط جوجل — فقط بعد موافقتك.',
            '**الجهات الحكومية والتنظيمية** (مثل الهيئة الاتحادية للضرائب والجهات المرخِّصة) عندما يطلب القانون ذلك أو لتنفيذ خدمة طلبتها.',
          ],
          after: ['تستخدم الشركة أداة ذكاء اصطناعي داخلية (OpenAI) لتحرير محتوى الموقع العام فقط؛ ولا تُرسل إليها بيانات الزوار أو رسائل نموذج التواصل.'],
        },
        { h: 'نقل البيانات خارج الدولة', p: ['قد تُخزَّن البيانات أو تُعالَج لدى مزودينا خارج دولة الإمارات (مثل الاتحاد الأوروبي أو الولايات المتحدة). لا نقوم بذلك إلا وفق المادتين (22) و(23) من القانون، أي إلى دول توفر مستوى حماية مناسباً أو بموجب ضمانات تعاقدية ملزمة أو في الحالات الأخرى التي يجيزها القانون.'] },
        {
          h: 'مدة الاحتفاظ',
          ul: [
            '**الاستفسارات التي لا تتحول إلى تعاقد:** حتى 24 شهراً من آخر تواصل، ثم تُحذف.',
            '**سجلات العملاء:** طوال مدة التعاقد، ثم لمدة لا تقل عن خمس (5) سنوات بعد نهاية الفترة الضريبية المعنية أو انتهاء العلاقة (وسبع (7) سنوات للسجلات المتعلقة بالعقارات)، أو المدد الأطول التي يفرضها قانون الإجراءات الضريبية أو تشريعات مكافحة غسل الأموال.',
            '**موافقات ملفات تعريف الارتباط:** 12 شهراً.',
          ],
        },
        {
          h: 'حقوقك',
          p: ['بموجب القانون يحق لك، وفق الشروط والاستثناءات القانونية:'],
          ul: [
            'الحصول على معلومات عن معالجة بياناتك ونسخة منها، وطلب نقلها.',
            'تصحيح البيانات غير الدقيقة أو استكمالها.',
            'طلب حذف بياناتك عندما لا تعود ضرورية أو عند سحب موافقتك.',
            'تقييد المعالجة أو الاعتراض عليها أو إيقافها، بما في ذلك لأغراض التسويق.',
            'سحب موافقتك في أي وقت دون أن يؤثر ذلك على مشروعية المعالجة السابقة.',
          ],
          after: [`لممارسة أي من هذه الحقوق راسلنا على **${d.privacyEmail}**. قد نطلب التحقق من هويتك، وسنرد خلال المدد التي يحددها القانون (ونسعى للرد خلال 30 يوماً). يحق لك أيضاً تقديم شكوى إلى **مكتب الإمارات للبيانات**.`],
        },
        { h: 'أمن البيانات', p: ['نطبق تدابير تقنية وتنظيمية مناسبة تشمل التشفير أثناء النقل (HTTPS/HSTS)، وتقييد الوصول بصلاحيات وكلمات مرور قوية، وسجلات التغييرات، وتقليل البيانات المجموعة إلى الحد الأدنى. في حال وقوع خرق يعرض بياناتك للخطر، سنُخطر مكتب الإمارات للبيانات والأشخاص المتأثرين وفقاً للمادة (9) من القانون.'] },
        { h: 'ملفات تعريف الارتباط', p: ['نستخدم ملفات تعريف الارتباط الضرورية فقط ما لم توافق على غيرها. التفاصيل الكاملة وكيفية تغيير اختياراتك موجودة في سياسة ملفات تعريف الارتباط وفي «إعدادات ملفات تعريف الارتباط» أسفل كل صفحة.'] },
        { h: 'الأطفال', p: ['موقعنا وخدماتنا موجهة للشركات والبالغين، ولا نجمع عن علم بيانات من هم دون 18 عاماً.'] },
        { h: 'روابط الأطراف الثالثة', p: ['قد يحتوي الموقع على روابط لمواقع حكومية أو إخبارية. لا نتحكم في ممارسات الخصوصية لهذه المواقع.'] },
        { h: 'التعديلات', p: ['قد نحدّث هذه السياسة من وقت لآخر. يُنشر أي تحديث هنا مع تاريخ «آخر تحديث»، وفي حال التغييرات الجوهرية سنطلب موافقتك مجدداً عند الحاجة.'] },
        { h: 'التواصل', p: [`${d.company.ar} — ${d.address.ar}. البريد الإلكتروني: ${d.privacyEmail} — الهاتف: ${d.phone}.`, 'في حال وجود أي تعارض بين النسختين العربية والإنجليزية، تسود النسخة العربية أمام الجهات الرسمية في دولة الإمارات.'] },
      ],
    };
  }

  return {
    title: 'Privacy Policy',
    badge: 'Your Privacy',
    updated: PRIVACY_UPDATED.en,
    intro: [
      `**${d.company.en}** ("we", "us", "the Company"), based in ${d.address.en}${reg.en}, is committed to protecting your personal data in accordance with UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (the "PDPL"), its Executive Regulations and other applicable UAE legislation.`,
      `This policy explains how we collect, use and protect personal data when you visit ${d.site}, contact us, or use our services.`,
    ],
    sections: [
      { h: 'Who is responsible for your data', p: [`${d.company.en} is the controller of your personal data. Privacy questions: **${d.privacyEmail}** or ${d.phone}.`] },
      {
        h: 'Personal data we collect',
        ul: [
          '**Enquiry data:** name, email address, phone number, subject and message when you use our contact form or contact us by email, phone or WhatsApp.',
          '**Client data:** if you engage us, identity documents, trade licences, financial, tax and banking records and other information needed to deliver the service. This is also governed by our engagement letter.',
          '**Technical data:** information needed to run and secure the website (e.g. browser type and short-lived server logs kept by our hosting provider).',
          '**Analytics data:** only if you accept analytics cookies (see our Cookie Policy).',
        ],
        after: ['We do not intentionally collect sensitive personal data through the website. Please do not send identity documents or sensitive financial information through the contact form.'],
      },
      {
        h: 'Why we use your data and our legal basis',
        ul: [
          '**To answer your enquiry** and provide a quotation or initial consultation — based on the **consent** you give in the contact form, and to take steps at your request before entering into a contract.',
          '**To deliver contracted services** (tax, accounting, audit, company formation and related services) — to perform our contract with you.',
          '**To meet legal obligations**, including customer due-diligence and anti-money-laundering duties under Federal Decree-Law No. 10 of 2025 and its Executive Regulations, and record-keeping duties under the Tax Procedures Law (Federal Decree-Law No. 28 of 2022, as amended).',
          '**Website analytics and improvement** — only with your consent, which you can withdraw at any time.',
        ],
        after: ['We do not sell your personal data, do not use it for targeted advertising, and do not make decisions about you based solely on automated processing.'],
      },
      {
        h: 'Who we share data with',
        p: ['We share data only where necessary and with parties bound by confidentiality:'],
        ul: [
          '**Technology providers** that process data on our behalf: website hosting (Vercel Inc.), database and file storage (Supabase Inc.), and the email and messaging platforms you choose to contact us on (e.g. WhatsApp).',
          '**Google**, for website analytics and Google Maps — only after you consent.',
          '**Government and regulatory authorities** (e.g. the Federal Tax Authority and licensing authorities) where required by law or to carry out a service you requested.',
        ],
        after: ['We use an internal AI tool (OpenAI) only to edit public website content; visitor data and contact-form messages are never sent to it.'],
      },
      { h: 'International transfers', p: ['Some providers may store or process data outside the UAE (for example in the European Union or the United States). We only transfer data in line with Articles 22 and 23 of the PDPL — to countries with adequate protection, under binding contractual safeguards, or in other cases the law permits.'] },
      {
        h: 'How long we keep data',
        ul: [
          '**Enquiries that do not become engagements:** up to 24 months after our last contact, then deleted.',
          '**Client records:** for the engagement and then at least five (5) years after the end of the relevant tax period or business relationship (seven (7) years for real-estate-related records), or longer where the Tax Procedures Law or anti-money-laundering legislation requires.',
          '**Cookie consent records:** 12 months.',
        ],
      },
      {
        h: 'Your rights',
        p: ['Under the PDPL, and subject to the conditions and exceptions set out in law, you have the right to:'],
        ul: [
          'obtain information about, and a copy of, your personal data, and request its transfer (portability);',
          'have inaccurate or incomplete data corrected;',
          'request erasure when data is no longer needed or you withdraw consent;',
          'restrict, object to or stop processing, including for marketing;',
          'withdraw consent at any time, without affecting processing carried out before withdrawal.',
        ],
        after: [`To exercise these rights, email **${d.privacyEmail}**. We may need to verify your identity, and we will respond within the time limits set by law (we aim to respond within 30 days). You may also lodge a complaint with the **UAE Data Office**.`],
      },
      { h: 'Security', p: ['We use appropriate technical and organisational measures, including encryption in transit (HTTPS/HSTS), role-restricted access with strong passwords, change logging and data minimisation. If a breach puts your data at risk, we will notify the UAE Data Office and affected individuals as required by Article 9 of the PDPL.'] },
      { h: 'Cookies', p: ['We only use strictly necessary cookies unless you agree to others. Full details, and how to change your choice, are in our Cookie Policy and under "Cookie settings" at the bottom of every page.'] },
      { h: 'Children', p: ['Our website and services are intended for businesses and adults. We do not knowingly collect data from anyone under 18.'] },
      { h: 'Third-party links', p: ['The website links to government and news websites. We are not responsible for their privacy practices.'] },
      { h: 'Changes to this policy', p: ['We may update this policy from time to time. Updates are published here with a new "Last updated" date, and where changes are material we will ask for your consent again where required.'] },
      { h: 'Contact', p: [`${d.company.en} — ${d.address.en}. Email: ${d.privacyEmail} — Phone: ${d.phone}.`, 'If the English and Arabic versions differ, the Arabic version prevails before UAE authorities.'] },
    ],
  };
}
