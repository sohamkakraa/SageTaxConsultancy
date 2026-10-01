import { Link } from '@/lib/navigation';
import { ChevronRight, ShieldCheck } from 'lucide-react';

/**
 * Renders a legal document: { title, badge, updated, intro?, sections: [{ h, p?: [], ul?: [] }] }
 * Text may contain **bold** markers; no HTML is ever injected.
 */
export default function LegalPage({ doc, homeLabel, updatedLabel }) {
  return (
    <main>
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="container-max py-3 flex items-center gap-1.5 text-xs text-gray-400">
          <Link href="/" className="hover:text-sage-700 transition-colors">{homeLabel}</Link>
          <ChevronRight className="w-3 h-3 rtl:rotate-180" />
          <span className="text-navy-950 font-medium">{doc.title}</span>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-navy-950 text-white">
        <div className="container-max text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-gold-300 tracking-wide uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            {doc.badge}
          </span>
          <h1 className="text-3xl md:text-5xl font-bold font-display">{doc.title}</h1>
          <p className="text-gray-300">{updatedLabel}: {doc.updated}</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow max-w-3xl text-gray-600 leading-relaxed space-y-4">
          {doc.intro?.map((t, i) => <p key={i}><Rich text={t} /></p>)}
          {doc.sections.map((s, i) => (
            <div key={i} className="space-y-3">
              <h2 className="text-xl font-bold text-navy-950 mt-8 mb-2">{`${i + 1}. ${s.h}`}</h2>
              {s.p?.map((t, j) => <p key={j}><Rich text={t} /></p>)}
              {s.ul && (
                <ul className="list-disc ps-6 space-y-1.5">
                  {s.ul.map((t, j) => <li key={j}><Rich text={t} /></li>)}
                </ul>
              )}
              {s.table && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50 text-navy-950">
                      <tr>{s.table.head.map((h, j) => <th key={j} className="text-start p-2.5 border-b border-gray-200 font-semibold">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((row, j) => (
                        <tr key={j} className="border-b border-gray-100 align-top">
                          {row.map((cell, k) => <td key={k} className="p-2.5">{cell}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {s.after?.map((t, j) => <p key={`a${j}`}><Rich text={t} /></p>)}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Rich({ text }) {
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? <strong key={i} className="text-navy-950">{part.slice(2, -2)}</strong> : <span key={i}>{part}</span>
  );
}
