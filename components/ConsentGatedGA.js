'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { CONSENT_EVENT, readConsent } from '@/lib/consent';

/**
 * Google Analytics 4, loaded ONLY after the visitor opts in to analytics cookies.
 * Uses Consent Mode v2 (everything denied by default; ads signals never granted) and
 * updates/revokes in real time when the visitor changes their choice.
 */
export default function ConsentGatedGA({ gaId }) {
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    setGranted(Boolean(readConsent()?.analytics));
    const onChange = (e) => {
      const ok = Boolean(e.detail?.analytics);
      setGranted((prev) => prev || ok);
      if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', { analytics_storage: ok ? 'granted' : 'denied' });
      }
      if (!ok && window[`ga-disable-${gaId}`] !== true) window[`ga-disable-${gaId}`] = true;
      if (ok) window[`ga-disable-${gaId}`] = false;
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, [gaId]);

  if (!granted || !gaId) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied'});
gtag('consent','update',{analytics_storage:'granted'});
gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true,allow_google_signals:false,allow_ad_personalization_signals:false});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`} strategy="afterInteractive" />
    </>
  );
}
