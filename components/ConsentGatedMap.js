'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin } from 'lucide-react';
import { CONSENT_EVENT, readConsent, writeConsent } from '@/lib/consent';

// Google Maps sets third-party cookies, so the map only loads after "External media" consent.
export default function ConsentGatedMap({ src, title }) {
  const t = useTranslations('cookie');
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(Boolean(readConsent()?.media));
    const onChange = (e) => setAllowed(Boolean(e.detail?.media));
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  const safeSrc = /^https:\/\/(www\.)?google\.com\/maps/.test(src || '') ? src : null;

  if (!safeSrc) return null;
  if (!allowed) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-sage-50 text-center p-6">
        <MapPin className="w-6 h-6 text-sage-600" />
        <p className="text-xs text-gray-600 max-w-xs">{t('mapBlocked')}</p>
        <button
          type="button"
          onClick={() => writeConsent({ analytics: Boolean(readConsent()?.analytics), media: true })}
          className="px-4 py-2 rounded-lg bg-navy-800 text-white text-xs font-semibold hover:bg-navy-900"
        >
          {t('mapAllow')}
        </button>
      </div>
    );
  }
  return (
    <iframe
      title={title}
      src={safeSrc}
      width="100%"
      height="100%"
      style={{ border: 0 }}
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
      className="w-full h-full"
    />
  );
}
