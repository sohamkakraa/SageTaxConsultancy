'use client';

import { useEffect, useMemo, useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Trash2, Loader2, Save, ArrowUp, ArrowDown } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import { api } from '@/components/cms/api';
import { BilingualField, ImageField, PlainField, humanLabel } from '@/components/cms/fields';
import { getAt, isImage, isPlainObject, isText, setAt } from '@/lib/cms/tree';

export default function ContentEditorPage() {
  const [saved, setSaved] = useState(null);
  const [draft, setDraft] = useState(null);
  const [sections, setSections] = useState([]);
  const [open, setOpen] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, showToast] = useToast();

  useEffect(() => {
    api('/api/cms/content')
      .then((d) => {
        setSaved(d.content);
        setDraft(d.content);
        setSections(d.sections);
      })
      .catch((e) => showToast(e.message, 'error'));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = useMemo(() => {
    if (!saved || !draft) return [];
    return sections.filter((s) => JSON.stringify(getAt(saved, s.path)) !== JSON.stringify(getAt(draft, s.path))).map((s) => s.path);
  }, [saved, draft, sections]);

  useEffect(() => {
    const warn = (e) => {
      if (dirty.length) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  const update = (path, value) => setDraft((d) => setAt(d, path, value));

  const save = async () => {
    if (!dirty.length) return;
    setSaving(true);
    try {
      const labels = sections.filter((s) => dirty.includes(s.path)).map((s) => s.label);
      await api('/api/cms/content', {
        method: 'PUT',
        body: { changes: dirty.map((p) => ({ path: p, value: getAt(draft, p) })), summary: `Edited by hand: ${labels.join(', ')}` },
      });
      setSaved(draft);
      showToast('Saved — the website is updated');
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Shell>
      <div className="max-w-5xl mx-auto p-4 sm:p-8 pb-28">
        <PageHeader title="Edit pages" subtitle="Change any text or picture by hand. Prefer talking? The Assistant can do all of this for you.">
          {dirty.length > 0 && <button onClick={() => setDraft(saved)} className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm">Discard changes</button>}
        </PageHeader>

        {!draft ? (
          <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
        ) : (
          <div className="space-y-3">
            {sections.map((s) => {
              const isOpen = open === s.path;
              return (
                <div key={s.path} className="rounded-2xl bg-white border border-gray-200 overflow-hidden">
                  <button onClick={() => setOpen(isOpen ? null : s.path)} className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-gray-50">
                    <span>
                      <span className="block font-semibold">{s.label}{dirty.includes(s.path) && <span className="ml-2 text-[10px] font-bold uppercase tracking-wide text-gold-600">unsaved</span>}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{s.where}</span>
                    </span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 pt-2 border-t border-gray-100 space-y-5">
                      <Node node={getAt(draft, s.path)} path={s.path} onChange={update} depth={0} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {dirty.length > 0 && (
        <div className="fixed bottom-0 inset-x-0 lg:left-64 z-30 bg-white border-t border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <p className="text-sm text-gray-600">You have unsaved changes in {dirty.length} section{dirty.length > 1 ? 's' : ''}.</p>
          <button onClick={save} disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-navy-950 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-60">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save & publish
          </button>
        </div>
      )}
      <Toast toast={toast} />
    </Shell>
  );
}

function Node({ node, path, onChange, depth, label }) {
  const key = path.split('.').pop();
  const title = label || humanLabel(key);
  if (isText(node)) return <BilingualField label={title} value={node} onChange={(v) => onChange(path, v)} />;
  if (isImage(node)) return <ImageField label={title} value={node} onChange={(v) => onChange(path, v)} />;
  if (typeof node === 'string') return <PlainField label={title} value={node} onChange={(v) => onChange(path, v)} />;
  if (Array.isArray(node)) return <ListNode list={node} path={path} onChange={onChange} depth={depth} title={title} />;
  if (isPlainObject(node)) {
    const inner = Object.entries(node).map(([k, v]) => <Node key={k} node={v} path={`${path}.${k}`} onChange={onChange} depth={depth + 1} />);
    if (depth === 0) return <>{inner}</>;
    return (
      <fieldset className="rounded-xl border border-gray-200 p-4 space-y-4">
        <legend className="px-2 text-xs font-bold uppercase tracking-wide text-gray-500">{title}</legend>
        {inner}
      </fieldset>
    );
  }
  return null;
}

function blankLike(template) {
  if (isText(template)) return { en: '', ar: '' };
  if (isImage(template)) return structuredClone(template);
  if (Array.isArray(template)) return [];
  if (isPlainObject(template)) return Object.fromEntries(Object.entries(template).map(([k, v]) => [k, blankLike(v)]));
  return '';
}

function ListNode({ list, path, onChange, depth, title }) {
  const [openIdx, setOpenIdx] = useState(null);
  const move = (i, dir) => {
    const next = [...list];
    const [it] = next.splice(i, 1);
    next.splice(i + dir, 0, it);
    onChange(path, next);
  };
  const preview = (item) => {
    if (!isPlainObject(item)) return '';
    const first = Object.values(item).find((v) => isText(v) && v.en) || Object.values(item).find((v) => typeof v === 'string' && v);
    return (isText(first) ? first.en : first) || '';
  };
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-wide text-gray-500">{title} ({list.length})</p>
      {list.map((item, i) => (
        <div key={i} className="rounded-xl border border-gray-200">
          <div className="flex items-center gap-2 px-3 py-2">
            <button onClick={() => setOpenIdx(openIdx === i ? null : i)} className="flex-1 min-w-0 text-left text-sm truncate">
              <span className="text-gray-400 mr-2">{i + 1}.</span>{preview(item) || 'Untitled'}
            </button>
            <button disabled={i === 0} onClick={() => move(i, -1)} className="p-1.5 text-gray-400 hover:text-navy-950 disabled:opacity-20" aria-label="Move up"><ArrowUp className="w-3.5 h-3.5" /></button>
            <button disabled={i === list.length - 1} onClick={() => move(i, 1)} className="p-1.5 text-gray-400 hover:text-navy-950 disabled:opacity-20" aria-label="Move down"><ArrowDown className="w-3.5 h-3.5" /></button>
            <button
              disabled={list.length <= 1}
              onClick={() => { if (window.confirm('Remove this item?')) onChange(path, list.filter((_, j) => j !== i)); }}
              className="p-1.5 text-gray-400 hover:text-red-600 disabled:opacity-20"
              aria-label="Remove"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          {openIdx === i && (
            <div className="px-4 pb-4 pt-1 border-t border-gray-100 space-y-4">
              <Node node={item} path={`${path}.${i}`} onChange={onChange} depth={0} />
            </div>
          )}
        </div>
      ))}
      {list.length < 60 && (
        <button onClick={() => { onChange(path, [...list, blankLike(list[0])]); setOpenIdx(list.length); }} className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 hover:text-navy-950">
          <Plus className="w-4 h-4" /> Add item
        </button>
      )}
    </div>
  );
}
