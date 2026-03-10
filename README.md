# 🚀 Portfolio Professionnel MVC - Marwane El arrass

[![GitHub](https://img.shields.io/badge/GitHub-Sartome-blue?style=flat&logo=github)](https://github.com/Sartome)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Marwane%20El%20arrass-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/marwane-el-arrass/)

Portfolio moderne et professionnel construit avec une architecture MVC, sécurité renforcée et design contemporain. Refonte complète avec TailwindCSS, PHP moderne et best practices 2024.

## ✨ Fonctionnalités Principales

### 🏗️ Architecture MVC Moderne
- **Séparation des responsabilités** : Modèle-Vue-Contrôleur
- **Routing dynamique** avec URLs propres et SEO-friendly
- **Controllers dédiés** pour chaque section (CV, Projets, Veille, etc.)
- **Views réutilisables** avec layouts et composants
- **Configuration centralisée** dans des fichiers dédiés

### 🎨 Design Moderne avec TailwindCSS

### 🚀 Intégration React
Ce projet adopte une approche hybride : le serveur PHP continue de rendre les pages et de gérer les données,
mais certaines sections (par exemple la liste des projets) sont maintenant rendues par **React**
via un petit composant JSX.

-   la même UI peut ultérieurement être buildée avec Vite.
- Une API JSON a été ajoutée à `public/api.php` (`/api/projects`) pour alimenter les composants.
- Un squelette de configuration `package.json`/`vite.config.js` se trouve à la racine, avec un répertoire `frontend/`
  prêt pour un vrai workflow node.

La restauration progessive permet de moderniser une page à la fois sans réécrire tout le site en une fois.

### Animations et pagination
- Des utilitaires CSS (`animate-fade-in`, `animate-slide-up`, etc.) sont fournis dans `assets/animations.css` et intégrés dans Tailwind.
- Le composant React `Reveal` applique automatiquement l'animation d'apparition lors du scroll (IntersectionObserver); il enveloppe les cartes, sections, etc.
- La page d'accueil a été réécrite en React avec richesse visuelle (hero, compétences, cartes, CTA) et profite pleinement des animations CSS.
- Chargements asynchrones affichent un **Loader** animé (spinner + texte) grâce aux classes `.page-loader`/`.loader-spinner`.
- Les listes longues (projets, flux RSS) sont paginées côté client via le composant `Pagination` réutilisable. L'API `/api/projects` supporte aussi les paramètres `page` et `per` si vous préférez charger des pages serveur à l'avenir.
Dans la version actuelle **toutes les pages** (accueil, CV, projets, veille, parcours, RSS) sont déléguées à React : les vues PHP ne contiennent plus que la structure de base et un `<noscript>` de secours. React reçoit les données initiales via l'attribut `data-props` injecté par le contrôleur et rend l'ensemble de l'UI (navigation comprise). Si JavaScript est désactivé, l'utilisateur voit un message invitant à l'activer.
- **Interface élégante** avec glassmorphism et gradients
- **Design responsive** optimisé mobile-first
- **Animations fluides** avec transitions CSS3
- **Dark theme** professionnel et moderne
- **Icônes SVG** pour performances optimales

### 🔒 Sécurité Avancée
- **Content Security Policy (CSP)** appliqué via headers
- **Protection XSS** avec sanitisation des entrées/sorties
- **CSRF tokens** pour les formulaires
- **Headers de sécurité** : X-Frame-Options, X-Content-Type-Options
- **Rate limiting** pour prévenir les abus
- **Validation stricte** des données utilisateur

### 📄 Pages Complètes
- **Accueil** : Présentation, compétences et appel à l'action
- **CV** : Curriculum vitae complet et téléchargeable en PDF
- **Projets** : Showcase de projets avec technologies et démos
- **Veille Technologique** : Articles sur les NPU (Neural Processing Units)
- **Parcours** : Timeline professionnelle et éducative
- **Actualités** : Flux RSS agrégé avec filtres par catégorie
- **Ancien site** : Lien vers l'ancienne version dans le footer

### 🎯 Expérience Utilisateur
- **Navigation intuitive** avec menu responsive
- **Bouton retour en haut** avec smooth scroll
- **Animations au scroll** pour engagement visuel
- **Loading states** pour meilleur feedback
- **URLs sémantiques** et navigation claire

## 🛠️ Technologies Utilisées

### Backend
- **PHP 8+** - Langage backend moderne
- **Architecture MVC** - Séparation claire des responsabilités
- **POO** - Programmation Orientée Objet
- **Routing personnalisé** - Gestion des URLs propres

### Frontend
- **HTML5** - Sémantique et accessible
- **TailwindCSS** - Framework CSS utility-first
- **React** - All pages (Accueil, CV, Projets, Veille, Parcours, RSS) are fully rendered by React on the client; the PHP controllers simply inject the initial JSON props and a `data-page` attribute. Navigation is handled by `react-router-dom`, components are split by route and loaded lazily, and shared widgets (NavBar, Loader, Pagination, Reveal, etc.) live under `frontend/src`. This gives a modern SPA feel while preserving server‑side rendering for the first visit and graceful degradation when JS is disabled.

  A modular build system lives in `frontend/`. To compile/optimize the frontend assets run:
  ```bash
  cd frontend
  npm install      # install dependencies (React, react-router-dom, Tailwind etc.)
  npm run build     # produces optimized files under public/assets/react
  ```
  The `Core::reactScriptTag()` helper used in the layout will:
  * point at the Vite dev server during development (`npm run dev`),
  * load the production bundle when it exists,
  * otherwise output a comment (legacy Babel fallback removed).
- **JavaScript ES6+** - Vanilla JS pour interactions
- **Google Fonts (Inter)** - Typographie moderne

### Sécurité
- **CSP Headers** - Content Security Policy
- **CSRF Protection** - Tokens anti-cross-site
- **XSS Prevention** - Sanitisation HTML
- **Input Validation** - Validation stricte des données

### Outils
- **Apache/Nginx** - Serveur web avec .htaccess
- **Git** - Gestion de versions
- **Composer** (optionnel) - Gestion des dépendances PHP

## 📁 Structure du Projet

```
portfolio/
├── public/                   # Point d'entrée public
│   ├── index.php            # Front controller
│   └── .htaccess            # Règles de réécriture
│
├── app/                      # Logique applicative
│   ├── Core.php             # Noyau MVC (routing, sécurité)
│   ├── Controller.php       # Contrôleur de base
│   │
│   ├── controllers/         # Contrôleurs
│   │   ├── HomeController.php
│   │   ├── CvController.php
│   │   ├── ProjectsController.php
│   │   ├── VeilleController.php
│   │   ├── JourneyController.php
│   │   └── RssController.php
│   │
│   ├── models/              # Modèles (données)
│   │
│   └── views/               # Vues (templates)
│       ├── layouts/         # Layouts réutilisables
│       │   ├── header.php
│       │   └── footer.php
│       └── pages/           # Pages individuelles
│           ├── home.php
│           ├── cv.php
│           ├── projects.php
│           ├── veille.php
│           ├── journey.php
│           └── rss.php
│
├── config/                   # Configuration
│   ├── app.php              # Configuration application
│   └── security.php         # Configuration sécurité
│
├── assets/                   # Ressources (images, PDF, etc.)
│   ├── cv.pdf
│   └── *.png, *.jpg
│
├── old/                      # Ancien site (TP, Missions)
│   ├── index.html
│   ├── actuality.html
│   ├── TP1/ à TP6/
│   └── MISSION1/ à MISSION9/
│
├── .htaccess                 # Redirection vers public/
└── README.md                 # Documentation
```

## 🚀 Installation & Utilisation

### Prérequis
- **PHP 7.4+** (recommandé PHP 8+)
- **Apache** ou **Nginx** avec mod_rewrite
- **Navigateur moderne** supportant ES6+
- (Optionnel) Clé API NewsAPI pour les actualités

### Installation Rapide

1. **Cloner le repository**
```bash
git clone https://github.com/Sartome/portfolio.git
cd portfolio
```

2. **Configurer le serveur web**

**Apache** (déjà configuré via .htaccess)
```bash
# Activer mod_rewrite si nécessaire
sudo a2enmod rewrite
sudo systemctl restart apache2
```

**Nginx** - Ajouter à votre configuration :
```nginx
location / {
    try_files $uri $uri/ /public/index.php?url=$uri&$args;
}
```

3. **Configurer l'application**
   - Ouvrir `config/app.php`
   - Modifier `app_url` selon votre environnement
   - (Optionnel) Ajouter votre clé NewsAPI

4. **Lancer le serveur de développement**
```bash
# Avec PHP Built-in Server
cd public
php -S localhost:8000

# Ou utiliser XAMPP/WAMP/MAMP
```

5. **Accéder au portfolio**
   - Ouvrir `http://localhost:8000` dans votre navigateur
   - Naviguer entre les différentes sections
   - Accéder à l'ancien site via le footer

### Configuration Avancée

**NewsAPI (Flux RSS)**
1. Créer un compte sur [newsapi.org](https://newsapi.org)
2. Copier votre clé API
3. Ouvrir `config/app.php`
4. Remplacer `YOUR_API_KEY_HERE` dans `newsapi_key`

**Flux RSS (Google Alerts - déjà configuré)**
1. Le flux Google Alerts est déjà configuré dans `app/controllers/RssController.php`
2. URL du flux: `https://www.google.fr/alerts/feeds/06235267178635802820/7750195999628698780`
3. Le parser supporte automatiquement les flux Atom et RSS
4. Pour changer de flux: modifier l'URL ligne 40 dans `RssController.php`

**Sécurité Production**
1. Dans `public/index.php`, désactiver l'affichage des erreurs
2. Dans `config/app.php`, mettre `debug` à `false`
3. Activer HTTPS et décommenter la redirection dans `.htaccess`

## 🎨 Personnalisation

### Changer les Couleurs
Modifier les variables CSS dans `assets/style.css` :
```css
:root {
    --primary-bg: #121725;
    --accent-primary: #16AAD9;
    --accent-secondary: #1E7AEE;
    /* ... */
}
```

### Modifier le Thème Clair
Variables pour thème clair dans `assets/modern-features.css` :
```css
:root[data-theme="light"] {
    --primary-bg: #f5f7fa;
    --text-light: #1f2937;
    /* ... */
}
```

### Ajouter des Projets
Ajouter un nouveau bouton dans `index.html` :
```html
<a href="VOTRE_PROJET/index.html" class="bouton" aria-label="Votre Projet">
    Mon Projet
</a>
```

## 🔐 Configuration Sécurité

### Variables de Sécurité (security.js)
- `maxCalls`: 10 requêtes
- `timeWindow`: 60 secondes
- `TRUSTED_SOURCES`: Sources d'actualités autorisées

### Content Security Policy
Personnaliser dans `security.js` fonction `enforceCSP()`:
```javascript
meta.content = "default-src 'self'; script-src 'self' 'unsafe-inline'; ...";
```

## 📊 Monitoring & Analytics

### Performance Metrics
Le portfolio inclut un monitoring automatique :
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **Temps de chargement** des ressources

Voir la console du navigateur pour les métriques.

### Gestion d'Erreurs
Toutes les erreurs sont loguées :
```javascript
console.error('Description de l'erreur:', error);
```

## 🌐 Déploiement

### GitHub Pages
```bash
# Pousser vers GitHub
git add .
git commit -m "Deploy portfolio"
git push origin main

# Activer GitHub Pages dans Settings
```

### Netlify
1. Connecter le repository GitHub
2. Configuration automatique détectée
3. Deploy !

### Serveur Personnel
1. Upload via FTP/SFTP
2. Configurer le domaine
3. Activer HTTPS (Let's Encrypt)

## 🔧 Développement

### Structure Modulaire
Chaque fonctionnalité est isolée dans sa propre classe :
```javascript
class ThemeManager { /* ... */ }
class LazyLoadManager { /* ... */ }
class NotificationManager { /* ... */ }
```

### Ajouter une Nouvelle Fonctionnalité
1. Créer la classe dans `modern-features.js`
2. Ajouter les styles dans `modern-features.css`
3. Initialiser dans `initializeModernFeatures()`
4. Exporter dans `window.ModernFeatures`

### Debugging
**Activer le mode verbose :**
```javascript
// Dans la console navigateur
localStorage.setItem('debug', 'true');
```

**Débogage RSS :**
- Le parser supporte maintenant les flux Atom (Google Alerts) et RSS standards
- En cas d'erreur "Unexpected token '<'", vérifier que le flux retourne bien du XML
- Tester le flux directement: `curl "URL_DU_FLUX"`
- Les logs d'erreur sont disponibles dans les logs du serveur PHP

## 📱 Compatibilité

### Navigateurs Supportés
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

### Appareils
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablettes (iPad, Android)
- ✅ Mobiles (iOS, Android)

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👤 Auteur

**Marwane El arrass**
- GitHub: [@Sartome](https://github.com/Sartome)
- LinkedIn: [Marwane El arrass](https://www.linkedin.com/in/marwane-el-arrass-1b545b323/)
- Email: elarrassmarwane@gmail.com

## 🙏 Remerciements

- NewsAPI pour les actualités en temps réel
- Unsplash pour les images de placeholder
- Toutes les sources d'actualités technologiques
- La communauté open-source

## 📈 Roadmap

### Version Future
- [ ] Système de blog intégré
- [ ] Formulaire de contact avec backend
- [ ] Portfolio de projets avec filtres avancés
- [ ] Mode présentation avec diaporama
- [ ] Intégration GitHub API pour projets
- [ ] Multilingue (FR/EN)
- [ ] Tests automatisés (Jest, Cypress)
- [ ] CI/CD Pipeline

---

⭐ **N'oubliez pas de mettre une étoile si vous aimez ce projet !**

*Dernière mise à jour: Novembre 2025*