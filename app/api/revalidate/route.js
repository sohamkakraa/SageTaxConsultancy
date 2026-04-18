import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Fixed: reject if revalidation secret is not configured or is the default placeholder
    const configuredSecret = process.env.REVALIDATE_SECRET;
    if (!configuredSecret || configuredSecret === 'your-random-secret-string-here') {
      return NextResponse.json(
        { error: 'Revalidation endpoint not configured' },
        { status: 503 }
      );
    }

    // Verify secret token
    const secret = request.headers.get('x-revalidate-secret');
    if (secret !== configuredSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { paths = [], tags = [] } = body;

    // Validate input
    if (!Array.isArray(paths) && !Array.isArray(tags)) {
      return NextResponse.json(
        { error: 'Invalid request body. Must include paths or tags array.' },
        { status: 400 }
      );
    }

    const revalidatedPaths = [];
    const revalidatedTags = [];

    // Fixed: limit number of paths/tags to prevent abuse
    const MAX_ITEMS = 20;

    // Revalidate paths
    if (Array.isArray(paths) && paths.length > 0) {
      for (const path of paths.slice(0, MAX_ITEMS)) {
        if (typeof path === 'string' && path.startsWith('/') && !path.includes('..')) {
          try {
            revalidatePath(path);
            revalidatedPaths.push(path);
          } catch (error) {
            console.error(`Error revalidating path ${path}:`, error);
          }
        }
      }
    }

    // Revalidate tags
    if (Array.isArray(tags) && tags.length > 0) {
      for (const tag of tags.slice(0, MAX_ITEMS)) {
        if (typeof tag === 'string' && /^[a-zA-Z0-9_-]+$/.test(tag)) {
          try {
            revalidateTag(tag);
            revalidatedTags.push(tag);
          } catch (error) {
            console.error(`Error revalidating tag ${tag}:`, error);
          }
        }
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Revalidation completed',
        revalidatedPaths,
        revalidatedTags,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Revalidation failed' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  // GET requests should be rejected
  return NextResponse.json(
    { error: 'Method not allowed. Use POST.' },
    { status: 405 }
  );
}

// Fixed: restricted CORS origin from wildcard (*) to site domain
export async function OPTIONS(request) {
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'https://sageconsultancy.ae';
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, x-revalidate-secret',
    },
  });
}
