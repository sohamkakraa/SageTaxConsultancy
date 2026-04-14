import { getBlogPosts } from '@/lib/content';
import Link from 'next/link';
<<<<<<< Updated upstream
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
=======
import { ChevronRight, Newspaper, Clock, ArrowRight } from 'lucide-react';
>>>>>>> Stashed changes

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
  const isAr = locale === 'ar';

  const posts = await getBlogPosts(50, 0);

  return (
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium">{isAr ? 'المدونة' : 'Blog'}</span>
        </div>
      </div>

      {/* Hero */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <Newspaper className="w-3.5 h-3.5" />
            {isAr ? 'المدونة' : 'Latest News'}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">
            {isAr ? 'أحدث الأخبار والرؤى' : 'Latest News & Insights'}
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            {isAr
              ? 'ابقَ على اطلاع بأحدث التطورات في الضريبة والمحاسبة والخدمات في الإمارات'
              : 'Stay updated with the latest developments in UAE tax, accounting, and business services'}
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section-padding bg-white">
        <div className="container-narrow">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="card-hover overflow-hidden group">
                  {post.featured_image && (
<<<<<<< Updated upstream
                    <div className="relative h-48 bg-gradient-to-br from-gold-400 to-gold-600 overflow-hidden">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
=======
                    <div className="h-44 bg-gradient-to-br from-sage-100 to-navy-100 overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
>>>>>>> Stashed changes
                      />
                    </div>
                  )}
                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-2">
                      {post.category && (
                        <span className="px-2 py-0.5 rounded-full bg-sage-100 text-sage-700 text-xs font-medium">
                          {post.category}
                        </span>
                      )}
                      {post.source && (
                        <span className="text-xs text-gray-400">
                          {isAr ? 'من' : 'via'} {post.source}
                        </span>
                      )}
                    </div>
                    <h3 className="text-base font-bold text-navy-950 line-clamp-2 group-hover:text-sage-700 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.published_at ? new Date(post.published_at).toLocaleDateString(locale) : ''}
                      </span>
                      <Link
                        href={`/${locale}/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sage-700 hover:text-sage-800 font-semibold text-xs"
                      >
                        {isAr ? 'اقرأ المزيد' : 'Read More'}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 space-y-4">
              <Newspaper className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-lg text-gray-500">
                {isAr ? 'لا توجد منشورات بعد' : 'No posts yet'}
              </p>
              <Link href={`/${locale}`} className="btn-gold inline-flex">
                {isAr ? 'العودة إلى الرئيسية' : 'Back to Home'}
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-sage-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isAr ? 'ابقَ على اطلاع بالأخبار الأخيرة' : 'Stay Updated with Latest News'}
          </h2>
          <p className="text-sage-200 max-w-lg mx-auto">
            {isAr
              ? 'تابعنا للحصول على أحدث المقالات والأخبار الضريبية'
              : 'Follow us for the latest tax articles and regulatory updates'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-gold">
            {isAr ? 'اتصل بنا' : 'Contact Us'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
