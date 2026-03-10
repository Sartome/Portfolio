import React, { useState, useEffect } from 'react';

/* ── Chemin de base dynamique ── */
const BASE = () => (window.BASE_PATH || '/').replace(/\/$/, '');

/* ── Liens de navigation ── */
const LINKS = [
  { href: () => `${BASE()}/`,         name: 'Accueil',     key: 'home' },
  { href: () => `${BASE()}/cv`,       name: 'CV',          key: 'cv' },
  { href: () => `${BASE()}/projects`, name: 'Projets',     key: 'projects' },
  { href: () => `${BASE()}/veille`,   name: 'Veille Tech', key: 'veille' },
  { href: () => `${BASE()}/journey`,  name: 'Parcours',    key: 'journey' },
  { href: () => `${BASE()}/rss`,      name: 'Actualités',  key: 'rss' },
];

export default function NavBar({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  /* Synchroniser la classe dark sur <html> */
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  /* Masquer la nav PHP de secours */
  useEffect(() => {
    const fallback = document.getElementById('fallback-nav');
    if (fallback) fallback.style.display = 'none';
  }, []);

  /* Détecter le scroll : fond opaque + barre de progression */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Verrouiller le scroll lorsque le menu mobile est ouvert + Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', close);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', close);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Barre de progression du scroll ── */}
      <div
        className="fixed top-0 left-0 h-[3px] z-[9999] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        style={{ width: `${scrollProgress}%`, transition: 'width 80ms linear' }}
        aria-hidden="true"
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-900/85 backdrop-blur-xl shadow-lg shadow-black/25 border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* ── Logo ── */}
          <a
            href={`${BASE()}/`}
            className="text-2xl font-extrabold gradient-text hover:scale-105 transition-transform duration-200 select-none"
          >
            MEA.dev
          </a>

          {/* ── Navigation desktop ── */}
          <div className="hidden md:flex items-center gap-0.5">
            {LINKS.map((l) => (
              <a
                key={l.key}
                href={l.href()}
                className={`nav-item ${page === l.key ? 'active' : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'}`}
              >
                {l.name}
              </a>
            ))}

            {/* Séparateur vertical */}
            <span className="mx-2 h-5 w-px bg-white/10" aria-hidden="true" />

            {/* Bouton thème clair/sombre */}
            <button
              onClick={() => setDark((d) => !d)}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              aria-label={dark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            >
              {dark ? (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.021 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* ── Hamburger animé (mobile) ── */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
          </button>
        </div>

        {/* ── Menu mobile plein écran ── */}
        {menuOpen && (
          <div className="md:hidden fixed inset-0 top-[60px] bg-slate-900/97 backdrop-blur-2xl animate-fade-in z-40">
            <div className="flex flex-col px-5 py-8 gap-1.5 max-w-md mx-auto">
              {LINKS.map((l, i) => (
                <a
                  key={l.key}
                  href={l.href()}
                  className={`flex items-center justify-between py-3.5 px-5 rounded-xl text-[15px] font-medium transition-all duration-200 ${
                    page === l.key
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/25'
                      : 'text-gray-300 hover:bg-white/[0.04] hover:text-white'
                  }`}
                  style={{ animationDelay: `${i * 50}ms` }}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.name}
                  {page === l.key && (
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  )}
                </a>
              ))}

              <hr className="border-white/[0.06] my-4" />

              {/* Thème dans le menu mobile */}
              <button
                onClick={() => setDark((d) => !d)}
                className="flex items-center gap-3 py-3.5 px-5 rounded-xl text-gray-300 hover:bg-white/[0.04] hover:text-white transition-all text-[15px] font-medium"
              >
                {dark ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.021 0l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Mode clair
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                    Mode sombre
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
