import React from 'react';
import { useServerProps } from '../hooks/useInitialData';
import Reveal from '../components/Reveal';

const base = () => (window.BASE_PATH || '/').replace(/\/$/, '');

/* ── Couleurs des badges de compétences par catégorie ── */
const SKILL_COLORS = {
  Frontend:  'bg-blue-600/15 border-blue-600/40 text-blue-300',
  Backend:   'bg-emerald-600/15 border-emerald-600/40 text-emerald-300',
  Outils:    'bg-purple-600/15 border-purple-600/40 text-purple-300',
  Systèmes:  'bg-amber-600/15 border-amber-600/40 text-amber-300',
};

/* ── Titre de section avec lignes décoratives ── */
function Section({ title, children }) {
  return (
    <Reveal className="mb-10">
      <h3 className="text-lg font-bold mb-5 flex items-center gap-3 text-gray-300">
        <span className="flex-1 h-px bg-gradient-to-r from-blue-600/50 to-transparent" />
        {title}
        <span className="flex-1 h-px bg-gradient-to-l from-blue-600/50 to-transparent" />
      </h3>
      {children}
    </Reveal>
  );
}

/* ── Élément de timeline (expérience / formation) ── */
function TimelineItem({ period, title, subtitle, description, skills }) {
  return (
    <div className="relative pl-6 pb-7 last:pb-0 group">
      {/* Point de la timeline */}
      <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-500 ring-2 ring-blue-500/25 group-hover:ring-blue-500/50 transition-all duration-300" />
      {/* Ligne verticale */}
      <div className="absolute left-[5px] top-5 bottom-0 w-0.5 bg-gradient-to-b from-blue-600/30 to-transparent last:hidden" />
      <div>
        <span className="badge bg-blue-600/10 border border-blue-600/30 text-blue-400 mb-2 inline-block">
          {period}
        </span>
        <h4 className="font-bold text-white mb-0.5 group-hover:text-blue-300 transition-colors duration-200">{title}</h4>
        {subtitle && <p className="text-blue-400/80 text-sm mb-2 font-medium">{subtitle}</p>}
        {description && <p className="text-gray-400 text-sm leading-relaxed mb-2">{description}</p>}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {skills.map((s, i) => (
              <span key={i} className="tag-tech">{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CV() {
  const props = useServerProps('cv');
  const cv = props.cvData || {};

  const {
    name = 'Marwane El arrass',
    title = 'Développeur Web Full-Stack',
    email = 'elarrassmarwane@gmail.com',
    github = 'https://github.com/Sartome',
    linkedin = 'https://www.linkedin.com/in/marwane-el-arrass/',
    location = 'Île-de-France',
    summary = '',
    experience = [],
    education = [],
    skills = {},
    languages = [],
    certifications = [],
  } = cv;

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* ═══════════════════ EN-TÊTE DU CV ═══════════════════ */}
        <Reveal>
          <div className="glass rounded-2xl p-8 md:p-10 mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold gradient-text mb-2">{name}</h1>
            <p className="text-xl text-gray-300 mb-5 font-light">{title}</p>

            {/* Liens de contact */}
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-400">
              <a href={`mailto:${email}`} className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {email}
              </a>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
              <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors duration-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
            </div>

            {/* Bouton téléchargement */}
            <div className="mt-7">
              <a
                href={`${base()}/cv/download`}
                className="btn-primary"
                download
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Télécharger le CV (PDF)
              </a>
            </div>
          </div>
        </Reveal>

        {/* ═══════════════════ PROFIL ═══════════════════ */}
        {summary && (
          <Section title="Profil">
            <p className="text-gray-300 leading-relaxed glass p-5 rounded-xl text-[15px]">{summary}</p>
          </Section>
        )}

        {/* ═══════════════════ EXPÉRIENCE ═══════════════════ */}
        {experience.length > 0 && (
          <Section title="Expérience Professionnelle">
            <div className="glass p-6 rounded-xl">
              {experience.map((exp, i) => (
                <TimelineItem
                  key={i}
                  period={exp.period}
                  title={exp.title}
                  subtitle={exp.company}
                  description={exp.description}
                  skills={exp.skills}
                />
              ))}
            </div>
          </Section>
        )}

        {/* ═══════════════════ FORMATION ═══════════════════ */}
        {education.length > 0 && (
          <Section title="Formation">
            <div className="glass p-6 rounded-xl">
              {education.map((edu, i) => (
                <TimelineItem
                  key={i}
                  period={edu.period}
                  title={edu.title}
                  subtitle={edu.school}
                  description={edu.description}
                />
              ))}
            </div>
          </Section>
        )}

        {/* ═══════════════════ COMPÉTENCES ═══════════════════ */}
        {Object.keys(skills).length > 0 && (
          <Section title="Compétences">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(skills).map(([category, list]) => (
                <Reveal key={category}>
                  <div className="glass p-5 rounded-xl h-full">
                    <h4 className="font-semibold mb-3 text-xs uppercase tracking-wider text-gray-500">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {list.map((skill) => (
                        <span
                          key={skill}
                          className={`badge border ${SKILL_COLORS[category] || 'bg-white/10 text-gray-300 border-white/15'}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Section>
        )}

        {/* ═══════════════════ DOCUMENTS ═══════════════════ */}
        <Section title="Documents">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { key: 'motivation',  label: 'Lettre de motivation', color: 'text-blue-400' },
              { key: 'attestation', label: 'Attestation',          color: 'text-emerald-400' },
              { key: 'mod1',        label: 'Module BTS — 1',       color: 'text-purple-400' },
              { key: 'mod2',        label: 'Module BTS — 2',       color: 'text-purple-400' },
              { key: 'mod3',        label: 'Module BTS — 3',       color: 'text-purple-400' },
              { key: 'mod4',        label: 'Module BTS — 4',       color: 'text-purple-400' },
              { key: 'mod5',        label: 'Module BTS — 5',       color: 'text-purple-400' },
            ].map(({ key, label, color }) => (
              <a
                key={key}
                href={`${base()}/cv/doc/${key}`}
                download
                className="flex items-center gap-3 glass p-4 rounded-xl card-hover group"
              >
                <div className={`w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center ${color} group-hover:scale-110 transition-transform duration-200`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-200 flex-1">
                  {label}
                </span>
                <svg className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            ))}
          </div>
        </Section>

        {/* ═══════════════════ LANGUES & CERTIFICATIONS ═══════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {languages.length > 0 && (
            <Section title="Langues">
              <div className="glass p-5 rounded-xl space-y-3">
                {languages.map((lang, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="font-medium text-white">{lang.name}</span>
                    <span className="badge bg-blue-600/10 border border-blue-600/30 text-blue-400">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {certifications.length > 0 && (
            <Section title="Certifications">
              <div className="glass p-5 rounded-xl space-y-2.5">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-sm text-gray-300">
                    <svg className="w-4 h-4 mt-0.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" />
                    </svg>
                    {cert}
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>
      </div>
    </section>
  );
}
