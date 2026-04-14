'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import IMAGES from '@/lib/images';
import {
  ChevronRight, Newspaper, Clock, ArrowRight, ExternalLink,
  Filter, FileText, BookOpen, Landmark, Search, X,
} from 'lucide-react';

/**
 * Official UAE government resources — laws, circulars, guides.
 * These are curated links to verified government publications.
 */
const GOVERNMENT_RESOURCES = [
  {
    title: 'Federal Decree-Law No. 47 of 2022 on Taxation of Corporations and Businesses',
    titleAr: 'المرسوم بقانون اتحادي رقم 47 لسنة 2022 بشأن الضريبة على الشركات والأعمال',
    source: 'Ministry of Finance',
    sourceAr: 'وزارة المالية',
    url: 'https://tax.gov.ae/en/corporate.tax/corporate.tax.law.aspx',
    category: 'corporate-tax',
    type: 'law',
    date: '2022-12-09',
  },
  {
    title: 'Federal Decree-Law No. 8 of 2017 on Value Added Tax',
    titleAr: 'المرسوم بقانون اتحادي رقم 8 لسنة 2017 بشأن ضريبة القيمة المضافة',
    source: 'Federal Tax Authority',
    sourceAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae/en/taxes/vat.aspx',
    category: 'vat',
    type: 'law',
    date: '2017-11-27',
  },
  {
    title: 'Cabinet Decision No. 85 of 2022 — Qualifying Free Zone Persons',
    titleAr: 'قرار مجلس الوزراء رقم 85 لسنة 2022 — الأشخاص المؤهلون في المنطقة الحرة',
    source: 'UAE Cabinet',
    sourceAr: 'مجلس الوزراء',
    url: 'https://tax.gov.ae/en/corporate.tax/free.zone.aspx',
    category: 'corporate-tax',
    type: 'regulation',
    date: '2023-06-01',
  },
  {
    title: 'Corporate Tax Registration Guide — FTA',
    titleAr: 'دليل التسجيل لضريبة الشركات — الهيئة الاتحادية للضرائب',
    source: 'Federal Tax Authority',
    sourceAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae/en/corporate.tax/corporate.tax.registration.aspx',
    category: 'corporate-tax',
    type: 'guide',
    date: '2023-05-01',
  },
  {
    title: 'VAT Return Filing Guide',
    titleAr: 'دليل تقديم إقرار ضريبة القيمة المضافة',
    source: 'Federal Tax Authority',
    sourceAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae/en/taxes/vat/vat.return.aspx',
    category: 'vat',
    type: 'guide',
    date: '2024-01-15',
  },
  {
    title: 'Excise Tax — Taxable Goods and Rates',
    titleAr: 'الضريبة الانتقائية — السلع الخاضعة والمعدلات',
    source: 'Federal Tax Authority',
    sourceAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae/en/taxes/excise.tax.aspx',
    category: 'excise-tax',
    type: 'guide',
    date: '2023-03-01',
  },
  {
    title: 'UAE Golden Visa — Eligibility Categories and Requirements',
    titleAr: 'الإقامة الذهبية في الإمارات — فئات الأهلية والمتطلبات',
    source: 'ICP (Federal Authority for Identity, Citizenship, Customs & Port Security)',
    sourceAr: 'الهيئة الاتحادية للهوية والجنسية والجمارك وأمن المنافذ',
    url: 'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/golden-visa',
    category: 'golden-visa',
    type: 'guide',
    date: '2024-06-01',
  },
  {
    title: 'Transfer Pricing Rules and Documentation Requirements',
    titleAr: 'قواعد التسعير التحويلي ومتطلبات التوثيق',
    source: 'Federal Tax Authority',
    sourceAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae/en/corporate.tax/transfer.pricing.aspx',
    category: 'corporate-tax',
    type: 'regulation',
    date: '2023-06-01',
  },
  {
    title: 'Company Registration in Dubai — DED Guidelines',
    titleAr: 'تسجيل الشركات في دبي — إرشادات دائرة الاقتصاد والسياحة',
    source: 'Dubai Economy & Tourism',
    sourceAr: 'دائرة الاقتصاد والسياحة في دبي',
    url: 'https://www.dubaided.gov.ae/en/pages/default.aspx',
    category: 'company-registration',
    type: 'guide',
    date: '2024-01-01',
  },
  {
    title: 'UAE Trademark Registration — Ministry of Economy',
    titleAr: 'تسجيل العلامات التجارية في الإمارات — وزارة الاقتصاد',
    source: 'Ministry of Economy',
    sourceAr: 'وزارة الاقتصاد',
    url: 'https://www.moec.gov.ae/en/trademarks',
    category: 'trademark',
    type: 'guide',
    date: '2024-01-01',
  },
];

const FILTER_CATEGORIES = [
  { key: 'all', en: 'All', ar: 'الكل' },
  { key: 'vat', en: 'VAT', ar: 'ضريبة القيمة المضافة' },
  { key: 'corporate-tax', en: 'Corporate Tax', ar: 'ضريبة الشركات' },
  { key: 'excise-tax', en: 'Excise Tax', ar: 'الضريبة الانتقائية' },
  { key: 'golden-visa', en: 'Golden Visa', ar: 'الإقامة الذهبية' },
  { key: 'company-registration', en: 'Company Registration', ar: 'تسجيل الشركات' },
  { key: 'trademark', en: 'Trademark', ar: 'العلامات التجارية' },
  { key: 'blog', en: 'Sage Blog', ar: 'مدونة سيج' },
];

const CONTENT_TYPES = [
  { key: 'all', en: 'All Types', ar: 'جميع الأنواع' },
  { key: 'news', en: 'News', ar: 'أخبار' },
  { key: 'law', en: 'Laws & Decrees', ar: 'قوانين ومراسيم' },
  { key: 'regulation', en: 'Regulations', ar: 'لوائح' },
  { key: 'guide', en: 'Guides & Resources', ar: 'أدلة وموارد' },
  { key: 'blog', en: 'Blog Posts', ar: 'مقالات المدونة' },
];

function getTypeIcon(type) {
  switch (type) {
    case 'law': return Landmark;
    case 'regulation': return FileText;
    case 'guide': return BookOpen;
    default: return Newspaper;
  }
}

function getTypeColor(type) {
  switch (type) {
    case 'law': return 'bg-red-100 text-red-700';
    case 'regulation': return 'bg-amber-100 text-amber-700';
    case 'guide': return 'bg-blue-100 text-blue-700';
    case 'blog': return 'bg-sage-100 text-sage-700';
    default: return 'bg-gray-100 text-gray-700';
  }
}

function getTypeLabel(type, isAr) {
  switch (type) {
    case 'law': return isAr ? 'قانون' : 'Law';
    case 'regulation': return isAr ? 'لائحة' : 'Regulation';
    case 'guide': return isAr ? 'دليل' : 'Guide';
    case 'blog': return isAr ? 'مقال' : 'Blog';
    default: return isAr ? 'خبر' : 'News';
  }
}

export default function BlogPage({ params }) {
  const { locale } = params;
  const isAr = locale === 'ar';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?limit=50');
        if (res.ok) {
          const json = await res.json();
          const data = json.data || [];
          setArticles(data);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Merge government resources into the feed
  const govResources = GOVERNMENT_RESOURCES.map((r) => ({
    title: isAr ? r.titleAr : r.title,
    excerpt: '',
    url: r.url,
    source: isAr ? r.sourceAr : r.source,
    sourceName: isAr ? r.sourceAr : r.source,
    published_at: r.date,
    publishedAt: r.date,
    category: r.category,
    type: r.type,
    isExternal: true,
    isGovernment: true,
  }));

  // Normalize articles with type
  const normalizedArticles = articles.map((a) => ({
    ...a,
    type: a.isExternal === false ? 'blog' : 'news',
  }));

  // Combine all content
  const allContent = [...normalizedArticles, ...govResources];

  // Apply filters
  const filteredContent = allContent
    .filter((item) => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'blog') {
          return item.type === 'blog';
        }
        return item.category === activeCategory;
      }
      return true;
    })
    .filter((item) => {
      if (activeType !== 'all') return item.type === activeType;
      return true;
    })
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return item.title?.toLowerCase().includes(q) || item.excerpt?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      // Blog posts first, then by date
      if (a.type === 'blog' && b.type !== 'blog') return -1;
      if (a.type !== 'blog' && b.type === 'blog') return 1;
      return new Date(b.published_at || b.publishedAt).getTime() - new Date(a.published_at || a.publishedAt).getTime();
    });

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isAr ? 'الرؤى والموارد' : 'Insights & Resources'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-16 md:py-20 bg-navy-950 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMAGES.dubaiBusiness} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/85" />
        </div>
        <div className="relative container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <Newspaper className="w-3.5 h-3.5" />
            {isAr ? 'الرؤى والموارد' : 'Insights & Resources'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isAr ? 'أخبار وموارد وتحديثات تنظيمية' : 'News, Resources & Regulatory Updates'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'ابقَ على اطلاع بأحدث القوانين واللوائح الضريبية في الإمارات، والأدلة الرسمية، وأخبار الأعمال'
              : 'Stay informed with the latest UAE tax laws, official guides, regulatory updates, and industry news from verified sources'}
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="container-max space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في الأخبار والموارد...' : 'Search news & resources...'}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mr-1">
              <Filter className="w-3.5 h-3.5" />
              {isAr ? 'التصنيف:' : 'Category:'}
            </span>
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeCategory === cat.key
                    ? 'bg-sage-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-2">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mr-1">
              <FileText className="w-3.5 h-3.5" />
              {isAr ? 'النوع:' : 'Type:'}
            </span>
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.key}
                onClick={() => setActiveType(type.key)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  activeType === type.key
                    ? 'bg-navy-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAr ? type.ar : type.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {/* Results count */}
          <p className="text-sm text-gray-500 mb-6">
            {isAr
              ? `${filteredContent.length} نتيجة`
              : `${filteredContent.length} result${filteredContent.length !== 1 ? 's' : ''}`}
          </p>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl p-5 animate-pulse space-y-4">
                  <div className="h-40 bg-gray-200 rounded-lg" />
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          ) : filteredContent.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item, idx) => {
                const isExternal = item.isExternal !== false && item.url && item.url.startsWith('http');
                const TypeIcon = getTypeIcon(item.type);
                const typeColor = getTypeColor(item.type);
                const typeLabel = getTypeLabel(item.type, isAr);

                return (
                  <article key={idx} className="card-hover overflow-hidden group">
                    <div className="h-44 bg-gradient-to-br from-sage-100 to-navy-100 overflow-hidden relative">
                      <img
                        src={item.featured_image || IMAGES.blogDefault}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Type badge */}
                      <div className={`absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${typeColor}`}>
                        <TypeIcon className="w-3 h-3" />
                        {typeLabel}
                      </div>
                      {item.isGovernment && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          <Landmark className="w-3 h-3" />
                          {isAr ? 'رسمي' : 'Official'}
                        </div>
                      )}
                    </div>
                    <div className="p-5 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {item.sourceName || item.source}
                        </span>
                        {isExternal && <ExternalLink className="w-3 h-3 text-gray-400" />}
                      </div>
                      <h3 className="text-base font-bold text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors">
                        {item.title}
                      </h3>
                      {item.excerpt && (
                        <p className="text-sm text-gray-500 line-clamp-2">{item.excerpt}</p>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.published_at ? new Date(item.published_at).toLocaleDateString(locale) : ''}
                        </span>
                        {isExternal ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sage-700 hover:text-sage-800 font-semibold text-xs"
                          >
                            {isAr ? 'اقرأ المصدر' : 'Read Source'}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={`/${locale}/blog/${item.slug}`}
                            className="inline-flex items-center gap-1 text-sage-700 hover:text-sage-800 font-semibold text-xs"
                          >
                            {isAr ? 'اقرأ المزيد' : 'Read More'}
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-lg text-gray-500">
                {isAr ? 'لا توجد نتائج مطابقة' : 'No matching results'}
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setActiveType('all'); setSearchQuery(''); }}
                className="btn-secondary text-sm py-2 px-4"
              >
                {isAr ? 'مسح الفلاتر' : 'Clear Filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Official Resources Section */}
      <section className="section-padding bg-white">
        <div className="container-max space-y-8">
          <div className="space-y-3">
            <span className="badge">
              <Landmark className="w-3.5 h-3.5" />
              {isAr ? 'مصادر رسمية' : 'Official Resources'}
            </span>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">
              {isAr ? 'روابط حكومية مهمة' : 'Key Government Links'}
            </h2>
            <p className="text-gray-500 max-w-2xl">
              {isAr
                ? 'روابط مباشرة للموارد الرسمية من الهيئة الاتحادية للضرائب والجهات الحكومية الأخرى'
                : 'Direct links to official resources from the Federal Tax Authority and other UAE government bodies'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Federal Tax Authority (FTA)', nameAr: 'الهيئة الاتحادية للضرائب', url: 'https://tax.gov.ae', desc: 'VAT, Corporate Tax, Excise Tax registration and filing', descAr: 'تسجيل وتقديم ضريبة القيمة المضافة وضريبة الشركات' },
              { name: 'Ministry of Finance', nameAr: 'وزارة المالية', url: 'https://www.mof.gov.ae', desc: 'Tax legislation and fiscal policy', descAr: 'التشريعات الضريبية والسياسة المالية' },
              { name: 'UAE Government Portal', nameAr: 'بوابة حكومة الإمارات', url: 'https://u.ae', desc: 'Golden Visa, business setup, residency', descAr: 'الإقامة الذهبية وتأسيس الأعمال والإقامة' },
              { name: 'Dubai Economy & Tourism', nameAr: 'دائرة الاقتصاد والسياحة', url: 'https://www.dubaided.gov.ae', desc: 'Trade licenses and company registration', descAr: 'الرخص التجارية وتسجيل الشركات' },
            ].map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-sage-300 hover:bg-sage-50/50 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-sm text-navy-950 group-hover:text-sage-700 transition-colors">
                    {isAr ? link.nameAr : link.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{isAr ? link.descAr : link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isAr ? 'هل تحتاج إرشاد متخصص؟' : 'Need Expert Guidance?'}
          </h2>
          <p className="text-sage-200 max-w-lg mx-auto">
            {isAr
              ? 'فريقنا يساعدك على فهم اللوائح الضريبية والامتثال لها بشكل كامل'
              : 'Our team helps you understand and fully comply with UAE tax regulations'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isAr ? 'احجز استشارة مجانية' : 'Book a Free Consultation'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
