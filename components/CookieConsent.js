'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { Cookie, ExternalLink } from 'lucide-react';

/**
 * Returns the current cookie consent status: 'accepted', 'declined', or null.
 * Used by other components (e.g. GA loader) to check consent.
 */
export function getCookieConsent() {
  try {
    return localStorage.getItem('sage-cookie-consent');
  } catch {
    return null;
  }
}

export default function CookieConsent({ locale }) {
  const t = useTranslations();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('sage-cookie-consent');
      if (!consent) {
        setTimeout(() => setVisible(true), 1000);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const handleChoice = (choice) => {
    try {
      localStorage.setItem('sage-cookie-consent', choice);
    } catch {
      // ignore
    }
    // Dispatch event so GA loader and other components can react
    window.dispatchEvent(new CustomEvent('cookie-consent-change', { detail: { consent: choice } }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 sm:left-4 sm:right-auto sm:bottom-6 sm:max-w-sm z-40 animate-fade-up">
      <div className="bg-navy-950 text-white rounded-xl shadow-2xl p-5 border border-white/10">
        <div className="flex items-start gap-3">
          <Cookie className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-3">
            <p className="text-sm text-gray-300 leading-relaxed">
              {t('cookie.message')}
            </p>
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
            >
              {t('cookie.learnMore') || 'Privacy Policy'}
              <ExternalLink className="w-3 h-3" />
            </Link>
            <div className="flex gap-2">
              <button
                onClick={() => handleChoice('declined')}
                className="px-4 py-2 text-xs font-medium text-gray-300 bg-white/10 hover:bg-white/15 rounded-lg transition-colors min-h-[40px] flex items-center"
              >
                {t('cookie.decline')}
              </button>
              <button
                onClick={() => handleChoice('accepted')}
                className="px-4 py-2 text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 rounded-lg transition-colors min-h-[40px] flex items-center"
              >
                {t('cookie.accept')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
