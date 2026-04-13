import { createClient } from '@supabase/supabase-js';

// UAE News RSS Feeds - Tax, Business, and Finance related
const RSS_FEEDS = [
  {
    url: 'https://feeds.bloomberg.com/markets/news.rss',
    source: 'Bloomberg',
    category: 'business',
  },
  {
    url: 'https://feeds.businessinsider.com/markets/index.rss',
    source: 'Business Insider',
    category: 'business',
  },
  {
    url: 'https://feeds.finance.yahoo.com/rss/',
    source: 'Yahoo Finance',
    category: 'finance',
  },
  {
    url: 'https://feeds.reuters.com/reuters/businessNews',
    source: 'Reuters Business',
    category: 'business',
  },
];

/**
 * Parse RSS XML and extract articles
 * @param {string} xmlContent - Raw XML content
 * @param {string} source - Source name
 * @returns {Array} Array of article objects
 */
export function parseRSSFeed(xmlContent, source) {
  const articles = [];

  try {
    // Extract all item elements using regex
    const itemRegex = /<item[^>]*>[\s\S]*?<\/item>/g;
    const items = xmlContent.match(itemRegex) || [];

    items.forEach((item) => {
      try {
        // Extract title
        const titleMatch = item.match(/<title[^>]*>[\s\S]*?<\/title>/);
        const title = titleMatch
          ? titleMatch[0].replace(/<[^>]*>/g, '').trim()
          : '';

        if (!title) return; // Skip if no title

        // Extract description/content
        const descMatch = item.match(/<description[^>]*>[\s\S]*?<\/description>/);
        const description = descMatch
          ? descMatch[0].replace(/<[^>]*>/g, '').trim()
          : '';

        // Extract link
        const linkMatch = item.match(/<link[^>]*>[\s\S]*?<\/link>/);
        const link = linkMatch
          ? linkMatch[0].replace(/<[^>]*>/g, '').trim()
          : '';

        // Extract pubDate
        const pubDateMatch = item.match(/<pubDate[^>]*>[\s\S]*?<\/pubDate>/);
        let pubDate = null;
        if (pubDateMatch) {
          const dateString = pubDateMatch[0].replace(/<[^>]*>/g, '').trim();
          try {
            pubDate = new Date(dateString).toISOString();
          } catch {
            pubDate = null;
          }
        }

        if (title && link) {
          articles.push({
            title,
            excerpt: description.substring(0, 200),
            content: description,
            url: link,
            source,
            published_at: pubDate || new Date().toISOString(),
            category: 'business',
            is_auto_fetched: true,
          });
        }
      } catch (error) {
        // Skip malformed items
        console.error('Error parsing RSS item:', error);
      }
    });
  } catch (error) {
    console.error(`Error parsing RSS feed from ${source}:`, error);
  }

  return articles;
}

/**
 * Fetch a single RSS feed
 * @param {Object} feed - Feed object with url, source, category
 * @returns {Promise<Array>} Array of articles
 */
export async function fetchRSSFeed(feed) {
  try {
    const response = await fetch(feed.url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
      timeout: 10000,
    });

    if (!response.ok) {
      console.warn(`Failed to fetch RSS feed from ${feed.source}: ${response.status}`);
      return [];
    }

    const xmlContent = await response.text();
    const articles = parseRSSFeed(xmlContent, feed.source);

    // Add category to articles
    return articles.map((article) => ({
      ...article,
      category: feed.category,
    }));
  } catch (error) {
    console.error(`Error fetching RSS feed from ${feed.source}:`, error);
    return [];
  }
}

/**
 * Aggregate news from RSS feeds and Supabase
 * @returns {Promise<Array>} Combined and sorted array of articles
 */
export async function aggregateNews() {
  const allArticles = [];

  // Fetch from RSS feeds
  const feedPromises = RSS_FEEDS.map((feed) => fetchRSSFeed(feed));
  const feedResults = await Promise.allSettled(feedPromises);

  feedResults.forEach((result) => {
    if (result.status === 'fulfilled') {
      allArticles.push(...result.value);
    }
  });

  // Fetch from Supabase blog_posts table
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && supabaseKey) {
      const supabase = createClient(supabaseUrl, supabaseKey);

      const { data: blogPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })
        .limit(20);

      if (error) {
        console.error('Error fetching blog posts from Supabase:', error);
      } else if (blogPosts && Array.isArray(blogPosts)) {
        const convertedPosts = blogPosts.map((post) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || post.content.substring(0, 200),
          content: post.content,
          url: `/blog/${post.slug}`,
          source: 'Sage Blog',
          published_at: post.published_at || new Date().toISOString(),
          category: post.category || 'blog',
          is_auto_fetched: false,
          slug: post.slug,
          featured_image: post.featured_image,
        }));
        allArticles.push(...convertedPosts);
      }
    }
  } catch (error) {
    console.error('Error fetching blog posts from Supabase:', error);
  }

  // Remove duplicates (based on title similarity)
  const uniqueArticles = [];
  const seenTitles = new Set();

  allArticles.forEach((article) => {
    const normalizedTitle = article.title.toLowerCase().trim();
    if (!seenTitles.has(normalizedTitle)) {
      seenTitles.add(normalizedTitle);
      uniqueArticles.push(article);
    }
  });

  // Sort by publication date (newest first)
  uniqueArticles.sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    return dateB - dateA;
  });

  return uniqueArticles;
}

/**
 * Get news by category
 * @param {string} category - Category filter (e.g., 'tax', 'business', 'finance')
 * @param {number} limit - Maximum number of articles
 * @returns {Promise<Array>} Filtered and limited articles
 */
export async function getNewsByCategory(category, limit = 10) {
  const allNews = await aggregateNews();

  return allNews
    .filter((article) => article.category?.toLowerCase() === category.toLowerCase())
    .slice(0, limit);
}

/**
 * Search news articles
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of results
 * @returns {Promise<Array>} Search results
 */
export async function searchNews(query, limit = 10) {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const allNews = await aggregateNews();
  const lowerQuery = query.toLowerCase();

  return allNews
    .filter(
      (article) =>
        article.title.toLowerCase().includes(lowerQuery) ||
        article.excerpt.toLowerCase().includes(lowerQuery)
    )
    .slice(0, limit);
}
