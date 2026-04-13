import { getRequestConfig } from 'next-intl/server';
export { locales, defaultLocale } from './lib/i18n-config';

export default getRequestConfig(async (requestConfig) => {
  const locale = await requestConfig.requestLocale;
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
