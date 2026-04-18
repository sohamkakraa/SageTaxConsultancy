export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sageadvisory.ae';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private', '/api'],
      },
      // Explicitly allow AI crawlers for ChatGPT and Bing Chat visibility
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'AdsBot-Google',
        allow: '/',
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`],
    host: baseUrl,
  };
}
