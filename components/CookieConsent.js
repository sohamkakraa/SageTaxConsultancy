'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieConsent({ locale = 'en' }) {
  const t = useTranslations();
  const [showBanner, setShowBanner] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const consentKey = 'sage-cookie-consent';
    const hasConsent = localStorage.getItem(consentKey);

    if (!hasConsent) {
      setShowBanner(true);
      setTimeout(() => setAnimateIn(true), 50);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('sage-cookie-consent', 'accepted');
    setAnimateIn(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  const handleDecline = () => {
    localStorage.setItem('sage-cookie-consent', 'declined');
    setAnimateIn(false);
    setTimeout(() => setShowBanner(false), 300);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 pointer-events-none transition-all duration-300 ${
        animateIn ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-12 opacity-0'
      }`}
    >
      <div className="mx-4 mb-4 p-6 bg-sage-800 text-white rounded-lg shadow-2xl max-w-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Message */}
          <div className="flex-1">
            <p className="text-sm leading-relaxed">
              {t('cookie.message')}
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0 w-full sm:w-auto">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors rounded-md whitespace-nowrap"
            >
              {t('cookie.decline')}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm font-semibold text-navy-950 bg-gold hover:bg-gold/90 transition-colors rounded-md whitespace-nowrap"
            >
              {t('cookie.accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
