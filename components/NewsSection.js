'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { ArrowRight, Newspaper, Clock, ExternalLink, FileText, Scale, Building2, Download } from 'lucide-react';

const FALLBACK_ARTICLES = [
  {
    title: 'UAE Corporate Tax: Key Compliance Deadlines for 2025',
    description: 'The Federal Tax Authority has outlined critical filing deadlines for businesses subject to UAE Corporate Tax. Companies must ensure timely registration and filing to avoid penalties.',
    sourceName: 'Sage Insights',
    publishedAt: new Date().toISOString(),
    url: '#',
    isExternal: false,
  },
  {
    title: 'VAT Return Filing: Common Mistakes UAE Businesses Make',
    description: 'Many businesses in the UAE face penalties due to common errors in VAT return filing. Learn about the most frequent mistakes and how to avoid them.',
    sourceName: 'Sage Insights',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    url: '#',
    isExternal: false,
  },
  {
    title: 'Free Zone Tax Benefits: What Qualifying Businesses Need to Know',
    description: 'Qualifying Free Zone Persons can benefit from a 0% corporate tax rate. Understanding the substance requirements is essential to maintaining this preferential status.',
    sourceName: 'Sage Insights',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    url: '#',
    isExternal: false,
  },
];

export default function NewsSection({ locale }) {
  const t = useTranslations();
  const isAr = locale === 'ar';
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch homepage-pinned resources and regular news in parallel
        const [homepageRes, newsRes] = await Promise.all([
          fetch('/api/news?homepage=true&limit=6')
            .then((r) => {
              if (!r.ok) {
                console.warn(`Failed to fetch homepage news: ${r.status} ${r.statusText}`);
              }
              return r.ok ? r.json() : null;
            })
            .catch((err) => {
              console.warn('Homepage news fetch error:', err);
              return null;
            }),
          fetch('/api/news?limit=6')
            .then((r) => {
              if (!r.ok) {
                console.warn(`Failed to fetch news: ${r.status} ${r.statusText}`);
              }
              return r.ok ? r.json() : null;
            })
            .catch((err) => {
              console.warn('News fetch error:', err);
              return null;
            }),
        ]);

        const homepageItems = homepageRes?.data || [];
        const newsItems = newsRes?.data || [];

        // Combine: homepage-pinned first, then fill remaining with news (deduplicated)
        const seenIds = new Set(homepageItems.map((i) => i.id).filter(Boolean));
        const combined = [
          ...homepageItems,
          ...newsItems.filter((i) => !i.id || !seenIds.has(i.id)),
        ].slice(0, 3);

        if (combined.length > 0) {
          setArticles(combined);
        } else {
          setArticles(FALLBACK_ARTICLES);
        }
      } catch {
        setArticles(FALLBACK_ARTICLES);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max space-y-10">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-4">
            <span className="badge">{t('blog.badge')}</span>
            <h2 className="section-heading">{t('blog.title')}</h2>
            <p className="section-subheading">{t('blog.subtitle')}</p>
          </div>
          <Link href="/blog" className="hidden md:flex btn-secondary text-sm py-2 px-4">
            {t('blog.allPosts')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse space-y-4">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="flex gap-3 pt-3">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article, idx) => {
              const isExternal = article.isExternal !== false && article.url && article.url.startsWith('http');
              const isResource = article.is_resource;
              const hasDocument = isResource && article.document_url;
              const Wrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal
                ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' }
                : { href: article.slug ? `/blog/${article.slug}` : '/blog' };

              // Pick icon for resources
              const resourceIcon = isResource ? (
                article.resource_type === 'law' ? <Scale className="w-4 h-4" /> :
                article.resource_type === 'government-document' ? <Building2 className="w-4 h-4" /> :
                <FileText className="w-4 h-4" />
              ) : null;

              return (
                <Wrapper key={idx} {...wrapperProps} className="card-hover group flex flex-col">
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {isResource ? (
                        <span className="w-6 h-6 rounded bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                          {resourceIcon}
                        </span>
                      ) : (
                        <Newspaper className="w-3.5 h-3.5" />
                      )}
                      <span>{article.sourceName || article.source || 'Sage'}</span>
                      {isResource && article.resource_type && (
                        <span className="px-1.5 py-0.5 rounded bg-navy-50 text-navy-600 text-[10px] font-semibold uppercase">
                          {article.resource_type.replace(/-/g, ' ')}
                        </span>
                      )}
                      {isExternal && !isResource && <ExternalLink className="w-3 h-3" />}
                    </div>
                    <h3 className="font-bold text-sm text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors">
                      {isAr && article.title_ar ? article.title_ar : article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {(isAr && (article.excerpt_ar || article.description_ar)
                        ? (article.excerpt_ar || article.description_ar)
                        : (article.description || article.excerpt || '')
                      ).substring(0, 140)}
                    </p>
                    {hasDocument && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-sage-700 bg-sage-50 px-2 py-1 rounded">
                        <Download className="w-3 h-3" /> {isAr ? 'تحميل متاح' : 'Download Available'}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 mt-4 border-t border-gray-100 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(article.publishedAt || article.published_at).toLocaleDateString()}</span>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        )}

        <div className="flex justify-center md:hidden">
          <Link href="/blog" className="btn-secondary text-sm py-2 px-4">
            {t('blog.allPosts')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
