import { getBlogPosts } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

export const metadata = {
  title: 'Blog | Sage Tax Consultancy',
  description: 'Latest insights and news on UAE tax, accounting, and business registration services.',
  openGraph: {
    title: 'Blog | Sage Tax Consultancy',
    description: 'Latest insights and news on UAE tax, accounting, and business registration services.',
    type: 'website',
  },
};

export default async function BlogPage({ params }) {
  const { locale } = params;
  const isArabic = locale === 'ar';

  const posts = await getBlogPosts(50, 0);

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <span className="text-navy-900 font-medium">{isArabic ? 'المدونة' : 'Blog'}</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow text-center">
          <span className="badge bg-gold-500 text-navy-900">{isArabic ? 'المدونة' : 'Latest News'}</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 mt-4">
            {isArabic ? 'أحدث الأخبار والرؤى' : 'Latest News & Insights'}
          </h1>
          <p className="text-xl text-navy-100 max-w-2xl mx-auto">
            {isArabic ? 'ابقَ على اطلاع بأحدث التطورات في الضريبة والمحاسبة والخدمات في الإمارات' : 'Stay updated with the latest developments in UAE tax, accounting, and business services'}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="card bg-navy-50 overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image && (
                    <div className="relative h-48 bg-gradient-to-br from-gold-400 to-gold-600 overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      {post.category && (
                        <span className="badge bg-gold-100 text-navy-900 text-xs">
                          {post.category}
                        </span>
                      )}
                      {post.source && (
                        <span className="text-xs text-navy-600">
                          {isArabic ? 'من' : 'via'} {post.source}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-navy-900 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-navy-700 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-navy-600">
                        {post.published_at ? new Date(post.published_at).toLocaleDateString(locale) : ''}
                      </span>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold text-sm"
                      >
                        {isArabic ? 'اقرأ المزيد' : 'Read More'}
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-navy-700 mb-6">
                {isArabic ? 'لا توجد منشورات بعد' : 'No posts yet'}
              </p>
              <Link
                href={`/${locale}`}
                className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block"
              >
                {isArabic ? 'العودة إلى الرئيسية' : 'Back to Home'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'ابقَ على اطلاع بالأخبار الأخيرة' : 'Stay Updated with Latest News'}
          </h2>
          <p className="text-lg mb-8 text-navy-800">
            {isArabic ? 'اشترك في نشرتنا البريدية للحصول على أحدث المقالات والأخبار مباشرة إلى صندوق الوارد الخاص بك' : 'Subscribe to our newsletter to get the latest articles and news directly to your inbox'}
          </p>
          <form className="flex gap-3">
            <input
              type="email"
              placeholder={isArabic ? 'بريدك الإلكتروني' : 'Your email'}
              className="flex-1 px-4 py-3 rounded-lg bg-white text-navy-900 placeholder-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-900"
              required
            />
            <button
              type="submit"
              className="btn-primary bg-navy-900 text-white hover:bg-navy-800 px-8"
            >
              {isArabic ? 'اشترك' : 'Subscribe'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
