'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Counter = ({ end, label, suffix = '' }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let currentCount = 0;
    const increment = Math.ceil(end / 60);
    const interval = setInterval(() => {
      currentCount += increment;
      if (currentCount >= end) {
        setCount(end);
        clearInterval(interval);
      } else {
        setCount(currentCount);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [inView, end]);

  return (
    <div ref={ref} className="text-center space-y-2">
      <p className="text-5xl sm:text-6xl font-bold text-gold-400">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="text-sage-100 text-sm sm:text-base font-medium">{label}</p>
    </div>
  );
};

export default function Counters() {
  return (
    <section className="section-padding bg-sage-900 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-sage-800 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-900 rounded-full blur-3xl opacity-20 pointer-events-none" />

      <div className="container-narrow relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          <Counter end={950} label="Clients Served" />
          <Counter end={120} label="Million AED Saved" suffix="M+" />
          <Counter end={35} label="Industries Served" suffix="+" />
          <Counter end={12} label="Years of Excellence" suffix="+" />
        </div>
      </div>
    </section>
  );
}
