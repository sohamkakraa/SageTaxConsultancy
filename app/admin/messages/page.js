'use client';

import { useEffect, useState } from 'react';
import { Loader2, Mail, Phone, Trash2, MailOpen } from 'lucide-react';
import Shell, { PageHeader, Toast, useToast } from '@/components/cms/Shell';
import { api, timeAgo } from '@/components/cms/api';

export default function MessagesPage() {
  const [messages, setMessages] = useState(null);
  const [openId, setOpenId] = useState(null);
  const [toast, showToast] = useToast();

  const load = () => api('/api/cms/messages').then((d) => setMessages(d.messages)).catch((e) => showToast(e.message, 'error'));
  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = async (m) => {
    const opening = openId !== m.id;
    setOpenId(opening ? m.id : null);
    if (opening && !m.is_read) {
      await api(`/api/cms/messages/${m.id}`, { method: 'PATCH', body: { is_read: true } }).catch(() => {});
      setMessages((list) => list.map((x) => (x.id === m.id ? { ...x, is_read: true } : x)));
    }
  };

  const remove = async (m) => {
    if (!window.confirm(`Permanently delete the enquiry from ${m.name}? (Use this e.g. when someone asks for their data to be erased.)`)) return;
    await api(`/api/cms/messages/${m.id}`, { method: 'DELETE' }).catch((e) => showToast(e.message, 'error'));
    load();
  };

  return (
    <Shell>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <PageHeader title="Enquiries" subtitle="Messages sent through the contact form. Under UAE data-protection law, delete enquiries you no longer need (we recommend after 24 months) or when someone asks you to." />
        {!messages ? (
          <div className="py-20 text-center text-gray-400"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
        ) : messages.length === 0 ? (
          <p className="text-sm text-gray-500">No enquiries yet.</p>
        ) : (
          <ul className="rounded-2xl bg-white border border-gray-200 divide-y divide-gray-100">
            {messages.map((m) => (
              <li key={m.id}>
                <button onClick={() => toggle(m)} className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50">
                  {m.is_read ? <MailOpen className="w-4 h-4 text-gray-300" /> : <span className="w-2 h-2 rounded-full bg-gold-500 mx-1" />}
                  <span className="flex-1 min-w-0">
                    <span className={`block text-sm truncate ${m.is_read ? '' : 'font-semibold'}`}>{m.name} — {m.subject}</span>
                    <span className="block text-[11px] text-gray-400">{timeAgo(m.created_at)}</span>
                  </span>
                </button>
                {openId === m.id && (
                  <div className="px-4 pb-4 pl-11 space-y-3">
                    <div className="flex flex-wrap gap-3 text-sm">
                      <a href={`mailto:${m.email}?subject=${encodeURIComponent(`Re: ${m.subject}`)}`} className="inline-flex items-center gap-1.5 text-sage-700 font-semibold"><Mail className="w-3.5 h-3.5" />{m.email}</a>
                      {m.phone && <a href={`tel:${m.phone}`} className="inline-flex items-center gap-1.5 text-sage-700 font-semibold"><Phone className="w-3.5 h-3.5" />{m.phone}</a>}
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap bg-gray-50 rounded-xl p-3" dir="auto">{m.message}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] text-gray-400">{m.consent_given ? 'Privacy consent given' : 'Received before consent was recorded'}</span>
                      <button onClick={() => remove(m)} className="inline-flex items-center gap-1.5 text-xs text-red-600 hover:bg-red-50 rounded-lg px-2 py-1"><Trash2 className="w-3.5 h-3.5" /> Delete</button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Toast toast={toast} />
    </Shell>
  );
}
