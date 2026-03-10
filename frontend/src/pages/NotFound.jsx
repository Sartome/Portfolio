import React from 'react';

export default function NotFound() {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h2 className="text-4xl font-bold mb-4">404 — Page introuvable</h2>
      <p className="text-gray-400 mb-8">Désolé, le contenu recherché n'existe pas ou a été déplacé.</p>
      <a
        href={window.BASE_PATH || '/'}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition-colors"
      >
        Retour à l'accueil
      </a>
    </section>
  );
}
