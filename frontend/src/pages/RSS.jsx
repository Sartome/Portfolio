import React, { useState, useEffect, useCallback } from 'react';
import { useServerProps } from '../hooks/useInitialData';
import ArticleCard from '../components/ArticleCard';
import Reveal from '../components/Reveal';

const SORT_OPTIONS = [
  { key: 'recent', label: 'Plus récents' },
  { key: 'old',    label: 'Plus anciens' },
];

const STORAGE_KEY = 'rss_favorites';
const STEP = 8;

function sortLocally(items, sort) {
  const copy = [...items];
  if (sort === 'old') copy.sort((a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0));
  else copy.sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0));
  return copy;
}

function loadFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); } catch { return []; }
}

/* Skeleton de chargement pendant le fetch */
function RssSkeleton() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass rounded-2xl p-5 animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-5 bg-white/10 rounded-full w-20" />
            <div className="h-4 bg-white/10 rounded w-12" />
          </div>
          <div className="h-5 bg-white/10 rounded w-full mb-2" />
          <div className="h-5 bg-white/10 rounded w-4/5 mb-4" />
          <div className="h-4 bg-white/10 rounded w-full mb-1.5" />
          <div className="h-4 bg-white/10 rounded w-3/4 mb-4" />
          <div className="pt-3 border-t border-white/[0.05]">
            <div className="h-3 bg-white/10 rounded w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function RSS() {
  const serverProps  = useServerProps('rss');
  const initialItems = serverProps.articles || [];

  const [allItems, setAllItems]     = useState(initialItems);
  const [loading, setLoading]       = useState(initialItems.length === 0);
  const [error, setError]           = useState(null);
  const [sort, setSort]             = useState('recent');
  const [visible, setVisible]       = useState(STEP);
  const [favorites, setFavorites]   = useState(loadFavorites);
  const [showFavorites, setShowFav] = useState(false);
  const [toast, setToast]           = useState(null);

  /* ── Favoris ── */
  const isFavorited = useCallback(
    (article) => favorites.some((f) => f.url === article.url),
    [favorites]
  );

  const toggleFavorite = useCallback((article, e) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const idx = prev.findIndex((f) => f.url === article.url);
      const next = idx > -1
        ? prev.filter((_, i) => i !== idx)
        : [...prev, { ...article, savedAt: new Date().toISOString() }];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      setToast(idx > -1 ? 'Retiré des favoris' : 'Ajouté aux favoris');
      return next;
    });
  }, []);

  /* ── Disparition automatique du toast ── */
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  /* ── Fetch des articles RSS ── */
  const fetchArticles = useCallback((sortKey) => {
    let mounted = true;
    setLoading(true);
    setError(null);
    setVisible(STEP);
    const bp = (window.BASE_PATH || '/').replace(/\/$/, '');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    fetch(`${bp}/api.php?path=/api/rss/fetch&sort=${sortKey}`, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) return r.json().catch(() => null).then((body) => {
          const msg = body?.message || body?.error || r.statusText;
          throw new Error(msg);
        });
        return r.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.message || data.error);
        if (mounted) setAllItems(Array.isArray(data) ? data : []);
      })
      .catch((e) => { if (mounted) setError(e.name === 'AbortError' ? 'Le chargement a pris trop de temps.' : e.toString()); })
      .finally(() => { clearTimeout(timeoutId); if (mounted) setLoading(false); });
    return () => { mounted = false; controller.abort(); };
  }, []);

  useEffect(() => {
    if (initialItems.length > 0) {
      setAllItems(sortLocally(initialItems, sort));
      return;
    }
    fetchArticles(sort);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSort = (newSort) => {
    setSort(newSort);
    setVisible(STEP);
    if (allItems.length > 0) setAllItems(sortLocally(allItems, newSort));
    else fetchArticles(newSort);
  };

  const handleToggleFavs = () => {
    setShowFav((v) => !v);
    setVisible(STEP);
  };

  /* ── Liste dérivée ── */
  const source    = showFavorites ? favorites : allItems;
  const filtered  = sortLocally(source, sort);
  const displayed = filtered.slice(0, visible);
  const hasMore   = visible < filtered.length;

  return (
    <section className="container mx-auto px-4 py-12">
      {/* ── Toast notification ── */}
      {toast && (
        <div className={`fixed top-20 right-4 z-50 px-4 py-2.5 rounded-xl shadow-2xl text-white text-sm font-medium animate-slide-down transition-opacity ${
          toast.includes('Retiré') ? 'bg-red-600/90 backdrop-blur-sm' : 'bg-emerald-600/90 backdrop-blur-sm'
        }`}>
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* ── En-tête ── */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Actualités Tech</h2>
          <p className="text-gray-400 mb-8">
            {loading
              ? 'Chargement des flux en cours...'
              : `${filtered.length} article${filtered.length !== 1 ? 's' : ''}${showFavorites ? ' en favoris' : ''}`}
          </p>
        </Reveal>

        {/* ── Barre de contrôles ── */}
        <Reveal delay={80}>
          <div className="flex flex-wrap items-center gap-3 mb-10">
            {/* Tri (masqué en mode favoris) */}
            {!showFavorites && (
              <div className="flex gap-1.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => handleSort(opt.key)}
                    className={`filter-chip ${sort === opt.key ? 'active' : ''}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}

            {/* Toggle favoris */}
            <button
              onClick={handleToggleFavs}
              className={`relative filter-chip ${showFavorites ? 'active !bg-amber-500 !border-amber-400' : ''}`}
            >
              {showFavorites ? 'Mes favoris' : 'Favoris'}
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-bold leading-none px-1">
                  {favorites.length > 9 ? '9+' : favorites.length}
                </span>
              )}
            </button>
          </div>
        </Reveal>

        {/* ── Skeleton de chargement ── */}
        {!showFavorites && loading && <RssSkeleton />}

        {/* ── Message d'erreur ── */}
        {!showFavorites && error && (
          <div className="glass rounded-2xl p-8 text-center">
            <p className="text-red-400 mb-2 font-semibold">Impossible de charger le flux RSS</p>
            <p className="text-gray-400 text-sm mb-4 font-mono break-all">{error}</p>
            <button
              onClick={() => fetchArticles(sort)}
              className="btn-primary text-sm !py-2.5 !px-5"
            >
              Réessayer
            </button>
          </div>
        )}

        {/* ── Grille d'articles ── */}
        {(showFavorites || (!loading && !error)) && (
          <>
            {displayed.length === 0 ? (
              <div className="text-center text-gray-500 py-16">
                <p className="text-lg">
                  {showFavorites ? 'Aucun article en favoris.' : 'Aucun article à afficher.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {displayed.map((it, idx) => (
                  <div key={idx} className="relative group/fav">
                    <ArticleCard item={it} />
                    {/* Bouton favori */}
                    <button
                      onClick={(e) => toggleFavorite(it, e)}
                      title={isFavorited(it) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all duration-200 shadow-lg ${
                        isFavorited(it)
                          ? 'bg-amber-500 text-white hover:bg-amber-600'
                          : 'bg-slate-800/80 text-gray-400 opacity-0 group-hover/fav:opacity-100 hover:bg-slate-700 hover:text-amber-400'
                      }`}
                    >
                      {isFavorited(it) ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* ── Charger plus ── */}
            {hasMore && (
              <div className="flex flex-col items-center mt-12 gap-2">
                <button
                  onClick={() => setVisible((v) => v + STEP)}
                  className="btn-primary text-sm !py-2.5"
                >
                  Voir plus ({filtered.length - visible} restants)
                </button>
                <span className="text-xs text-gray-600">
                  {visible} / {filtered.length} articles affichés
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
