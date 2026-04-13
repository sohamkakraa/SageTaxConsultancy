import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { aggregateNews } from '@/lib/news';

const CACHE_DURATION = 60 * 60 * 1000; // 1 hour
let cachedNews = null;
let cacheTime = 0;

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const offset = parseInt(searchParams.get('offset') || '0');
    const category = searchParams.get('category') || null;

    // Check cache
    const now = Date.now();
    if (cachedNews && now - cacheTime < CACHE_DURATION) {
      let filteredNews = cachedNews;

      // Filter by category if provided
      if (category) {
        filteredNews = filteredNews.filter(
          (item) => item.category?.toLowerCase() === category.toLowerCase()
        );
      }

      // Apply pagination
      const paginated = filteredNews.slice(offset, offset + limit);

      return NextResponse.json(
        {
          success: true,
          data: paginated,
          total: filteredNews.length,
          limit,
          offset,
          cached: true,
        },
        { status: 200 }
      );
    }

    // Fetch fresh news
    const allNews = await aggregateNews();

    // Cache the results
    cachedNews = allNews;
    cacheTime = now;

    let filteredNews = allNews;

    // Filter by category if provided
    if (category) {
      filteredNews = filteredNews.filter(
        (item) => item.category?.toLowerCase() === category.toLowerCase()
      );
    }

    // Apply pagination
    const paginated = filteredNews.slice(offset, offset + limit);

    return NextResponse.json(
      {
        success: true,
        data: paginated,
        total: filteredNews.length,
        limit,
        offset,
        cached: false,
      },
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

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
