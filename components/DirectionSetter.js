'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';

/**
 * Syncs the <html> lang and dir attributes on client-side locale changes.
 *
 * The root layout sets these server-side via middleware headers, but during
 * client-side navigation (e.g. language toggle) the root layout doesn't
 * re-render, so the attributes go stale. This component fixes that.
 */
export default function DirectionSetter() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return null;
}
