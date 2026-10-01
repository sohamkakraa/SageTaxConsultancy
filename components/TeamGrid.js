'use client';

import { useSite } from '@/components/SiteContent';

export default function TeamGrid({ headingClass = 'text-2xl md:text-3xl font-bold font-display text-navy-950' }) {
  const { c, tr } = useSite();
  const team = c.team;
  if (!team.members?.length) return null;

  return (
    <div className="space-y-8">
      <div className="text-center space-y-3">
        <span className="badge">{tr(team.badge)}</span>
        <h2 className={headingClass}>{tr(team.title)}</h2>
      </div>
      <div className={`grid grid-cols-1 ${team.members.length > 1 ? 'md:grid-cols-2' : ''} ${team.members.length > 2 ? 'lg:grid-cols-3' : ''} gap-6 max-w-5xl mx-auto`}>
        {team.members.map((m, i) => (
          <div key={i} className="card-hover text-center space-y-4 p-8">
            <div className="w-28 h-28 mx-auto rounded-full overflow-hidden shadow-lg ring-4 ring-sage-100 bg-sage-50">
              {m.image?.url && <img src={m.image.url} alt={tr(m.image.alt) || tr(m.name)} className="w-full h-full object-cover" loading="lazy" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-navy-950">{tr(m.name)}</h3>
              <p className="text-sm font-medium text-sage-700">{tr(m.role)}</p>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{tr(m.bio)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
