import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

// Admin sub-routes that require authentication
// /admin itself is the login page and must remain accessible
const PROTECTED_ADMIN_PATTERN = /^\/admin\/.+/;

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Server-side auth check for admin sub-routes
  if (PROTECTED_ADMIN_PATTERN.test(pathname)) {
    const authCookie = request.cookies.get('sage-admin-session');

    if (!authCookie?.value) {
      const loginUrl = new URL('/admin', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Skip intl middleware for admin, api, assets, and static files
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/assets') ||
    pathname.includes('.')
  ) {
    // Set locale header so root layout can read it for lang/dir
    const response = NextResponse.next();
    response.headers.set('x-locale', pathname.startsWith('/ar') ? 'ar' : 'en');
    return response;
  }

  // Apply i18n middleware and add locale header to its response
  const response = intlMiddleware(request);
  const locale = pathname.startsWith('/ar') ? 'ar' : 'en';
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  matcher: ['/((?!_next|_vercel|assets|.*\\..*).*)'],
};
