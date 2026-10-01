/**
 * Default website content.
 *
 * Every editable piece of text and every image on the public site lives in this tree.
 * The CMS stores an override document in Supabase (table cms_content, key 'site'); at
 * runtime the stored document is deep-merged over these defaults, so new fields added
 * here show up automatically and nothing breaks if the database is empty.
 *
 * Conventions (the CMS editor and the AI agent rely on them):
 *   - Bilingual text is an object { en, ar }.
 *   - Images are objects { url, alt: { en, ar } }.
 *   - Lists are arrays of objects with the same shape.
 *   - Plain strings are language-neutral values (phone numbers, URLs, numbers).
 */

const L = (en, ar) => ({ en, ar });
const IMG = (url, en = '', ar = '') => ({ url, alt: L(en, ar) });

const U = (id, w = 1600) => `https://images.unsplash.com/${id}?w=${w}&q=80&auto=format&fit=crop`;

export const DEFAULT_CONTENT = {
  site: {
    brandName: L('Sage Global Advisory', 'سيج جلوبال أدفايزري'),
    tagline: L(
      'Expert tax advisory and business solutions in the UAE. Helping businesses navigate compliance with confidence.',
      'استشارات ضريبية خبيرة وحلول أعمال في الإمارات. نساعد الشركات على الامتثال بثقة.'
    ),
    seoTitle: L('Sage Global Advisory | Expert Tax Advisory in the UAE', 'سيج جلوبال أدفايزري | استشارات ضريبية خبيرة في الإمارات'),
    seoDescription: L(
      "UAE advisory firm for VAT, Corporate Tax, Accounting, Auditing and business setup in Dubai. Helping businesses grow with confidence.",
      'شركة استشارات في الإمارات متخصصة في ضريبة القيمة المضافة وضريبة الشركات والمحاسبة والتدقيق وتأسيس الأعمال في دبي.'
    ),
    contact: {
      phone: '+971 58 570 4140',
      whatsapp: '971585704140',
      email: 'info@sageglobaladvisory.com',
      address: L('Dubai, United Arab Emirates', 'دبي، الإمارات العربية المتحدة'),
      hours: L('Sun – Thu: 9:00 AM – 6:00 PM', 'الأحد – الخميس: 9 صباحاً – 6 مساءً'),
      mapsUrl: 'https://maps.google.com/?q=Dubai,United+Arab+Emirates',
      mapEmbedUrl: 'https://www.google.com/maps?q=Dubai,United+Arab+Emirates&output=embed',
    },
    social: {
      linkedin: 'https://www.linkedin.com/company/sage-advisory',
      instagram: 'https://www.instagram.com/sageadvisory.ae',
    },
    // Shown in the Privacy Policy and Terms. Fill these in from the trade licence.
    legal: {
      companyName: L('Sage Global Advisory', 'سيج جلوبال أدفايزري'),
      licenseNumber: '',
      licensingAuthority: L('', ''),
      registeredAddress: L('Dubai, United Arab Emirates', 'دبي، الإمارات العربية المتحدة'),
      privacyEmail: 'info@sageglobaladvisory.com',
    },
  },

  home: {
    hero: {
      badge: L('Trusted Tax Advisors in the UAE', 'مستشارون ضريبيون موثوقون في الإمارات'),
      title: L('Tax Clarity.\nBusiness Certainty.', 'وضوح ضريبي.\nيقين في الأعمال.'),
      subtitle: L(
        'We translate complex UAE tax regulations into actionable strategies — optimizing cash flow, reducing risk, and enabling businesses to scale with confidence.',
        'نحوّل اللوائح الضريبية المعقدة في الإمارات إلى استراتيجيات عملية — لتحسين التدفق النقدي وتقليل المخاطر وتمكين الشركات من النمو بثقة.'
      ),
      ctaPrimary: L('Book a Free Consultation', 'احجز استشارة مجانية'),
      ctaSecondary: L('Explore Services', 'استكشف الخدمات'),
      image: IMG('/assets/hero-image.png', 'Dubai skyline at dusk', 'أفق دبي عند الغروب'),
      pills: [
        { title: L('Tax Compliance', 'الامتثال الضريبي'), text: L('VAT, Corporate Tax & Excise Tax', 'ضريبة القيمة المضافة وضريبة الشركات والضريبة الانتقائية') },
        { title: L('Accounting & Audit', 'المحاسبة والتدقيق'), text: L('IFRS-compliant financial reporting', 'تقارير مالية متوافقة مع المعايير الدولية') },
        { title: L('Corporate Services', 'خدمات الشركات'), text: L('Company formation & Golden Visa', 'تأسيس الشركات والإقامة الذهبية') },
      ],
    },
    counters: {
      items: [
        { value: '950', suffix: '+', label: L('Clients Served', 'عميل تمت خدمته') },
        { value: '120', suffix: 'M+', label: L('AED Saved for Clients', 'درهم تم توفيرها للعملاء') },
        { value: '35', suffix: '+', label: L('Industries Covered', 'قطاعاً نغطيه') },
        { value: '12', suffix: '+', label: L('Years of Experience', 'سنة من الخبرة') },
      ],
    },
    about: {
      badge: L('Why Sage', 'لماذا سيج'),
      title: L('Your Strategic Tax Partner in the UAE', 'شريكك الضريبي الاستراتيجي في الإمارات'),
      description: L(
        'We turn complex regulation into strategic advantage — so UAE businesses can grow with confidence.',
        'نحوّل التنظيمات المعقدة إلى ميزة استراتيجية — لتنمو الشركات في الإمارات بثقة.'
      ),
      missionTitle: L('Our Mission', 'رسالتنا'),
      missionText: L(
        'Turn complex regulation into strategic advantage — so UAE businesses can grow with confidence.',
        'تحويل التنظيمات المعقدة إلى ميزة استراتيجية — لتنمو الشركات في الإمارات بثقة.'
      ),
      visionTitle: L('Our Vision', 'رؤيتنا'),
      visionText: L(
        'To be the most trusted name in Gulf tax advisory, recognized for clarity, client focus, and measurable impact.',
        'أن نكون الاسم الأكثر ثقة في الاستشارات الضريبية في الخليج، معروفين بالوضوح والتركيز على العميل والأثر الملموس.'
      ),
      image: IMG(U('photo-1600880292203-757bb62b4baf', 1200), 'Advisors in a client meeting', 'مستشارون في اجتماع مع عميل'),
      features: [
        { title: L('Qualified Tax Professionals', 'مختصون ضريبيون مؤهلون'), text: L('Experienced advisors with deep expertise in UAE tax regulations and compliance frameworks.', 'مستشارون ذوو خبرة عميقة في اللوائح الضريبية الإماراتية وأطر الامتثال.') },
        { title: L('Sector-Specialized Teams', 'فرق متخصصة حسب القطاع'), text: L('Dedicated teams for e-commerce, real estate, hospitality, energy, and professional services.', 'فرق مخصصة للتجارة الإلكترونية والعقارات والضيافة والطاقة والخدمات المهنية.') },
        { title: L('Technology-Driven', 'قائمون على التكنولوجيا'), text: L('Cloud bookkeeping, automated VAT workflows, and live reporting dashboards for real-time visibility.', 'مسك دفاتر سحابي وسير عمل آلي لضريبة القيمة المضافة ولوحات تقارير مباشرة.') },
        { title: L('Transparent Fees', 'رسوم شفافة'), text: L('Fixed-price engagements with upfront scopes. No hidden charges, no hourly surprises.', 'ارتباطات بأسعار ثابتة ونطاق واضح مسبقاً. بلا رسوم خفية أو مفاجآت.') },
      ],
    },
    services: {
      badge: L('What We Do', 'ماذا نقدم'),
      title: L('Comprehensive Tax & Business Solutions', 'حلول ضريبية وتجارية شاملة'),
      subtitle: L('From VAT compliance to company formation — end-to-end advisory built for UAE businesses.', 'من الامتثال لضريبة القيمة المضافة إلى تأسيس الشركات — استشارات متكاملة مصممة لأعمال الإمارات.'),
      cards: [
        { title: L('Tax Consultancy', 'الاستشارات الضريبية'), text: L("Navigate UAE's evolving tax landscape with expert guidance on VAT, Corporate Tax, and Excise Tax.", 'تنقّل في المشهد الضريبي المتطور في الإمارات بإرشاد خبير في ضريبة القيمة المضافة وضريبة الشركات والضريبة الانتقائية.'), slug: 'vat', image: IMG(U('photo-1554224155-6726b3ff858f', 1000), 'Tax documents and calculator', 'مستندات ضريبية وآلة حاسبة') },
        { title: L('Accounting & Auditing', 'المحاسبة والتدقيق'), text: L('IFRS-compliant financial reporting, bookkeeping, and specialized audit services.', 'تقارير مالية متوافقة مع المعايير الدولية ومسك الدفاتر وخدمات التدقيق المتخصصة.'), slug: 'accounting-services', image: IMG(U('photo-1454165804606-c3d57bc86b40', 1000), 'Accountant reviewing financial reports', 'محاسب يراجع التقارير المالية') },
        { title: L('Corporate Services', 'خدمات الشركات'), text: L('Company registration, PRO services, Golden Visa, and full business setup support.', 'تسجيل الشركات وخدمات العلاقات الحكومية والإقامة الذهبية ودعم تأسيس الأعمال بالكامل.'), slug: 'company-registration', image: IMG(U('photo-1486406146926-c627a92ad1ab', 1000), 'Modern office towers', 'أبراج مكاتب حديثة') },
      ],
    },
    testimonials: {
      badge: L('Client Stories', 'قصص العملاء'),
      title: L('Trusted by Businesses Across the UAE', 'موثوقون من الشركات في جميع أنحاء الإمارات'),
      subtitle: L("Hear from the companies we've helped navigate UAE's tax landscape.", 'استمع إلى الشركات التي ساعدناها في المشهد الضريبي الإماراتي.'),
      items: [
        { quote: L('Sage guided us through a complex VAT audit — zero penalties, zero stress. Their team knew the regulations inside out.', 'أرشدنا فريق سيج خلال تدقيق معقد لضريبة القيمة المضافة — بدون غرامات وبدون ضغوط. فريقهم يعرف اللوائح جيداً.'), author: 'Fatima Al-Suwaidi', role: L('Finance Director', 'مديرة مالية') },
        { quote: L('From bookkeeping to our first external audit, Sage scaled their services as we grew. True partners, not just providers.', 'من مسك الدفاتر إلى أول تدقيق خارجي لنا، وسّع فريق سيج خدماتهم مع نمونا. شركاء حقيقيون وليسوا مجرد مقدمي خدمات.'), author: 'Arjun Mehta', role: L('Founder, Tectonic DMCC', 'مؤسس Tectonic DMCC') },
        { quote: L('Golden Visa, trade license, bank account — Sage handled our entire corporate setup in under three weeks.', 'الإقامة الذهبية، الرخصة التجارية، الحساب المصرفي — تولى فريق سيج تأسيس شركتنا بالكامل في أقل من ثلاثة أسابيع.'), author: 'Lina Haddad', role: L('Partner, Vida Interiors', 'شريكة، فيدا إنتيريورز') },
      ],
    },
    faq: {
      badge: L('FAQ', 'الأسئلة الشائعة'),
      title: L('Frequently Asked Questions', 'الأسئلة الشائعة'),
      subtitle: L('Quick answers to common questions about UAE tax compliance and our services.', 'إجابات سريعة عن الأسئلة الشائعة حول الامتثال الضريبي في الإمارات وخدماتنا.'),
      items: [
        { question: L('What is the UAE corporate tax rate?', 'ما هو معدل ضريبة الشركات في الإمارات؟'), answer: L('The standard rate is 9% on taxable income exceeding AED 375,000. Income up to that threshold is taxed at 0%. Qualifying Free Zone businesses may benefit from a 0% rate on qualifying income.', 'المعدل القياسي هو 9% على الدخل الخاضع للضريبة الذي يتجاوز 375,000 درهم. الدخل حتى هذا الحد يخضع لمعدل 0%. قد تستفيد الشركات المؤهلة في المناطق الحرة من معدل 0% على الدخل المؤهل.') },
        { question: L('Do I need to register for VAT in the UAE?', 'هل أحتاج إلى التسجيل في ضريبة القيمة المضافة في الإمارات؟'), answer: L('VAT registration is mandatory if your taxable supplies and imports exceed AED 375,000 annually. Voluntary registration is available if they exceed AED 187,500. Sage can handle your full registration process.', 'التسجيل إلزامي إذا تجاوزت توريداتك ووارداتك الخاضعة للضريبة 375,000 درهم سنوياً، والتسجيل الطوعي متاح إذا تجاوزت 187,500 درهم. يمكن لسيج تولي عملية التسجيل بالكامل.') },
        { question: L('What records must I maintain for FTA compliance?', 'ما السجلات التي يجب الاحتفاظ بها للامتثال لمتطلبات الهيئة الاتحادية للضرائب؟'), answer: L("Businesses must keep financial records, invoices, credit/debit notes, import/export documents and tax returns for at least 5 years after the end of the relevant tax period (longer for real-estate records). Sage's bookkeeping services keep you compliant.", 'يجب على الشركات الاحتفاظ بالسجلات المالية والفواتير وإشعارات الدائن والمدين ووثائق الاستيراد والتصدير والإقرارات الضريبية لمدة 5 سنوات على الأقل بعد نهاية الفترة الضريبية المعنية (ومدة أطول لسجلات العقارات). خدمات مسك الدفاتر من سيج تضمن امتثالك.') },
        { question: L('How can Sage help during a tax audit?', 'كيف يمكن لسيج المساعدة أثناء التدقيق الضريبي؟'), answer: L('We provide end-to-end audit support — from preparing documentation and reconciling records to representing you before the FTA. Our goal is zero penalties.', 'نقدم دعماً شاملاً أثناء التدقيق — من إعداد الوثائق ومطابقة السجلات إلى تمثيلك أمام الهيئة الاتحادية للضرائب. هدفنا صفر غرامات.') },
        { question: L('Do Free Zone companies pay corporate tax?', 'هل تدفع شركات المناطق الحرة ضريبة الشركات؟'), answer: L("Qualifying Free Zone Persons can benefit from a 0% corporate tax rate on qualifying income, provided they meet the substance requirements and don't elect to be taxed at the standard rate.", 'يمكن للأشخاص المؤهلين في المناطق الحرة الاستفادة من معدل 0% على الدخل المؤهل، بشرط استيفاء متطلبات الجوهر الاقتصادي وعدم اختيار الخضوع للمعدل القياسي.') },
      ],
    },
    contact: {
      badge: L('Get in Touch', 'تواصل معنا'),
      title: L("Let's Talk About Your Business", 'لنتحدث عن أعمالك'),
      subtitle: L('Book a free consultation or send us a message. We respond within 24 hours.', 'احجز استشارة مجانية أو أرسل لنا رسالة. نرد خلال 24 ساعة.'),
    },
  },

  team: {
    badge: L('Leadership', 'القيادة'),
    title: L('Our Leadership', 'فريق القيادة'),
    members: [
      {
        name: L('Jay Kakra', 'جاي كاكرا'),
        role: L('Managing Partner', 'الشريك الإداري'),
        bio: L('Leading strategic direction and client advisory with deep expertise in UAE tax regulations and corporate compliance.', 'يقود التوجه الاستراتيجي والاستشارات للعملاء بخبرة عميقة في اللوائح الضريبية الإماراتية والامتثال المؤسسي.'),
        image: IMG(U('photo-1560250097-0b93528c311a', 500), 'Jay Kakra', 'جاي كاكرا'),
      },
      {
        name: L('Aashna Malkhani', 'آشنا مالخاني'),
        role: L('Partner', 'شريكة'),
        bio: L('Overseeing accounting, audit operations, and client engagement with a focus on delivering exceptional service quality.', 'تشرف على عمليات المحاسبة والتدقيق والعلاقة مع العملاء مع التركيز على جودة خدمة استثنائية.'),
        image: IMG(U('photo-1573496359142-b8d87734a5a2', 500), 'Aashna Malkhani', 'آشنا مالخاني'),
      },
    ],
  },

  aboutPage: {
    hero: {
      badge: L('About Us', 'من نحن'),
      title: L('Your Trusted UAE Tax Partner', 'شريكك الضريبي الموثوق في الإمارات'),
      subtitle: L('Comprehensive tax and accounting solutions for companies and individuals across the UAE', 'حلول ضريبية ومحاسبية شاملة للشركات والأفراد في جميع أنحاء الإمارات'),
      image: IMG(U('photo-1600880292203-757bb62b4baf', 1600), '', ''),
    },
    story: {
      title: L('Our Story', 'قصتنا'),
      body: L(
        'Sage Global Advisory was founded with a clear vision: to provide high-quality tax and accounting consulting services in the UAE. We have earned a strong reputation as a trusted partner helping businesses navigate the complexities of tax regulations.\n\nOur team comprises experienced professionals with deep expertise in taxation, accounting, and business consulting. We deliver customized solutions that meet each client\'s unique needs.',
        'تأسست سيج جلوبال أدفايزري برؤية واضحة: تقديم خدمات استشارات ضريبية ومحاسبية عالية الجودة في الإمارات. اكتسبنا سمعة قوية كشريك موثوق يساعد الشركات على التعامل مع تعقيدات اللوائح الضريبية.\n\nيتكون فريقنا من مختصين ذوي خبرة عميقة في الضرائب والمحاسبة واستشارات الأعمال. نقدم حلولاً مخصصة تلبي احتياجات كل عميل.'
      ),
      image: IMG(U('photo-1497366216548-37526070297c', 1200), 'Our office', 'مكتبنا'),
    },
    mission: {
      title: L('Our Mission', 'رسالتنا'),
      text: L('To deliver high-quality tax and accounting consulting that helps clients achieve their objectives while ensuring complete regulatory compliance.', 'تقديم استشارات ضريبية ومحاسبية عالية الجودة تساعد العملاء على تحقيق أهدافهم مع ضمان الامتثال التنظيمي الكامل.'),
    },
    vision: {
      title: L('Our Vision', 'رؤيتنا'),
      text: L('To be the leading and most trusted provider of tax consulting in the UAE, recognized for excellence, innovation, and commitment to client success.', 'أن نكون المزود الرائد والأكثر ثقة للاستشارات الضريبية في الإمارات، معروفين بالتميز والابتكار والالتزام بنجاح العملاء.'),
    },
    values: {
      title: L('Our Values', 'قيمنا'),
      items: [
        { title: L('Excellence', 'التميز'), text: L('Meticulous attention to detail and accuracy in every engagement.', 'اهتمام دقيق بالتفاصيل والدقة في كل ارتباط.') },
        { title: L('Integrity', 'النزاهة'), text: L('Complete transparency and ethical standards in all dealings.', 'شفافية كاملة ومعايير أخلاقية في جميع التعاملات.') },
        { title: L('Innovation', 'الابتكار'), text: L('Latest technologies and methodologies for cutting-edge solutions.', 'أحدث التقنيات والمنهجيات لحلول متقدمة.') },
        { title: L('Client Focus', 'التركيز على العميل'), text: L('Your success is our priority — services tailored to your needs.', 'نجاحك أولويتنا — خدمات مصممة وفق احتياجاتك.') },
      ],
    },
    cta: {
      title: L('Ready to Work With Us?', 'جاهز للعمل معنا؟'),
      text: L('Contact us today for a free consultation', 'تواصل معنا اليوم للحصول على استشارة مجانية'),
      button: L('Get in Touch', 'تواصل معنا'),
    },
  },

  servicesPage: {
    hero: {
      badge: L('Our Services', 'خدماتنا'),
      title: L('Comprehensive Tax & Business Solutions', 'حلول ضريبية وتجارية شاملة'),
      subtitle: L('From VAT compliance to company formation — end-to-end advisory built for UAE businesses.', 'من الامتثال لضريبة القيمة المضافة إلى تأسيس الشركات — استشارات متكاملة مصممة لأعمال الإمارات.'),
      image: IMG(U('photo-1526495124232-a04e1849168c', 1600), '', ''),
    },
    categories: {
      tax: { title: L('Tax Consultancy', 'الاستشارات الضريبية'), text: L("Navigate UAE's evolving tax landscape with expert guidance on VAT, Corporate Tax, and Excise Tax.", 'تنقّل في المشهد الضريبي المتطور في الإمارات بإرشاد الخبراء.'), menuText: L('VAT, Corporate & Excise Tax advisory', 'استشارات ضريبة القيمة المضافة والشركات والانتقائية') },
      accounting: { title: L('Accounting & Auditing', 'المحاسبة والتدقيق'), text: L('IFRS-compliant financial reporting, bookkeeping, and specialized audit services.', 'تقارير مالية متوافقة مع المعايير الدولية وخدمات التدقيق المتخصصة.'), menuText: L('IFRS-compliant reporting & audit services', 'تقارير متوافقة مع المعايير الدولية وخدمات التدقيق') },
      corporate: { title: L('Corporate Services', 'خدمات الشركات'), text: L('Company registration, PRO services, Golden Visa, and full business setup support.', 'تسجيل الشركات وخدمات العلاقات الحكومية والإقامة الذهبية.'), menuText: L('Business setup, visa & PRO services', 'تأسيس الشركات والتأشيرات والخدمات الحكومية') },
    },
    detailBadge: L('Specialized Service', 'خدمة متخصصة'),
    cta: {
      title: L('Not Sure Where to Start?', 'لست متأكداً من أين تبدأ؟'),
      text: L("Book a free consultation and we'll recommend the right services for your business.", 'احجز استشارة مجانية وسنوصي بالخدمات المناسبة لأعمالك.'),
      button: L('Book a Free Consultation', 'احجز استشارة مجانية'),
    },
    detailCta: {
      title: L('Ready to Get Started?', 'هل أنت مستعد للبدء؟'),
      text: L('Book a free consultation with one of our experts today', 'احجز استشارة مجانية مع أحد خبرائنا اليوم'),
      button: L('Schedule Now', 'حدد موعداً الآن'),
    },
  },

  contactPage: {
    hero: {
      badge: L('Get in Touch', 'تواصل معنا'),
      title: L("We're Here to Help", 'نحن هنا لمساعدتك'),
      subtitle: L('Contact us today for a free consultation about our tax and accounting services', 'تواصل معنا اليوم للحصول على استشارة مجانية حول خدماتنا الضريبية والمحاسبية'),
      image: IMG(U('photo-1546412414-e1885259563a', 1600), '', ''),
    },
    formTitle: L('Send us a Message', 'أرسل لنا رسالة'),
    whatsapp: {
      title: L('Quick WhatsApp Contact', 'تواصل سريع عبر واتساب'),
      text: L("Prefer WhatsApp? Send us a direct message and we'll get back to you as quickly as possible.", 'هل تفضل واتساب؟ أرسل لنا رسالة مباشرة وسنرد عليك في أسرع وقت.'),
      button: L('Message on WhatsApp', 'راسلنا على واتساب'),
    },
    cta: {
      title: L("Can't Find What You're Looking For?", 'لم تجد ما تبحث عنه؟'),
      text: L('Check our FAQ section or browse our services', 'اطلع على الأسئلة الشائعة أو تصفح خدماتنا'),
    },
  },

  blogPage: {
    heroImage: IMG(U('photo-1526495124232-a04e1849168c', 1600), '', ''),
    defaultPostImage: IMG(U('photo-1504711434969-e33886168d6c', 1000), '', ''),
  },
};

/**
 * Human-readable descriptions of where each part of the tree appears on the site.
 * Used by the CMS editor (section titles) and by the AI agent (to find the "obvious location").
 */
export const SECTION_GUIDE = [
  { path: 'site', label: 'Company details', where: 'Used everywhere: header logo text, footer, contact details, WhatsApp button, SEO title/description, legal pages.' },
  { path: 'home.hero', label: 'Home – Top banner (hero)', where: 'The big first section on the home page with the headline, buttons and background image. Use "\\n" in the title to break onto a second (gold) line.' },
  { path: 'home.counters', label: 'Home – Number counters', where: 'The white box with animated numbers just below the home banner.' },
  { path: 'home.about', label: 'Home – Why Sage', where: 'Home page section with mission, vision, team photo and 4 feature points.' },
  { path: 'home.services', label: 'Home – Services cards', where: 'Three service cards with photos on the home page. "slug" links to a service page.' },
  { path: 'home.testimonials', label: 'Home – Client testimonials', where: 'Client quote cards on the home page.' },
  { path: 'home.faq', label: 'Home – FAQ', where: 'Frequently asked questions near the bottom of the home page.' },
  { path: 'home.contact', label: 'Home – Contact section', where: 'Heading above the contact form at the bottom of the home page.' },
  { path: 'team', label: 'Leadership team', where: 'Leadership cards (photo, name, role, bio). Shown on the home page and the About page.' },
  { path: 'aboutPage', label: 'About page', where: 'The /about page: banner, our story, mission, vision, values, call to action.' },
  { path: 'servicesPage', label: 'Services pages', where: 'The /services overview banner, category headings (also used in the top menu), and the call-to-action boxes on every service page.' },
  { path: 'contactPage', label: 'Contact page', where: 'The /contact page banner, form heading, WhatsApp box and bottom call to action.' },
  { path: 'blogPage', label: 'Insights (blog) page', where: 'Banner image on /blog and the fallback image for posts without their own picture.' },
];

/** Recommended generation sizes for image slots, by path pattern. */
export function recommendedImageSize(path) {
  if (/team\.members\.\d+\.image$/.test(path)) return '1024x1024';
  return '1536x1024';
}
