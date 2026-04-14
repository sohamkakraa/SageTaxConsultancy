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
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-white tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Counters() {
  const t = useTranslations();

  return (
    <section className="py-12 md:py-16 bg-sage-900">
      <div className="container-max">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(({ icon: Icon, end, suffix, labelKey }) => (
            <div key={labelKey} className="text-center space-y-2">
              <Icon className="w-6 h-6 text-gold-400 mx-auto mb-1" />
              <AnimatedCounter end={end} suffix={suffix} />
              <p className="text-sm text-sage-200 font-medium">{t(labelKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
