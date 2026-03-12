# Portfolio Professionnel - Marwane El Arrass

[![GitHub](https://img.shields.io/badge/GitHub-Sartome-blue?style=flat&logo=github)](https://github.com/Sartome)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Marwane%20El%20arrass-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/marwane-el-arrass/)
[![PHP](https://img.shields.io/badge/PHP-8%2B-777BB4?style=flat&logo=php)](https://php.net)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-06B6D4?style=flat&logo=tailwindcss)](https://tailwindcss.com)

Portfolio moderne et professionnel construit sur une architecture **PHP MVC + React SPA hybride**. Le serveur PHP gère le routing, la sécurité et l'injection des données initiales ; React prend en charge le rendu de l'interface complète côté client.

---

## Fonctionnalités Principales

### Architecture MVC PHP
- **Routing dynamique** : URLs propres gérées par `Core.php` et `.htaccess`
- **Controllers dédiés** pour chaque section (Home, CV, Projects, Veille, Journey, RSS, Error)
- **Vues PHP légères** : chaque vue injecte uniquement les `data-props` JSON et le point de montage React
- **Configuration centralisée** dans `config/app.php` et `config/security.php`
- **API JSON interne** exposée via `public/api.php` (endpoints projects, rss, journey, veille)

### Frontend React 18 (SPA)
- **React 18** avec Suspense et chargement paresseux de chaque page
- **react-router-dom v6** remplacé par un routage basé sur `data-page` (page injectée par PHP)
- **Vite 4** comme bundler : build ultra-rapide, HMR pendant le développement
- **TailwindCSS 3** (utility-first), compilé via PostCSS
- **Composants réutilisables** : `NavBar`, `Loader`, `Pagination`, `Reveal`, `ArticleCard`, `ProjectCard`, `PreviewModal`
- **Hooks personnalisés** : `useFetch` (données distantes), `useInitialData` (props injectées par PHP)

### Pages
| Page | Route PHP | Composant React |
|------|-----------|-----------------|
| Accueil | `/` | `Home.jsx` |
| CV | `/cv` | `CV.jsx` |
| Projets | `/projects` | `Projects.jsx` |
| Veille technologique | `/veille` | `Veille.jsx` |
| Parcours | `/journey` | `Journey.jsx` |
| Actualités RSS | `/rss` | `RSS.jsx` |
| 404 | `*` | `NotFound.jsx` |

### Animations & UX
- Composant `Reveal` (IntersectionObserver) pour les animations à l'apparition
- Classes CSS utilitaires : `animate-fade-in`, `animate-slide-up`, etc. (`assets/animations.css`)
- Spinner/Loader animé pendant les chargements asynchrones
- Pagination côté client via le composant `Pagination`
- Dark theme moderne avec glassmorphism et gradients

### Sécurité
- **Content Security Policy (CSP)** via headers PHP
- **Protection XSS** : sanitisation des entrées/sorties
- **CSRF tokens** pour les formulaires
- **Headers de sécurité** : X-Frame-Options, X-Content-Type-Options
- **Rate limiting** côté client et serveur
- **Validation stricte** des données utilisateur
- Configuration détaillée dans `config/security.php`

### PWA (Progressive Web App)
- Service Worker (`sw.js`) pour le mode hors-ligne
- Manifeste PWA (`manifest.php`)
- Installation native sur mobile/desktop

---

## Technologies

| Couche | Technologie |
|--------|-------------|
| Backend | PHP 8+, architecture MVC custom |
| Frontend | React 18, react-router-dom v6, Vite 4 |
| Styles | TailwindCSS 3, PostCSS, CSS custom |
| Build | Vite (`npm run build` → `public/assets/react/`) |
| Dev env | DDEV (Docker) |
| Serveur | Apache avec mod_rewrite (`.htaccess`) |

---

## Structure du Projet

```
portfolio/
├── public/                     # Point d'entrée public (DocumentRoot)
│   ├── index.php               # Front controller PHP
│   ├── api.php                 # Router API JSON
│   └── assets/
│       └── react/              # Build Vite (généré par npm run build)
│           └── assets/
│               ├── index.js
│               ├── index.css
│               └── *.js        # Chunks React
│
├── app/                        # Logique applicative PHP
│   ├── Core.php                # Noyau MVC (routing, sécurité, helpers)
│   ├── Controller.php          # Contrôleur de base
│   └── controllers/
│       ├── HomeController.php
│       ├── CvController.php
│       ├── ProjectsController.php
│       ├── VeilleController.php
│       ├── JourneyController.php
│       ├── RssController.php
│       └── ErrorController.php
│   └── views/
│       ├── layouts/
│       │   ├── header.php      # Charge le bundle React
│       │   └── footer.php
│       └── pages/              # Vues minimalistes (inject data-props)
│           ├── home.php
│           ├── cv.php
│           ├── projects.php
│           ├── veille.php
│           ├── journey.php
│           ├── rss.php
│           └── error.php
│
├── frontend/                   # Code source React (Vite)
│   ├── index.html              # Template HTML Vite
│   └── src/
│       ├── main.jsx            # Point d'entrée React
│       ├── App.jsx             # Routeur basé sur data-page
│       ├── index.css
│       ├── components/
│       │   ├── NavBar.jsx
│       │   ├── Loader.jsx
│       │   ├── Pagination.jsx
│       │   ├── Reveal.jsx
│       │   ├── ArticleCard.jsx
│       │   ├── ProjectCard.jsx
│       │   └── PreviewModal.jsx
│       ├── hooks/
│       │   ├── useFetch.js
│       │   └── useInitialData.js
│       └── pages/
│           ├── Home.jsx
│           ├── CV.jsx
│           ├── Projects.jsx
│           ├── Veille.jsx
│           ├── Journey.jsx
│           ├── RSS.jsx
│           └── NotFound.jsx
│
├── assets/                     # Ressources statiques globales
│   ├── style.css
│   ├── modern-style.css
│   ├── modern-features.css
│   ├── modern-features.js
│   ├── animations.css
│   ├── rss.js
│   └── security.js
│
├── config/
│   ├── app.php                 # Configuration application
│   └── security.php            # Configuration sécurité
│
├── sw.js                       # Service Worker (PWA)
├── manifest.php                # Manifeste PWA
├── vite.config.js              # Configuration Vite
├── package.json                # Dépendances npm
├── tailwind.config.js
├── postcss.config.js
├── CHANGELOG.md
├── QUICKSTART.md
└── README.md
```

---

## Installation & Développement

### Prérequis
- [DDEV](https://ddev.readthedocs.io/) (recommandé) **ou** Apache + PHP 8+
- Node.js 18+ et npm
- Navigateur moderne (ES2020+)

### Démarrage avec DDEV

```bash
# 1. Cloner le dépôt
git clone https://github.com/Sartome/portfolio.git
cd portfolio

# 2. Démarrer DDEV
ddev start

# 3. Installer les dépendances frontend et builder le SPA
npm install
npm run build        # génère public/assets/react/

# 4. Ouvrir dans le navigateur
ddev launch
```

### Développement Frontend (HMR Vite)

```bash
npm run dev          # serveur Vite sur http://localhost:5173
```

`Core::reactScriptTag()` dans `header.php` détecte automatiquement :
- **Mode dev** : pointe sur le serveur Vite (HMR)
- **Mode prod** : charge le bundle depuis `public/assets/react/`

### Sans DDEV (PHP Built-in)

```bash
cd public
php -S localhost:8000
# Ouvrir http://localhost:8000
```

---

## API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/projects` | Liste JSON des projets |
| GET | `/api/projects?page=1&per=6` | Liste paginée |
| GET | `/api/rss/fetch` | Flux RSS/Atom agrégé |
| GET | `/api/journey` | Timeline du parcours |
| GET | `/api/veille` | Articles de veille technologique |

---

## Configuration

### `config/app.php`

```php
return [
    'app_url'     => 'http://localhost',   // URL de base
    'debug'       => true,                 // false en production
    'newsapi_key' => 'VOTRE_CLE_API',      // optionnel
    'owner' => [
        'name'     => 'Marwane El arrass',
        'email'    => 'elarrassmarwane@gmail.com',
        'github'   => 'https://github.com/Sartome',
        'linkedin' => 'https://www.linkedin.com/in/marwane-el-arrass/',
    ],
];
```

### Flux RSS (`RssController.php`)
- Flux Google Alerts configuré par défaut (format Atom + RSS supporté)
- Pour changer de flux : modifier l'URL dans `RssController.php` (~ligne 40)
- API NewsAPI disponible en alternative (configurer `newsapi_key` dans `config/app.php`)

---

## Build Production

```bash
# Compiler le frontend
npm run build

# Vérifier les fichiers générés
ls public/assets/react/assets/
```

**Pour un déploiement en production :**
1. Mettre `debug` à `false` dans `config/app.php`
2. Activer HTTPS et décommenter la redirection dans `.htaccess`
3. Stocker les clés API dans des variables d'environnement
4. Configurer les headers de sécurité côté serveur

---

## Contact & Support

- Email : [elarrassmarwane@gmail.com](mailto:elarrassmarwane@gmail.com)
- GitHub : [github.com/Sartome](https://github.com/Sartome)
- LinkedIn : [Marwane El arrass](https://www.linkedin.com/in/marwane-el-arrass/)
- Issues : [github.com/Sartome/portfolio/issues](https://github.com/Sartome/portfolio/issues)
