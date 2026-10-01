'use client';

import { useEffect, useState } from 'react';
import { Loader2, Undo2, MessageCircle, PenLine, RotateCcw, Brain, Trash2 } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import { api, timeAgo } from '@/components/cms/api';

const SOURCE_ICON = { chat: MessageCircle, editor: PenLine, undo: RotateCcw };
const SOURCE_LABEL = { chat: 'Assistant', editor: 'Edited by hand', undo: 'Undo' };

export default function HistoryPage() {
  const [revs, setRevs] = useState(null);
  const [memory, setMemory] = useState([]);
  const [busy, setBusy] = useState(null);
  const [toast, showToast] = useToast();

  const load = () => {
    api('/api/cms/history').then((d) => setRevs(d.revisions)).catch((e) => showToast(e.message, 'error'));
    api('/api/cms/memory').then((d) => setMemory(d.memory)).catch(() => {});
  };
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const undo = async (r) => {
    if (!window.confirm(`Undo “${r.summary || r.path}”?`)) return;
    setBusy(r.id);
    try {
      await api(`/api/cms/history/${r.id}`, { method: 'POST' });
      showToast('Undone — the website is restored');
      load();
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setBusy(null);
    }
  };

  const forget = async (m) => {
    await api(`/api/cms/memory/${m.id}`, { method: 'DELETE' }).catch((e) => showToast(e.message, 'error'));
    load();
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto p-4 sm:p-8 space-y-10">
        <div>
          <PageHeader title="History & undo" subtitle="Every change to the website is recorded here. Undo puts back exactly what was there before." />
          {!revs ? (
            <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
          ) : revs.length === 0 ? (
            <p className="text-sm text-gray-500">No changes yet.</p>
          ) : (
            <ol className="rounded-2xl bg-white border border-gray-200 divide-y divide-gray-100">
              {revs.map((r) => {
                const Icon = SOURCE_ICON[r.source] || PenLine;
                return (
                  <li key={r.id} className="flex items-center gap-3 px-4 py-3">
                    <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm ${r.reverted_at ? 'line-through text-gray-400' : ''}`}>{r.summary || r.path}</p>
                      <p className="text-[11px] text-gray-400">#{r.id} · {SOURCE_LABEL[r.source]} · {timeAgo(r.created_at)}{r.actor ? ` · ${r.actor}` : ''}</p>
                    </div>
                    {!r.reverted_at && r.source !== 'undo' && (
                      <button onClick={() => undo(r)} disabled={busy === r.id} className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold hover:bg-gray-50 disabled:opacity-50">
                        {busy === r.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Undo2 className="w-3 h-3" />} Undo
                      </button>
                    )}
                    {r.reverted_at && <span className="text-[11px] text-gray-400">undone</span>}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        <div>
          <PageHeader title="What the assistant remembers" subtitle="Lasting preferences you've told the assistant to keep in mind. Tell it “remember that…” in a chat to add one." />
          {memory.length === 0 ? (
            <p className="text-sm text-gray-500 flex items-center gap-2"><Brain className="w-4 h-4" /> Nothing saved yet.</p>
          ) : (
            <ul className="rounded-2xl bg-white border border-gray-200 divide-y divide-gray-100">
              {memory.map((m) => (
                <li key={m.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                  <Brain className="w-4 h-4 text-sage-600 flex-shrink-0" />
                  <span className="flex-1">{m.fact}</span>
                  <button onClick={() => forget(m)} className="p-1.5 text-gray-400 hover:text-red-600" aria-label="Forget"><Trash2 className="w-3.5 h-3.5" /></button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Toast toast={toast} />
    </Shell>
  );
}
