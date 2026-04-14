export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sagetaxconsultancy.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private', '/api'],
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
