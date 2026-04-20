'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/lib/navigation';
import IMAGES, { CATEGORY_IMAGES } from '@/lib/images';
import {
  ChevronRight, Newspaper, Clock, ArrowRight, ExternalLink,
  Filter, FileText, BookOpen, Landmark, Search, X,
  Download, Scale, Building2, Mail, ScrollText, FileDown,
} from 'lucide-react';

/**
 * Key UAE Government Portals — root domains only (these always work).
 * NOT deep-linked to specific pages that may move/break.
 */
const GOV_PORTALS = [
  {
    name: 'Federal Tax Authority (FTA)',
    nameAr: 'الهيئة الاتحادية للضرائب',
    url: 'https://tax.gov.ae',
    desc: 'VAT, Corporate Tax, Excise Tax — registration, filing, and compliance',
    descAr: 'ضريبة القيمة المضافة وضريبة الشركات — التسجيل والتقديم والامتثال',
  },
  {
    name: 'Ministry of Finance',
    nameAr: 'وزارة المالية',
    url: 'https://www.mof.gov.ae',
    desc: 'Tax legislation, fiscal policy, and government budgets',
    descAr: 'التشريعات الضريبية والسياسة المالية وميزانيات الحكومة',
  },
  {
    name: 'UAE Government Portal',
    nameAr: 'بوابة حكومة الإمارات',
    url: 'https://u.ae',
    desc: 'Golden Visa, business setup, residency, and all government services',
    descAr: 'الإقامة الذهبية وتأسيس الأعمال والإقامة وجميع الخدمات الحكومية',
  },
  {
    name: 'Dubai Economy & Tourism (DET)',
    nameAr: 'دائرة الاقتصاد والسياحة في دبي',
    url: 'https://www.det.gov.ae',
    desc: 'Trade licenses, company registration, and commercial permits',
    descAr: 'الرخص التجارية وتسجيل الشركات والتصاريح التجارية',
  },
  {
    name: 'Ministry of Economy',
    nameAr: 'وزارة الاقتصاد',
    url: 'https://www.moec.gov.ae',
    desc: 'Trademark registration, anti-money laundering, and economic policies',
    descAr: 'تسجيل العلامات التجارية ومكافحة غسل الأموال والسياسات الاقتصادية',
  },
  {
    name: 'ICP — Identity, Citizenship & Port Security',
    nameAr: 'الهيئة الاتحادية للهوية والجنسية وأمن المنافذ',
    url: 'https://icp.gov.ae',
    desc: 'Golden Visa applications, Emirates ID, and entry permits',
    descAr: 'طلبات الإقامة الذهبية والهوية الإماراتية وتصاريح الدخول',
  },
];

const FILTER_CATEGORIES = [
  { key: 'all', en: 'All', ar: 'الكل' },
  { key: 'vat', en: 'VAT', ar: 'ضريبة القيمة المضافة' },
  { key: 'corporate-tax', en: 'Corporate Tax', ar: 'ضريبة الشركات' },
  { key: 'golden-visa', en: 'Golden Visa', ar: 'الإقامة الذهبية' },
  { key: 'company-registration', en: 'Company Setup', ar: 'تأسيس الشركات' },
  { key: 'accounting', en: 'Accounting & Audit', ar: 'المحاسبة والتدقيق' },
];

export default function BlogPage({ params }) {
  const { locale } = params;
  const isAr = locale === 'ar';

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?limit=50');
        if (res.ok) {
          const json = await res.json();
          setArticles(json.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Apply filters
  const filteredArticles = articles
    .filter((item) => {
      if (activeCategory === 'all') return true;
      return item.category === activeCategory;
    })
    .filter((item) => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.title?.toLowerCase().includes(q) ||
        item.excerpt?.toLowerCase().includes(q) ||
        item.sourceName?.toLowerCase().includes(q)
      );
    });

  /**
   * Get a fallback image for a news card based on its category.
   */
  function getCardImage(item) {
    if (item.featured_image) return item.featured_image;
    return CATEGORY_IMAGES[item.category] || IMAGES.blogDefault;
  }

  /**
   * Get the appropriate icon for a CMS resource based on its type/icon_type.
   */
  function getResourceIcon(item) {
    if (!item.is_resource) return null;
    const iconType = item.icon_type === 'auto' ? item.resource_type : item.icon_type;
    switch (iconType) {
      case 'pdf': return <FileDown className="w-5 h-5" />;
      case 'law': return <Scale className="w-5 h-5" />;
      case 'government':
      case 'government-document': return <Building2 className="w-5 h-5" />;
      case 'newsletter': return <Mail className="w-5 h-5" />;
      case 'whitepaper':
      case 'guide': return <BookOpen className="w-5 h-5" />;
      case 'document': return <FileText className="w-5 h-5" />;
      case 'article':
      case 'external-link': return <ExternalLink className="w-5 h-5" />;
      default: return <ScrollText className="w-5 h-5" />;
    }
  }

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isAr ? 'الأخبار والرؤى' : 'News & Insights'}</span>
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
            {isAr ? 'الأخبار والرؤى' : 'News & Insights'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isAr ? 'آخر الأخبار والتحديثات التنظيمية' : 'Latest News & Regulatory Updates'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'ابقَ على اطلاع بأحدث أخبار الضرائب والأعمال في الإمارات من مصادر موثوقة'
              : 'Stay informed with the latest UAE tax and business news from trusted sources'}
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="py-5 bg-white border-b border-gray-100 sticky top-16 z-[45] shadow-sm">
        <div className="container-max space-y-4">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isAr ? 'ابحث في الأخبار...' : 'Search news...'}
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500/30 focus:border-sage-500"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 items-center">
            <Filter className="w-3.5 h-3.5 text-gray-400" />
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeCategory === cat.key
                    ? 'bg-navy-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isAr ? cat.ar : cat.en}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden animate-pulse">
                  <div className="h-44 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-5 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredArticles.length > 0 ? (
            <>
              <p className="text-sm text-gray-400 mb-6">
                {filteredArticles.length} {isAr ? 'نتيجة' : `article${filteredArticles.length !== 1 ? 's' : ''}`}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((item, idx) => {
                  const isExternal = item.isExternal !== false && item.url?.startsWith('http');
                  const isResource = item.is_resource;
                  const hasDocument = isResource && item.document_url;
                  const href = isExternal ? item.url : `/${locale}/blog/${item.slug}`;

                  return (
                    <a
                      key={idx}
                      href={href}
                      target={isExternal ? '_blank' : '_self'}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="card-hover overflow-hidden group flex flex-col cursor-pointer"
                    >
                      {/* Image or Resource Icon */}
                      {isResource ? (
                        <div className="h-44 bg-gradient-to-br from-sage-50 to-navy-50 flex items-center justify-center relative flex-shrink-0">
                          <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-sage-700">
                            {getResourceIcon(item)}
                          </div>
                          {item.is_pinned && (
                            <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                              Pinned
                            </div>
                          )}
                          {hasDocument && (
                            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                              <Download className="w-3.5 h-3.5 text-sage-700" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="h-44 bg-gradient-to-br from-sage-100 to-navy-100 overflow-hidden relative flex-shrink-0">
                          <img
                            src={getCardImage(item)}
                            alt=""
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.target.src = IMAGES.blogDefault; }}
                          />
                          {isExternal && (
                            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                              <ExternalLink className="w-3.5 h-3.5 text-gray-600" />
                            </div>
                          )}
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-5 space-y-2.5 flex-grow flex flex-col">
                        {/* Source + category + type badge */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-medium text-sage-700">
                            {item.sourceName || item.source || 'News'}
                          </span>
                          {isResource && item.resource_type && (
                            <span className="px-2 py-0.5 rounded-full bg-navy-50 text-navy-700 text-[10px] font-semibold uppercase tracking-wide">
                              {item.resource_type.replace(/-/g, ' ')}
                            </span>
                          )}
                          {item.category && item.category !== 'tax' && item.category !== 'general' && (
                            <span className="px-2 py-0.5 rounded-full bg-sage-50 text-sage-600 text-[10px] font-semibold uppercase tracking-wide">
                              {item.category.replace(/-/g, ' ')}
                            </span>
                          )}
                        </div>

                        {/* Title — show Arabic if available and locale is ar */}
                        <h3 className="text-base font-bold text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors flex-grow">
                          {isAr && item.title_ar ? item.title_ar : item.title}
                        </h3>

                        {/* Excerpt */}
                        {(item.excerpt || (isAr && item.excerpt_ar)) && (
                          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                            {isAr && item.excerpt_ar ? item.excerpt_ar : item.excerpt}
                          </p>
                        )}

                        {/* Document download link */}
                        {hasDocument && (
                          <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(item.document_url, '_blank'); }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-sage-700 bg-sage-50 px-3 py-1.5 rounded-lg hover:bg-sage-100 transition-colors w-fit"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {isAr ? 'تحميل المستند' : 'Download Document'}
                          </button>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 mt-auto border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.published_at
                              ? new Date(item.published_at).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
                              : ''}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sage-700 font-semibold text-xs">
                            {hasDocument
                              ? (isAr ? 'عرض التفاصيل' : 'View Details')
                              : isExternal
                                ? (isAr ? 'اقرأ المقال' : 'Read Article')
                                : (isAr ? 'اقرأ المزيد' : 'Read More')}
                            {isExternal ? <ExternalLink className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                          </span>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20 space-y-4">
              <Newspaper className="w-14 h-14 text-gray-300 mx-auto" />
              <h3 className="text-lg font-bold text-navy-950">
                {isAr ? 'لا توجد نتائج' : 'No Results Found'}
              </h3>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                {isAr
                  ? 'لم نعثر على مقالات مطابقة. حاول تعديل الفلتر أو البحث.'
                  : 'No articles match your current filters. Try adjusting your search or category.'}
              </p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="btn-secondary text-sm py-2 px-5"
              >
                {isAr ? 'مسح الفلاتر' : 'Clear Filters'}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Official Government Portals */}
      <section className="section-padding bg-white">
        <div className="container-max space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sage-50 border border-sage-200">
              <Landmark className="w-3.5 h-3.5 text-sage-700" />
              <span className="text-xs font-semibold text-sage-700 tracking-wide uppercase">
                {isAr ? 'بوابات رسمية' : 'Official Portals'}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold font-display text-navy-950">
              {isAr ? 'بوابات حكومية رئيسية' : 'Key Government Portals'}
            </h2>
            <p className="text-gray-500 max-w-2xl">
              {isAr
                ? 'روابط مباشرة للبوابات الرسمية للجهات الحكومية في الإمارات'
                : 'Direct links to official UAE government authority portals for tax, visa, and business services'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GOV_PORTALS.map((portal) => (
              <a
                key={portal.url}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 rounded-xl border border-gray-200 hover:border-sage-300 hover:shadow-md transition-all group bg-white"
              >
                <div className="w-10 h-10 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0 group-hover:bg-sage-200 transition-colors">
                  <Landmark className="w-5 h-5" />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-navy-950 group-hover:text-sage-700 transition-colors truncate">
                      {isAr ? portal.nameAr : portal.name}
                    </h3>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2">
                    {isAr ? portal.descAr : portal.desc}
                  </p>
                  <span className="text-[10px] text-gray-400 mt-1.5 block truncate">{portal.url}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isAr ? 'هل تحتاج إرشاد متخصص؟' : 'Need Expert Guidance?'}
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
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
