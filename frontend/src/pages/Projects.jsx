import React, { useState, useEffect } from 'react';
import { useServerProps } from '../hooks/useInitialData';
import ProjectCard from '../components/ProjectCard';
import Pagination from '../components/Pagination';
import Loader from '../components/Loader';
import Reveal from '../components/Reveal';
import PreviewModal from '../components/PreviewModal';

export default function Projects() {
  const serverProps = useServerProps('projects');
  const initialList = serverProps.projects || [];

  const [projects, setProjects]   = useState(initialList);
  const [loading, setLoading]     = useState(initialList.length === 0);
  const [error, setError]         = useState(null);
  const [page, setPage]           = useState(1);
  const [preview, setPreview]     = useState(null);
  const [techFilter, setTechFilter] = useState('');
  const [search, setSearch]       = useState('');
  const perPage = 6;

  useEffect(() => {
    if (initialList.length > 0) return;
    const cached = sessionStorage.getItem('projectsData');
    if (cached) {
      try {
        setProjects(JSON.parse(cached));
        setLoading(false);
        return;
      } catch {}
    }

    let mounted = true;
    setLoading(true);
    const bp = (window.BASE_PATH || '/').replace(/\/$/, '');
    fetch(`${bp}/api.php?path=/api/projects`)
      .then((r) => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then((data) => {
        const all = Array.isArray(data) ? data : data.data || [];
        if (mounted) {
          setProjects(all);
          try { sessionStorage.setItem('projectsData', JSON.stringify(all)); } catch {}
        }
      })
      .catch((e) => setError(e.toString()))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, [initialList]);

  if (loading) return <Loader message="Chargement des projets..." />;
  if (error)   return <p className="text-center text-red-500">Erreur : {error}</p>;

  // Collect all unique technologies
  const allTechs = [...new Set(
    projects.flatMap((p) => p.technologies || [])
  )].sort();

  // Filter all projects by tech + search
  const applyFilters = (list) => {
    let result = list;
    if (techFilter) {
      result = result.filter((p) => (p.technologies || []).includes(techFilter));
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.description || '').toLowerCase().includes(q) ||
        (p.technologies || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    return result;
  };

  const allFiltered = applyFilters(projects);
  const featured    = allFiltered.filter((p) => p.featured);
  const others      = allFiltered.filter((p) => !p.featured);
  const pagedOthers = others.slice((page - 1) * perPage, page * perPage);

  const clearFilters = () => { setTechFilter(''); setSearch(''); setPage(1); };

  return (
    <section className="container mx-auto px-4 py-12">
      {preview && <PreviewModal item={preview} onClose={() => setPreview(null)} />}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Mes Projets</h2>
        <p className="text-gray-400 mb-8">
          {projects.length} projets réalisés — web, systèmes, APIs et applications métiers.
        </p>

        {/* Filters */}
        <div className="glass p-4 rounded-xl mb-8 space-y-3">
          {/* Search */}
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              className="w-full pl-9 pr-4 py-2 bg-transparent border border-white/10 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50"
            />
          </div>

          {/* Tech filter chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setTechFilter(''); setPage(1); }}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                techFilter === '' ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              Toutes
            </button>
            {allTechs.map((tech) => (
              <button
                key={tech}
                onClick={() => { setTechFilter(tech); setPage(1); }}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  techFilter === tech ? 'bg-blue-600 text-white' : 'bg-white/5 hover:bg-white/10 text-gray-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Active filter indicator */}
          {(techFilter || search) && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">
                {allFiltered.length} projet{allFiltered.length !== 1 ? 's' : ''} filtré{allFiltered.length !== 1 ? 's' : ''}
              </span>
              <button onClick={clearFilters} className="text-blue-400 hover:underline text-xs">
                Effacer les filtres
              </button>
            </div>
          )}
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full" />
              Projets phares
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
              {featured.map((p, idx) => (
                <Reveal key={idx}>
                  <button className="w-full text-left h-full" onClick={() => setPreview(p)}>
                    <ProjectCard project={p} />
                  </button>
                </Reveal>
              ))}
            </div>
          </>
        )}

        {/* Others */}
        {others.length > 0 && (
          <>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-2 h-6 bg-purple-600 rounded-full" />
              Autres projets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pagedOthers.map((proj, idx) => (
                <Reveal key={idx}>
                  <button className="w-full text-left h-full" onClick={() => setPreview(proj)}>
                    <ProjectCard project={proj} />
                  </button>
                </Reveal>
              ))}
            </div>
            <Pagination
              total={others.length}
              perPage={perPage}
              current={page}
              onChange={setPage}
            />
          </>
        )}

        {allFiltered.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            <p className="text-lg mb-3">Aucun projet trouvé.</p>
            <button onClick={clearFilters} className="text-blue-400 hover:underline">
              Effacer les filtres
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
