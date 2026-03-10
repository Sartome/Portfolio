/**
 * All-in-one React application — Babel CDN build
 * Used when no Vite bundle is present.
 * Global deps: React, ReactDOM (UMD scripts loaded in header.php)
 */

/* ─── Helpers ─────────────────────────────────────────────────── */
const BASE = (window.BASE_PATH || '/').replace(/\/$/, '');
const api  = (path) => `${BASE}/api.php?path=${path}`;

function Reveal({ children, className = '' }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { el.classList.add('animate-fade-in'); obs.unobserve(el); } }),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`${className} opacity-0`}>{children}</div>;
}

function Loader({ message = 'Chargement…' }) {
  return (
    <div className="page-loader active fixed inset-0 bg-slate-900/80 flex items-center justify-center z-50">
      <div className="loader-content text-center">
        <div className="loader-spinner"></div>
        <div className="loader-text mt-4">{message}</div>
      </div>
    </div>
  );
}

function Pagination({ total, perPage, current, onChange }) {
  const pages = Math.ceil(total / perPage);
  if (pages <= 1) return null;
  return (
    <div className="flex justify-center gap-2 mt-8">
      <button disabled={current <= 1} onClick={() => onChange(current - 1)}
        className="px-3 py-1 bg-blue-600 rounded disabled:opacity-40">Préc.</button>
      <span className="px-3 py-1 text-gray-300">{current}/{pages}</span>
      <button disabled={current >= pages} onClick={() => onChange(current + 1)}
        className="px-3 py-1 bg-blue-600 rounded disabled:opacity-40">Suiv.</button>
    </div>
  );
}

/* ─── NavBar ────────────────────────────────────────────────────── */
function NavBar({ page }) {
  const [open, setOpen] = React.useState(false);
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));

  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  React.useEffect(() => {
    const fb = document.getElementById('fallback-nav');
    if (fb) fb.style.display = 'none';
  }, []);

  const links = [
    { href: `${BASE}/acceuil`,         name: 'Accueil',           key: 'home'     },
    { href: `${BASE}/cv`,       name: 'CV',                key: 'cv'       },
    { href: `${BASE}/projects`, name: 'Projets',           key: 'projects' },
    { href: `${BASE}/veille`,   name: 'Veille Tech',       key: 'veille'   },
    { href: `${BASE}/journey`,  name: 'Parcours',          key: 'journey'  },
    { href: `${BASE}/rss`,      name: 'Actualités',        key: 'rss'      },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <a href={`${BASE}/`} className="text-2xl font-bold gradient-text hover:scale-105 transition-transform">MEA.dev</a>
        <div className="hidden md:flex items-center space-x-6">
          {links.map(l => (
            <a key={l.key} href={l.href}
              className={`hover:text-blue-400 transition-colors ${page === l.key ? 'text-blue-400 font-semibold' : ''}`}>
              {l.name}
            </a>
          ))}
          <button onClick={() => setDark(d => !d)} className="ml-2 p-2 rounded-lg hover:bg-white/10" title="Thème">
            {dark ? '☀️' : '🌙'}
          </button>
        </div>
        <button className="md:hidden p-2 rounded-lg hover:bg-white/10" onClick={() => setOpen(o => !o)}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden pb-4 bg-slate-900/90 space-y-1">
          {links.map(l => (
            <a key={l.key} href={l.href} onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded hover:bg-white/10 ${page === l.key ? 'text-blue-400' : ''}`}>
              {l.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Home ──────────────────────────────────────────────────────── */
function Home() {
  const [tip, setTip] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const copy = () => {
    navigator.clipboard.writeText('elarrassmarwane@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const skillCols = [
    {
      title: 'Frontend', color: 'bg-blue-600',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
      items: ['HTML5 / CSS3 / JavaScript ES6+','TailwindCSS / Bootstrap','React','Responsive Design','PWA / Service Workers'],
    },
    {
      title: 'Backend', color: 'bg-purple-600',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>,
      items: ['PHP 8+ / POO','Architecture MVC','API REST','MySQL / PDO','Sécurité & Authentification'],
    },
    {
      title: 'Outils', color: 'bg-green-600',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 00-1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
      items: ['Git / GitHub','VS Code / PHPStorm','Agile / Scrum','Testing & Debugging','Docker / DDEV'],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 bg-blue-600/20 border border-blue-600/40 rounded-full text-blue-400 text-sm mb-6">
            🚀 Ouvert aux opportunités d'alternance
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in">
            <span className="gradient-text">Marwane El arrass</span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 mb-4 animate-slide-up">
            Développeur Web Full-Stack
          </p>
          <p className="text-lg text-gray-400 mb-10 max-w-2xl mx-auto animate-slide-up">
            Passionné par les technologies modernes, la sécurité web et l'innovation.
            Spécialisé en développement d'applications robustes et performantes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`${BASE}/projects`} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all hover-glow shadow-lg shadow-blue-600/30">
              Voir mes projets →
            </a>
            <div className="relative">
              <button onClick={() => setTip(t => !t)} className="px-8 py-3 glass hover:bg-white/10 rounded-xl font-semibold transition-all">
                Me contacter
              </button>
              {tip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-3 bg-gray-900 border border-white/10 rounded-xl text-sm whitespace-nowrap z-50 shadow-2xl">
                  <div className="flex items-center gap-3">
                    <span>elarrassmarwane@gmail.com</span>
                    <button onClick={copy} className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                      {copied ? '✓ Copié' : 'Copier'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="container mx-auto px-4 mb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: '8+',  label: 'Projets réalisés'      },
            { n: '2+',  label: 'Ans d\'expérience'      },
            { n: 'BTS', label: 'SIO SLAM (2e année)'    },
            { n: '100%', label: 'Passionné'             },
          ].map((s, i) => (
            <Reveal key={i} className="glass p-4 rounded-xl text-center hover-glow">
              <div className="text-3xl font-bold gradient-text mb-1">{s.n}</div>
              <div className="text-gray-400 text-sm">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="container mx-auto px-4 py-12 mb-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Compétences Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skillCols.map((col, i) => (
              <Reveal key={i} className="glass p-6 rounded-xl hover-glow">
                <div className={`w-12 h-12 ${col.color} rounded-xl flex items-center justify-center mb-4`}>{col.icon}</div>
                <h3 className="text-xl font-bold mb-4">{col.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {col.items.map((it, j) => <li key={j} className="flex items-center gap-2"><span className="text-blue-400">▸</span>{it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured nav cards */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 gradient-text">Explorer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/projects', color: 'bg-blue-600',   label: 'Mes Projets',      desc: 'Applications web, APIs et projets personnels',         emoji: '🚀' },
              { href: '/veille',   color: 'bg-purple-600', label: 'Veille Tech – NPU', desc: '8 articles sur les processeurs IA Neural Processing Units', emoji: '🧠' },
              { href: '/journey',  color: 'bg-green-600',  label: 'Mon Parcours',      desc: 'De 2022 à aujourd\'hui, autodidacte → BTS SIO SLAM',   emoji: '📈' },
              { href: '/cv',       color: 'bg-orange-600', label: 'Curriculum Vitae',  desc: 'Téléchargez mon CV complet au format PDF',              emoji: '📄' },
              { href: '/rss',      color: 'bg-red-600',    label: 'Actualités RSS',    desc: 'Dernières nouvelles tech agrégées en temps réel',       emoji: '📰' },
            ].map((c, i) => (
              <Reveal key={i} className="group">
                <a href={`${BASE}${c.href}`} className="block glass p-6 rounded-xl hover-glow transition-all group-hover:border-white/20">
                  <div className={`w-12 h-12 ${c.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {c.emoji}
                  </div>
                  <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{c.label}</h3>
                  <p className="text-gray-400 text-sm">{c.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20">
        <Reveal className="max-w-3xl mx-auto text-center glass p-12 rounded-2xl hover-glow">
          <h2 className="text-4xl font-bold mb-4">Travaillons ensemble</h2>
          <p className="text-xl text-gray-400 mb-8">Un projet, une opportunité, une question ? Je suis disponible.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://github.com/Sartome" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/marwane-el-arrass/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 hover:bg-blue-600 rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ─── CV ────────────────────────────────────────────────────────── */
function CV() {
  const experiences = [
    {
      period: '2025–2026', type: 'Alternance', color: 'border-blue-500',
      title: 'Administrateur Système', org: 'Mairie d\'Orly',
      desc: 'Gestion du parc informatique municipal, administration GLPI, préparation et maintenance des postes, migration Windows 11, support technique.',
      skills: ['GLPI','Active Directory','Windows 11','Support Technique','Maintenance'],
    },
    {
      period: '2023–2026', type: 'Formation', color: 'border-purple-500',
      title: 'BTS SIO – SLAM', org: 'Ingetis, Paris',
      desc: 'Solutions Logicielles et Applications Métiers. POO, développement web, bases de données, sécurité, alternance.',
      skills: ['PHP','JavaScript','MySQL','MVC','POO','Git'],
    },
    {
      period: '2022–2023', type: 'Auto-didacte', color: 'border-green-500',
      title: 'Développement Web', org: 'Projets personnels',
      desc: 'Apprentissage intensif HTML/CSS/JS, création de premiers projets, découverte de PHP et des frameworks.',
      skills: ['HTML','CSS','JavaScript','PHP','Problem Solving'],
    },
  ];

  const techStack = [
    { cat: 'Langages',       items: ['PHP 8+','JavaScript ES6+','HTML5','CSS3','SQL','Bash'] },
    { cat: 'Frameworks',     items: ['TailwindCSS','Bootstrap','React','MVC Custom'] },
    { cat: 'Outils',         items: ['Git / GitHub','VS Code','PHPStorm','DDEV','Docker','Postman'] },
    { cat: 'Systèmes',       items: ['Windows Server 2022','Active Directory','GPO','Linux (bases)'] },
    { cat: 'Sécurité',       items: ['CSP / CSRF','XSS Prevention','JWT','OWASP Top 10'] },
  ];

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Reveal className="glass p-8 rounded-2xl mb-8 hover-glow text-center">
          <h1 className="text-4xl font-extrabold mb-2 gradient-text">Marwane El arrass</h1>
          <p className="text-xl text-gray-300 mb-4">Développeur Web Full-Stack · BTS SIO SLAM (2e an.)</p>
          <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-sm mb-6">
            <span>📍 Île-de-France</span>
            <span>📧 elarrassmarwane@gmail.com</span>
            <a href="https://github.com/Sartome" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>
            <a href="https://www.linkedin.com/in/marwane-el-arrass/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">LinkedIn</a>
          </div>
          <a href={`${BASE}/cv/download`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all hover-glow shadow-lg shadow-blue-600/30">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            Télécharger le PDF
          </a>
        </Reveal>

        {/* Expériences */}
        <h2 className="text-2xl font-bold mb-6">Expériences &amp; Formation</h2>
        <div className="space-y-6 mb-12">
          {experiences.map((e, i) => (
            <Reveal key={i} className={`glass p-6 rounded-xl border-l-4 ${e.color} hover-glow`}>
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <h3 className="text-xl font-bold">{e.title}</h3>
                  <p className="text-gray-400">{e.org}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-400">{e.period}</span>
                  <div className="text-xs px-2 py-1 bg-white/10 rounded mt-1">{e.type}</div>
                </div>
              </div>
              <p className="text-gray-300 mb-4">{e.desc}</p>
              <div className="flex flex-wrap gap-2">
                {e.skills.map((s, j) => <span key={j} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{s}</span>)}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Stack technique */}
        <h2 className="text-2xl font-bold mb-6">Stack Technique</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStack.map((t, i) => (
            <Reveal key={i} className="glass p-5 rounded-xl hover-glow">
              <h3 className="text-base font-semibold text-blue-400 mb-3">{t.cat}</h3>
              <div className="flex flex-wrap gap-2">
                {t.items.map((it, j) => <span key={j} className="px-2 py-1 bg-white/5 rounded text-sm">{it}</span>)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ProjectCard ────────────────────────────────────────────────── */
function ProjectCard({ project }) {
  if (!project) return null;
  return (
    <div className="glass rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 hover-glow h-full flex flex-col">
      {project.image && (
        <img src={project.image} alt={project.title} loading="lazy"
          className="w-full h-48 object-cover" />
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-purple-600/20 border border-purple-600/50 rounded text-xs">{project.year}</span>
          {project.featured && <span className="text-xs text-yellow-400">⭐ Phare</span>}
        </div>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
        {project.technologies && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.technologies.slice(0, 4).map(t => (
              <span key={t} className="px-2 py-1 bg-blue-600/10 border border-blue-600/30 rounded text-xs">{t}</span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-1 bg-white/5 rounded text-xs">+{project.technologies.length - 4}</span>
            )}
          </div>
        )}
        <div className="flex gap-3 mt-auto">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
              Démo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Projects ───────────────────────────────────────────────────── */
function Projects() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [page, setPage] = React.useState(1);
  const PER = 6;

  React.useEffect(() => {
    fetch(api('/api/projects'))
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(d => setProjects(Array.isArray(d) ? d : d.data || []))
      .catch(e => setError(e.toString()))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Chargement des projets…" />;
  if (error)   return <p className="text-center text-red-400 p-8">Erreur : {error}</p>;

  const featured = projects.filter(p => p.featured);
  const years    = [...new Set(projects.map(p => p.year))].sort().reverse();
  const others   = projects.filter(p => !p.featured && (filter === 'all' || p.year === filter));
  const paged    = others.slice((page - 1) * PER, page * PER);

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 gradient-text">Mes Projets</h2>
        <p className="text-gray-400 mb-10">{projects.length} projets réalisés — technologies diverses</p>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2"><span className="text-yellow-400">⭐</span> Projets phares</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {featured.map((p, i) => (
                <Reveal key={i}><ProjectCard project={p} /></Reveal>
              ))}
            </div>
          </>
        )}

        {/* Others */}
        {others.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <h3 className="text-xl font-semibold">Autres projets</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => { setFilter('all'); setPage(1); }}
                  className={`px-3 py-1 rounded-full text-sm ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-white/10'}`}>
                  Tous
                </button>
                {years.map(y => (
                  <button key={y} onClick={() => { setFilter(y); setPage(1); }}
                    className={`px-3 py-1 rounded-full text-sm ${filter === y ? 'bg-blue-600 text-white' : 'bg-white/10'}`}>
                    {y}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paged.map((p, i) => <Reveal key={i}><ProjectCard project={p} /></Reveal>)}
            </div>
            <Pagination total={others.length} perPage={PER} current={page} onChange={setPage} />
          </>
        )}
      </div>
    </section>
  );
}

/* ─── Journey ───────────────────────────────────────────────────── */
function Journey() {
  const [timeline, setTimeline] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(api('/api/journey'))
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(setTimeline)
      .catch(e => setError(e.toString()))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader message="Chargement du parcours…" />;
  if (error)   return <p className="text-center text-red-400 p-8">Erreur : {error}</p>;

  const typeColors = { experience: 'bg-blue-600', education: 'bg-purple-600', project: 'bg-green-600', certification: 'bg-yellow-600', start: 'bg-gray-600' };
  const typeLabels = { experience: 'Alternance', education: 'Formation', project: 'Projet', certification: 'Certification', start: 'Début' };

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 gradient-text">Mon Parcours</h2>
        <p className="text-gray-400 mb-10">De l'autodidacte passionné au développeur professionnel</p>
        <div className="relative">
          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10"></div>
          <div className="space-y-8">
            {timeline.map((item, i) => {
              const color = typeColors[item.icon] || 'bg-gray-600';
              const label = typeLabels[item.icon] || item.icon;
              return (
                <Reveal key={i} className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 ${color} rounded-full flex items-center justify-center text-xl z-10`}>
                    {{ experience: '💼', education: '🎓', project: '💻', certification: '🏆', start: '🌱' }[item.icon] ?? '📌'}
                  </div>
                  <div className="glass p-5 rounded-xl flex-1 hover-glow">
                    <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 ${color} rounded-full`}>{label}</span>
                          {item.badge && <span className="text-xs px-2 py-0.5 bg-blue-600/30 border border-blue-600/50 rounded-full">{item.badge}</span>}
                        </div>
                        <h3 className="text-lg font-bold">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.organization}</p>
                      </div>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{item.year}</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    {item.skills && (
                      <div className="flex flex-wrap gap-1">
                        {item.skills.map((s, j) => <span key={j} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs">{s}</span>)}
                      </div>
                    )}
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm mt-3">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                        Voir le projet
                      </a>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Veille ────────────────────────────────────────────────────── */
function Veille({ articles = [], categories = [], selectedCategory: initCat = '' }) {
  const [cat, setCat]   = React.useState(initCat);
  const [page, setPage] = React.useState(1);
  const PER = 6;

  const filtered = cat ? articles.filter(a => a.category === cat) : articles;
  const paged    = filtered.slice((page - 1) * PER, page * PER);

  if (articles.length === 0) {
    return (
      <section className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-400">Aucun article disponible pour le moment.</p>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 gradient-text">Veille Technologique</h2>
        <p className="text-gray-400 mb-8">Les NPU (Neural Processing Units) — processeurs IA du futur</p>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button onClick={() => { setCat(''); setPage(1); }}
            className={`px-4 py-1.5 rounded-full text-sm transition-colors ${!cat ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
            Tous ({articles.length})
          </button>
          {categories.map(c => (
            <button key={c} onClick={() => { setCat(c); setPage(1); }}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${cat === c ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((art, i) => (
            <Reveal key={i} className="glass rounded-xl overflow-hidden hover-glow flex flex-col">
              {art.image && (
                <img src={art.image + '?w=400&h=200&fit=crop'} alt={art.title}
                  loading="lazy" className="w-full h-44 object-cover" />
              )}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs px-2 py-0.5 bg-blue-600/20 border border-blue-600/40 rounded-full text-blue-400">{art.category}</span>
                  <span className="text-xs text-gray-500">{art.date}</span>
                </div>
                <h3 className="font-bold text-base mb-2">{art.title}</h3>
                <p className="text-gray-400 text-sm flex-1">{art.summary}</p>
                {art.tags && (
                  <div className="flex flex-wrap gap-1 mt-4">
                    {art.tags.map((t, j) => <span key={j} className="text-xs text-gray-500">#{t}</span>)}
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
        <Pagination total={filtered.length} perPage={PER} current={page} onChange={setPage} />
      </div>
    </section>
  );
}

/* ─── RSS ───────────────────────────────────────────────────────── */
const RSS_STORAGE_KEY = 'rss_favorites';
const RSS_STEP = 9;

function loadRssFavs() {
  try { return JSON.parse(localStorage.getItem(RSS_STORAGE_KEY) || '[]'); } catch { return []; }
}

function RssSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass p-5 rounded-xl animate-pulse">
          <div className="w-full h-44 bg-white/10 rounded-lg mb-4" />
          <div className="h-3 bg-white/10 rounded w-1/3 mb-3" />
          <div className="h-4 bg-white/10 rounded w-full mb-2" />
          <div className="h-4 bg-white/10 rounded w-4/5 mb-4" />
          <div className="h-3 bg-white/10 rounded w-full mb-1" />
          <div className="h-3 bg-white/10 rounded w-2/3" />
        </div>
      ))}
    </div>
  );
}

function RSS({ articles: initial = [] }) {
  const [items, setItems]    = React.useState(initial);
  const [loading, setLoad]   = React.useState(initial.length === 0);
  const [error, setError]    = React.useState(null);
  const [sort, setSort]      = React.useState('recent');
  const [visible, setVisible]= React.useState(RSS_STEP);
  const [favs, setFavs]      = React.useState(loadRssFavs);
  const [showFavs, setShowF] = React.useState(false);
  const [toast, setToast]    = React.useState(null);

  React.useEffect(() => {
    if (initial.length > 0) return;
    fetch(api('/api/rss/fetch'), { headers: { 'X-Requested-With': 'XMLHttpRequest' } })
      .then(r => { if (!r.ok) throw new Error(r.statusText); return r.json(); })
      .then(data => setItems(Array.isArray(data) ? data : []))
      .catch(e => setError(e.toString()))
      .finally(() => setLoad(false));
  }, [initial]);

  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const isFav = (it) => favs.some(f => f.url === it.url);

  const toggleFav = (it, e) => {
    e.stopPropagation();
    e.preventDefault();
    setFavs(prev => {
      const idx = prev.findIndex(f => f.url === it.url);
      const next = idx > -1
        ? prev.filter((_, i) => i !== idx)
        : [...prev, { ...it, savedAt: new Date().toISOString() }];
      try { localStorage.setItem(RSS_STORAGE_KEY, JSON.stringify(next)); } catch {}
      setToast(idx > -1 ? 'Retiré des favoris' : 'Ajouté aux favoris ★');
      return next;
    });
  };

  const handleSort = (val) => { setSort(val); setVisible(RSS_STEP); };
  const handleToggleFavs = () => { setShowF(v => !v); setVisible(RSS_STEP); };

  const source = showFavs ? favs : items;
  const sorted = [...source].sort((a, b) => {
    if (sort === 'old')     return new Date(a.publishedAt) - new Date(b.publishedAt);
    if (sort === 'popular') return (b.popularity ?? 0) - (a.popularity ?? 0);
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });
  const displayed = sorted.slice(0, visible);
  const hasMore   = visible < sorted.length;

  return (
    <section className="container mx-auto px-4 py-12">
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg bg-green-700 text-white text-sm">
          {toast}
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2 gradient-text">Actualités Tech</h2>
        <p className="text-gray-400 mb-8">
          {loading
            ? 'Chargement…'
            : `${sorted.length} article${sorted.length !== 1 ? 's' : ''}${showFavs ? ' en favoris' : ''}`}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {!showFavs && [['recent','Plus récent'],['old','Plus ancien'],['popular','Populaire']].map(([val, label]) => (
            <button key={val} onClick={() => handleSort(val)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${sort===val ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}>
              {label}
            </button>
          ))}
          <button
            onClick={handleToggleFavs}
            className={`relative px-3 py-1.5 rounded-full text-sm transition-colors ${showFavs ? 'bg-yellow-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
          >
            {showFavs ? '★ Mes favoris' : '☆ Favoris'}
            {favs.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 flex items-center justify-center rounded-full bg-yellow-500 text-white text-xs font-bold">
                {favs.length > 9 ? '9+' : favs.length}
              </span>
            )}
          </button>
        </div>

        {/* Progressive skeleton while loading */}
        {!showFavs && loading && <RssSkeleton />}
        {!showFavs && error && <p className="text-center text-red-400 p-8">Erreur : {error}</p>}

        {(showFavs || (!loading && !error)) && (
          <>
            {displayed.length === 0 ? (
              <p className="text-gray-400 text-center py-12">
                {showFavs ? 'Aucun article en favoris.' : 'Aucun article à afficher.'}
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayed.map((it, idx) => (
                  <div key={idx} className="relative">
                    <Reveal className="block">
                      <a href={it.url} target="_blank" rel="noopener noreferrer"
                        className="relative z-0 block glass p-5 rounded-xl hover-glow transition-colors h-full flex flex-col">
                        {it.image && (
                          <img src={it.image} alt={it.title} loading="lazy"
                            className="w-full h-44 object-cover rounded-lg mb-4" />
                        )}
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <span>{it.source}</span>
                          <span>{it.publishedAt ? new Date(it.publishedAt).toLocaleDateString('fr-FR') : ''}</span>
                        </div>
                        <h3 className="font-bold text-sm mb-2 line-clamp-3 flex-1">{it.title}</h3>
                        <p className="text-gray-400 text-xs line-clamp-2 mt-auto">{it.description}</p>
                      </a>
                    </Reveal>
                    <button
                      onClick={(e) => toggleFav(it, e)}
                      title={isFav(it) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm transition-all shadow-lg ${
                        isFav(it) ? 'bg-yellow-500 text-white hover:bg-yellow-600' : 'bg-slate-700/90 text-gray-300 hover:bg-slate-600 hover:text-yellow-400'
                      }`}
                    >
                      {isFav(it) ? '★' : '☆'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="flex flex-col items-center mt-10 gap-2">
                <button
                  onClick={() => setVisible(v => v + RSS_STEP)}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-sm font-medium transition-colors"
                >
                  Voir plus ({sorted.length - visible} restants)
                </button>
                <span className="text-xs text-gray-500">{visible} / {sorted.length} articles affichés</span>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ─── App root ──────────────────────────────────────────────────── */
function App() {
  const rootEl = document.getElementById('react-root');
  const page   = rootEl?.dataset.page || 'home';
  let   props  = {};
  try { if (rootEl) props = JSON.parse(rootEl.dataset.props || '{}'); } catch {}

  const PageMap = { home: Home, cv: CV, projects: Projects, veille: Veille, journey: Journey, rss: RSS };
  const PageComp = PageMap[page] || (() => null);

  return (
    <>
      <NavBar page={page} />
      <div className="animate-fade-in">
        <PageComp {...props} />
      </div>
    </>
  );
}

window.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('react-root');
  if (!root) return;
  try {
    ReactDOM.createRoot(root).render(<App />);
  } catch (err) {
    console.error('React mount error:', err);
    root.innerHTML = `<div class="p-8 text-red-400 bg-white/5 rounded m-4">Erreur React — voir la console.<br><code>${err.message}</code></div>`;
  }
});
