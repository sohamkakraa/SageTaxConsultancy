// Cookie Policy. Keep the table in sync with what the site actually sets (lib/consent.js, ConsentGatedGA,
// ConsentGatedMap, next-intl, CMS session).

export const COOKIES_UPDATED = { en: '1 October 2026', ar: '1 أكتوبر 2026' };

export function cookiePolicy(d, locale) {
  if (locale === 'ar') {
    return {
      title: 'سياسة ملفات تعريف الارتباط',
      badge: 'ملفات تعريف الارتباط',
      updated: COOKIES_UPDATED.ar,
      intro: ['ملفات تعريف الارتباط («الكوكيز») ملفات نصية صغيرة تُخزَّن على جهازك. توضح هذه السياسة الملفات التي يستخدمها موقعنا وسبب استخدامها وكيفية التحكم فيها، وفقاً لقانون حماية البيانات الشخصية الإماراتي (المرسوم بقانون اتحادي رقم (45) لسنة 2021).'],
      sections: [
        { h: 'موافقتك', p: ['نستخدم الملفات الضرورية فقط بشكل افتراضي. لا تُفعَّل ملفات التحليلات أو الوسائط الخارجية إلا إذا وافقت عليها من خلال الشريط الذي يظهر عند زيارتك الأولى. يمكنك القبول أو الرفض بنفس السهولة، وتغيير اختيارك أو سحب موافقتك في أي وقت عبر «إعدادات ملفات تعريف الارتباط» أسفل كل صفحة. نعيد طلب موافقتك بعد 12 شهراً أو عند تغيير هذه السياسة.'] },
        {
          h: 'الملفات التي نستخدمها',
          table: {
            head: ['الاسم', 'الفئة', 'الغرض', 'المدة'],
            rows: [
              ['sga_consent', 'ضرورية', 'حفظ اختياراتك بشأن ملفات تعريف الارتباط', '12 شهراً'],
              ['NEXT_LOCALE', 'ضرورية', 'تذكر اللغة المختارة (العربية/الإنجليزية)', 'حتى إغلاق المتصفح'],
              ['sga_cms_session', 'ضرورية', 'جلسة تسجيل الدخول الآمنة لفريق إدارة المحتوى فقط (لا تُستخدم للزوار)', '12 ساعة'],
              ['_ga, _ga_<ID>', 'تحليلات (اختيارية)', 'Google Analytics 4 — قياس استخدام الموقع بشكل مجمع، دون إعلانات أو إشارات Google', 'حتى 13 شهراً'],
              ['ملفات Google Maps', 'وسائط خارجية (اختيارية)', 'عرض خريطة الموقع المضمنة في صفحة التواصل', 'تحددها Google'],
            ],
          },
          after: ['لا نستخدم ملفات الإعلانات أو التتبع عبر المواقع.'],
        },
        { h: 'التحكم عبر المتصفح', p: ['يمكنك أيضاً حذف الملفات أو حظرها من إعدادات متصفحك. قد يؤدي حظر الملفات الضرورية إلى عدم عمل بعض أجزاء الموقع.'] },
        { h: 'التواصل', p: [`لأي استفسار: ${d.privacyEmail}. لمزيد من المعلومات عن بياناتك راجع سياسة الخصوصية.`] },
      ],
    };
  }
  return {
    title: 'Cookie Policy',
    badge: 'Cookies',
    updated: COOKIES_UPDATED.en,
    intro: ['Cookies are small text files stored on your device. This policy explains which cookies our website uses, why, and how you can control them, in line with the UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021).'],
    sections: [
      { h: 'Your consent', p: ['By default we only use strictly necessary cookies. Analytics and external-media cookies are only enabled if you agree through the banner shown on your first visit. Rejecting is as easy as accepting, and you can change or withdraw your choice at any time via "Cookie settings" at the bottom of every page. We ask again after 12 months or when this policy changes.'] },
      {
        h: 'Cookies we use',
        table: {
          head: ['Name', 'Category', 'Purpose', 'Duration'],
          rows: [
            ['sga_consent', 'Strictly necessary', 'Stores your cookie choices', '12 months'],
            ['NEXT_LOCALE', 'Strictly necessary', 'Remembers your language (English/Arabic)', 'Until you close the browser'],
            ['sga_cms_session', 'Strictly necessary', 'Secure sign-in for our content team only (never set for visitors)', '12 hours'],
            ['_ga, _ga_<ID>', 'Analytics (optional)', 'Google Analytics 4 — aggregated site usage; Google signals and ad personalisation disabled', 'Up to 13 months'],
            ['Google Maps cookies', 'External media (optional)', 'Shows the embedded location map on the contact page', 'Set by Google'],
          ],
        },
        after: ['We do not use advertising or cross-site tracking cookies.'],
      },
      { h: 'Browser controls', p: ['You can also delete or block cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from working.'] },
      { h: 'Contact', p: [`Questions: ${d.privacyEmail}. For more about how we handle personal data, see our Privacy Policy.`] },
    ],
  };
}
