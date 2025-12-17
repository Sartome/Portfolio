// ============================================
// SECURITY.JS - Utility Library
// ============================================

/**
 * Encode les entités HTML pour empêcher l'injection XSS.
 * @param {string} text - Le texte brut à encoder.
 * @returns {string} Le texte encodé.
 */
function encodeHTMLEntities(text) {
    if (typeof text !== 'string') return '';
    const el = document.createElement('div');
    el.textContent = text;
    return el.innerHTML;
}

/**
 * Nettoie une URL pour les attributs 'href'.
 * @param {string} url - L'URL à nettoyer.
 * @returns {string} Une URL sûre.
 */
function sanitizeURL(url) {
    if (typeof url !== 'string' || !url) return '#';
    
    const urlLower = url.toLowerCase().trim();
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    
    for (let protocol of dangerousProtocols) {
        if (urlLower.startsWith(protocol)) {
            console.warn('Blocked dangerous URL protocol:', url);
            return '#';
        }
    }
    
    // N'accepter que http, https, ou les liens relatifs
    if (!urlLower.startsWith('http://') && !urlLower.startsWith('https://') && !urlLower.startsWith('/')) {
        // Supposer que c'est un lien externe sans protocole
        return 'https://' + url;
    }
    
    return url;
}

/**
 * Nettoie une URL d'image pour les attributs 'src'.
 * @param {string} url - L'URL de l'image.
 * @returns {string} Une URL d'image sûre ou un placeholder.
 */
function sanitizeImageURL(url) {
    if (typeof url !== 'string' || !url) {
        return 'https://via.placeholder.com/400x250/1e40af/ffffff?text=Image+Indisponible';
    }
    
    const urlLower = url.toLowerCase().trim();
    
    // N'accepter que http, https, ou les data URIs (pour les images en cache par ex.)
    if (urlLower.startsWith('http://') || urlLower.startsWith('https://') || urlLower.startsWith('data:image/')) {
        return url;
    }
    
    console.warn('Blocked invalid image URL:', url);
    return 'https://via.placeholder.com/400x250/1e40af/ffffff?text=Image+Indisponible';
}

/**
 * Nettoie et valide un objet 'article' venant de l'API.
 * @param {object} article - L'objet article brut (de RssController.php).
 * @returns {object|null} Un objet article nettoyé ou null.
 */
function sanitizeNewsArticle(article) {
    if (!article || typeof article !== 'object') {
        return null;
    }
    
    // Le contrôleur PHP a déjà nettoyé les données, 
    // mais nous re-validons côté client par principe de "défense en profondeur".
    return {
        title: article.title || 'Titre indisponible', // Garder le HTML pour le rendu
        description: article.description || 'Description indisponible', // Garder le HTML pour le rendu
        image: sanitizeImageURL(article.image), // Re-valide l'URL de l'image
        publishedAt: article.publishedAt || new Date().toISOString(),
        url: sanitizeURL(article.url), // Re-valide l'URL du lien
        source: article.source || 'Source inconnue'
    };
}

/**
 * Limiteur de taux simple (pour l'UI)
 */
const RateLimiter = {
    calls: [],
    maxCalls: 10, // Max 10 appels
    timeWindow: 60000, // Par 60 secondes
    
    canMakeRequest: function() {
        const now = Date.now();
        this.calls = this.calls.filter(time => now - time < this.timeWindow);
        
        if (this.calls.length >= this.maxCalls) {
            console.warn('Rate limit exceeded. Please wait before refreshing again.');
            return false;
        }
        
        this.calls.push(now);
        return true;
    }
};

/**
 * Parse un JSON de manière sécurisée.
 */
function safeJSONParse(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error('JSON parsing error:', e);
        return null;
    }
}

// Exposer les utilitaires à la fenêtre globale
if (typeof window !== 'undefined') {
    window.SecurityUtils = {
        encodeHTMLEntities,
        sanitizeURL,
        sanitizeImageURL,
        sanitizeNewsArticle,
        RateLimiter,
        safeJSONParse
    };
}

// Avertissement de sécurité dans la console
console.log('%c⚠️ ATTENTION SÉCURITÉ', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cNe collez aucun code dans cette console si vous ne savez pas ce que vous faites!', 'color: orange; font-size: 14px;');