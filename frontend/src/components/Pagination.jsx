import React from 'react';

/**
 * Pagination améliorée — numéros de pages, ellipsis, boutons préc/suiv.
 * Affiche au maximum 7 numéros pour garder un aspect compact.
 */
export default function Pagination({ total, perPage, current, onChange }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  /* ── Générer les numéros de pages visibles ── */
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    /* Toujours afficher la première et la dernière page */
    pages.push(1);
    if (current > 3) pages.push('...');
    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (current < totalPages - 2) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <nav
      className="flex items-center justify-center gap-1.5 mt-10"
      role="navigation"
      aria-label="Pagination"
    >
      {/* ── Bouton Précédent ── */}
      <button
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/[0.06]"
        aria-label="Page précédente"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Préc.</span>
      </button>

      {/* ── Numéros de pages ── */}
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`dot-${i}`} className="px-2 text-gray-600 text-sm select-none">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`min-w-[36px] h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 ${
              current === p
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.06]'
            }`}
            aria-current={current === p ? 'page' : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        )
      )}

      {/* ── Bouton Suivant ── */}
      <button
        disabled={current >= totalPages}
        onClick={() => onChange(current + 1)}
        className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed text-gray-400 hover:text-white hover:bg-white/[0.06]"
        aria-label="Page suivante"
      >
        <span className="hidden sm:inline">Suiv.</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}
