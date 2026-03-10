# 🚀 Quick Start Guide

## Démarrage Rapide (3 minutes)

### 1️⃣ Ouvrir le Portfolio
```bash
# Option 1: Python
python -m http.server 8000

# Option 2: PHP  
php -S localhost:8000

# Option 3: Node.js
npx http-server
```

Puis ouvrir: `http://localhost:8000`

### 2️⃣ Configurer les Actualités (Optionnel)

**Option A: Flux RSS (recommandé)**
1. **Utiliser Google Alerts** (déjà configuré)
   - Le flux est déjà configuré dans `app/controllers/RssController.php`
   - URL: `https://www.google.fr/alerts/feeds/06235267178635802820/7750195999628698780`
   - Supporte les flux Atom et RSS automatiquement

2. **Changer le flux RSS**
   - Modifier l'URL dans `app/controllers/RssController.php` ligne 40
   - Exemple: `$this->fetchFromRSS("https://votre-flux-rss.com/feed")`

**Option B: NewsAPI**
1. **Obtenir une clé API**
   - Aller sur [newsapi.org](https://newsapi.org)
   - Créer un compte gratuit
   - Copier votre clé API

2. **Configurer la clé**
   - Ouvrir `config/app.php`
   - Remplacer `YOUR_API_KEY_HERE` dans `newsapi_key`
   ```php
   'newsapi_key' => 'votre-cle-ici',
   ```

3. **Activer NewsAPI**
   - Dans `app/controllers/RssController.php`, commenter la ligne RSS et décommenter le bloc NewsAPI

### 3️⃣ Fonctionnalités Activées

✅ **Automatiquement disponibles:**
- Theme clair/sombre (bouton en haut à droite ☀️/🌙)
- Scroll progressif (barre en haut)
- Retour en haut (bouton en bas à droite ↑)
- Animations et transitions
- Mode PWA (installable)
- Sécurité renforcée
- Lazy loading
- Notifications

## 🎨 Personnalisation Rapide

### Changer les Couleurs
`assets/style.css` - lignes 1-18:
```css
:root {
    --accent-primary: #16AAD9;    /* Votre couleur principale */
    --accent-secondary: #1E7AEE;  /* Votre couleur secondaire */
}
```

### Ajouter un Projet
`index.html` - dans la section appropriée:
```html
<a href="VOTRE_PROJET/index.html" class="bouton">Mon Projet</a>
```

### Modifier le Nom
`index.html` - ligne 56:
```html
<h1 data-splitting>Votre Nom</h1>
```

## 🔧 Résolution Problèmes Courants

### Les actualités ne chargent pas
- ✅ Vérifier la clé API dans `config/app.php` (si NewsAPI utilisée)
- ✅ Ouvrir la console (F12) pour voir les erreurs
- ✅ Vérifier la connexion internet
- ✅ **Débogage RSS**: Tester le flux directement dans `app/controllers/RssController.php`
- ✅ **Flux Google Alerts**: Le parser supporte maintenant les flux Atom et RSS
- ✅ **Erreur JSON**: Si "Unexpected token '<'", vérifier que le flux retourne bien du XML

### Le thème ne change pas
- ✅ Rafraîchir la page (Ctrl+F5)
- ✅ Vérifier que `modern-features.js` est chargé
- ✅ Effacer le cache du navigateur

### Les animations ne fonctionnent pas
- ✅ Vérifier que `modern-features.css` est inclus
- ✅ Désactiver "prefers-reduced-motion" si actif
- ✅ Tester dans un autre navigateur

## 📱 Installation PWA

### Chrome/Edge
1. Cliquer sur l'icône ⊕ dans la barre d'adresse
2. Cliquer "Installer"

### Firefox
1. Menu > "Installer ce site comme application"

### Safari (iOS)
1. Bouton Partager
2. "Sur l'écran d'accueil"

## 🛡️ Sécurité

### Déjà Protégé Contre:
- ✅ XSS (Cross-Site Scripting)
- ✅ Clickjacking
- ✅ CSRF (Cross-Site Request Forgery)
- ✅ Injection de code
- ✅ URLs malveillantes
- ✅ Rate limiting sur API

### À Faire pour Production:
- [ ] Configurer HTTPS (Let's Encrypt)
- [ ] Ajouter un vrai token CSRF backend
- [ ] Configurer les headers de sécurité serveur
- [ ] Mettre la clé API dans une variable d'environnement

## 🚀 Déploiement Rapide

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin votre-repo-url
git push -u origin main
```
Puis activer GitHub Pages dans Settings

### Netlify (le plus simple)
1. Drag & drop le dossier sur [netlify.com/drop](https://app.netlify.com/drop)
2. C'est tout! 🎉

## 📞 Support

**Problème non résolu?**
- 📧 Email: elarrassmarwane@gmail.com
- 🐛 GitHub Issues: [github.com/Sartome/portfolio/issues](https://github.com/Sartome/portfolio/issues)

*Note : le chemin `/portfolio` était utilisé en local (XAMPP). Avec DDEV ou d'autres hôtes, l'application détecte maintenant automatiquement le base path.*
- 💬 LinkedIn: [Marwane El arrass](https://www.linkedin.com/in/marwane-el-arrass-1b545b323/)

## ⚡ Commandes Utiles

```bash
# Voir les fichiers
ls -la

# Chercher du texte
grep -r "texte" .

# Voir la taille du projet
du -sh .

# Nettoyer le cache git
git clean -fd
```

---

**🎯 Prochain Objectif:** Lire le [README.md](README.md) complet pour découvrir toutes les fonctionnalités!
