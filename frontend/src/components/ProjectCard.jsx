import React from 'react';

/**
 * Couleurs de gradient pour le placeholder quand il n'y a pas d'image.
 * Chaque projet reçoit une couleur basée sur un hash de son titre.
 */
const GRADIENTS = [
  'from-blue-600/80 to-indigo-800/80',
  'from-emerald-600/80 to-teal-800/80',
  'from-purple-600/80 to-pink-800/80',
  'from-amber-600/80 to-orange-800/80',
  'from-cyan-600/80 to-blue-800/80',
  'from-rose-600/80 to-red-800/80',
];

/* Choisir un gradient stable à partir du titre */
function pickGradient(title) {
  let hash = 0;
  for (let i = 0; i < (title || '').length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

export default function ProjectCard({ project }) {
  if (!project) return null;

  const visibleTechs = (project.technologies || []).slice(0, 5);
  const extras = (project.technologies || []).length - visibleTechs.length;

  return (
    <div className="glass rounded-xl overflow-hidden card-hover group h-full flex flex-col">
      {/* ── Image ou placeholder gradient (compact) ── */}
      {project.image ? (
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* ── Badges superposés sur l'image ── */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            {project.year && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white/90">
                {project.year}
              </span>
            )}
            {project.featured && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-600/70 backdrop-blur-sm text-white/90">
                Phare
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className={`relative w-full h-32 bg-gradient-to-br ${pickGradient(project.title)} flex items-center justify-center`}>
          <svg className="w-8 h-8 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />
          {/* ── Badges superposés ── */}
          <div className="absolute top-2 left-2 flex items-center gap-1.5">
            {project.year && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-black/50 backdrop-blur-sm text-white/90">
                {project.year}
              </span>
            )}
            {project.featured && (
              <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-blue-600/70 backdrop-blur-sm text-white/90">
                Phare
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-4 flex flex-col flex-1">
        {/* ── Titre ── */}
        <h3 className="text-sm font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-1">
          {project.title}
        </h3>

        {/* ── Description ── */}
        <p className="text-gray-400 text-xs mb-3 line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        {/* ── Tags technologies ── */}
        {visibleTechs.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {visibleTechs.map((tech) => (
              <span key={tech} className="px-1.5 py-0.5 bg-white/[0.06] border border-white/[0.08] rounded text-[10px] text-gray-400">
                {tech}
              </span>
            ))}
            {extras > 0 && (
              <span className="px-1.5 py-0.5 bg-white/[0.03] border border-white/10 rounded text-[10px] text-gray-500">
                +{extras}
              </span>
            )}
          </div>
        )}

        {/* ── Liens GitHub / Démo ── */}
        <div className="flex items-center gap-3 pt-2 mt-auto border-t border-white/[0.06]">
          {project.github && (
            <span className="flex items-center gap-1 text-[11px] text-gray-500 group-hover:text-gray-300 transition-colors">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </span>
          )}
          {project.demo && (
            <span className="flex items-center gap-1 text-[11px] text-blue-400 group-hover:text-blue-300 transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Démo
            </span>
          )}
          <span className="ml-auto text-[11px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Voir plus →
          </span>
        </div>
      </div>
    </div>
  );
}
