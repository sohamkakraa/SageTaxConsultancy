'use client';

import { useEffect, useState } from 'react';
import { Loader2, EyeOff } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import RecordEditor from '@/components/cms/RecordEditor';
import { api } from '@/components/cms/api';

const CATS = { tax: 'Tax Consultancy', accounting: 'Accounting & Auditing', corporate: 'Corporate Services' };

const FIELDS = [
  { type: 'pair', base: 'name', label: 'Service name' },
  { type: 'pair', base: 'description', label: 'Short description (cards and banner)' },
  { type: 'pair', base: 'long_description', label: 'Overview paragraph' },
  { type: 'image', key: 'image_url', label: 'Banner picture' },
  { type: 'select', key: 'category', label: 'Category', options: Object.entries(CATS).map(([value, label]) => ({ value, label })) },
  { type: 'toggle', key: 'is_active', label: 'Show this service on the website' },
  { type: 'pair', base: 'meta_title', label: 'Google title (optional)' },
  { type: 'pair', base: 'meta_description', label: 'Google description (optional)' },
];

export default function ServicesAdminPage() {
  const [services, setServices] = useState(null);
  const [slug, setSlug] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();

  const load = () => api('/api/cms/services').then((d) => setServices(d.services)).catch((e) => showToast(e.message, 'error'));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const current = services?.find((s) => s.slug === slug);

  const save = async (fields) => {
    setSaving(true);
    try {
      await api(`/api/cms/services/${slug}`, { method: 'PUT', body: { fields, summary: `Edited service “${current.name_en}” by hand` } });
      showToast('Saved — the service page is updated');
      await load();
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell>
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <PageHeader title="Services" subtitle="Edit the name, descriptions and banner of each service page. For the lists on a service page (what's included, process steps, documents, FAQs) just ask the assistant." />
        {!services ? (
          <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
        ) : (
          <div className="grid lg:grid-cols-[280px_1fr] gap-6">
            <div className="space-y-5">
              {Object.entries(CATS).map(([cat, label]) => (
                <div key={cat}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">{label}</p>
                  <ul className="space-y-0.5">
                    {services.filter((s) => s.category === cat).map((s) => (
                      <li key={s.slug}>
                        <button onClick={() => setSlug(s.slug)} className={`w-full text-left text-sm rounded-lg px-3 py-2 flex items-center gap-2 ${slug === s.slug ? 'bg-white shadow-sm font-semibold' : 'hover:bg-white/60'}`}>
                          <span className="flex-1 truncate">{s.name_en}</span>
                          {!s.is_active && <EyeOff className="w-3.5 h-3.5 text-gray-400" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 min-h-[300px]">
              {current ? (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-bold text-lg">{current.name_en}</h2>
                    <a href={`/services/${current.slug}`} target="_blank" rel="noopener" className="text-xs font-semibold text-sage-700">View page ↗</a>
                  </div>
                  <RecordEditor key={`${current.slug}-${current.updated_at}`} record={current} fields={FIELDS} onSave={save} saving={saving} />
                </>
              ) : (
                <p className="text-sm text-gray-500">Choose a service on the left.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast toast={toast} />
    </Shell>
  );
}
