import React from 'react';

/**
 * Loader — spinner auto-contenu (pas de dépendance CSS externe).
 * Utilise des styles inline pour garantir l'affichage immédiat.
 */
export default function Loader({ message = 'Chargement...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-slate-900/80 backdrop-blur-sm">
      {/* Anneau de chargement */}
      <div className="relative w-12 h-12">
        <div
          className="absolute inset-0 rounded-full border-[3px] border-white/10"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-500 border-r-purple-500"
          style={{ animation: 'spin-smooth 0.8s linear infinite' }}
          aria-hidden="true"
        />
      </div>
      {/* Message */}
      <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
}
