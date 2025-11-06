// ============================================
// ACTUALITY PAGE JAVASCRIPT - Separated for cleaner code
// ============================================

let currentFilter = 'all';
let allArticles = [];
let lastUpdateTime = null;

// NewsAPI configuration - Replace with your actual API key
const NEWS_API_KEY = '23ee33423d094283b0fcdc22b67b5e3c'; // Get one free at https://newsapi.org
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

// Trusted tech news sources
const TRUSTED_SOURCES = [
    'techcrunch.com',
    'theverge.com',
    'arstechnica.com',
    'wired.com',
    'engadget.com',
    'tomshardware.com',
    'anandtech.com',
    'pcgamer.com',
    'ign.com',
    'gamespot.com',
    'cnet.com',
    'zdnet.com',
    'venturebeat.com'
];

// Category-specific search queries
const SEARCH_QUERIES = {
    all: '(GPU OR CPU OR "graphics card" OR nvidia OR AMD OR intel OR "PC gaming" OR software OR "artificial intelligence") AND (technology OR hardware OR gaming)',
    hardware: '(GPU OR CPU OR "graphics card" OR processor OR motherboard OR RAM OR SSD OR nvidia OR AMD OR intel OR "PC hardware")',
    software: '(Windows OR Linux OR macOS OR software OR "operating system" OR programming OR "app development" OR microsoft)',
    gaming: '(gaming OR "video games" OR PlayStation OR Xbox OR Nintendo OR "PC gaming" OR Steam OR esports OR "game release")',
    ai: '("artificial intelligence" OR "machine learning" OR AI OR "neural networks" OR ChatGPT OR "AI technology")'
};

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
}

function updateLastUpdateTime() {
    const lastUpdatedEl = document.getElementById('lastUpdated');
    if (lastUpdateTime) {
        lastUpdatedEl.textContent = `Dernière mise à jour : ${formatDate(lastUpdateTime)}`;
    }
}

function getCategoryFromContent(title, description, source) {
    const content = (title + ' ' + description).toLowerCase();
    const sourceLower = source.toLowerCase();
    
    // Check source first
    if (sourceLower.includes('pcgamer') || sourceLower.includes('ign') || sourceLower.includes('gamespot')) {
        return 'gaming';
    }
    
    // Check content
    if (content.match(/\b(ai|artificial intelligence|machine learning|chatgpt|neural network|deep learning)\b/i)) {
        return 'ai';
    } else if (content.match(/\b(gpu|graphics card|nvidia|amd radeon|rtx|geforce|cpu|processor|ryzen|core i[0-9]|motherboard|ram|ddr[0-9]|ssd|nvme|hardware component)\b/i)) {
        return 'hardware';
    } else if (content.match(/\b(windows|linux|macos|software|application|program|operating system|update|patch|microsoft|app)\b/i)) {
        return 'software';
    } else if (content.match(/\b(game|gaming|playstation|xbox|nintendo|steam|esport|gamer|video game)\b/i)) {
        return 'gaming';
    }
    return 'hardware';
}

function getPlaceholderImage(category) {
    const images = {
        hardware: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop',
        software: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        gaming: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop',
        ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop'
    };
    return images[category] || images.hardware;
}

async function fetchNews(category = 'all') {
    if (!NEWS_API_KEY || NEWS_API_KEY.includes('YOUR_API_KEY_HERE')) {
        throw new Error('Clé API requise. Veuillez configurer NEWS_API_KEY dans assets/actuality.js.');
    }
    // Check rate limiting
    if (window.SecurityUtils && !window.SecurityUtils.RateLimiter.canMakeRequest()) {
        const waitTime = window.SecurityUtils.RateLimiter.getRemainingTime();
        throw new Error(`Limite de requêtes atteinte. Veuillez attendre ${waitTime} secondes.`);
    }

    const query = SEARCH_QUERIES[category] || SEARCH_QUERIES.all;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - 3); // Last 3 days for fresher content
    
    const domains = TRUSTED_SOURCES.join(',');
    const url = `${NEWS_API_URL}?q=${encodeURIComponent(query)}&domains=${domains}&language=en&sortBy=publishedAt&pageSize=30&from=${fromDate.toISOString()}&apiKey=${NEWS_API_KEY}`;
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            if (response.status === 429) {
                throw new Error('Trop de requêtes. Veuillez réessayer dans quelques instants.');
            } else if (response.status === 401) {
                throw new Error('Clé API invalide. Veuillez vérifier votre configuration.');
            }
            throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'ok' && data.articles) {
            // Process and sanitize articles using security functions
            allArticles = data.articles
                .filter(article => {
                    return article.title && 
                           article.description && 
                           article.title !== '[Removed]' &&
                           !article.title.toLowerCase().includes('removed');
                })
                .map(article => {
                    const rawArticle = {
                        title: article.title,
                        summary: article.description || article.content?.substring(0, 200) + '...',
                        image: article.urlToImage || getPlaceholderImage(getCategoryFromContent(article.title, article.description, article.source.name)),
                        category: getCategoryFromContent(article.title, article.description, article.source.name),
                        date: article.publishedAt,
                        link: article.url,
                        source: article.source.name
                    };
                    
                    // Sanitize using security functions if available
                    if (window.SecurityUtils) {
                        return window.SecurityUtils.sanitizeNewsArticle(rawArticle);
                    }
                    return rawArticle;
                })
                .filter(article => article !== null)
                .slice(0, 18); // Limit to 18 articles
            
            lastUpdateTime = new Date();
            updateLastUpdateTime();
            return allArticles;
        } else {
            throw new Error('Aucun article trouvé');
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des actualités:', error);
        throw error;
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    
    // Sanitize container
    if (window.SecurityUtils) {
        window.SecurityUtils.sanitizeDynamicContent(newsContainer);
    }
    
    newsContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
        newsContainer.innerHTML = '<div class="loading">Aucun article trouvé pour cette catégorie.</div>';
        return;
    }

    articles.forEach(item => {
        const article = document.createElement("div");
        article.classList.add("news-article");
        article.setAttribute('data-category', item.category);

        // Safely create article HTML
        const safeTitle = window.SecurityUtils ? 
            window.SecurityUtils.encodeHTMLEntities(item.title) : item.title;
        const safeSummary = window.SecurityUtils ? 
            window.SecurityUtils.encodeHTMLEntities(item.summary) : item.summary;
        const safeSource = window.SecurityUtils ? 
            window.SecurityUtils.encodeHTMLEntities(item.source) : item.source;
        const safeLink = window.SecurityUtils ? 
            window.SecurityUtils.sanitizeURL(item.link) : item.link;
        const safeImage = window.SecurityUtils ? 
            window.SecurityUtils.sanitizeImageURL(item.image) : item.image;

        article.innerHTML = `
            <img src="${safeImage}" alt="${safeTitle}" loading="lazy" onerror="this.src='${getPlaceholderImage(item.category)}'">
            <div class="article-meta">
                <span class="category-tag">${getCategoryName(item.category)}</span>
                <span class="date">${formatDate(item.date)}</span>
            </div>
            <div class="source-tag">📰 ${safeSource}</div>
            <h3>${safeTitle}</h3>
            <p>${safeSummary}</p>
            <a href="${safeLink}" class="read-more-btn" target="_blank" rel="noopener noreferrer">Lire l'article complet →</a>
        `;

        newsContainer.appendChild(article);
    });
}

function getCategoryName(category) {
    const categoryNames = {
        'hardware': 'Hardware',
        'software': 'Software',
        'gaming': 'Gaming',
        'ai': 'IA & Tech'
    };
    return categoryNames[category] || 'Tech';
}

function filterNews(category) {
    currentFilter = category;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // Filter articles
    let filteredArticles;
    if (category === 'all') {
        filteredArticles = allArticles;
    } else {
        filteredArticles = allArticles.filter(article => article.category === category);
    }

    displayNews(filteredArticles);
}

async function refreshNews() {
    const refreshBtn = document.getElementById('refreshBtn');
    const newsContainer = document.getElementById('news-container');
    
    // Disable button and add spinning animation
    refreshBtn.disabled = true;
    refreshBtn.classList.add('spinning');
    
    newsContainer.innerHTML = '<div class="loading">🔄 Chargement des nouvelles actualités...</div>';

    try {
        await fetchNews(currentFilter);
        filterNews(currentFilter);
    } catch (error) {
        newsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Erreur de chargement</h3>
                <p>${error.message}</p>
                ${error.message.includes('API') ? 
                    '<p style="font-size: 0.9rem; margin-top: 10px;">💡 Obtenez une clé API gratuite sur <a href="https://newsapi.org" target="_blank" style="color: #60a5fa;">newsapi.org</a></p>' : 
                    ''}
            </div>
        `;
    } finally {
        // Re-enable button after delay
        setTimeout(() => {
            refreshBtn.disabled = false;
            refreshBtn.classList.remove('spinning');
        }, 1000);
    }
}

// Initialize the page
async function initializePage() {
    const newsContainer = document.getElementById('news-container');
    
    try {
        await fetchNews('all');
        displayNews(allArticles);

        // Add event listeners to filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const category = e.target.getAttribute('data-category');
                filterNews(category);
            });
        });

        // Add event listener to refresh button
        document.getElementById('refreshBtn').addEventListener('click', refreshNews);

    } catch (error) {
        newsContainer.innerHTML = `
            <div class="error-message">
                <h3>⚠️ Configuration requise</h3>
                <p>Pour utiliser cette fonctionnalité, vous devez configurer une clé API NewsAPI.</p>
                <ol style="text-align: left; margin: 15px auto; max-width: 500px;">
                    <li>Créez un compte gratuit sur <a href="https://newsapi.org" target="_blank" style="color: #60a5fa;">newsapi.org</a></li>
                    <li>Copiez votre clé API</li>
                    <li>Remplacez <code style="background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 3px;">YOUR_API_KEY_HERE</code> dans le fichier actuality.js</li>
                </ol>
                <button onclick="initializePage()" style="margin-top: 15px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 20px; cursor: pointer;">Réessayer</button>
            </div>
        `;
    }
}

// Call initialization on page load
window.addEventListener('load', initializePage);

// Auto-refresh every 15 minutes
setInterval(() => {
    console.log('🔄 Actualisation automatique des actualités...');
    refreshNews();
}, 900000); // 15 minutes
