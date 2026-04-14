'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { ArrowRight, Newspaper, Clock, ExternalLink } from 'lucide-react';

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
  const base = locale === 'en' ? '' : `/${locale}`;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news?limit=3');
        if (res.ok) {
          const json = await res.json();
          const data = json.data || json.articles || [];
          if (data.length > 0) {
            setArticles(data.slice(0, 3));
          } else {
            setArticles(FALLBACK_ARTICLES);
          }
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
          <Link href={`${base}/blog`} className="hidden md:flex btn-secondary text-sm py-2 px-4">
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
              const Wrapper = isExternal ? 'a' : Link;
              const wrapperProps = isExternal
                ? { href: article.url, target: '_blank', rel: 'noopener noreferrer' }
                : { href: article.slug ? `${base}/blog/${article.slug}` : `${base}/blog` };

              return (
                <Wrapper key={idx} {...wrapperProps} className="card-hover group flex flex-col">
                  <div className="flex-grow space-y-3">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Newspaper className="w-3.5 h-3.5" />
                      <span>{article.sourceName || article.source || 'Sage'}</span>
                      {isExternal && <ExternalLink className="w-3 h-3" />}
                    </div>
                    <h3 className="font-bold text-sm text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {(article.description || article.excerpt || '').substring(0, 140)}
                    </p>
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
          <Link href={`${base}/blog`} className="btn-secondary text-sm py-2 px-4">
            {t('blog.allPosts')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
