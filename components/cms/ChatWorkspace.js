'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Send, Paperclip, Loader2, Plus, MessageCircle, Trash2, Undo2, CheckCircle2, X, Monitor, Smartphone,
  RefreshCw, PanelRightClose, PanelRightOpen, ImagePlus, Sparkles, ExternalLink,
} from 'lucide-react';
import { api, timeAgo, uploadImage } from './api';
import { Toast, useToast } from './Shell';

const PAGES = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/contact', label: 'Contact' },
  { path: '/blog', label: 'Insights' },
];

const SUGGESTIONS = [
  'Change the big headline on the home page to something more confident',
  'Add a new question to the FAQ about Corporate Tax registration deadlines',
  'Create a professional background picture of Dubai for the top of the home page',
  'Write a short blog post about VAT tips for new businesses (keep it as a draft)',
];

export default function ChatWorkspace() {
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState([]); // { key, preview, status:'uploading'|'ready'|'error', media? , error? }
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [showList, setShowList] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [preview, setPreview] = useState({ path: '/', locale: 'en', device: 'desktop', nonce: 0 });
  const [dragging, setDragging] = useState(false);
  const [toast, showToast] = useToast();
  const scrollRef = useRef(null);
  const fileRef = useRef(null);
  const textRef = useRef(null);

  const loadConversations = useCallback(() => api('/api/cms/conversations').then((d) => setConversations(d.conversations)).catch(() => {}), []);

  useEffect(() => {
    loadConversations();
    if (typeof window !== 'undefined' && window.innerWidth < 1280) setShowPreview(false);
  }, [loadConversations]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  const openConversation = async (id) => {
    setShowList(false);
    if (busy) return;
    setConversationId(id);
    setMessages([]);
    try {
      const d = await api(`/api/cms/conversations/${id}`);
      setMessages(d.messages);
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const newConversation = () => {
    if (busy) return;
    setConversationId(null);
    setMessages([]);
    setShowList(false);
    textRef.current?.focus();
  };

  const deleteConversation = async (id) => {
    if (!window.confirm('Delete this conversation? (Changes made to the website stay.)')) return;
    await api(`/api/cms/conversations/${id}`, { method: 'DELETE' }).catch((e) => showToast(e.message, 'error'));
    if (id === conversationId) newConversation();
    loadConversations();
  };

  // ── Attachments ───────────────────────────────────────────
  const addFiles = (files) => {
    const list = Array.from(files || []).filter((f) => f.type.startsWith('image/')).slice(0, 8 - attachments.length);
    if (!list.length) return;
    list.forEach((file) => {
      const key = `${Date.now()}-${Math.random()}`;
      const preview = URL.createObjectURL(file);
      setAttachments((a) => [...a, { key, preview, status: 'uploading' }]);
      uploadImage(file)
        .then((media) => setAttachments((a) => a.map((x) => (x.key === key ? { ...x, status: 'ready', media } : x))))
        .catch((e) => setAttachments((a) => a.map((x) => (x.key === key ? { ...x, status: 'error', error: e.message } : x))));
    });
  };
  const removeAttachment = (key) => setAttachments((a) => a.filter((x) => x.key !== key));
  const uploading = attachments.some((a) => a.status === 'uploading');

  const onPaste = (e) => {
    const files = Array.from(e.clipboardData?.files || []);
    if (files.length) {
      e.preventDefault();
      addFiles(files);
    }
  };

  // ── Sending ───────────────────────────────────────────────
  const send = async (textOverride) => {
    const text = (textOverride ?? input).trim();
    const ready = attachments.filter((a) => a.status === 'ready');
    if ((!text && !ready.length) || busy || uploading) return;

    setBusy(true);
    setStatus('Thinking…');
    setInput('');
    setAttachments([]);
    const tempUser = { id: `tmp-${Date.now()}`, role: 'user', content: text, attachments: ready.map((a) => ({ media_id: a.media.id, url: a.media.url })) };
    const draft = { id: 'draft', role: 'assistant', content: '', actions: [], images: [], streaming: true };
    setMessages((m) => [...m, tempUser, draft]);

    const updateDraft = (fn) => setMessages((m) => m.map((x) => (x.id === 'draft' ? fn(x) : x)));
    let lastPage = null;

    try {
      const res = await fetch('/api/cms/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ conversationId, text, attachments: ready.map((a) => a.media.id) }),
      });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok || !res.body) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || 'The assistant is unavailable right now.');
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let nl;
        while ((nl = buffer.indexOf('\n')) >= 0) {
          const line = buffer.slice(0, nl).trim();
          buffer = buffer.slice(nl + 1);
          if (!line) continue;
          let ev;
          try {
            ev = JSON.parse(line);
          } catch {
            continue;
          }
          if (ev.type === 'start') {
            setConversationId(ev.conversationId);
            setMessages((m) => m.map((x) => (x.id === tempUser.id ? ev.userMessage : x)));
          } else if (ev.type === 'status') setStatus(ev.text);
          else if (ev.type === 'delta') {
            setStatus('');
            updateDraft((d) => ({ ...d, content: d.content + ev.text }));
          } else if (ev.type === 'image') updateDraft((d) => ({ ...d, images: [...d.images, ev] }));
          else if (ev.type === 'action') {
            updateDraft((d) => ({ ...d, actions: [...d.actions, ev.action] }));
            if (ev.action.page) {
              lastPage = ev.action.page;
              setPreview((p) => ({ ...p, path: ev.action.page, nonce: p.nonce + 1 }));
            }
          } else if (ev.type === 'done' || ev.type === 'error') {
            setStatus('');
            setBusy(false);
            if (ev.message) setMessages((m) => m.map((x) => (x.id === 'draft' ? ev.message : x)));
            else updateDraft((d) => ({ ...d, streaming: false, content: d.content || ev.error }));
            if (lastPage) setTimeout(() => setPreview((p) => ({ ...p, nonce: p.nonce + 1 })), 1200);
          } else if (ev.type === 'summary-updated') loadConversations();
        }
      }
    } catch (e) {
      updateDraft((d) => ({ ...d, streaming: false, content: d.content || `Sorry — ${e.message}` }));
    } finally {
      setBusy(false);
      setStatus('');
      loadConversations();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  };

  const undo = async (revisionIds, label) => {
    try {
      for (const id of [...revisionIds].reverse()) await api(`/api/cms/history/${id}`, { method: 'POST' });
      showToast(`Undone: ${label}`);
      setPreview((p) => ({ ...p, nonce: p.nonce + 1 }));
      setMessages((m) => m.map((msg) => ({ ...msg, actions: (msg.actions || []).map((a) => (a.revision_ids === revisionIds ? { ...a, undone: true } : a)) })));
    } catch (e) {
      showToast(e.message, 'error');
    }
  };

  const previewSrc = `${preview.locale === 'ar' ? '/ar' : ''}${preview.path === '/' && preview.locale === 'ar' ? '' : preview.path}?cms_preview=${preview.nonce}`;

  return (
    <div className="h-full flex min-h-0">
      {/* Conversation list */}
      <div className={`${showList ? 'fixed inset-0 z-40 bg-black/30 md:hidden' : 'hidden'}`} onClick={() => setShowList(false)} />
      <section className={`${showList ? 'fixed z-50 left-0 top-0 bottom-0 w-72 shadow-xl' : 'hidden'} md:static md:flex md:w-64 flex-col bg-white border-r border-gray-200 min-h-0`}>
        <div className="p-3 border-b border-gray-100">
          <button onClick={newConversation} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-navy-950 text-white py-2.5 text-sm font-semibold hover:bg-navy-900">
            <Plus className="w-4 h-4" /> New conversation
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
          {conversations.length === 0 && <p className="text-xs text-gray-400 p-3">Your conversations will appear here. The assistant remembers what you discussed before.</p>}
          {conversations.map((c) => (
            <div key={c.id} className={`group flex items-center rounded-lg ${c.id === conversationId ? 'bg-sage-50' : 'hover:bg-gray-50'}`}>
              <button onClick={() => openConversation(c.id)} className="flex-1 min-w-0 text-left px-3 py-2">
                <span className="block text-sm font-medium truncate">{c.title}</span>
                <span className="block text-[11px] text-gray-400">{timeAgo(c.updated_at)}</span>
              </button>
              <button onClick={() => deleteConversation(c.id)} className="p-2 mr-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100" aria-label="Delete conversation">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Chat */}
      <section
        className="flex-1 min-w-0 flex flex-col relative"
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={(e) => { if (e.currentTarget === e.target) setDragging(false); }}
        onDrop={(e) => { e.preventDefault(); setDragging(false); addFiles(e.dataTransfer.files); }}
      >
        <div className="flex items-center justify-between gap-2 px-4 h-12 border-b border-gray-200 bg-white/70 backdrop-blur">
          <button onClick={() => setShowList(true)} className="md:hidden inline-flex items-center gap-1.5 text-sm text-gray-600"><MessageCircle className="w-4 h-4" /> Chats</button>
          <p className="hidden md:block text-sm font-semibold text-gray-700 truncate">{conversations.find((c) => c.id === conversationId)?.title || 'Website assistant'}</p>
          <button onClick={() => setShowPreview((v) => !v)} className="hidden lg:inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-navy-950">
            {showPreview ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />} {showPreview ? 'Hide preview' : 'Show preview'}
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
            {messages.length === 0 && (
              <div className="pt-6 sm:pt-12 text-center space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-navy-950 text-gold-400 flex items-center justify-center mx-auto"><Sparkles className="w-6 h-6" /></div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold font-display">What would you like to change?</h2>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">Just describe it in your own words — in English or Arabic. You can attach photos too. Every change can be undone.</p>
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-left">
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => send(s)} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 hover:border-sage-400 hover:bg-sage-50/50 transition-colors">{s}</button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <Message key={m.id} m={m} onUndo={undo} onImageClick={(url) => window.open(url, '_blank', 'noopener')} />
            ))}

            {busy && status && (
              <div className="flex items-center gap-2 text-sm text-gray-500 pl-11">
                <Loader2 className="w-4 h-4 animate-spin text-sage-600" /> {status}
              </div>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-gray-200 bg-white px-4 py-3">
          <div className="max-w-3xl mx-auto">
            {attachments.length > 0 && (
              <div className="flex gap-2 mb-2 flex-wrap">
                {attachments.map((a) => (
                  <div key={a.key} className="relative w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                    <img src={a.preview} alt="" className={`w-full h-full object-cover ${a.status === 'uploading' ? 'opacity-50' : ''}`} />
                    {a.status === 'uploading' && <Loader2 className="absolute inset-0 m-auto w-5 h-5 animate-spin text-navy-950" />}
                    {a.status === 'error' && <span title={a.error} className="absolute inset-0 bg-red-600/70 text-white text-[10px] flex items-center justify-center text-center p-1">Failed</span>}
                    <button onClick={() => removeAttachment(a.key)} className="absolute top-0.5 right-0.5 bg-black/60 text-white rounded-full p-0.5" aria-label="Remove"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2 rounded-2xl border border-gray-300 bg-white focus-within:border-sage-500 focus-within:ring-2 focus-within:ring-sage-100 px-2 py-1.5">
              <button onClick={() => fileRef.current?.click()} className="p-2 text-gray-400 hover:text-navy-950" aria-label="Attach pictures" title="Attach pictures">
                <Paperclip className="w-5 h-5" />
              </button>
              <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
              <textarea
                ref={textRef}
                value={input}
                onChange={(e) => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`; }}
                onKeyDown={onKeyDown}
                onPaste={onPaste}
                rows={1}
                dir="auto"
                placeholder="Tell me what to change…"
                className="flex-1 resize-none bg-transparent py-2 text-[15px] outline-none max-h-[200px]"
              />
              <button onClick={() => send()} disabled={busy || uploading || (!input.trim() && !attachments.some((a) => a.status === 'ready'))} className="p-2.5 rounded-xl bg-navy-950 text-white disabled:opacity-30 hover:bg-navy-900" aria-label="Send">
                {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-gray-400 mt-1.5 text-center">Enter to send · Shift+Enter for a new line · drop or paste pictures to attach · every change can be undone</p>
          </div>
        </div>

        {dragging && (
          <div className="absolute inset-0 z-10 bg-sage-50/90 border-2 border-dashed border-sage-500 rounded-xl m-2 flex items-center justify-center pointer-events-none">
            <div className="text-center text-sage-800"><ImagePlus className="w-8 h-8 mx-auto mb-2" />Drop pictures to attach them</div>
          </div>
        )}
      </section>

      {/* Live preview */}
      {showPreview && (
        <section className="hidden lg:flex w-[44%] max-w-[760px] flex-col border-l border-gray-200 bg-[#ecebe6] min-h-0">
          <div className="flex items-center gap-1.5 px-3 h-12 border-b border-gray-200 bg-white/70">
            <select value={preview.path} onChange={(e) => setPreview((p) => ({ ...p, path: e.target.value, nonce: p.nonce + 1 }))} className="text-xs rounded-md border border-gray-200 bg-white px-2 py-1.5">
              {[...PAGES, ...(PAGES.some((p) => p.path === preview.path) ? [] : [{ path: preview.path, label: preview.path }])].map((p) => <option key={p.path} value={p.path}>{p.label}</option>)}
            </select>
            <div className="flex rounded-md border border-gray-200 bg-white overflow-hidden text-xs">
              {['en', 'ar'].map((l) => (
                <button key={l} onClick={() => setPreview((p) => ({ ...p, locale: l, nonce: p.nonce + 1 }))} className={`px-2 py-1.5 ${preview.locale === l ? 'bg-navy-950 text-white' : 'text-gray-500'}`}>{l === 'en' ? 'EN' : 'عربي'}</button>
              ))}
            </div>
            <div className="flex rounded-md border border-gray-200 bg-white overflow-hidden">
              <button onClick={() => setPreview((p) => ({ ...p, device: 'desktop' }))} className={`px-2 py-1.5 ${preview.device === 'desktop' ? 'bg-navy-950 text-white' : 'text-gray-500'}`} aria-label="Desktop"><Monitor className="w-3.5 h-3.5" /></button>
              <button onClick={() => setPreview((p) => ({ ...p, device: 'mobile' }))} className={`px-2 py-1.5 ${preview.device === 'mobile' ? 'bg-navy-950 text-white' : 'text-gray-500'}`} aria-label="Mobile"><Smartphone className="w-3.5 h-3.5" /></button>
            </div>
            <div className="flex-1" />
            <button onClick={() => setPreview((p) => ({ ...p, nonce: p.nonce + 1 }))} className="p-1.5 text-gray-500 hover:text-navy-950" aria-label="Reload preview"><RefreshCw className="w-4 h-4" /></button>
            <a href={previewSrc.split('?')[0] || '/'} target="_blank" rel="noopener" className="p-1.5 text-gray-500 hover:text-navy-950" aria-label="Open in new tab"><ExternalLink className="w-4 h-4" /></a>
          </div>
          <div className="flex-1 min-h-0 flex justify-center overflow-hidden p-3">
            <div className={`h-full bg-white shadow-lg overflow-hidden rounded-lg ${preview.device === 'mobile' ? 'w-[390px]' : 'w-full'}`}>
              <PreviewFrame src={previewSrc} device={preview.device} />
            </div>
          </div>
        </section>
      )}
      <Toast toast={toast} />
    </div>
  );
}

/** Desktop preview renders the page at 1280px wide and scales it down to fit. */
function PreviewFrame({ src, device }) {
  const boxRef = useRef(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (device !== 'desktop' || !boxRef.current) return undefined;
    const ro = new ResizeObserver(([e]) => setScale(Math.min(1, e.contentRect.width / 1280)));
    ro.observe(boxRef.current);
    return () => ro.disconnect();
  }, [device]);
  if (device === 'mobile') return <iframe key={src} src={src} title="Website preview" className="w-full h-full border-0" />;
  return (
    <div ref={boxRef} className="w-full h-full overflow-hidden relative">
      <iframe
        key={src}
        src={src}
        title="Website preview"
        className="border-0 absolute top-0 left-0 origin-top-left"
        style={{ width: 1280, height: `${100 / scale}%`, transform: `scale(${scale})` }}
      />
    </div>
  );
}

function Message({ m, onUndo, onImageClick }) {
  if (m.role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] space-y-2">
          {m.attachments?.length > 0 && (
            <div className="flex gap-2 justify-end flex-wrap">
              {m.attachments.map((a) => (
                <img key={a.media_id} src={a.url} alt="" onClick={() => onImageClick(a.url)} className="w-28 h-28 object-cover rounded-xl border border-gray-200 cursor-zoom-in" />
              ))}
            </div>
          )}
          {m.content && <div dir="auto" className="rounded-2xl rounded-br-md bg-navy-950 text-white px-4 py-2.5 text-[15px] whitespace-pre-wrap">{m.content}</div>}
        </div>
      </div>
    );
  }

  const images = [...(m.images || []), ...(m.actions || []).filter((a) => a.kind === 'image' && !(m.images || []).some((i) => i.media_id === a.media_id))];
  const changes = (m.actions || []).filter((a) => a.kind === 'change');

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-lg bg-navy-950 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5"><Sparkles className="w-4 h-4" /></div>
      <div className="flex-1 min-w-0 space-y-3">
        {m.content ? (
          <div dir="auto" className="text-[15px] leading-relaxed text-gray-800"><RichText text={m.content} /></div>
        ) : m.streaming ? null : (
          <p className="text-sm text-gray-400">(no reply)</p>
        )}
        {images.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {images.map((img) => (
              <img key={img.media_id} src={img.url} alt="Created image" onClick={() => onImageClick(img.url)} className="h-40 rounded-xl border border-gray-200 cursor-zoom-in object-cover" />
            ))}
          </div>
        )}
        {changes.length > 0 && (
          <div className="flex flex-col gap-1.5">
            {changes.map((a, i) => (
              <div key={i} className="inline-flex items-center gap-2 self-start rounded-lg bg-sage-50 border border-sage-200 px-3 py-1.5 text-xs text-sage-900">
                <CheckCircle2 className="w-3.5 h-3.5 text-sage-600 flex-shrink-0" />
                <span className={a.undone ? 'line-through opacity-60' : ''}>{a.label}</span>
                {a.revision_ids?.length > 0 && !a.undone && (
                  <button onClick={() => onUndo(a.revision_ids, a.label)} className="inline-flex items-center gap-1 font-semibold text-sage-700 hover:text-navy-950 ml-1">
                    <Undo2 className="w-3 h-3" /> Undo
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Minimal, safe markdown: paragraphs, bullet/numbered lists, **bold**. No HTML injection. */
function RichText({ text }) {
  const blocks = String(text).split(/\n{2,}/);
  return (
    <div className="space-y-2.5">
      {blocks.map((block, i) => {
        const lines = block.split('\n');
        if (lines.every((l) => /^\s*([-*•]|\d+[.)])\s+/.test(l))) {
          const ordered = /^\s*\d/.test(lines[0]);
          const Tag = ordered ? 'ol' : 'ul';
          return (
            <Tag key={i} className={`${ordered ? 'list-decimal' : 'list-disc'} ps-5 space-y-1`}>
              {lines.map((l, j) => <li key={j}><Inline text={l.replace(/^\s*([-*•]|\d+[.)])\s+/, '')} /></li>)}
            </Tag>
          );
        }
        return <p key={i} className="whitespace-pre-wrap"><Inline text={block} /></p>;
      })}
    </div>
  );
}

function Inline({ text }) {
  return String(text).split(/(\*\*[^*]+\*\*)/g).map((part, i) => (part.startsWith('**') && part.endsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>));
}
