'use client';

import { useState } from 'react';
import { Languages, Loader2, ImageIcon } from 'lucide-react';
import { api } from './api';
import ImagePicker from './ImagePicker';

const LABELS = {
  ctaPrimary: 'Main button', ctaSecondary: 'Second button', cta: 'Call-to-action box', badge: 'Small label above the title',
  seoTitle: 'Google title', seoDescription: 'Google description', brandName: 'Company name', mapsUrl: 'Google Maps link',
  mapEmbedUrl: 'Embedded map address', whatsapp: 'WhatsApp number (digits only)', licenseNumber: 'Trade licence number',
  licensingAuthority: 'Licensing authority', registeredAddress: 'Registered address', privacyEmail: 'Privacy contact email',
  menuText: 'Text in the top menu', detailBadge: 'Label on every service page', detailCta: 'Box at the bottom of service pages',
  heroImage: 'Banner picture', defaultPostImage: 'Fallback picture for posts', pills: 'Three boxes under the buttons',
  suffix: 'After the number (e.g. + or M+)', value: 'Number', missionTitle: 'Mission heading', missionText: 'Mission text',
  visionTitle: 'Vision heading', visionText: 'Vision text', formTitle: 'Form heading', text: 'Text', body: 'Text (blank line = new paragraph)',
};

export function humanLabel(key) {
  if (LABELS[key]) return LABELS[key];
  if (/^\d+$/.test(key)) return `Item ${Number(key) + 1}`;
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase());
}

const inputCls = 'w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-sage-600 focus:ring-2 focus:ring-sage-100 outline-none';

export function BilingualField({ label, value, onChange }) {
  const [busy, setBusy] = useState(null);
  const long = (value.en?.length || 0) > 70 || (value.ar?.length || 0) > 70 || /\n/.test(value.en || '');
  const translate = async (to) => {
    const from = to === 'ar' ? value.en : value.ar;
    if (!from?.trim()) return;
    setBusy(to);
    try {
      const { text } = await api('/api/cms/translate', { method: 'POST', body: { text: from, to } });
      onChange({ ...value, [to]: text });
    } catch (e) {
      alert(e.message);
    } finally {
      setBusy(null);
    }
  };
  const Box = long ? 'textarea' : 'input';
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-gray-600">{label}</p>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400"><span>English</span>
            <button type="button" onClick={() => translate('en')} className="inline-flex items-center gap-1 hover:text-sage-700" title="Translate from Arabic">{busy === 'en' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Languages className="w-3 h-3" />} from Arabic</button>
          </div>
          <Box value={value.en || ''} onChange={(e) => onChange({ ...value, en: e.target.value })} rows={long ? 4 : undefined} className={inputCls} />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-gray-400"><span>العربية</span>
            <button type="button" onClick={() => translate('ar')} className="inline-flex items-center gap-1 hover:text-sage-700" title="Translate from English">{busy === 'ar' ? <Loader2 className="w-3 h-3 animate-spin" /> : <Languages className="w-3 h-3" />} from English</button>
          </div>
          <Box dir="rtl" value={value.ar || ''} onChange={(e) => onChange({ ...value, ar: e.target.value })} rows={long ? 4 : undefined} className={`${inputCls} font-arabic`} />
        </div>
      </div>
    </div>
  );
}

export function PlainField({ label, value, onChange }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-semibold text-gray-600">{label}</span>
      <input value={value || ''} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

export function ImageField({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="space-y-1.5">
      <p className="text-xs font-semibold text-gray-600">{label}</p>
      <div className="flex gap-3 items-start">
        <button type="button" onClick={() => setOpen(true)} className="relative w-40 aspect-[3/2] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group flex-shrink-0">
          {value.url ? <img src={value.url} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 m-auto text-gray-300" />}
          <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 text-white text-xs font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100">Change picture</span>
        </button>
        <div className="flex-1 grid gap-2">
          <input placeholder="Describe the picture (English)" value={value.alt?.en || ''} onChange={(e) => onChange({ ...value, alt: { ...value.alt, en: e.target.value } })} className={inputCls} />
          <input dir="rtl" placeholder="وصف الصورة (عربي)" value={value.alt?.ar || ''} onChange={(e) => onChange({ ...value, alt: { ...value.alt, ar: e.target.value } })} className={inputCls} />
        </div>
      </div>
      <ImagePicker
        open={open}
        onClose={() => setOpen(false)}
        onPick={(m) => {
          onChange({ ...value, url: m.url, alt: { en: value.alt?.en || m.alt_en || '', ar: value.alt?.ar || m.alt_ar || '' } });
          setOpen(false);
        }}
      />
    </div>
  );
}
