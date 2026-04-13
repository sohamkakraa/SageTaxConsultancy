import { getRequestConfig } from 'next-intl/server';
export { locales, defaultLocale } from './lib/i18n-config';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`./messages/${locale}.json`)).default,
}));
