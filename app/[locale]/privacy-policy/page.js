import { getTranslations, setRequestLocale } from 'next-intl/server';
import LegalPage from '@/components/LegalPage';
import { getSiteContent } from '@/lib/cms/store';
import { legalDetails } from '@/lib/legal/details';
import { privacyPolicy } from '@/lib/legal/privacy';

export async function generateMetadata(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  const c = await getSiteContent();
  const doc = privacyPolicy(legalDetails(c), locale);
  return { title: doc.title, robots: { index: true, follow: true } };
}

export default async function Page(props) {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale);
  const [c, t] = await Promise.all([getSiteContent(), getTranslations('common')]);
  return <LegalPage doc={privacyPolicy(legalDetails(c), locale)} homeLabel={t('home')} updatedLabel={t('lastUpdated')} />;
}
