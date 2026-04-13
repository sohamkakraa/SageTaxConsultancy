import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Calendar, User } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug, locale } = params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'This blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt || post.content.substring(0, 160),
    openGraph: {
      title: post.title,
      description: post.excerpt || post.content.substring(0, 160),
      type: 'article',
      publishedTime: post.published_at,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug, locale } = params;
  const isArabic = locale === 'ar';

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts
  const allPosts = await getBlogPosts(6, 0);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <main className={isArabic ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-navy-50 py-4">
        <div className="container-narrow flex items-center gap-2 text-sm flex-wrap">
          <Link href={`/${locale}`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <Link href={`/${locale}/blog`} className="text-navy-600 hover:text-gold-500">
            {isArabic ? 'المدونة' : 'Blog'}
          </Link>
          <ChevronRight size={16} className="text-navy-300" />
          <span className="text-navy-900 font-medium line-clamp-1">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <section className="section-padding bg-gradient-to-br from-navy-900 to-navy-800 text-white">
        <div className="container-narrow max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            {post.category && (
              <span className="badge bg-gold-500 text-navy-900">{post.category}</span>
            )}
            {post.source && (
              <span className="text-sm bg-navy-700 px-3 py-1 rounded-full">
                {isArabic ? 'من' : 'via'} {post.source}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-navy-200">
            {post.author && (
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
          {post.excerpt && (
            <p className="mt-6 text-lg text-navy-100 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="relative h-96 md:h-[500px] bg-navy-100 overflow-hidden">
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="section-padding bg-white">
        <div className="container-narrow max-w-3xl grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="prose prose-lg max-w-none text-navy-700 leading-relaxed">
              {post.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="mb-6">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Source Attribution */}
            {post.source && post.source_url && (
              <div className="mt-12 pt-8 border-t border-navy-200">
                <p className="text-sm text-navy-600 mb-3">
                  {isArabic ? 'المقالة الأصلية' : 'Original Article'}
                </p>
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold-600 hover:text-gold-700 font-semibold"
                >
                  {isArabic ? 'اقرأ على' : 'Read on'} {post.source}
                  <ChevronRight size={16} />
                </a>
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="sticky top-24 bg-navy-50 p-6 rounded-lg">
                <h3 className="font-bold text-navy-900 mb-6 text-lg">
                  {isArabic ? 'منشورات ذات صلة' : 'Related Posts'}
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-semibold text-navy-900 group-hover:text-gold-600 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-navy-600 mt-2">
                        {relatedPost.published_at
                          ? new Date(relatedPost.published_at).toLocaleDateString(locale)
                          : ''}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900">
        <div className="container-narrow text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'هل تحتاج إلى استشارة متخصصة؟' : 'Need Professional Advice?'}
          </h2>
          <p className="text-lg mb-8 text-navy-800">
            {isArabic ? 'تحدث إلى أحد خبرائنا لمناقشة احتياجاتك المحددة' : 'Talk to one of our experts to discuss your specific needs'}
          </p>
          <Link href={`/${locale}/contact`} className="btn-primary bg-navy-900 text-white hover:bg-navy-800 inline-block">
            {isArabic ? 'اتصل بنا' : 'Contact Us'}
          </Link>
        </div>
      </section>
    </main>
  );
}
