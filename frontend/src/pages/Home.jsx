import React, { useState, useEffect, useRef } from 'react';
import Reveal from '../components/Reveal';

/**
 * Hook Typewriter — anime le texte caractère par caractère.
 */
function useTypewriter(text, speed = 60) {
  const [display, setDisplay] = useState('');
  const [done, setDone] = useState(false);
  const idx = useRef(0);

  useEffect(() => {
    idx.current = 0;
    setDisplay('');
    setDone(false);
    const timer = setInterval(() => {
      idx.current += 1;
      setDisplay(text.slice(0, idx.current));
      if (idx.current >= text.length) {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return { display, done };
}

export default function Home() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [copied, setCopied] = useState(false);
  const base = (window.BASE_PATH || '/').replace(/\/$/, '');

  /* Effet typewriter pour le sous-titre */
  const { display: typedRole, done: typingDone } = useTypewriter(
    'Développeur Web Full-Stack',
    55
  );

  const toggleEmailTooltip = () => setShowTooltip((s) => !s);
  const copyEmail = () => {
    navigator.clipboard.writeText('elarrassmarwane@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* Données des compétences techniques */
  const skillColumns = [
    {
      title: 'Frontend',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700',
      items: ['HTML5 / CSS3 / JavaScript ES6+', 'TailwindCSS / Bootstrap', 'React', 'Responsive Design', 'PWA / Service Workers'],
    },
    {
      title: 'Backend',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      gradient: 'from-emerald-600 to-emerald-700',
      items: ['PHP 8+ / POO', 'Architecture MVC', 'API REST', 'MySQL / PDO', 'Sécurité & Authentification'],
    },
    {
      title: 'Outils & Méthodes',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      gradient: 'from-purple-600 to-purple-700',
      items: ['Git / GitHub', 'VS Code / PHPStorm', 'Agile / Scrum', 'GLPI / Administration', 'Windows Server / GPO'],
    },
  ];

  /* Sections en vedette */
  const featuredSections = [
    {
      href: `${base}/veille`, color: 'blue', label: '8 articles',
      title: 'Veille Technologique',
      desc: "Exploration des NPU (Neural Processing Units) et leur impact sur l'intelligence artificielle embarquée.",
      cta: 'En savoir plus',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    },
    {
      href: `${base}/journey`, color: 'purple', label: '2022 – 2026',
      title: 'Mon Parcours',
      desc: "De mes débuts en auto-didacte au BTS SIO – SLAM, découvrez mon évolution professionnelle.",
      cta: 'Découvrir',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    },
    {
      href: `${base}/projects`, color: 'emerald', label: '8 projets',
      title: 'Mes Projets',
      desc: 'Portfolio MVC, marketplace e-commerce, applications web — découvrez mes réalisations techniques.',
      cta: 'Voir les projets',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />,
    },
    {
      href: `${base}/rss`, color: 'amber', label: 'Live',
      title: 'Actualités Tech',
      desc: "Flux d'actualités technologiques agrégées en temps réel — IA, NPU, cybersécurité et plus.",
      cta: 'Voir les actualités',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />,
    },
  ];

  /* Correspondance couleur → classes Tailwind */
  const colorMap = {
    blue:    { bg: 'bg-blue-600',    hover: 'group-hover:text-blue-400',    cta: 'text-blue-400' },
    purple:  { bg: 'bg-purple-600',  hover: 'group-hover:text-purple-400',  cta: 'text-purple-400' },
    emerald: { bg: 'bg-emerald-600', hover: 'group-hover:text-emerald-400', cta: 'text-emerald-400' },
    amber:   { bg: 'bg-amber-600',   hover: 'group-hover:text-amber-400',   cta: 'text-amber-400' },
  };

  return (
    <>
      {/* ═══════════════════════════════ HERO ═══════════════════════════════ */}
      <section className="container mx-auto px-4 pt-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge statut */}
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-gray-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Disponible pour une alternance
            </div>
          </Reveal>

          {/* Nom */}
          <Reveal delay={80}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-5 tracking-tight">
              <span className="gradient-text-animated">Marwane El arrass</span>
            </h1>
          </Reveal>

          {/* Sous-titre avec typewriter */}
          <Reveal delay={160}>
            <p className="text-2xl md:text-3xl text-gray-300 mb-5 min-h-[2.5rem] font-light">
              {typedRole}
              {!typingDone && <span className="animate-blink text-blue-400 ml-0.5">|</span>}
            </p>
          </Reveal>

          {/* Description */}
          <Reveal delay={240}>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Passionné par les technologies modernes, la sécurité web et l'innovation.
              Spécialisé en développement d'applications robustes et performantes.
            </p>
          </Reveal>

          {/* CTA */}
          <Reveal delay={320}>
            <div className="flex flex-wrap justify-center gap-4">
              <a href={`${base}/projects`} className="btn-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Voir mes projets
              </a>
              <a href={`${base}/cv`} className="btn-ghost">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Mon CV
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════ COMPÉTENCES ═══════════════════════════ */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 gradient-text">
              Compétences Techniques
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
              Technologies et outils que je maîtrise au quotidien.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillColumns.map((col, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="glass rounded-2xl p-6 card-hover h-full">
                  <div className={`w-12 h-12 bg-gradient-to-br ${col.gradient} rounded-xl flex items-center justify-center mb-5 shadow-lg`}>
                    {col.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{col.title}</h3>
                  <ul className="space-y-2.5">
                    {col.items.map((it, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-gray-400 text-sm leading-relaxed">
                        <svg className="w-4 h-4 mt-0.5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                        </svg>
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════ SECTIONS EN VEDETTE ═══════════════════════ */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredSections.map((s, i) => {
              const c = colorMap[s.color];
              return (
                <Reveal key={i} delay={i * 80}>
                  <a href={s.href} className="group block glass rounded-2xl p-7 card-hover h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {s.icon}
                        </svg>
                      </div>
                      <span className="text-xs text-gray-500 bg-white/[0.04] px-2.5 py-1 rounded-full">
                        {s.label}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 ${c.hover} transition-colors duration-200`}>
                      {s.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {s.desc}
                    </p>
                    <span className={`${c.cta} font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-200`}>
                      {s.cta}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </a>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════ CONTACT CTA ═══════════════════════════ */}
      <section className="container mx-auto px-4 py-20">
        <Reveal>
          <div className="max-w-4xl mx-auto text-center glass rounded-2xl p-10 md:p-14 relative overflow-hidden">
            {/* Cercles décoratifs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl" aria-hidden="true" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-600/10 rounded-full blur-3xl" aria-hidden="true" />

            <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Travaillons ensemble</h2>
            <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
              Vous avez un projet ? Une opportunité d'alternance ? N'hésitez pas à me contacter.
            </p>

            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <div className="relative">
                <button onClick={toggleEmailTooltip} className="btn-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Me contacter
                </button>

                {showTooltip && (
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-slate-800 rounded-xl shadow-2xl border border-white/10 animate-scale-in"
                    style={{ zIndex: 50, minWidth: '270px' }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300 truncate">elarrassmarwane@gmail.com</span>
                      <button
                        onClick={copyEmail}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-xs font-medium transition-colors whitespace-nowrap"
                      >
                        {copied ? 'Copié !' : 'Copier'}
                      </button>
                    </div>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-800" />
                  </div>
                )}
              </div>

              <a
                href="https://github.com/Sartome"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
