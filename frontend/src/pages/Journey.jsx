import React, { useState, useEffect } from 'react';
import { useServerProps } from '../hooks/useInitialData';
import Reveal from '../components/Reveal';
import PreviewModal from '../components/PreviewModal';

const CACHE_KEY = 'portfolio_journey_timeline';

function getCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function setCache(data) {
  try { sessionStorage.setItem(CACHE_KEY, JSON.stringify(data)); } catch {}
}

/* ── Configuration visuelle par type d'événement ── */
const TYPE_CONFIG = {
  education:     { label: 'Formation',     badge: 'text-blue-300 bg-blue-600/15 border-blue-600/40',    icon: 'education' },
  experience:    { label: 'Expérience',    badge: 'text-emerald-300 bg-emerald-600/15 border-emerald-600/40', icon: 'experience' },
  project:       { label: 'Projet',        badge: 'text-purple-300 bg-purple-600/15 border-purple-600/40',  icon: 'project' },
  certification: { label: 'Certification', badge: 'text-amber-300 bg-amber-600/15 border-amber-600/40',   icon: 'cert' },
  start:         { label: 'Début',         badge: 'text-yellow-300 bg-yellow-600/15 border-yellow-600/40',  icon: 'start' },
};

const ICON_BG = {
  education:  'bg-blue-600',
  experience: 'bg-emerald-600',
  project:    'bg-purple-600',
  cert:       'bg-amber-600',
  start:      'bg-yellow-600',
};

/* Icônes SVG par type */
function TypeIcon({ type }) {
  const iconMap = {
    education: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      </svg>
    ),
    experience: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    project: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    cert: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    start: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  };
  const cfg = TYPE_CONFIG[type] || TYPE_CONFIG.project;
  return iconMap[cfg.icon] || iconMap.project;
}

/* ── Options de filtre par type ── */
const FILTER_OPTIONS = [
  { key: '',              label: 'Tout' },
  { key: 'education',     label: 'Formation' },
  { key: 'experience',    label: 'Expérience' },
  { key: 'project',       label: 'Projets' },
  { key: 'certification', label: 'Certifications' },
];

export default function Journey() {
  const props = useServerProps('journey');
  const serverTimeline = props.timeline || [];
  const initial = serverTimeline.length > 0 ? serverTimeline : (getCache() || []);

  const [timeline, setTimeline]     = useState(initial);
  const [loading, setLoading]       = useState(initial.length === 0);
  const [error, setError]           = useState(null);
  const [preview, setPreview]       = useState(null);
  const [typeFilter, setTypeFilter] = useState('');

  useEffect(() => {
    if (serverTimeline.length > 0) {
      setCache(serverTimeline);
      return;
    }
    if (timeline.length > 0) return;

    const bp = (window.BASE_PATH || '/').replace(/\/$/, '');
    fetch(`${bp}/api.php?path=/api/journey`)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data) => { setTimeline(data); setCache(data); })
      .catch((e) => setError(e.toString()))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-gray-400 py-24 animate-pulse">Chargement du parcours...</p>;
  if (error)   return <p className="text-center text-red-400 py-24">Erreur : {error}</p>;

  const sorted   = [...timeline].sort((a, b) => (a.year || '').localeCompare(b.year || ''));
  const filtered = typeFilter ? sorted.filter((it) => it.type === typeFilter) : sorted;

  return (
    <section className="container mx-auto px-4 py-12">
      {preview && <PreviewModal item={preview} onClose={() => setPreview(null)} />}

      <div className="max-w-4xl mx-auto">
        {/* ── En-tête ── */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Mon Parcours</h2>
          <p className="text-gray-400 mb-10">
            Formation, expériences et projets de 2022 à aujourd'hui.
          </p>
        </Reveal>

        {/* ── Filtres par type ── */}
        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-12">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => setTypeFilter(opt.key)}
                className={`filter-chip ${typeFilter === opt.key ? 'active' : ''}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ══ Timeline ══ */}
        <div className="relative">
          {/* Ligne verticale de connexion */}
          <div
            className="absolute left-5 md:left-6 top-0 bottom-0 w-px hidden md:block"
            style={{
              background: 'linear-gradient(to bottom, rgba(59,130,246,0.5), rgba(139,92,246,0.5), transparent)',
            }}
            aria-hidden="true"
          />

          <div className="space-y-5">
            {filtered.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <p className="text-lg mb-2">Aucun élément dans cette catégorie.</p>
                <button
                  onClick={() => setTypeFilter('')}
                  className="text-blue-400 hover:underline text-sm"
                >
                  Voir tous les éléments
                </button>
              </div>
            ) : (
              filtered.map((item, idx) => {
                const cfg = TYPE_CONFIG[item.type] || TYPE_CONFIG.project;
                const iconBg = ICON_BG[cfg.icon] || 'bg-purple-600';
                return (
                  <Reveal key={idx} delay={idx * 60}>
                    <button className="w-full text-left group" onClick={() => setPreview(item)}>
                      <div className="flex gap-4 md:gap-5 items-start">
                        {/* ── Colonne icône (desktop) ── */}
                        <div className="hidden md:flex flex-col items-center flex-shrink-0 w-12">
                          <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center shadow-lg ring-4 ring-slate-900 group-hover:ring-blue-600/20 transition-all duration-300 z-10`}>
                            <TypeIcon type={item.type} />
                          </div>
                        </div>

                        {/* ── Carte ── */}
                        <div className="flex-1 glass rounded-xl p-5 card-hover transition-all duration-300">
                          {/* Métadonnées */}
                          <div className="flex flex-wrap items-center gap-2 mb-2.5">
                            <span className="text-sm text-gray-500 font-medium">{item.year}</span>
                            <span className={`badge border ${cfg.badge}`}>
                              {cfg.label}
                            </span>
                            {item.badge && (
                              <span className="badge bg-blue-600 text-white border-transparent">
                                {item.badge}
                              </span>
                            )}
                          </div>

                          {/* Titre + organisation */}
                          <h3 className="text-lg font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-200">
                            {item.title}
                          </h3>
                          {item.organization && (
                            <p className="text-blue-400/80 text-sm mb-2 font-medium">{item.organization}</p>
                          )}

                          {/* Description */}
                          <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>

                          {/* Compétences */}
                          {item.skills && item.skills.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {item.skills.slice(0, 5).map((s, j) => (
                                <span key={j} className="tag-tech">{s}</span>
                              ))}
                              {item.skills.length > 5 && (
                                <span className="px-2 py-0.5 bg-white/[0.03] border border-white/10 rounded text-[11px] text-gray-500">
                                  +{item.skills.length - 5}
                                </span>
                              )}
                            </div>
                          )}

                          {/* Indicateur cliquable */}
                          <p className="text-xs text-blue-400/60 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1">
                            Cliquer pour voir plus
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </p>
                        </div>
                      </div>
                    </button>
                  </Reveal>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
