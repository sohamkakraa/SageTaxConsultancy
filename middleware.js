import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n-config';
import { SESSION_COOKIE, verifySessionToken } from './lib/cms/session';
import { LEGACY_HOSTS, SITE_URL } from './lib/site';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});

const PUBLIC_ADMIN_PATHS = new Set(['/admin/login']);
const PUBLIC_CMS_API = new Set(['/api/cms/auth/login', '/api/cms/auth/logout']);

export default async function middleware(request) {
  const { pathname, search } = request.nextUrl;
  const host = (request.headers.get('host') || '').toLowerCase();

  // 1. Permanently move old domains to the new canonical domain (switch on once DNS is live).
  if (process.env.REDIRECT_LEGACY_DOMAINS === 'true' && LEGACY_HOSTS.includes(host)) {
    return NextResponse.redirect(`${SITE_URL}${pathname}${search}`, 308);
  }

  // 2. CMS: everything except the login page/endpoint requires a valid signed session.
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isCmsApi = pathname.startsWith('/api/cms/');
  if ((isAdminPage && !PUBLIC_ADMIN_PATHS.has(pathname)) || (isCmsApi && !PUBLIC_CMS_API.has(pathname))) {
    const session = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value);
    if (!session) {
      if (isCmsApi) return NextResponse.json({ error: 'Please sign in again.' }, { status: 401 });
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  if (isAdminPage || pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.startsWith('/_vercel') || pathname.startsWith('/assets') || pathname.includes('.')) {
    const response = NextResponse.next();
    if (isAdminPage || isCmsApi) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow');
      response.headers.set('Cache-Control', 'no-store');
    }
    return response;
  }

  // next-intl forwards the resolved locale to the app (read via getLocale() in the root layout).
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!_next|_vercel|assets|.*\\..*).*)'],
};
