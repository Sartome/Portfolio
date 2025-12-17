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
        // Utilise la route MVC native "/rss/fetch" avec le BASE_PATH (ex: /portfolio/rss/fetch)
        const apiUrl = `${getBasePath()}/rss/fetch?category=${category}&sort=${sortValue}&_=${Date.now()}`;
        
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
    function displayNews(articles) {
        feedContainer.innerHTML = ''; // Vider le conteneur

        if (!articles || articles.length === 0) {
            feedContainer.innerHTML = `<p class="text-gray-400 col-span-full text-center">Aucun article à afficher pour le moment.</p>`;
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

            // Configurer les attributs et le contenu
            articleEl.className = 'glass rounded-lg overflow-hidden shadow-lg flex flex-col hover-glow animate-slide-up';
            
            link.href = article.url; // URL déjà nettoyée par sanitizeNewsArticle
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'block';

            img.src = article.image; // Image déjà nettoyée
            img.alt = ''; // L'alt devrait être le titre, mais vide c'est ok
            img.className = 'w-full h-48 object-cover';
            img.loading = 'lazy';
            
            link.appendChild(img);

            contentDiv.className = 'p-6 flex flex-col flex-grow';
            
            title.className = 'text-xl font-bold mb-2';
            titleLink.href = article.url;
            titleLink.target = '_blank';
            titleLink.rel = 'noopener noreferrer';
            titleLink.className = 'hover:text-blue-400 transition-colors';
            // Utiliser .textContent est la clé de la sécurité XSS
            titleLink.textContent = article.title; 
            title.appendChild(titleLink);

            description.className = 'text-gray-400 text-sm mb-4 flex-grow';
            const shortDesc = article.description.substring(0, 100) + (article.description.length > 100 ? '...' : '');
            description.textContent = shortDesc; // <- SÉCURISÉ
            
            footerDiv.className = 'text-xs text-gray-500 mt-auto';
            sourceSpan.className = 'font-semibold';
            sourceSpan.textContent = article.source; // <- SÉCURISÉ
            
            dateSpan.className = 'block';
            dateSpan.textContent = formatDate(article.publishedAt);

            // Assembler les éléments
            footerDiv.appendChild(sourceSpan);
            footerDiv.appendChild(dateSpan);
            
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
});