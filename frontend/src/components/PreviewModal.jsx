import React, { useEffect, useState } from 'react';

/**
 * PreviewModal — modale de prévisualisation avec animation d'entrée.
 * Se ferme avec Escape, clic sur le backdrop, ou le bouton fermer.
 */
export default function PreviewModal({ item, onClose }) {
  const [visible, setVisible] = useState(false);

  /* Animer l'ouverture + bloquer le scroll + écouter Escape */
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const handler = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* ── Fond semi-transparent flouté ── */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* ── Panneau principal ── */}
      <div
        className={`relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto glass rounded-2xl shadow-2xl shadow-black/40 transition-all duration-300 ${
          visible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Bouton fermer ── */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-all duration-200"
          aria-label="Fermer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ── Image de couverture ── */}
        {item.image && (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-52 object-cover rounded-t-2xl"
          />
        )}

        <div className="p-7">
          {/* ── Badges de métadonnées ── */}
          <div className="flex flex-wrap gap-2 mb-4">
            {item.year && (
              <span className="badge bg-purple-500/15 border border-purple-500/30 text-purple-300">
                {item.year}
              </span>
            )}
            {(item.badge || item.type) && (
              <span className="badge bg-blue-500/15 border border-blue-500/30 text-blue-300">
                {item.badge || item.type}
              </span>
            )}
            {item.source && (
              <span className="badge bg-white/5 border border-white/10 text-gray-300">
                {item.source}
              </span>
            )}
            {item.category && (
              <span className="badge bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                {item.category}
              </span>
            )}
          </div>

          {/* ── Titre ── */}
          <h2 className="text-2xl font-bold mb-2 text-white">{item.title}</h2>

          {/* ── Organisation ── */}
          {item.organization && (
            <p className="text-blue-400 font-medium mb-4">{item.organization}</p>
          )}

          {/* ── Description complète ── */}
          {(item.description || item.summary) && (
            <p className="text-gray-300 leading-relaxed mb-6 whitespace-pre-line text-[15px]">
              {item.description || item.summary}
            </p>
          )}

          {/* ── Technologies utilisées ── */}
          {item.technologies && item.technologies.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.technologies.map((tech) => (
                  <span key={tech} className="tag-tech">{tech}</span>
                ))}
              </div>
            </div>
          )}

          {/* ── Compétences associées ── */}
          {item.skills && item.skills.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2.5">
                Compétences
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((s, i) => (
                  <span key={i} className="px-2.5 py-1 bg-white/[0.06] rounded-md text-sm text-gray-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Liens d'action ── */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-white/[0.06]">
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm !py-2.5 !px-5"
              >
                Voir l'article
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
            {item.github && (
              <a
                href={item.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm !py-2.5 !px-5"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            )}
            {item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost text-sm !py-2.5 !px-5 !border-purple-500/30 !text-purple-300 hover:!bg-purple-600/20"
              >
                Démo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
