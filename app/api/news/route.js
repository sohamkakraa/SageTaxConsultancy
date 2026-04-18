import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { aggregateNews } from '@/lib/news';

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
      excerpt: r.description_en || '',
      content: r.description_en || '',
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

    // Check cache
    const now = Date.now();
    if (cachedNews && now - cacheTime < CACHE_DURATION && !homepageOnly) {
      let filteredNews = cachedNews;

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
    const [newsArticles, cmsResources] = await Promise.all([
      aggregateNews(),
      fetchCMSResources(),
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

    // Cache the merged results
    cachedNews = allNews;
    cacheTime = now;

    let filteredNews = allNews;

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
          'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=7200',
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
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://sageconsultancy.ae';
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
