'use client';

import { useState } from 'react';
import { Loader2, Lock } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const res = await fetch('/api/cms/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Could not sign in');
      window.location.href = '/admin';
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-navy-950 px-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-sage-700/20 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] rounded-full bg-gold-400/10 blur-[120px]" />
      <form onSubmit={submit} className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8 space-y-5">
        <div className="text-center space-y-3">
          <img src="/assets/logo_dark.svg" alt="Sage Global Advisory" className="h-11 mx-auto" />
          <p className="text-sm text-gray-500">Sign in to edit your website</p>
        </div>
        <label className="block">
          <span className="text-xs font-semibold text-gray-700">Email</span>
          <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-sage-600 focus:ring-2 focus:ring-sage-100 outline-none" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-gray-700">Password</span>
          <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-sage-600 focus:ring-2 focus:ring-sage-100 outline-none" />
        </label>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <button type="submit" disabled={busy} className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-navy-950 text-white py-2.5 text-sm font-semibold hover:bg-navy-900 disabled:opacity-60">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />} Sign in
        </button>
      </form>
    </div>
  );
}
