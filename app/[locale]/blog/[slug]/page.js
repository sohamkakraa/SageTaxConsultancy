import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/content';
import Link from 'next/link';
import { ChevronRight, Calendar, User, ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({ params }) {
  const { slug } = params;
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
  const isAr = locale === 'ar';

  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

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
    <main className={isAr ? 'rtl' : 'ltr'}>
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400 flex-wrap">
          <Link href={`/${locale}`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'الرئيسية' : 'Home'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/${locale}/blog`} className="hover:text-sage-700 transition-colors">
            {isAr ? 'المدونة' : 'Blog'}
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-navy-950 font-medium line-clamp-1">{post.title}</span>
        </div>
      </div>

      {/* Article Header */}
      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-narrow max-w-3xl space-y-6">
          <div className="flex items-center gap-2">
            {post.category && (
              <span className="px-2.5 py-0.5 rounded-full bg-gold-400/20 text-gold-300 text-xs font-semibold">
                {post.category}
              </span>
            )}
            {post.source && (
              <span className="text-xs text-gray-400">
                {isAr ? 'من' : 'via'} {post.source}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display leading-tight">{post.title}</h1>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-400">
            {post.author && (
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
            )}
            {formattedDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            )}
          </div>
          {post.excerpt && (
            <p className="text-lg text-gray-300 leading-relaxed">{post.excerpt}</p>
          )}
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <div className="h-72 md:h-[420px] bg-gray-100 overflow-hidden">
          <img
            src={post.featured_image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <div className="section-padding bg-white">
        <div className="container-narrow max-w-3xl grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Main Content */}
          <article className="lg:col-span-3">
            <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
              {post.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() && (
                  <p key={idx} className="mb-5">
                    {paragraph}
                  </p>
                )
              ))}
            </div>

            {/* Source Attribution */}
            {post.source && post.source_url && (
              <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-400 mb-2">
                  {isAr ? 'المقالة الأصلية' : 'Original Article'}
                </p>
                <a
                  href={post.source_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sage-700 hover:text-sage-800 font-semibold text-sm"
                >
                  {isAr ? 'اقرأ على' : 'Read on'} {post.source}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-sage-700 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {isAr ? 'العودة إلى المدونة' : 'Back to Blog'}
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {relatedPosts.length > 0 && (
              <div className="sticky top-24 card-hover p-5 space-y-4">
                <h3 className="font-bold text-navy-950 text-sm">
                  {isAr ? 'منشورات ذات صلة' : 'Related Posts'}
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((relatedPost) => (
                    <Link
                      key={relatedPost.id}
                      href={`/${locale}/blog/${relatedPost.slug}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-medium text-navy-950 group-hover:text-sage-700 transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h4>
                      <p className="text-xs text-gray-400 mt-1">
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

      {/* CTA */}
      <section className="py-16 bg-navy-900 text-white">
        <div className="container-max text-center space-y-5">
          <h2 className="text-2xl md:text-3xl font-bold font-display">
            {isAr ? 'هل تحتاج إلى استشارة متخصصة؟' : 'Need Professional Advice?'}
          </h2>
          <p className="text-gray-300 max-w-lg mx-auto">
            {isAr ? 'تحدث إلى أحد خبرائنا لمناقشة احتياجاتك' : 'Talk to one of our experts to discuss your specific needs'}
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
