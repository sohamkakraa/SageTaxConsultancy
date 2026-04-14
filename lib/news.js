import { createClient } from '@supabase/supabase-js';

// Search queries focused on UAE Tax & Finance
const SEARCH_QUERIES = [
  'UAE corporate tax',
  'UAE VAT tax',
  'Dubai business tax regulation',
  'UAE Federal Tax Authority',
];

/**
 * Verified/trusted news sources for UAE tax & finance news.
 * Only articles from these domains will be shown.
 * This prevents spam, low-quality, or unreliable sources from appearing.
 */
const VERIFIED_SOURCES = new Set([
  // Major international business news
  'reuters.com', 'bloomberg.com', 'cnbc.com', 'ft.com',
  'wsj.com', 'bbc.com', 'bbc.co.uk', 'aljazeera.com',
  'economist.com', 'forbes.com',

  // UAE & Gulf regional news
  'gulfnews.com', 'khaleejtimes.com', 'thenationalnews.com',
  'arabianbusiness.com', 'zawya.com', 'wam.ae',
  'gulftoday.ae', 'albawaba.com', 'emiratesnews247.com',

  // UAE government / regulatory
  'tax.gov.ae', 'government.ae', 'mof.gov.ae',
  'economy.ae', 'moec.gov.ae',

  // Finance & accounting trade publications
  'accountancyage.com', 'ifrs.org', 'iasplus.com',
  'taxnotes.com', 'internationaltaxreview.com',
  'lexology.com', 'mondaq.com',

  // Middle East business
  'zawya.com', 'argaam.com', 'mubasher.info',
  'tradearabia.com',
]);

/**
 * Check if a URL belongs to a verified source
 */
function isVerifiedSource(url) {
  if (!url) return false;
  try {
    const hostname = new URL(url).hostname.replace(/^www\./, '');
    return Array.from(VERIFIED_SOURCES).some(
      (domain) => hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
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

  // Rotate through queries to get diverse results
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
        // Only include articles from verified sources
        if (!isVerifiedSource(article.url)) return;

        allArticles.push({
          title: article.title,
          excerpt: article.description || '',
          // Only store a short excerpt, NOT the full content (for SEO / copyright)
          content: article.description || '',
          url: article.url,
          source: article.source?.name || 'GNews',
          sourceName: article.source?.name || 'GNews',
          published_at: article.publishedAt || new Date().toISOString(),
          publishedAt: article.publishedAt || new Date().toISOString(),
          featured_image: article.image || null,
          category: 'tax',
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
 * Fetch news from NewsAPI.org (fallback source)
 * Free tier: 100 requests/day (dev only), paid for production
 */
async function fetchFromNewsAPI(limit = 10) {
  const apiKey = process.env.NEWSAPI_API_KEY;
  if (!apiKey) {
    console.warn('NEWSAPI_API_KEY not set, skipping NewsAPI');
    return [];
  }

  const allArticles = [];
  const query = 'UAE tax OR "corporate tax UAE" OR "VAT UAE" OR "Dubai business"';

  try {
    const url = new URL('https://newsapi.org/v2/everything');
    url.searchParams.set('q', query);
    url.searchParams.set('language', 'en');
    url.searchParams.set('sortBy', 'publishedAt');
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
          // Only include articles from verified sources
          if (!isVerifiedSource(article.url)) return;

          allArticles.push({
            title: article.title,
            excerpt: article.description || '',
            // Only store a short excerpt, NOT the full content (for SEO / copyright)
            content: article.description || '',
            url: article.url,
            source: article.source?.name || 'NewsAPI',
            sourceName: article.source?.name || 'NewsAPI',
            published_at: article.publishedAt || new Date().toISOString(),
            publishedAt: article.publishedAt || new Date().toISOString(),
            featured_image: article.urlToImage || null,
            category: 'tax',
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
 * 1. Supabase blog posts (your own content, always included — SEO priority)
 * 2. GNews.io (primary external, verified sources only)
 * 3. NewsAPI.org (fallback if GNews returns nothing, verified sources only)
 *
 * Strategy: Own blog posts are full articles hosted on-site (great for SEO).
 * External news articles show title + short excerpt + link to original source
 * (avoids duplicate content penalties and copyright issues).
 */
export async function aggregateNews() {
  const allArticles = [];

  // Always fetch Supabase blog posts (prioritized — own content)
  const supabasePosts = await fetchFromSupabase();
  allArticles.push(...supabasePosts);

  // Try GNews first (primary, verified sources only)
  const gnewsArticles = await fetchFromGNews(10);

  if (gnewsArticles.length > 0) {
    allArticles.push(...gnewsArticles);
  } else {
    // Fall back to NewsAPI if GNews returned nothing
    const newsapiArticles = await fetchFromNewsAPI(10);
    allArticles.push(...newsapiArticles);
  }

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
    // Own content always comes first
    if (!a.isExternal && b.isExternal) return -1;
    if (a.isExternal && !b.isExternal) return 1;
    // Then sort by date
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
