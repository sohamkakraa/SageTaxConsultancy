'use client';

import { createContext, useContext, useMemo } from 'react';
import { pick } from '@/lib/cms/tree';

const SiteContext = createContext(null);

export function SiteContentProvider({ content, serviceMenu, locale, children }) {
  const value = useMemo(() => ({ c: content, serviceMenu: serviceMenu || [], locale }), [content, serviceMenu, locale]);
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

/**
 * const { c, tr, locale, isAr, serviceMenu } = useSite();
 * tr(c.home.hero.title) → text in the visitor's language.
 */
export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used inside SiteContentProvider');
  const { c, serviceMenu, locale } = ctx;
  return { c, serviceMenu, locale, isAr: locale === 'ar', tr: (v) => pick(v, locale) };
}
