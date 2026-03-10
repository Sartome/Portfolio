import React, { useState, useEffect } from 'react';
import { useServerProps } from '../hooks/useInitialData';
import ArticleCard from '../components/ArticleCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import PreviewModal from '../components/PreviewModal';
import Reveal from '../components/Reveal';

export default function Veille() {
  const props = useServerProps('veille');
  const initialArticles = props.articles || [];
  const categories = props.categories || [];
  const initialCategory = props.selectedCategory || '';

  const [articles, setArticles] = useState(initialArticles);
  const [dynamicCategories, setDynamicCategories] = useState(categories);
  const [loading, setLoading] = useState(initialArticles.length === 0);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [preview, setPreview] = useState(null);
  const perPage = 6;

  useEffect(() => {
    if (initialArticles.length > 0) return;
    let mounted = true;
    fetch(`${(window.BASE_PATH || '/').replace(/\/$/, '')}/api.php?path=/api/veille`)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data) => {
        if (!mounted) return;
        setArticles(data.articles || []);
        setDynamicCategories(data.categories || []);
      })
      .catch((e) => mounted && setError(e.toString()))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [initialArticles]);

  if (loading) return <Loader message="Chargement de la veille technologique..." />;
  if (error) return <p className="text-center text-red-400 py-24">Erreur : {error}</p>;

  const filtered = selectedCategory
    ? articles.filter((a) => a.category === selectedCategory)
    : articles;
  const paged = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="container mx-auto px-4 py-12">
      {preview && <PreviewModal item={preview} onClose={() => setPreview(null)} />}

      <div className="max-w-6xl mx-auto">
        {/* ── En-tête ── */}
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">Veille Technologique</h2>
          <p className="text-gray-400 mb-8">
            {filtered.length} article{filtered.length !== 1 ? 's' : ''} sur les NPU et l'IA embarquée.
          </p>
        </Reveal>

        {/* ── Filtres par catégorie ── */}
        {dynamicCategories.length > 0 && (
          <Reveal delay={80}>
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                className={`filter-chip ${selectedCategory === '' ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(''); setPage(1); }}
              >
                Toutes
              </button>
              {dynamicCategories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => { setSelectedCategory(cat); setPage(1); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        {/* ── Grille d'articles ── */}
        {paged.length === 0 ? (
          <div className="text-center text-gray-500 py-16">
            <p className="text-lg mb-2">Aucun article dans cette catégorie.</p>
            <button
              onClick={() => { setSelectedCategory(''); setPage(1); }}
              className="text-blue-400 hover:underline text-sm"
            >
              Voir tous les articles
            </button>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paged.map((it, idx) => {
              const mapped = {
                ...it,
                description: it.description || it.summary || '',
                source: it.source || it.category || '',
                skills: it.skills || it.tags || [],
                year: it.year || (it.date ? it.date.substring(0, 4) : null),
                url: it.url || null,
                publishedAt: it.publishedAt || it.date || null,
              };
              return (
                <button key={idx} className="w-full text-left" onClick={() => setPreview(mapped)}>
                  <ArticleCard item={mapped} />
                </button>
              );
            })}
          </div>
        )}

        {/* ── Pagination ── */}
        <Pagination
          total={filtered.length}
          perPage={perPage}
          current={page}
          onChange={setPage}
        />
      </div>
    </section>
  );
}
