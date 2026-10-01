'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Cookie, X } from 'lucide-react';
import { Link } from '@/lib/navigation';
import { OPEN_SETTINGS_EVENT, readConsent, writeConsent } from '@/lib/consent';

/** Re-open the preferences dialog from anywhere (e.g. footer "Cookie settings"). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}

export default function CookieConsent() {
  const t = useTranslations('cookie');
  const [banner, setBanner] = useState(false);
  const [dialog, setDialog] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, media: false });

  useEffect(() => {
    if (window.self !== window.top) return undefined; // CMS live preview: no banner
    const existing = readConsent();
    if (existing) setPrefs({ analytics: existing.analytics, media: existing.media });
    else {
      const timer = setTimeout(() => setBanner(true), 600);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, []);

  useEffect(() => {
    const open = () => {
      const existing = readConsent();
      if (existing) setPrefs({ analytics: existing.analytics, media: existing.media });
      setDialog(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  const save = (choice) => {
    writeConsent(choice);
    setPrefs(choice);
    setBanner(false);
    setDialog(false);
  };

  return (
    <>
      {banner && !dialog && (
        <div role="dialog" aria-live="polite" aria-label={t('title')} className="fixed bottom-20 left-4 right-4 sm:left-4 sm:right-auto sm:bottom-6 sm:max-w-md z-[60] animate-fade-up">
          <div className="bg-navy-950 text-white rounded-xl shadow-2xl p-5 border border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <Cookie className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <p className="text-sm font-semibold">{t('title')}</p>
                <p className="text-xs text-gray-300 leading-relaxed">{t('message')}</p>
                <Link href="/cookie-policy" className="inline-block text-xs text-gold-400 hover:text-gold-300 underline underline-offset-2">
                  {t('learnMore')}
                </Link>
              </div>
            </div>
            {/* Equal prominence for accept and reject, as required for freely-given consent */}
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setDialog(true)} className="px-2 py-2 text-xs font-medium text-gray-200 bg-white/10 hover:bg-white/15 rounded-lg min-h-[40px]">{t('customize')}</button>
              <button onClick={() => save({ analytics: false, media: false })} className="px-2 py-2 text-xs font-semibold text-navy-950 bg-white hover:bg-gray-100 rounded-lg min-h-[40px]">{t('decline')}</button>
              <button onClick={() => save({ analytics: true, media: true })} className="px-2 py-2 text-xs font-semibold text-navy-950 bg-gold-400 hover:bg-gold-300 rounded-lg min-h-[40px]">{t('accept')}</button>
            </div>
          </div>
        </div>
      )}

      {dialog && (
        <div className="fixed inset-0 z-[70] bg-navy-950/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="cookie-dialog-title">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 id="cookie-dialog-title" className="font-bold text-navy-950">{t('settingsTitle')}</h2>
              <button onClick={() => { setDialog(false); }} aria-label={t('close')} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-4 text-sm">
              <p className="text-gray-600 text-xs leading-relaxed">{t('settingsIntro')}</p>
              <Category title={t('necessaryTitle')} text={t('necessaryText')} checked disabled alwaysLabel={t('alwaysOn')} />
              <Category title={t('analyticsTitle')} text={t('analyticsText')} checked={prefs.analytics} onChange={(v) => setPrefs((p) => ({ ...p, analytics: v }))} />
              <Category title={t('mediaTitle')} text={t('mediaText')} checked={prefs.media} onChange={(v) => setPrefs((p) => ({ ...p, media: v }))} />
              <p className="text-xs text-gray-500">
                {t('moreInfo')}{' '}
                <Link href="/cookie-policy" className="text-sage-700 underline" onClick={() => setDialog(false)}>{t('learnMore')}</Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-5 border-t border-gray-100">
              <button onClick={() => save({ analytics: false, media: false })} className="btn-secondary !px-3 !py-2.5 text-xs">{t('decline')}</button>
              <button onClick={() => save(prefs)} className="btn-secondary !px-3 !py-2.5 text-xs">{t('save')}</button>
              <button onClick={() => save({ analytics: true, media: true })} className="btn-primary !px-3 !py-2.5 text-xs">{t('accept')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Category({ title, text, checked, onChange, disabled = false, alwaysLabel }) {
  return (
    <div className="flex items-start justify-between gap-4 p-4 rounded-xl border border-gray-200">
      <div>
        <p className="font-semibold text-navy-950 text-sm">{title}</p>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">{text}</p>
      </div>
      {disabled ? (
        <span className="text-[11px] font-semibold text-sage-700 whitespace-nowrap">{alwaysLabel}</span>
      ) : (
        <button
          type="button"
          role="switch"
          aria-checked={checked}
          aria-label={title}
          onClick={() => onChange(!checked)}
          className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? 'bg-sage-600' : 'bg-gray-300'}`}
        >
          <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
        </button>
      )}
    </div>
  );
}
