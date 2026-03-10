import React, { useRef, useEffect, useState } from 'react';

/**
 * Reveal — révèle le contenu avec une animation slide-up + fade
 * lorsqu'il entre dans le viewport (IntersectionObserver).
 *
 * Utilise les classes CSS reveal-hidden / reveal-visible de index.css
 * pour une transition fluide pilotée par CSS.
 */
export default function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Révéler immédiatement les éléments déjà visibles */
    const { top } = el.getBoundingClientRect();
    if (top < window.innerHeight * 0.92) {
      setRevealed(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${revealed ? 'reveal-visible' : 'reveal-hidden'}`}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
