'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Full-screen loading overlay with animated Sage logo.
 *
 * Animation sequence:
 * 1. Leaf icon scales in with a glow
 * 2. White diagonal lines slide in one by one (left to right)
 * 3. "SAGE" letters pop up individually
 * 4. "Advisory" expands in with letter-spacing
 * 5. Loading bar fills, then the whole screen fades out and scales up
 */
export default function LoadingScreen() {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const isFirstLoad = useRef(true);

  const startExit = useCallback((delay) => {
    const t1 = setTimeout(() => setExiting(true), delay);
    const t2 = setTimeout(() => setVisible(false), delay + 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Initial page load — longer animation
  useEffect(() => {
    return startExit(1800);
  }, [startExit]);

  // Route changes — shorter animation
  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setExiting(false);
      setVisible(true);
      return startExit(1200);
    }
  }, [pathname, startExit]);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-navy-950 transition-all duration-500 ease-out ${
        exiting ? 'opacity-0 scale-[1.03]' : 'opacity-100 scale-100'
      }`}
      style={{ pointerEvents: exiting ? 'none' : 'auto' }}
      aria-hidden="true"
    >
      {/* Ambient glow — hidden on mobile to prevent overflow */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-sage-600/[0.07] rounded-full blur-[120px]" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold-400/[0.05] rounded-full blur-[80px]"
          style={{ animation: 'ambientPulse 2s ease-in-out infinite alternate' }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-5">
        {/* ── Logo Icon — Sage Leaf ── */}
        <div className="relative" style={{ animation: 'iconEntry 0.7s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
          {/* Glow behind leaf */}
          <div
            className="absolute inset-0 rounded-full bg-sage-500/20 blur-xl scale-[2]"
            style={{ animation: 'glowPulse 1.5s ease-in-out 0.3s infinite alternate' }}
          />
          <svg
            width="64"
            height="80"
            viewBox="0 0 44 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative"
          >
            {/* Leaf body */}
            <path
              d="M22,2 C22,2 4,16 4,32 C4,46 12,53 22,55 C32,53 40,46 40,32 C40,16 22,2 22,2 Z"
              fill="#3a6650"
              style={{ animation: 'leafFill 0.6s ease-out both' }}
            />
            {/* Centre vein — gold, draws down */}
            <path
              d="M22,10 C22,24 22,40 22,55"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.9"
              strokeLinecap="round"
              style={{
                opacity: 0,
                strokeDasharray: 46,
                strokeDashoffset: 46,
                animation: 'veinDraw 0.8s ease-out 0.4s forwards',
              }}
            />
            {/* Left vein */}
            <path
              d="M22,28 C16,34 10,38 6,44"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.6"
              strokeLinecap="round"
              style={{
                opacity: 0,
                strokeDasharray: 22,
                strokeDashoffset: 22,
                animation: 'veinDraw 0.5s ease-out 0.7s forwards',
              }}
            />
            {/* Right vein */}
            <path
              d="M22,28 C28,34 34,38 38,44"
              fill="none"
              stroke="#c9a84c"
              strokeWidth="0.6"
              strokeLinecap="round"
              style={{
                opacity: 0,
                strokeDasharray: 22,
                strokeDashoffset: 22,
                animation: 'veinDraw 0.5s ease-out 0.75s forwards',
              }}
            />
          </svg>
          {/* Gold dot below */}
          <div
            className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-1.5 h-1.5 rounded-full bg-gold-400"
            style={{
              opacity: 0,
              animation: 'dotPop 0.3s ease-out 1s forwards',
            }}
          />
        </div>

        {/* ── Brand Text ── */}
        <div className="flex flex-col items-center gap-1">
          {/* SAGE letters */}
          <div className="flex items-baseline overflow-hidden">
            {'SAGE'.split('').map((char, i) => (
              <span
                key={i}
                className="text-[2rem] md:text-[2.5rem] font-normal tracking-[0.18em] text-white inline-block"
                style={{
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  opacity: 0,
                  animation: `letterPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) ${0.65 + i * 0.09}s forwards`,
                }}
              >
                {char}
              </span>
            ))}
          </div>

          {/* Advisory */}
          <span
            className="text-[0.7rem] md:text-xs tracking-[0.35em] uppercase text-sage-400/80 font-medium"
            style={{
              opacity: 0,
              animation: 'advisoryExpand 0.5s ease-out 1.05s forwards',
            }}
          >
            Advisory
          </span>
        </div>

        {/* ── Progress Bar ── */}
        <div className="w-20 h-[1.5px] bg-white/[0.08] rounded-full overflow-hidden mt-1">
          <div
            className="h-full rounded-full"
            style={{
              background: 'linear-gradient(90deg, #8A9A5B, #d4a84b)',
              animation: 'barFill 1.5s ease-in-out forwards',
            }}
          />
        </div>
      </div>

      {/* All keyframes */}
      <style jsx>{`
        @keyframes iconEntry {
          0% { opacity: 0; transform: scale(0.6) rotate(-8deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        @keyframes leafFill {
          0% { opacity: 0; transform: scale(0.85); }
          60% { opacity: 1; }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes veinDraw {
          0% { opacity: 0; stroke-dashoffset: inherit; }
          30% { opacity: 0.8; }
          100% { opacity: 0.7; stroke-dashoffset: 0; }
        }

        @keyframes dotPop {
          0% { opacity: 0; transform: translateX(-50%) scale(0); }
          100% { opacity: 0.8; transform: translateX(-50%) scale(1); }
        }

        @keyframes letterPop {
          0% { opacity: 0; transform: translateY(100%); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes advisoryExpand {
          0% { opacity: 0; letter-spacing: 0.6em; }
          100% { opacity: 1; letter-spacing: 0.35em; }
        }

        @keyframes barFill {
          0% { width: 0%; }
          70% { width: 85%; }
          100% { width: 100%; }
        }

        @keyframes glowPulse {
          0% { opacity: 0.3; transform: scale(1.4); }
          100% { opacity: 0.6; transform: scale(1.6); }
        }

        @keyframes ambientPulse {
          0% { opacity: 0.4; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
