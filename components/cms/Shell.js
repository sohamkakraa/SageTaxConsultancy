'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, PenLine, Images, History, Inbox, Briefcase, Newspaper, LogOut, Menu, X, ExternalLink } from 'lucide-react';
import { api } from './api';

const NAV = [
  { href: '/admin', label: 'Assistant', icon: MessageCircle, hint: 'Ask for any change' },
  { href: '/admin/content', label: 'Edit pages', icon: PenLine, hint: 'Change text by hand' },
  { href: '/admin/media', label: 'Pictures', icon: Images, hint: 'Your image library' },
  { href: '/admin/services', label: 'Services', icon: Briefcase, hint: 'Service pages' },
  { href: '/admin/blog', label: 'Blog posts', icon: Newspaper, hint: 'Insights articles' },
  { href: '/admin/messages', label: 'Enquiries', icon: Inbox, hint: 'Contact form messages' },
  { href: '/admin/history', label: 'History & undo', icon: History, hint: 'Every change, reversible' },
];

export default function Shell({ children, fullBleed = false }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [me, setMe] = useState(null);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    api('/api/cms/auth/me').then((d) => setMe(d.email)).catch(() => {});
    api('/api/cms/messages').then((d) => setUnread(d.messages.filter((m) => !m.is_read).length)).catch(() => {});
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await fetch('/api/cms/auth/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  return (
    <div className="h-[100dvh] flex bg-[#f6f5f1] text-navy-950">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-navy-950 text-white flex flex-col transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link href="/admin" className="flex items-center gap-2.5">
            <img src="/assets/logo_light.svg" alt="Sage Global Advisory" className="h-9 w-auto" />
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden p-2 text-white/60 hover:text-white" aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {NAV.map(({ href, label, icon: Icon, hint }) => {
            const active = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);
            return (
              <Link key={href} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active ? 'bg-white/10 text-white' : 'text-white/65 hover:bg-white/5 hover:text-white'}`}>
                <Icon className={`w-[18px] h-[18px] ${active ? 'text-gold-400' : ''}`} />
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium">{label}</span>
                  <span className="block text-[11px] text-white/40 truncate">{hint}</span>
                </span>
                {href === '/admin/messages' && unread > 0 && <span className="text-[10px] font-bold bg-gold-400 text-navy-950 rounded-full px-1.5 py-0.5">{unread}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-3">
          <a href="/" target="_blank" rel="noopener" className="flex items-center gap-2 text-xs text-white/60 hover:text-white">
            <ExternalLink className="w-3.5 h-3.5" /> Open the live website
          </a>
          <div className="text-[11px] text-white/40 truncate">{me || ' '}</div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 rounded-lg border border-white/15 py-2 text-xs font-medium text-white/80 hover:bg-white/5">
            <LogOut className="w-3.5 h-3.5" /> Sign out
          </button>
        </div>
      </aside>
      {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="lg:hidden flex items-center gap-3 h-14 px-4 bg-white border-b border-gray-200">
          <button onClick={() => setOpen(true)} className="p-2 -ml-2" aria-label="Open menu"><Menu className="w-5 h-5" /></button>
          <span className="font-semibold text-sm">Website editor</span>
        </div>
        <main className={`flex-1 min-h-0 ${fullBleed ? '' : 'overflow-y-auto'}`}>{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-navy-950">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1 max-w-2xl">{subtitle}</p>}
      </div>
      {children && <div className="flex gap-2 flex-wrap">{children}</div>}
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] px-4 py-2.5 rounded-xl shadow-lg text-sm font-medium ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-navy-950 text-white'}`}>
      {toast.message}
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState(null);
  const show = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  return [toast, show];
}
