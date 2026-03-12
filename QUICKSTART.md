# Quick Start Guide

## Démarrage en 3 minutes

### Option A — Avec DDEV (recommandé)

```bash
# 1. Démarrer l'environnement Docker
ddev start

# 2. Installer les dépendances npm et compiler le SPA React
npm install
npm run build

# 3. Ouvrir dans le navigateur
ddev launch
```

### Option B — Sans DDEV (PHP built-in)

```bash
# Compiler d'abord le frontend
npm install
npm run build

# Lancer le serveur PHP depuis le dossier public/
cd public
php -S localhost:8000
```

Puis ouvrir : `http://localhost:8000`

---

## Développement Frontend (Vite HMR)

Pour travailler sur les composants React avec rechargement automatique :

```bash
npm run dev          # démarre le serveur Vite sur http://localhost:5173
```

Le helper `Core::reactScriptTag()` dans `header.php` bascule automatiquement entre le serveur Vite (dev) et le bundle compilé (prod).

Quand les modifications sont prêtes :

```bash
npm run build        # compile dans public/assets/react/
```

---

## Configurer le Flux RSS

Le flux Google Alerts est actif par défaut dans `app/controllers/RssController.php`.

**Changer de flux :**
- Modifier l'URL dans `RssController.php` (~ligne 40)
- Les formats Atom et RSS sont tous les deux supportés automatiquement

**Activer NewsAPI à la place :**
1. Créer un compte sur [newsapi.org](https://newsapi.org) et copier la clé
2. Ouvrir `config/app.php` et renseigner :
   ```php
   'newsapi_key' => 'votre-cle-ici',
   ```
3. Dans `RssController.php`, commenter le bloc RSS et décommenter le bloc NewsAPI

---

## Ajouter / Modifier du Contenu

| Ce que vous voulez changer | Où modifier |
|---|---|
| Données projets | `app/controllers/ProjectsController.php` → méthode `apiList()` |
| Timeline parcours | `app/controllers/JourneyController.php` → méthode `apiTimeline()` |
| Articles veille | `app/controllers/VeilleController.php` → méthode `apiList()` |
| Infos CV | `frontend/src/pages/CV.jsx` |
| Présentation accueil | `frontend/src/pages/Home.jsx` |
| Navigation | `frontend/src/components/NavBar.jsx` |
| Couleurs Tailwind | `tailwind.config.js` + `assets/style.css` |

---

## Résolution de Problèmes Courants

### La page affiche du HTML brut sans style
- Le build frontend n'a pas été généré → lancer `npm run build`
- Vérifier que `public/assets/react/assets/index.js` existe

### Les actualités RSS ne chargent pas
- Ouvrir la DevTools (F12) → onglet Réseau → chercher `/api/rss/fetch`
- Vérifier les logs DDEV : `ddev logs`
- Tester l'URL du flux directement dans le navigateur
- Si le flux renvoie du XML mais que l'API renvoie une erreur JSON : vérifier `RssController.php`

### React ne se monte pas
- JavaScript désactivé → activer JS dans le navigateur
- Vérifier la console navigateur pour les erreurs de chargement du bundle
- Rebuilder : `npm run build`

### Erreur 404 sur toutes les routes
- Le `mod_rewrite` Apache doit être activé
- Vérifier que `.htaccess` est bien présent dans `public/`
- Avec DDEV : `ddev restart`

### La clé API NewsAPI expire / quota dépassé
- Compte gratuit : 100 requêtes/jour
- Passer en flux RSS : commenter le bloc NewsAPI dans `RssController.php`

---

## Structure des API

```
GET /api/projects             → liste JSON des projets
GET /api/projects?page=1&per=6 → liste paginée
GET /api/rss/fetch            → articles RSS/Atom
GET /api/journey              → étapes de la timeline
GET /api/veille               → articles de veille
```

---

## Déploiement Rapide

### Hébergement mutualisé (Apache)
```bash
# 1. Builder localement
npm run build

# 2. Uploader TOUT le dossier (sauf node_modules et frontend/node_modules)
# 3. Pointer le DocumentRoot sur public/
# 4. Vérifier que mod_rewrite est activé
```

**Avant de mettre en production :**
```php
// config/app.php
'debug' => false,
'app_url' => 'https://votre-domaine.com',
```

### GitHub Pages / Netlify
Non recommandé directement (nécessite PHP). Préférer un VPS ou hébergement mutualisé avec PHP 8+.

---

## Commandes Utiles

```bash
# Démarrer / arrêter DDEV
ddev start
ddev stop

# Voir les logs serveur
ddev logs

# Lancer un shell dans le container
ddev ssh

# Rebuilder uniquement le frontend
npm run build

# Nettoyer le build
Remove-Item -Recurse -Force public/assets/react   # PowerShell
rm -rf public/assets/react                         # bash
```

---

**Prochaine étape :** consulter le [README.md](README.md) pour la documentation complète.
