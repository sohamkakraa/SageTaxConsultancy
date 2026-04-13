'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const SkeletonCard = () => (
  <div className="card space-y-4 animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-full" />
    <div className="h-4 bg-gray-200 rounded w-5/6" />
    <div className="flex gap-4 pt-4">
      <div className="h-4 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
);

export default function NewsSection({ locale }) {
  const t = useTranslations();
  const baseLink = locale === 'en' ? '' : `/${locale}`;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (response.ok) {
          const data = await response.json();
          setArticles(data.articles.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow space-y-12">
        {/* Header */}
        <div className="max-w-2xl">
          <span className="badge">{t('blog.badge')}</span>
          <h2 className="section-heading mt-4 mb-6">{t('blog.title')}</h2>
          <p className="section-subheading text-gray-700">
            {t('blog.subtitle')}
          </p>
        </div>

        {/* Articles Grid or Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, idx) => (
              <SkeletonCard key={idx} />
            ))}
          </div>
        ) : articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`${baseLink}/blog/${article.slug}`}
                className="card group hover:shadow-lg hover:border-sage-300 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="flex-grow space-y-3">
                  <h3 className="font-bold text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.description.substring(0, 120)}
                    {article.description.length > 120 ? '...' : ''}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-gray-700">
                      {article.sourceName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-sage-700 font-semibold text-sm">
                    {t('blog.readMore')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="card text-center py-12 space-y-4">
            <svg
              className="w-12 h-12 text-gray-300 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-gray-600">No articles yet. Check back soon!</p>
          </div>
        )}

        {/* View All Insights Button */}
        <div className="flex justify-center pt-4">
          <Link href={`${baseLink}/blog`} className="btn-primary">
            View All Insights →
          </Link>
        </div>
      </div>
    </section>
  );
}
