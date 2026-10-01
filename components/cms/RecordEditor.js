'use client';

import { useState } from 'react';
import { Loader2, Save, ImageIcon } from 'lucide-react';
import { BilingualField } from './fields';
import ImagePicker from './ImagePicker';

/**
 * Generic editor for a database row.
 * fields: [{ type: 'pair', base, label } | { type: 'text', key, label } | { type: 'toggle', key, label }
 *          | { type: 'image', key, label } | { type: 'select', key, label, options }]
 */
export default function RecordEditor({ record, fields, onSave, saving, footer }) {
  const [draft, setDraft] = useState(record);
  const [picker, setPicker] = useState(null);
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const changed = () => {
    const out = {};
    for (const f of fields) {
      const keys = f.type === 'pair' ? [`${f.base}_en`, `${f.base}_ar`] : [f.key];
      for (const k of keys) if (JSON.stringify(draft[k] ?? null) !== JSON.stringify(record[k] ?? null)) out[k] = draft[k];
    }
    return out;
  };
  const diff = changed();

  return (
    <div className="space-y-5">
      {fields.map((f) => {
        if (f.type === 'pair') {
          return (
            <BilingualField
              key={f.base}
              label={f.label}
              value={{ en: draft[`${f.base}_en`] || '', ar: draft[`${f.base}_ar`] || '' }}
              onChange={(v) => setDraft((d) => ({ ...d, [`${f.base}_en`]: v.en, [`${f.base}_ar`]: v.ar }))}
            />
          );
        }
        if (f.type === 'toggle') {
          return (
            <label key={f.key} className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" checked={Boolean(draft[f.key])} onChange={(e) => set(f.key, e.target.checked)} className="w-4 h-4 rounded" />
              {f.label}
            </label>
          );
        }
        if (f.type === 'select') {
          return (
            <label key={f.key} className="block space-y-1.5">
              <span className="text-xs font-semibold text-gray-600">{f.label}</span>
              <select value={draft[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white">
                {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </label>
          );
        }
        if (f.type === 'image') {
          return (
            <div key={f.key} className="space-y-1.5">
              <p className="text-xs font-semibold text-gray-600">{f.label}</p>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => setPicker(f.key)} className="relative w-44 aspect-[3/2] rounded-lg overflow-hidden border border-gray-200 bg-gray-50 group">
                  {draft[f.key] ? <img src={draft[f.key]} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-6 h-6 m-auto text-gray-300" />}
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 text-white text-xs font-semibold flex items-center justify-center opacity-0 group-hover:opacity-100">Choose picture</span>
                </button>
                {draft[f.key] && <button type="button" onClick={() => set(f.key, null)} className="text-xs text-gray-500 hover:text-red-600">Use default picture</button>}
              </div>
            </div>
          );
        }
        return (
          <label key={f.key} className="block space-y-1.5">
            <span className="text-xs font-semibold text-gray-600">{f.label}</span>
            <input value={draft[f.key] || ''} onChange={(e) => set(f.key, e.target.value)} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
          </label>
        );
      })}

      {footer}

      <div className="flex justify-end">
        <button onClick={() => onSave(diff)} disabled={saving || !Object.keys(diff).length} className="inline-flex items-center gap-2 rounded-lg bg-navy-950 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-40">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save & publish
        </button>
      </div>

      <ImagePicker open={Boolean(picker)} onClose={() => setPicker(null)} onPick={(m) => { set(picker, m.url); setPicker(null); }} />
    </div>
  );
}
