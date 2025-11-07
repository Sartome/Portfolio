# ✅ Checklist de Vérification

## Structure des fichiers

### Fichiers créés ✓

**Configuration**
- [x] `config/app.php` - Configuration de l'application
- [x] `config/security.php` - Configuration sécurité

**Core MVC**
- [x] `app/Core.php` - Noyau (routing, sécurité)
- [x] `app/Controller.php` - Contrôleur de base

**Contrôleurs**
- [x] `app/controllers/HomeController.php`
- [x] `app/controllers/CvController.php`
- [x] `app/controllers/ProjectsController.php`
- [x] `app/controllers/VeilleController.php`
- [x] `app/controllers/JourneyController.php`
- [x] `app/controllers/RssController.php`

**Vues - Layouts**
- [x] `app/views/layouts/header.php`
- [x] `app/views/layouts/footer.php`

**Vues - Pages**
- [x] `app/views/pages/home.php`
- [x] `app/views/pages/cv.php`
- [x] `app/views/pages/projects.php`
- [x] `app/views/pages/veille.php`
- [x] `app/views/pages/journey.php`
- [x] `app/views/pages/rss.php`

**Public**
- [x] `public/index.php` - Point d'entrée
- [x] `public/.htaccess` - Règles Apache

**Racine**
- [x] `.htaccess` - Redirection vers public/
- [x] `README.md` - Documentation mise à jour
- [x] `DEMARRAGE.md` - Guide de démarrage

**Ancien site**
- [x] `old/` - Contient tous les TP et MISSION

## Pages accessibles

Une fois le serveur lancé, vérifiez que ces URLs fonctionnent:

- [ ] `http://localhost:8000/` - Page d'accueil
- [ ] `http://localhost:8000/cv` - CV
- [ ] `http://localhost:8000/cv/download` - Téléchargement CV PDF
- [ ] `http://localhost:8000/projects` - Projets
- [ ] `http://localhost:8000/veille` - Veille technologique NPU
- [ ] `http://localhost:8000/journey` - Parcours professionnel
- [ ] `http://localhost:8000/rss` - Actualités RSS
- [ ] `http://localhost:8000/old/index.html` - Ancien site

## Fonctionnalités à tester

### Navigation
- [ ] Menu responsive (mobile et desktop)
- [ ] Liens vers toutes les pages
- [ ] Lien "Ancien site" dans le footer
- [ ] Bouton "retour en haut" apparaît au scroll

### Page Accueil
- [ ] Présentation avec nom et titre
- [ ] Section compétences (3 cartes)
- [ ] Boutons CTA fonctionnels
- [ ] Animations au scroll

### Page CV
- [ ] Profil affiché
- [ ] Formation listée
- [ ] Compétences avec badges
- [ ] Bouton téléchargement PDF
- [ ] Langues et soft skills

### Page Projets
- [ ] Projets phares avec images
- [ ] Technologies affichées
- [ ] Liens GitHub/démo
- [ ] Autres projets en grille

### Page Veille
- [ ] 8 articles sur les NPU
- [ ] Images pour chaque article
- [ ] Modal s'ouvre au clic
- [ ] Fermeture du modal
- [ ] Tags affichés

### Page Parcours
- [ ] Timeline verticale
- [ ] Icônes par type (éducation, projet, etc.)
- [ ] Barres de progression des compétences
- [ ] Objectifs futurs

### Page Actualités
- [ ] Boutons de filtre
- [ ] Chargement des actualités (mock si pas de clé API)
- [ ] Images avec fallback
- [ ] Formatage des dates
- [ ] Liens externes vers articles

### Sécurité
- [ ] Headers CSP présents (vérifier dans DevTools)
- [ ] XSS Protection activée
- [ ] X-Frame-Options: DENY
- [ ] Pas d'erreurs PHP affichées

### Design
- [ ] Responsive sur mobile
- [ ] Animations fluides
- [ ] Glassmorphism visible
- [ ] Gradients de couleur
- [ ] Pas de débordement horizontal

### Footer
- [ ] Liens sociaux (GitHub, LinkedIn, Email)
- [ ] Lien vers ancien site visible et fonctionnel
- [ ] Copyright avec année actuelle
- [ ] Organisation en 3 colonnes (desktop)

## Problèmes potentiels

### Si le site ne charge pas
1. Vérifiez que mod_rewrite est activé (Apache)
2. Vérifiez les permissions des fichiers .htaccess
3. Consultez les logs d'erreur PHP

### Si les images ne chargent pas
1. Vérifiez que le dossier `assets/` est accessible
2. Vérifiez les URLs dans le code source

### Si le téléchargement CV ne fonctionne pas
1. Vérifiez que `assets/cv.pdf` existe
2. Vérifiez les permissions du fichier

### Si les actualités ne chargent pas
1. C'est normal sans clé NewsAPI - le système affiche des données mock
2. Ajoutez votre clé API dans `config/app.php` pour avoir de vraies actualités

## Recommandations avant mise en production

- [ ] Remplacer les projets mock par vos vrais projets
- [ ] Ajouter vos vraies informations de contact
- [ ] Mettre à jour le CV PDF
- [ ] Ajouter votre clé NewsAPI
- [ ] Désactiver display_errors dans `public/index.php`
- [ ] Mettre debug à false dans `config/app.php`
- [ ] Activer HTTPS redirect dans `.htaccess`
- [ ] Tester sur mobile réel
- [ ] Vérifier SEO (meta descriptions, titles)
- [ ] Configurer domaine personnalisé

## Notes

- L'ancien site est accessible mais non modifié dans `old/`
- Le nouveau site est 100% MVC avec séparation claire
- TailwindCSS est chargé via CDN (pas de build nécessaire)
- Pas de base de données requise pour l'instant
- Tout est prêt pour être personnalisé

---

**Statut**: ✅ Tous les fichiers créés et structure complète
**Date**: Novembre 2024
