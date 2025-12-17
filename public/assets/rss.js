document.addEventListener('DOMContentLoaded', () => {

    const feedContainer = document.getElementById('rss-feed-container');
    const sortControls = document.querySelectorAll('input[name="sort"]');

    // Quitter si les éléments ne sont pas sur la page
    if (!feedContainer || !sortControls.length) {
        return;
    }
    
    // Utiliser les utilitaires chargés depuis security.js
    const Utils = window.SecurityUtils;
    if (!Utils) {
        console.error('SecurityUtils non chargé ! Le script rss.js ne peut pas s\'exécuter.');
        feedContainer.innerHTML = '<p class="text-red-400 col-span-full text-center">Erreur critique : Fichier de sécurité manquant.</p>';
        return;
    }

    // Gestion des articles favoris
    let favorites = JSON.parse(localStorage.getItem('rss_favorites') || '[]');
    let showFavorites = false;
    let isProcessing = false; // Éviter les clics rapides

    /**
     * Basculer l'affichage favoris/normal
     */
    function toggleFavorites() {
        if (isProcessing) return; // Éviter les clics multiples
        
        isProcessing = true;
        const btn = document.getElementById('favorites-toggle');
        
        // Afficher l'état de chargement
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Chargement...';
        btn.disabled = true;
        
        setTimeout(() => {
            showFavorites = !showFavorites;
            if (showFavorites) {
                displayFavorites();
                btn.innerHTML = '📰 Tous les articles';
                btn.classList.add('bg-blue-600');
            } else {
                loadNews();
                btn.innerHTML = '⭐ Favoris';
                btn.classList.remove('bg-blue-600');
            }
            
            btn.disabled = false;
            isProcessing = false;
        }, 300); // Délai pour l'UX
    }

    /**
     * Afficher les articles favoris
     */
    function displayFavorites() {
        // Les favorites contiennent maintenant des objets complets
        const safeArticles = favorites.map(Utils.sanitizeNewsArticle).filter(article => article !== null);
        displayNews(safeArticles, true);
        updateFavoritesCount();
    }

    /**
     * Ajouter/retirer un article des favoris
     */
    function toggleFavorite(article) {
        // Créer un objet article complet à stocker
        const articleToStore = {
            url: article.url,
            title: article.title,
            description: article.description,
            image: article.image,
            publishedAt: article.publishedAt,
            source: article.source,
            savedAt: new Date().toISOString()
        };
        
        const index = favorites.findIndex(fav => fav.url === article.url);
        if (index > -1) {
            favorites.splice(index, 1);
            showNotification('Article retiré des favoris', 'remove');
        } else {
            favorites.push(articleToStore);
            showNotification('Article ajouté aux favoris', 'add');
        }
        localStorage.setItem('rss_favorites', JSON.stringify(favorites));
        updateFavoritesCount();
        
        // Mettre à jour l'affichage si on est en mode favoris
        if (showFavorites) {
            displayFavorites();
        }
    }

    /**
     * Mettre à jour le compteur de favoris
     */
    function updateFavoritesCount() {
        const count = favorites.length;
        const notification = document.getElementById('favorites-notification');
        if (count > 0) {
            notification.textContent = count;
            notification.style.display = 'flex';
        } else {
            notification.style.display = 'none';
        }
    }

    /**
     * Afficher une notification
     */
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 animate-slide-in ${
            type === 'add' ? 'bg-green-600' : type === 'remove' ? 'bg-red-600' : 'bg-blue-600'
        } text-white`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    /**
     * Récupère le chemin de base défini dans header.php
     */
    function getBasePath() {
        // window.BASE_PATH est défini dans header.php (ex: "/portfolio")
        return window.BASE_PATH || '';
    }

    /**
     * Formate une date ISO en chaîne lisible
     */
    function formatDate(dateString) {
        if (!dateString) return 'Date inconnue';
        try {
            return new Date(dateString).toLocaleString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
                hour: '2-digit', minute: '2-digit'
            });
        } catch (e) { 
            console.warn('Date invalide:', dateString);
            return 'Date invalide'; 
        }
    }

    /**
     * Génère une icône dynamique basée sur le titre de l'article
     */
    function generateDynamicIcon(title) {
        if (!title) return '📰';
        
        // Nettoyer le titre des balises HTML
        const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
        
        // Couleurs basées sur le hash du titre pour cohérence
        const colors = [
            '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
            '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#84CC16'
        ];
        
        const hash = cleanTitle.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const colorIndex = hash % colors.length;
        const bgColor = colors[colorIndex];
        
        // Extraire les premières lettres
        const words = cleanTitle.split(' ').filter(word => word.length > 0);
        let initials = '';
        if (words.length >= 2) {
            initials = words[0][0] + words[1][0];
        } else if (words.length === 1 && words[0].length >= 2) {
            initials = words[0][0] + words[0][1];
        } else {
            initials = words[0] ? words[0][0] : '📰';
        }
        
        // Générer le SVG
        return `data:image/svg+xml;base64,${btoa(`
            <svg width="400" height="250" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="250" fill="${bgColor}"/>
                <text x="200" y="125" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
                      text-anchor="middle" dominant-baseline="middle" fill="white">
                    ${initials.toUpperCase()}
                </text>
            </svg>
        `)}`;
    }

    /**
     * Charge et affiche les actualités
     */
    function loadNews() {
        
        // 1. UTILISER LE RATE LIMITER de security.js
        if (!Utils.RateLimiter.canMakeRequest()) {
            // Optionnel : afficher un message à l'utilisateur
            console.warn("Tri trop rapide, requête annulée.");
            return; 
        }

        const sortValue = document.querySelector('input[name="sort"]:checked').value;
        const category = 'technology'; // Vous pouvez le rendre dynamique plus tard
        // Utilise la route MVC avec index.php pour contourner le problème de routing
        const apiUrl = `${getBasePath()}/index.php?url=rss/fetch&category=${category}&sort=${sortValue}&_=${Date.now()}`;
        
        // Afficher le chargement
        if (feedContainer.children.length === 0 || feedContainer.innerText.includes('Chargement')) {
            feedContainer.innerHTML = `<p class="text-gray-400 col-span-full text-center">Chargement des actualités...</p>`;
        }

        // Appeler l'API
        fetch(apiUrl, {
            headers: { 
                'X-Requested-With': 'XMLHttpRequest' // Nécessaire pour RssController::isAjax()
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
            }
            return response.json(); 
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.message || 'Erreur API inconnue');
            }
            
            // 2. UTILISER LE SANITIZER de security.js
            const safeArticles = data
                .map(Utils.sanitizeNewsArticle) // Nettoyer chaque article
                .filter(article => article !== null); // Retirer les articles invalides
                
            displayNews(safeArticles);
        })
        .catch(error => {
            console.error('Erreur lors de la récupération:', error);
            feedContainer.innerHTML = `<p class="text-red-400 col-span-full text-center">Impossible de charger les actualités. ${error.message}</p>`;
        });
    }

    /**
     * Affiche les articles dans le DOM (VERSION SÉCURISÉE)
     * N'utilise pas .innerHTML pour le contenu dynamique pour empêcher le XSS.
     */
    function displayNews(articles, isFavorites = false) {
        feedContainer.innerHTML = ''; // Vider le conteneur

        if (!articles || articles.length === 0) {
            feedContainer.innerHTML = `<p class="text-gray-400 col-span-full text-center">${isFavorites ? 'Aucun article favoris pour le moment.' : 'Aucun article à afficher pour le moment.'}</p>`;
            return;
        }

        // 3. CONSTRUIRE LE DOM SÉCURISÉMENT
        const fragment = document.createDocumentFragment(); // Pour de meilleures performances

        articles.forEach(article => {
            
            // Créer les éléments
            const articleEl = document.createElement('article');
            const link = document.createElement('a');
            const img = document.createElement('img');
            const contentDiv = document.createElement('div');
            const title = document.createElement('h3');
            const titleLink = document.createElement('a');
            const description = document.createElement('p');
            const footerDiv = document.createElement('div');
            const sourceSpan = document.createElement('span');
            const dateSpan = document.createElement('span');
            const favoriteBtn = document.createElement('button');

            // Configurer les attributs et le contenu
            articleEl.className = 'glass rounded-lg overflow-hidden shadow-lg flex flex-col hover-glow animate-slide-up relative';
            
            link.href = article.url; // URL déjà nettoyée par sanitizeNewsArticle
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'block';

            // Utiliser l'icône dynamique si pas d'image ou si l'image est un placeholder
            if (!article.image || article.image.includes('placeholder.com')) {
                img.src = generateDynamicIcon(article.title);
            } else {
                img.src = article.image;
            }
            img.alt = article.title;
            img.className = 'w-full h-48 object-cover';
            img.loading = 'lazy';
            
            link.appendChild(img);

            contentDiv.className = 'p-6 flex flex-col flex-grow';
            
            title.className = 'text-xl font-bold mb-2';
            titleLink.href = article.url;
            titleLink.target = '_blank';
            titleLink.rel = 'noopener noreferrer';
            titleLink.className = 'hover:text-blue-400 transition-colors';
            // Utiliser innerHTML pour permettre le rendu du HTML (gras, etc.)
            titleLink.innerHTML = article.title; 
            title.appendChild(titleLink);

            description.className = 'text-gray-400 text-sm mb-4 flex-grow';
            const shortDesc = article.description.substring(0, 100) + (article.description.length > 100 ? '...' : '');
            description.innerHTML = shortDesc; // Permettre le HTML pour les descriptions
            
            footerDiv.className = 'text-xs text-gray-500 mt-auto flex justify-between items-center';
            sourceSpan.className = 'font-semibold';
            sourceSpan.textContent = article.source; // <- SÉCURISÉ
            
            dateSpan.className = 'block';
            dateSpan.textContent = formatDate(article.publishedAt);

            // Bouton favoris
            const isFavorited = favorites.some(fav => fav.url === article.url);
            favoriteBtn.className = `p-2 rounded-lg transition-colors ${
                isFavorited ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-600 hover:bg-gray-700'
            }`;
            favoriteBtn.innerHTML = isFavorited ? '⭐' : '☆';
            favoriteBtn.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(article); // Passer l'objet article complet
            };
            favoriteBtn.title = isFavorited ? 'Retirer des favoris' : 'Ajouter aux favoris';

            // Assembler les éléments
            footerDiv.appendChild(sourceSpan);
            footerDiv.appendChild(dateSpan);
            footerDiv.appendChild(favoriteBtn);
            
            contentDiv.appendChild(title);
            contentDiv.appendChild(description);
            contentDiv.appendChild(footerDiv);
            
            articleEl.appendChild(link);
            articleEl.appendChild(contentDiv);
            
            fragment.appendChild(articleEl); // Ajouter à un fragment
        });

        feedContainer.appendChild(fragment); // Ajouter le fragment au DOM (1 seule opération)
    }

    // --- ÉCOUTEURS D'ÉVÉNEMENTS ---
    // Charger les news au démarrage
    loadNews();

    // Recharger si on change le tri
    sortControls.forEach(radio => {
        radio.addEventListener('change', loadNews);
    });

    // Bouton pour basculer favoris/normal
    const favoritesToggle = document.getElementById('favorites-toggle');
    if (favoritesToggle) {
        favoritesToggle.addEventListener('click', toggleFavorites);
    }

    // Initialiser le compteur de favoris
    updateFavoritesCount();
});