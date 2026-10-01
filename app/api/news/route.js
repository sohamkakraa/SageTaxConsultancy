import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { aggregateNews } from '@/lib/news';
import { SITE_URL } from '@/lib/site';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cachedNews = null;
let cacheTime = 0;

/**
 * Fetch CMS-managed resources from Supabase and normalize them
 * into the same shape as news articles for unified display.
 */
async function fetchCMSResources() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return [];

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .order('published_at', { ascending: false });

    if (error) {
      console.error('Resources fetch error:', error);
      return [];
    }

    return (data || []).map((r) => ({
      id: r.id,
      title: r.title_en,
      title_ar: r.title_ar || '',
      excerpt: r.description_en || '',
      excerpt_ar: r.description_ar || '',
      content: r.description_en || '',
      content_ar: r.description_ar || '',
      url: r.url || r.document_url || '#',
      document_url: r.document_url || null,
      source: r.source_name || 'Sage Resources',
      sourceName: r.source_name || 'Sage Resources',
      published_at: r.published_at || r.created_at,
      publishedAt: r.published_at || r.created_at,
      featured_image: null,
      category: r.category || 'general',
      resource_type: r.resource_type,
      icon_type: r.icon_type || 'auto',
      is_pinned: r.is_pinned,
      pin_to_homepage: r.pin_to_homepage,
      isExternal: true,
      is_auto_fetched: false,
      is_resource: true,
    }));
  } catch (error) {
    console.error('CMS resources fetch error:', error.message);
    return [];
  }
}

/** The firm's own published insights (written in the CMS). Always fresh, listed first. */
async function fetchFirmPosts() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) return [];
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, slug, title_en, title_ar, excerpt_en, excerpt_ar, category, featured_image, published_at')
      .eq('is_published', true)
      .eq('is_auto_fetched', false)
      .order('published_at', { ascending: false })
      .limit(30);
    if (error) return [];
    return (data || []).map((p) => ({
      id: p.id,
      slug: p.slug,
      title: p.title_en,
      title_ar: p.title_ar || '',
      excerpt: p.excerpt_en || '',
      excerpt_ar: p.excerpt_ar || '',
      url: `/blog/${p.slug}`,
      source: 'Sage Global Advisory',
      sourceName: 'Sage Global Advisory',
      published_at: p.published_at,
      publishedAt: p.published_at,
      featured_image: p.featured_image || null,
      category: p.category || 'blog',
      isExternal: false,
      is_auto_fetched: false,
    }));
  } catch {
    return [];
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(Math.max(parseInt(searchParams.get('limit') || '10') || 10, 1), 50);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0') || 0, 0);
    const rawCategory = searchParams.get('category') || null;
    // Fixed: validate category to prevent injection — only allow known safe values
    const VALID_CATEGORIES = ['vat', 'corporate-tax', 'excise-tax', 'golden-visa', 'company-registration', 'accounting', 'trademark', 'general', 'business', 'finance', 'tax'];
    const category = rawCategory && VALID_CATEGORIES.includes(rawCategory.toLowerCase()) ? rawCategory : null;
    const homepageOnly = searchParams.get('homepage') === 'true';

    // Check cache (external news only — firm posts are always fetched fresh)
    const now = Date.now();
    if (cachedNews && now - cacheTime < CACHE_DURATION && !homepageOnly) {
      let filteredNews = [...(await fetchFirmPosts()), ...cachedNews];

      if (category) {
        filteredNews = filteredNews.filter(
          (item) => item.category?.toLowerCase() === category.toLowerCase()
        );
      }

      const paginated = filteredNews.slice(offset, offset + limit);

      return NextResponse.json(
        { success: true, data: paginated, total: filteredNews.length, limit, offset, cached: true },
        { status: 200 }
      );
    }

    // Fetch all sources in parallel (news + CMS resources)
    const [newsArticles, cmsResources, firmPosts] = await Promise.all([
      aggregateNews(),
      fetchCMSResources(),
      fetchFirmPosts(),
    ]);

    // If homepage-only, return only resources pinned to homepage
    if (homepageOnly) {
      const homepageResources = cmsResources.filter((r) => r.pin_to_homepage);
      return NextResponse.json(
        { success: true, data: homepageResources.slice(0, limit), total: homepageResources.length, limit, offset: 0 },
        { status: 200 }
      );
    }

    // Merge: pinned resources first, then news, then unpinned resources
    const pinnedResources = cmsResources.filter((r) => r.is_pinned);
    const unpinnedResources = cmsResources.filter((r) => !r.is_pinned);
    const allNews = [...pinnedResources, ...newsArticles, ...unpinnedResources];

    cachedNews = allNews;
    cacheTime = now;

    let filteredNews = [...firmPosts, ...allNews];

    if (category) {
      filteredNews = filteredNews.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    const paginated = filteredNews.slice(offset, offset + limit);

    return NextResponse.json(
      { success: true, data: paginated, total: filteredNews.length, limit, offset, cached: false },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=3600',
        },
      }
    );
  } catch (error) {
    console.error('News API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    );
  }
}

// Fixed: restricted CORS origin from wildcard (*) to site domain
export async function OPTIONS(request) {
  const allowedOrigin = SITE_URL;
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
