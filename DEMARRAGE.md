# 🚀 Guide de Démarrage Rapide

## Nouveau Portfolio MVC - Marwane El arrass

Votre portfolio a été entièrement reconstruit avec une architecture MVC moderne, sécurité renforcée et design professionnel.

## ✅ Ce qui a été fait

### 📁 Structure
- **Ancien site déplacé** → Dossier `old/` (tous les TP et MISSION)
- **Nouvelle architecture MVC** créée avec séparation claire des responsabilités
- **Configuration centralisée** dans le dossier `config/`

### 🎨 Pages créées
1. **Accueil** (`/`) - Présentation, compétences, CTA
2. **CV** (`/cv`) - CV complet avec téléchargement PDF
3. **Projets** (`/projects`) - Showcase de vos projets
4. **Veille Technologique** (`/veille`) - 8 articles sur les NPU
5. **Parcours** (`/journey`) - Timeline professionnelle et éducative
6. **Actualités** (`/rss`) - Flux RSS tech avec filtres

### 🔒 Sécurité
- ✓ Content Security Policy (CSP)
- ✓ Protection XSS avec sanitisation
- ✓ CSRF tokens
- ✓ Headers de sécurité (X-Frame-Options, etc.)
- ✓ Validation des entrées

### 🎨 Design
- TailwindCSS pour un design moderne
- Glassmorphism et gradients
- Responsive mobile-first
- Animations fluides
- Dark theme professionnel

## 🚀 Démarrage

### Option 1 : DDEV (Recommandé — environnement Docker)

DDEV offre un environnement de développement identique à la production, sans configurer Apache/PHP manuellement.

#### 1. Prérequis

| Outil | Lien | Note |
|-------|------|------|
| Docker Desktop (Windows/macOS) ou Docker + Docker Compose (Linux) | https://www.docker.com/products/docker-desktop | Doit tourner avant `ddev start` |
| DDEV | https://ddev.readthedocs.io/en/stable/users/install/ | Voir commandes ci-dessous |

```bash
# Installation DDEV sur Linux/WSL2 :
curl -fsSL https://ddev.com/install.sh | bash

# Sur macOS avec Homebrew :
brew install ddev/ddev/ddev

# Sur Windows (PowerShell admin) :
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/ddev/ddev/main/scripts/install_ddev_wsl2_docker_inside.ps1'))
```

#### 2. Initialiser le projet

Depuis la racine du projet :

```bash
# Configurer DDEV pour ce projet PHP
ddev config \
  --project-type=php \
  --php-version=8.2 \
  --docroot=public \
  --project-name=portfolio

# Lancer l'environnement
ddev start
```

#### 3. Démarrer et ouvrir le site

```bash
ddev start          # Démarre les conteneurs
ddev launch         # Ouvre le navigateur automatiquement
ddev describe       # Affiche les URLs et les services disponibles
```

> URL par défaut : **https://portfolio.ddev.site**

#### 4. Commandes DDEV utiles

```bash
ddev stop           # Arrête les conteneurs
ddev restart        # Redémarre (utile après modification de config)
ddev ssh            # Accès shell dans le conteneur PHP
ddev exec php -v    # Exécuter une commande PHP dans le conteneur
ddev logs           # Voir les logs du serveur web
ddev poweroff       # Arrête tous les projets DDEV
```

#### 5. Configuration DDEV avancée (`.ddev/config.yaml`)

Après `ddev config`, un fichier `.ddev/config.yaml` est créé. Vous pouvez l'éditer pour personnaliser :

```yaml
name: portfolio
type: php
docroot: public
php_version: "8.2"
webserver_type: apache-fpm   # ou nginx-fpm
router_http_port: "80"
router_https_port: "443"
hooks:
  post-start:
    - exec: "echo 'Projet portfolio démarré !'"
```

#### 6. Variables d'environnement avec DDEV

Créez un fichier `.ddev/.env` pour les secrets (non versionné) :

```env
NEWS_API_KEY=votre_cle_newsapi
APP_ENV=development
```

Accédez-y dans PHP via `getenv('NEWS_API_KEY')` ou `$_ENV['NEWS_API_KEY']`.

Ou injectez-les directement via `.ddev/config.yaml` :

```yaml
web_environment:
  - NEWS_API_KEY=votre_cle_newsapi
```

---

### Option 2 : PHP Built-in Server (simple, sans Docker)

```bash
cd public
php -S localhost:8000
```

Puis ouvrez : `http://localhost:8000`

### Option 3 : XAMPP/WAMP/MAMP

1. Copiez le dossier `portfolio` dans `htdocs/`
2. Accédez à l'adresse du projet (par exemple `http://localhost/portfolio`)

### Option 4 : Apache/Nginx natif

Le fichier `.htaccess` est déjà configuré pour rediriger vers `public/`

## 📝 Configuration

### 1. Informations personnelles
Ouvrez `config/app.php` et vérifiez:
- `app_name`
- Informations dans `owner` (nom, email, liens sociaux)

### 2. NewsAPI (optionnel pour le flux RSS)
1. Créez un compte gratuit sur [newsapi.org](https://newsapi.org)
2. Dans `config/app.php`, remplacez `YOUR_API_KEY_HERE`

### 3. CV PDF
Votre CV PDF est attendu dans `assets/cv.pdf`
- Si vous voulez le changer, remplacez ce fichier
- Le téléchargement se fait via `/cv/download`

## 🌐 Navigation

- **Accueil**: `/`
- **CV**: `/cv`
- **Projets**: `/projects`
- **Veille NPU**: `/veille`
- **Parcours**: `/journey`
- **Actualités**: `/rss`
- **Ancien site**: `/old/index.html` (lien dans le footer)

## 📱 URLs Propres

Le système de routing MVC permet des URLs propres:
- ✓ `/cv` au lieu de `/cv.php`
- ✓ `/projects` au lieu de `/projects.php`
- ✓ SEO-friendly et facile à partager

## 🎯 Prochaines étapes

### Personnalisation
1. **Projets**: Modifiez la méthode `getProjects()` dans `app/controllers/ProjectsController.php`
2. **Timeline**: Ajustez votre parcours dans `app/controllers/JourneyController.php`
3. **Veille**: Complétez ou modifiez les articles NPU dans `VeilleController.php`

### Contenu à ajouter
- [ ] Votre photo de profil dans `assets/`
- [ ] Vos projets GitHub réels avec liens
- [ ] Certificats ou attestations en PDF
- [ ] Captures d'écran de vos projets

### Production
Quand prêt pour la production:
1. Dans `public/index.php`: Désactiver `display_errors`
2. Dans `config/app.php`: Mettre `debug` à `false`
3. Dans `public/.htaccess`: Activer la redirection HTTPS (ligne 5-7)
4. Configurer votre domaine

## 🔧 Dépannage

### "Page not found" ou 404
→ Vérifiez que mod_rewrite est activé sur Apache
→ Vérifiez les permissions des fichiers .htaccess

### Pas d'actualités dans /rss
→ Ajoutez votre clé NewsAPI dans `config/app.php`
→ Le système affiche des données mock par défaut

### Erreur PHP
→ Vérifiez que vous avez PHP 7.4+ minimum
→ Consultez les logs dans le dossier de votre serveur

## 📞 Support

- **Email**: elarrassmarwane@gmail.com
- **GitHub**: [@Sartome](https://github.com/Sartome)
- **LinkedIn**: [Marwane El arrass](https://www.linkedin.com/in/marwane-el-arrass/)

## 📚 Documentation complète

Consultez `README.md` pour la documentation technique complète.

---

**Fait avec ❤️ en PHP MVC moderne**
*Novembre 2024*
