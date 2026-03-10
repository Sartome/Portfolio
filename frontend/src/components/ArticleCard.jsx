import React from 'react';
import Reveal from './Reveal';

/**
 * ArticleCard — carte d'article avec estimation du temps de lecture.
 */

/* Estimation du temps de lecture en minutes */
function readTime(text) {
  if (!text) return null;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min`;
}

export default function ArticleCard({ item }) {
  if (!item) return null;

  const time = readTime(item.description);

  /* Conteneur cliquable ou simple div selon la présence d'une URL */
  const Tag = item.url ? 'a' : 'div';
  const linkProps = item.url
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Reveal>
      <Tag
        {...linkProps}
        className="block glass rounded-2xl overflow-hidden hover-glow card-hover group transition-all duration-300 h-full flex flex-col"
      >
        {/* ── Image de couverture (veille uniquement) ── */}
        {item.image && (
          <div className="relative overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}

        <div className="p-5 flex flex-col flex-1">
        {/* ── En-tête : source + temps de lecture ── */}
        <div className="flex items-center justify-between mb-3">
          {item.source && (
            <span className="badge bg-blue-500/15 border border-blue-500/30 text-blue-300">
              {item.source}
            </span>
          )}
          {time && (
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </span>
          )}
        </div>

        {/* ── Titre ── */}
        <h3 className="text-[15px] font-semibold mb-2 leading-snug text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
          {item.title}
        </h3>

        {/* ── Description ── */}
        {item.description && (
          <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed mb-3">
            {item.description}
          </p>
        )}

        {/* ── Pied : date + indicateur lien ── */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.05]">
          {item.publishedAt ? (
            <time className="text-[11px] text-gray-500" dateTime={item.publishedAt}>
              {new Date(item.publishedAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          ) : (
            <span />
          )}
          {item.url && (
            <span className="flex items-center gap-1 text-[11px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Lire
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          )}
        </div>
        </div>
      </Tag>
    </Reveal>
  );
}
