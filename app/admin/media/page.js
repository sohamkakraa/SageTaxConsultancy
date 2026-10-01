'use client';

import { useEffect, useRef, useState } from 'react';
import { Upload, Loader2, Copy, Trash2, X, Sparkles } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import { api, timeAgo, uploadImage } from '@/components/cms/api';

const SOURCE = { upload: 'Uploaded', generated: 'Created by AI', edited: 'Edited by AI' };

export default function MediaPage() {
  const [media, setMedia] = useState(null);
  const [selected, setSelected] = useState(null);
  const [uploading, setUploading] = useState(0);
  const [toast, showToast] = useToast();
  const fileRef = useRef(null);

  const load = () => api('/api/cms/media').then((d) => setMedia(d.media)).catch((e) => showToast(e.message, 'error'));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onFiles = async (files) => {
    const list = Array.from(files || []);
    setUploading((n) => n + list.length);
    for (const f of list) {
      try {
        await uploadImage(f);
      } catch (e) {
        showToast(`${f.name}: ${e.message}`, 'error');
      } finally {
        setUploading((n) => n - 1);
      }
    }
    load();
  };

  const saveInfo = async () => {
    try {
      await api(`/api/cms/media/${selected.id}`, { method: 'PATCH', body: { description: selected.description || '', alt_en: selected.alt_en || '', alt_ar: selected.alt_ar || '' } });
      showToast('Saved');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const remove = async () => {
    if (!window.confirm('Remove this picture from the library?')) return;
    try {
      await api(`/api/cms/media/${selected.id}`, { method: 'DELETE' });
      setSelected(null);
      load();
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  return (
    <Shell>
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <PageHeader title="Pictures" subtitle="Every picture you upload or the assistant creates is kept here. To put one on the website, ask the assistant (e.g. “use the office photo on the About page”) or use Edit pages.">
          <button onClick={() => fileRef.current?.click()} className="inline-flex items-center gap-2 rounded-lg bg-navy-950 text-white px-4 py-2 text-sm font-semibold">
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload pictures
          </button>
          <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { onFiles(e.target.files); e.target.value = ''; }} />
        </PageHeader>

        {!media ? (
          <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
        ) : media.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 py-20 text-center text-gray-500 text-sm">No pictures yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); onFiles(e.dataTransfer.files); }}>
            {media.map((m) => (
              <button key={m.id} onClick={() => setSelected(m)} className="group text-left rounded-xl overflow-hidden bg-white border border-gray-200 hover:shadow-md">
                <div className="aspect-[4/3] bg-gray-100"><img src={m.url} alt={m.alt_en || ''} className="w-full h-full object-cover" loading="lazy" /></div>
                <div className="p-2.5">
                  <p className="text-xs font-medium truncate">{m.description || m.alt_en || m.original_name || 'Picture'}</p>
                  <p className="text-[11px] text-gray-400 flex items-center gap-1">{m.source !== 'upload' && <Sparkles className="w-3 h-3" />}{SOURCE[m.source]} · {timeAgo(m.created_at)}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <p className="font-semibold">{SOURCE[selected.source]} · {selected.width}×{selected.height}</p>
              <button onClick={() => setSelected(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="w-4 h-4" /></button>
            </div>
            <img src={selected.url} alt="" className="w-full max-h-[50vh] object-contain bg-gray-50" />
            <div className="p-4 space-y-3">
              {selected.prompt && <p className="text-xs text-gray-500"><span className="font-semibold">AI instructions:</span> {selected.prompt}</p>}
              <input value={selected.description || ''} onChange={(e) => setSelected({ ...selected, description: e.target.value })} placeholder="What does this picture show? (helps the assistant find it)" className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              <div className="grid sm:grid-cols-2 gap-2">
                <input value={selected.alt_en || ''} onChange={(e) => setSelected({ ...selected, alt_en: e.target.value })} placeholder="Short description (English)" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
                <input dir="rtl" value={selected.alt_ar || ''} onChange={(e) => setSelected({ ...selected, alt_ar: e.target.value })} placeholder="وصف قصير (عربي)" className="rounded-lg border border-gray-300 px-3 py-2 text-sm" />
              </div>
              <div className="flex flex-wrap gap-2 justify-between">
                <div className="flex gap-2">
                  <button onClick={saveInfo} className="rounded-lg bg-navy-950 text-white px-4 py-2 text-sm font-semibold">Save</button>
                  <button onClick={() => { navigator.clipboard?.writeText(selected.url); showToast('Link copied'); }} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-2 text-sm"><Copy className="w-3.5 h-3.5" /> Copy link</button>
                </div>
                <button onClick={remove} className="inline-flex items-center gap-1.5 rounded-lg text-red-600 px-3 py-2 text-sm hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /> Remove</button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Toast toast={toast} />
    </Shell>
  );
}
