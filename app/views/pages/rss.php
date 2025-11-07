<?php require_once '../app/views/layouts/header.php'; ?>

<!-- RSS Header -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4 gradient-text">Actualités Tech</h1>
        <p class="text-xl text-gray-400 mb-8">Les dernières nouvelles du monde de la technologie</p>
    </div>
</section>

<!-- Filters -->
<section class="container mx-auto px-4 py-6">
    <div class="max-w-6xl mx-auto">
        <div class="flex flex-wrap gap-3 justify-center">
            <button onclick="filterNews('all')" class="filter-btn active px-6 py-2 rounded-lg font-semibold transition-all" data-category="all">
                Toutes
            </button>
            <button onclick="filterNews('technology')" class="filter-btn px-6 py-2 rounded-lg font-semibold transition-all" data-category="technology">
                Technologie
            </button>
            <button onclick="filterNews('ai')" class="filter-btn px-6 py-2 rounded-lg font-semibold transition-all" data-category="ai">
                Intelligence Artificielle
            </button>
            <button onclick="filterNews('hardware')" class="filter-btn px-6 py-2 rounded-lg font-semibold transition-all" data-category="hardware">
                Hardware
            </button>
            <button onclick="filterNews('software')" class="filter-btn px-6 py-2 rounded-lg font-semibold transition-all" data-category="software">
                Software
            </button>
        </div>
    </div>
</section>

<!-- News Grid -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <!-- Loading State -->
        <div id="loading" class="text-center py-20">
            <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p class="mt-4 text-gray-400">Chargement des actualités...</p>
        </div>
        
        <!-- Error State -->
        <div id="error" class="hidden text-center py-20">
            <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <p class="text-gray-400">Impossible de charger les actualités</p>
        </div>
        
        <!-- News Container -->
        <div id="news-container" class="hidden">
            <div id="news-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- News cards will be inserted here -->
            </div>
            
            <!-- Load More Button -->
            <div class="text-center mt-12">
                <button id="load-more-btn" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                    <span class="flex items-center">
                        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                        Charger plus d'articles
                    </span>
                </button>
            </div>
        </div>
    </div>
</section>

<!-- Article Modal -->
<div id="article-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
    <div class="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl">
        <div class="p-8">
            <div class="flex justify-between items-start mb-6">
                <h2 id="modal-title" class="text-3xl font-bold gradient-text pr-8"></h2>
                <button id="close-modal" class="text-gray-400 hover:text-white transition-colors">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div id="modal-image" class="mb-6 rounded-lg overflow-hidden"></div>
            
            <div class="flex items-center gap-4 mb-6 text-sm text-gray-400">
                <span id="modal-source" class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                    </svg>
                </span>
                <span id="modal-date"></span>
            </div>
            
            <p id="modal-description" class="text-gray-300 text-lg mb-6 leading-relaxed"></p>
            
            <a id="modal-link" href="#" target="_blank" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
                Lire l'article complet
            </a>
        </div>
    </div>
</div>

<style>
.filter-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.filter-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.filter-btn.active {
    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
    border-color: transparent;
}
</style>

<script>
let currentCategory = 'all';
let allNews = [];
let displayedCount = 6;

// Load news on page load
document.addEventListener('DOMContentLoaded', () => {
    loadNews('all');
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            displayedCount = 6;
            loadNews(currentCategory);
        });
    });
    
    // Load more button
    document.getElementById('load-more-btn').addEventListener('click', () => {
        displayedCount += 6;
        displayNews(allNews.slice(0, displayedCount));
        
        if (displayedCount >= allNews.length) {
            document.getElementById('load-more-btn').style.display = 'none';
        }
    });
    
    // Modal close
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('article-modal').addEventListener('click', (e) => {
        if (e.target.id === 'article-modal') closeModal();
    });
});

async function loadNews(category) {
    const loading = document.getElementById('loading');
    const container = document.getElementById('news-container');
    const error = document.getElementById('error');
    
    loading.classList.remove('hidden');
    container.classList.add('hidden');
    error.classList.add('hidden');
    
    try {
        const base = (window.BASE_PATH || '/');
        const response = await fetch(`${base}rss/fetch?category=${category}`, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch news');
        }
        
        const news = await response.json();
        allNews = news;
        displayNews(news.slice(0, displayedCount));
        
        loading.classList.add('hidden');
        container.classList.remove('hidden');
        
        // Show/hide load more button
        document.getElementById('load-more-btn').style.display = 
            displayedCount < allNews.length ? 'block' : 'none';
        
    } catch (err) {
        console.error('Error loading news:', err);
        loading.classList.add('hidden');
        error.classList.remove('hidden');
    }
}

function displayNews(newsArray) {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = newsArray.map(article => `
        <div class="glass rounded-xl overflow-hidden hover-glow transition-all fade-in-section cursor-pointer" onclick='openModal(${JSON.stringify(article).replace(/'/g, "&apos;")})'>
            <div class="h-48 overflow-hidden">
                <img src="${escapeHtml(article.image || 'https://via.placeholder.com/400x250/1e40af/ffffff?text=Tech+News')}" 
                     alt="${escapeHtml(article.title)}" 
                     class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                     onerror="this.src='https://via.placeholder.com/400x250/1e40af/ffffff?text=Tech+News'">
            </div>
            <div class="p-6">
                <div class="flex items-center justify-between mb-3">
                    <span class="text-xs text-blue-400">${escapeHtml(article.source)}</span>
                    <span class="text-xs text-gray-500">${formatDate(article.publishedAt)}</span>
                </div>
                <h3 class="text-xl font-bold mb-2 line-clamp-2">${escapeHtml(article.title)}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-3">${escapeHtml(article.description || '')}</p>
                <button class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-semibold">
                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Voir l'article
                </button>
            </div>
        </div>
    `).join('');
}

function openModal(article) {
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-source').innerHTML += ` ${article.source}`;
    document.getElementById('modal-date').textContent = formatDate(article.publishedAt);
    document.getElementById('modal-description').textContent = article.description || article.content || 'Aucune description disponible.';
    document.getElementById('modal-link').href = article.url;
    
    const modalImage = document.getElementById('modal-image');
    if (article.image) {
        modalImage.innerHTML = `<img src="${escapeHtml(article.image)}" alt="${escapeHtml(article.title)}" class="w-full h-auto" onerror="this.parentElement.style.display='none'">`;
    } else {
        modalImage.style.display = 'none';
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // difference in seconds
    
    if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `Il y a ${minutes} min`;
    } else if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `Il y a ${hours}h`;
    } else if (diff < 604800) {
        const days = Math.floor(diff / 86400);
        return `Il y a ${days}j`;
    } else {
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
</script>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
