'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSite } from '@/components/SiteContent';
import { Users, TrendingUp, Factory, CalendarDays } from 'lucide-react';

const ICONS = [Users, TrendingUp, Factory, CalendarDays];

function AnimatedCounter({ end, suffix = '' }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const step = Math.ceil(end / 50);
    const timer = setInterval(() => {
      current += step;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, 20);
    return () => clearInterval(timer);
  }, [inView, end]);

  return (
    <span ref={ref} className="text-2xl md:text-4xl font-bold text-navy-950 tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Counters() {
  const { c, tr } = useSite();
  const items = c.home.counters.items;

  return (
    <section className="relative -mt-6 md:-mt-10 z-10 pb-8">
      <div className="container-max">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-6 md:px-10 md:py-10">
          <div className={`grid grid-cols-2 ${items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''} gap-4 md:gap-8`}>
            {items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              const end = parseInt(String(item.value).replace(/[^\d]/g, ''), 10) || 0;
              return (
              <div key={i} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-sage-700" />
                </div>
                <AnimatedCounter end={end} suffix={item.suffix} />
                <p className="text-sm text-gray-500 font-medium">{tr(item.label)}</p>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
