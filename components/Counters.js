'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';
import { Users, TrendingUp, Factory, CalendarDays } from 'lucide-react';

const STATS = [
  { icon: Users, end: 950, suffix: '+', labelKey: 'counters.clients' },
  { icon: TrendingUp, end: 120, suffix: 'M+', labelKey: 'counters.saved' },
  { icon: Factory, end: 35, suffix: '+', labelKey: 'counters.industries' },
  { icon: CalendarDays, end: 12, suffix: '+', labelKey: 'counters.years' },
];

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
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-navy-950 tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Counters() {
  const t = useTranslations();

  return (
    <section className="relative -mt-10 z-10 pb-8">
      <div className="container-max">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 px-6 py-8 md:px-10 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map(({ icon: Icon, end, suffix, labelKey }) => (
              <div key={labelKey} className="text-center space-y-2">
                <div className="w-10 h-10 rounded-xl bg-sage-50 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-sage-700" />
                </div>
                <AnimatedCounter end={end} suffix={suffix} />
                <p className="text-sm text-gray-500 font-medium">{t(labelKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
