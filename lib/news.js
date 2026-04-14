import { createClient } from '@supabase/supabase-js';

// Search queries focused on UAE Tax & Finance — rotated every 6 hours
const SEARCH_QUERIES = [
  'UAE corporate tax',
  'UAE VAT tax',
  'Dubai business tax regulation',
  'UAE Federal Tax Authority',
  'UAE Golden Visa business',
  'Dubai company registration',
];

/**
 * Blocked sources — low-quality, spam, or content-farm domains.
 * We use a blocklist instead of an allowlist because GNews and NewsAPI
 * already curate for reputable publishers. A strict allowlist was filtering
 * out too many legitimate results on the free tier (10 articles/request).
 */
const BLOCKED_SOURCES = new Set([
  'reddit.com',
  'medium.com',
  'quora.com',
  'wikipedia.org',
  'youtube.com',
  'facebook.com',
  'twitter.com',
  'x.com',
  'tiktok.com',
  'instagram.com',
  'linkedin.com',
  'pinterest.com',
]);

/**
 * Check if a URL is from a blocked source
 */
function isBlockedSource(url) {
  if (!url) return true;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return Array.from(BLOCKED_SOURCES).some(
      (domain) => hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return true;
  }
}

/**
 * Auto-detect article category from title/description keywords
 */
function detectCategory(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  if (text.includes('vat') || text.includes('value added tax')) return 'vat';
  if (text.includes('corporate tax') || text.includes('ct law') || text.includes('company tax')) return 'corporate-tax';
  if (text.includes('excise tax') || text.includes('excise duty')) return 'excise-tax';
  if (text.includes('golden visa') || text.includes('residence visa')) return 'golden-visa';
  if (text.includes('company registration') || text.includes('business setup') || text.includes('trade license') || text.includes('free zone')) return 'company-registration';
  if (text.includes('audit') || text.includes('accounting') || text.includes('ifrs') || text.includes('financial report')) return 'accounting';
  if (text.includes('trademark')) return 'trademark';
  return 'tax'; // general tax category
}

/**
 * Fetch news from GNews.io (primary source)
 * Free tier: 100 requests/day, 10 articles per request
 */
async function fetchFromGNews(limit = 10) {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) {
    console.warn('GNEWS_API_KEY not set, skipping GNews');
    return [];
  }

  const allArticles = [];
  const query = SEARCH_QUERIES[Math.floor(Date.now() / (6 * 60 * 60 * 1000)) % SEARCH_QUERIES.length];

  try {
    const url = new URL('https://gnews.io/api/v4/search');
    url.searchParams.set('q', query);
    url.searchParams.set('lang', 'en');
    url.searchParams.set('country', 'ae');
    url.searchParams.set('max', String(Math.min(limit, 10)));
    url.searchParams.set('apikey', apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.warn(`GNews API error: ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (data.articles && Array.isArray(data.articles)) {
      data.articles.forEach((article) => {
        if (isBlockedSource(article.url)) return;
        if (!article.title || article.title === '[Removed]') return;

        allArticles.push({
          title: article.title,
          excerpt: article.description || '',
          content: article.description || '',
          url: article.url,
          source: article.source?.name || 'News',
          sourceName: article.source?.name || 'News',
          published_at: article.publishedAt || new Date().toISOString(),
          publishedAt: article.publishedAt || new Date().toISOString(),
          featured_image: article.image || null,
          category: detectCategory(article.title, article.description || ''),
          isExternal: true,
          is_auto_fetched: true,
        });
      });
    }
  } catch (error) {
    console.error('GNews fetch error:', error.message);
  }

  return allArticles;
}

/**
 * Fetch UAE top headlines from NewsAPI.org (fallback source)
 * Uses /v2/top-headlines?country=ae which works on FREE tier in production.
 * The /v2/everything endpoint returns 426 in production on the free plan.
 */
async function fetchFromNewsAPI(limit = 10) {
  const apiKey = process.env.NEWSAPI_API_KEY;
  if (!apiKey) {
    console.warn('NEWSAPI_API_KEY not set, skipping NewsAPI');
    return [];
  }

  const allArticles = [];

  try {
    // Use top-headlines (works on free tier in production)
    const url = new URL('https://newsapi.org/v2/top-headlines');
    url.searchParams.set('country', 'ae');
    url.searchParams.set('pageSize', String(Math.min(limit, 20)));
    url.searchParams.set('apiKey', apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

    if (!res.ok) {
      console.warn(`NewsAPI error: ${res.status}`);
      return [];
    }

    const data = await res.json();

    if (data.articles && Array.isArray(data.articles)) {
      data.articles
        .filter((a) => a.title && a.title !== '[Removed]')
        .forEach((article) => {
          if (isBlockedSource(article.url)) return;

          allArticles.push({
            title: article.title,
            excerpt: article.description || '',
            content: article.description || '',
            url: article.url,
            source: article.source?.name || 'News',
            sourceName: article.source?.name || 'News',
            published_at: article.publishedAt || new Date().toISOString(),
            publishedAt: article.publishedAt || new Date().toISOString(),
            featured_image: article.urlToImage || null,
            category: detectCategory(article.title, article.description || ''),
            isExternal: true,
            is_auto_fetched: true,
          });
        });
    }
  } catch (error) {
    console.error('NewsAPI fetch error:', error.message);
  }

  return allArticles;
}

/**
 * Fetch blog posts from Supabase (your own content)
 */
async function fetchFromSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Supabase fetch error:', error);
      return [];
    }

    return (posts || []).map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || (post.content ? post.content.substring(0, 200) : ''),
      content: post.content,
      url: `/blog/${post.slug}`,
      source: 'Sage Blog',
      sourceName: 'Sage Blog',
      published_at: post.published_at || new Date().toISOString(),
      publishedAt: post.published_at || new Date().toISOString(),
      category: post.category || 'blog',
      is_auto_fetched: false,
      isExternal: false,
      slug: post.slug,
      featured_image: post.featured_image,
    }));
  } catch (error) {
    console.error('Supabase fetch error:', error.message);
    return [];
  }
}

/**
 * Aggregate news from all sources:
 * 1. Supabase blog posts (your own content — SEO priority)
 * 2. GNews.io (primary external)
 * 3. NewsAPI.org (fallback if GNews returns nothing)
 */
export async function aggregateNews() {
  const allArticles = [];

  // Fetch all sources in parallel for speed
  const [supabasePosts, gnewsArticles, newsapiArticles] = await Promise.all([
    fetchFromSupabase(),
    fetchFromGNews(10),
    fetchFromNewsAPI(20),
  ]);

  // Own blog posts always included
  allArticles.push(...supabasePosts);

  // GNews: UAE-specific tax/business search results
  allArticles.push(...gnewsArticles);

  // NewsAPI: UAE top headlines (broader coverage, different articles)
  allArticles.push(...newsapiArticles);

  // Deduplicate by normalized title
  const uniqueArticles = [];
  const seenTitles = new Set();

  allArticles.forEach((article) => {
    const normalized = article.title.toLowerCase().trim();
    if (!seenTitles.has(normalized)) {
      seenTitles.add(normalized);
      uniqueArticles.push(article);
    }
  });

  // Sort: own blog posts first, then newest first
  uniqueArticles.sort((a, b) => {
    if (!a.isExternal && b.isExternal) return -1;
    if (a.isExternal && !b.isExternal) return 1;
    return new Date(b.published_at).getTime() - new Date(a.published_at).getTime();
  });

  return uniqueArticles;
}

/**
 * Get news filtered by category
 */
export async function getNewsByCategory(category, limit = 10) {
  const allNews = await aggregateNews();
  return allNews
    .filter((a) => a.category?.toLowerCase() === category.toLowerCase())
    .slice(0, limit);
}

/**
 * Search news articles by keyword
 */
export async function searchNews(query, limit = 10) {
  if (!query || query.trim().length === 0) return [];

  const allNews = await aggregateNews();
  const lower = query.toLowerCase();

  return allNews
    .filter(
      (a) =>
        a.title.toLowerCase().includes(lower) ||
        (a.excerpt && a.excerpt.toLowerCase().includes(lower))
    )
    .slice(0, limit);
}
