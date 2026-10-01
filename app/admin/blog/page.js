'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import RecordEditor from '@/components/cms/RecordEditor';
import { api, timeAgo } from '@/components/cms/api';

const FIELDS = [
  { type: 'pair', base: 'title', label: 'Title' },
  { type: 'pair', base: 'excerpt', label: 'Short summary (shown on the Insights page)' },
  { type: 'pair', base: 'content', label: 'Article (leave a blank line between paragraphs)' },
  { type: 'image', key: 'featured_image', label: 'Picture' },
  { type: 'text', key: 'slug', label: 'Web address ending (e.g. vat-tips-2026)' },
  { type: 'toggle', key: 'is_published', label: 'Published (visible on the website)' },
];

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || `post-${Date.now()}`;

export default function BlogAdminPage() {
  const [posts, setPosts] = useState(null);
  const [current, setCurrent] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();

  const load = () => api('/api/cms/blog').then((d) => setPosts(d.posts)).catch((e) => showToast(e.message, 'error'));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const open = async (id) => {
    try {
      setCurrent((await api(`/api/cms/blog/${id}`)).post);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const save = async (fields) => {
    setSaving(true);
    try {
      if (current.id) {
        await api(`/api/cms/blog/${current.id}`, { method: 'PUT', body: { fields } });
        await open(current.id);
      } else {
        const full = { ...current, ...fields };
        const res = await api('/api/cms/blog', { method: 'POST', body: { fields: { ...fields, slug: fields.slug || slugify(full.title_en || '') } } });
        await open(res.id);
      }
      showToast('Saved');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell>
      <div className="max-w-6xl mx-auto p-4 sm:p-8">
        <PageHeader title="Blog posts" subtitle="Your own articles on the Insights page. Tip: ask the assistant to draft one for you, then review it here.">
          <button onClick={() => setCurrent({ title_en: '', title_ar: '', is_published: false })} className="inline-flex items-center gap-2 rounded-lg bg-navy-950 text-white px-4 py-2 text-sm font-semibold"><Plus className="w-4 h-4" /> New post</button>
        </PageHeader>
        {!posts ? (
          <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
        ) : (
          <div className="grid lg:grid-cols-[300px_1fr] gap-6">
            <ul className="space-y-1">
              {posts.length === 0 && <li className="text-sm text-gray-500 px-3">No posts yet.</li>}
              {posts.map((p) => (
                <li key={p.id}>
                  <button onClick={() => open(p.id)} className={`w-full text-left rounded-lg px-3 py-2 ${current?.id === p.id ? 'bg-white shadow-sm' : 'hover:bg-white/60'}`}>
                    <span className="block text-sm font-medium truncate">{p.title_en}</span>
                    <span className="block text-[11px] text-gray-400">{p.is_published ? 'Published' : 'Draft'} · {timeAgo(p.updated_at || p.published_at)}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-white border border-gray-200 p-5 sm:p-6 min-h-[300px]">
              {current ? (
                <RecordEditor key={current.id || 'new'} record={current} fields={FIELDS} onSave={save} saving={saving} />
              ) : (
                <p className="text-sm text-gray-500">Choose a post on the left, or create a new one.</p>
              )}
            </div>
          </div>
        )}
      </div>
      <Toast toast={toast} />
    </Shell>
  );
}
