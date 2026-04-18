'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';
import { getCookieConsent } from './CookieConsent';

/**
 * Loads Google Analytics ONLY when the user has accepted cookie consent.
 * Listens for consent changes in real-time.
 */
export default function ConsentGatedGA({ gaId }) {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    // Check existing consent
    const current = getCookieConsent();
    if (current === 'accepted') {
      setConsented(true);
    }

    // Listen for consent changes
    const handleConsent = (e) => {
      if (e.detail?.consent === 'accepted') {
        setConsented(true);
      }
    };
    window.addEventListener('cookie-consent-change', handleConsent);
    return () => window.removeEventListener('cookie-consent-change', handleConsent);
  }, []);

  if (!consented || !gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${gaId}',{page_path:window.location.pathname});`}
      </Script>
    </>
  );
}
