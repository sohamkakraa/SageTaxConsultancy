'use client';

import { useEffect, useRef, useState } from 'react';
import { X, Upload, Loader2, Check } from 'lucide-react';
import { api, uploadImage } from './api';

/** Modal: pick an image from the library or upload a new one. onPick({ id, url }) */
export default function ImagePicker({ open, onClose, onPick }) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    api('/api/cms/media').then((d) => setMedia(d.media)).catch((e) => setError(e.message)).finally(() => setLoading(false));
  }, [open]);

  if (!open) return null;

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const m = await uploadImage(file);
      onPick(m);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="fixed inset-0 z-[70] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold">Choose a picture</h2>
          <div className="flex items-center gap-2">
            <button onClick={() => fileRef.current?.click()} disabled={uploading} className="inline-flex items-center gap-2 rounded-lg bg-navy-950 text-white text-sm px-3 py-2 disabled:opacity-60">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />} Upload new
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFile} />
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100" aria-label="Close"><X className="w-4 h-4" /></button>
          </div>
        </div>
        {error && <p className="px-4 pt-3 text-sm text-red-600">{error}</p>}
        <div className="p-4 overflow-y-auto">
          {loading ? (
            <div className="py-16 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
          ) : media.length === 0 ? (
            <p className="py-16 text-center text-sm text-gray-500">No pictures yet — upload one, or ask the assistant to create one.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {media.map((m) => (
                <button key={m.id} onClick={() => onPick(m)} className="group relative aspect-[4/3] rounded-xl overflow-hidden border border-gray-200 hover:ring-2 hover:ring-sage-500">
                  <img src={m.url} alt={m.alt_en || ''} className="w-full h-full object-cover" loading="lazy" />
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white opacity-0 group-hover:opacity-100" />
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
