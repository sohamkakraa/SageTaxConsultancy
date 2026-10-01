'use client';

import { ShieldCheck, Users, Monitor, Banknote, Zap, Target, Eye } from 'lucide-react';
import { useSite } from '@/components/SiteContent';
import TeamGrid from '@/components/TeamGrid';

const FEATURE_ICONS = [ShieldCheck, Users, Monitor, Banknote, Zap];

export default function About() {
  const { c, tr } = useSite();
  const a = c.home.about;

  return (
    <section className="section-padding bg-white">
      <div className="container-max space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="badge">{tr(a.badge)}</span>
            <h2 className="section-heading">{tr(a.title)}</h2>
            <p className="section-subheading text-gray-600 leading-relaxed">{tr(a.description)}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 bg-sage-50 rounded-lg">
                <Target className="w-5 h-5 text-sage-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-navy-950">{tr(a.missionTitle)}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tr(a.missionText)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gold-50 rounded-lg">
                <Eye className="w-5 h-5 text-gold-700 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-navy-950">{tr(a.visionTitle)}</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">{tr(a.visionText)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl overflow-hidden h-56 shadow-lg bg-sage-50">
              <img src={a.image.url} alt={tr(a.image.alt)} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {a.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                return (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-navy-950">{tr(f.title)}</h3>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{tr(f.text)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <TeamGrid />
      </div>
    </section>
  );
}
