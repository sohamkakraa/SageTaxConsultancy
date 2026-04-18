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
      // Redirect unauthenticated users to the admin login page
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
    return NextResponse.next();
  }

  // Apply i18n middleware to all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|assets|.*\\..*).*)'],
};
