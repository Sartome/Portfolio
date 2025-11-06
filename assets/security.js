// ============================================
// SECURITY.JS - Enhanced for Dynamic News Page
// ============================================

// Function to prevent XSS attacks by encoding HTML entities
function encodeHTMLEntities(text) {
    if (!text) return '';
    var encodedText = document.createElement('div');
    encodedText.textContent = text;
    return encodedText.innerHTML;
}

// Function to sanitize URLs to prevent XSS via href attributes
function sanitizeURL(url) {
    if (!url) return '#';
    
    // Remove dangerous protocols
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    const urlLower = url.toLowerCase().trim();
    
    for (let protocol of dangerousProtocols) {
        if (urlLower.startsWith(protocol)) {
            console.warn('Blocked dangerous URL protocol:', url);
            return '#';
        }
    }
    
    // Only allow http and https
    if (!urlLower.startsWith('http://') && !urlLower.startsWith('https://') && !urlLower.startsWith('/')) {
        return 'https://' + url;
    }
    
    return url;
}

// Function to sanitize image URLs
function sanitizeImageURL(url) {
    if (!url) return '';
    
    try {
        const urlObj = new URL(url);
        // Only allow https images
        if (urlObj.protocol !== 'https:') {
            console.warn('Blocked non-HTTPS image:', url);
            return '';
        }
        return url;
    } catch (e) {
        console.warn('Invalid image URL:', url);
        return '';
    }
}

// Function to validate and sanitize API responses
function sanitizeNewsArticle(article) {
    if (!article || typeof article !== 'object') {
        return null;
    }
    
    return {
        title: encodeHTMLEntities(article.title || ''),
        summary: encodeHTMLEntities(article.summary || article.description || ''),
        image: sanitizeImageURL(article.image || article.urlToImage || ''),
        category: encodeHTMLEntities(article.category || 'technology'),
        date: article.date || article.publishedAt || new Date().toISOString(),
        link: sanitizeURL(article.link || article.url || '#'),
        source: encodeHTMLEntities(article.source?.name || article.source || 'Unknown')
    };
}

// Function to prevent clickjacking
function preventClickjacking() {
    if (window.self === window.top) {
        document.documentElement.style.display = 'block';
    } else {
        window.top.location = window.self.location;
    }
}

// Function to validate API key format (basic check)
function validateAPIKey(apiKey) {
    // Check if API key looks valid (alphanumeric, reasonable length)
    if (!apiKey || typeof apiKey !== 'string') {
        return false;
    }
    
    // Basic format validation
    const apiKeyRegex = /^[a-zA-Z0-9]{20,64}$/;
    return apiKeyRegex.test(apiKey);
}

// Function to implement rate limiting for API calls
const RateLimiter = {
    calls: [],
    maxCalls: 10, // Max 10 calls
    timeWindow: 60000, // Per 60 seconds
    
    canMakeRequest: function() {
        const now = Date.now();
        // Remove calls older than time window
        this.calls = this.calls.filter(time => now - time < this.timeWindow);
        
        if (this.calls.length >= this.maxCalls) {
            console.warn('Rate limit exceeded. Please wait before refreshing again.');
            return false;
        }
        
        this.calls.push(now);
        return true;
    },
    
    getRemainingTime: function() {
        if (this.calls.length < this.maxCalls) {
            return 0;
        }
        const oldestCall = Math.min(...this.calls);
        const timeUntilReset = this.timeWindow - (Date.now() - oldestCall);
        return Math.max(0, Math.ceil(timeUntilReset / 1000));
    }
};

// Function to safely parse JSON responses
function safeJSONParse(text) {
    try {
        return JSON.parse(text);
    } catch (e) {
        console.error('JSON parsing error:', e);
        return null;
    }
}

// Function to add Content Security Policy meta tag
function enforceCSP() {
    // Check if CSP meta tag already exists
    if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
        const meta = document.createElement('meta');
        meta.httpEquiv = 'Content-Security-Policy';
        meta.content = "default-src 'self'; " +
                      "script-src 'self' 'unsafe-inline'; " +
                      "style-src 'self' 'unsafe-inline'; " +
                      "img-src 'self' https: data:; " +
                      "connect-src 'self' https://newsapi.org https://api.unsplash.com; " +
                      "font-src 'self'; " +
                      "frame-ancestors 'none';";
        document.head.appendChild(meta);
    }
}

// Function to prevent script injection in dynamic content
function sanitizeDynamicContent(container) {
    if (!container) return;
    
    // Remove any script tags that might have been injected
    const scripts = container.querySelectorAll('script');
    scripts.forEach(script => script.remove());
    
    // Remove event handlers from dynamic content
    const elements = container.querySelectorAll('*');
    elements.forEach(el => {
        // Remove inline event handlers
        const attributes = el.attributes;
        for (let i = attributes.length - 1; i >= 0; i--) {
            const attr = attributes[i];
            if (attr.name.startsWith('on')) {
                el.removeAttribute(attr.name);
            }
        }
    });
}

// Function to validate external links before navigation
function validateExternalLink(url) {
    try {
        const urlObj = new URL(url);
        
        // List of known malicious or suspicious TLDs
        const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq'];
        const isSuspicious = suspiciousTLDs.some(tld => urlObj.hostname.endsWith(tld));
        
        if (isSuspicious) {
            console.warn('Suspicious domain detected:', urlObj.hostname);
            return false;
        }
        
        return true;
    } catch (e) {
        return false;
    }
}

// CSRF protection function
function addCSRFToken() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        // Only add if not already present
        if (!form.querySelector('input[name="csrf_token"]')) {
            const csrfToken = document.createElement('input');
            csrfToken.setAttribute('type', 'hidden');
            csrfToken.setAttribute('name', 'csrf_token');
            // In production, this should be generated by the server
            csrfToken.setAttribute('value', generateCSRFToken());
            form.appendChild(csrfToken);
        }
    });
}

// Generate a simple CSRF token (client-side only for demo)
function generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Function to monitor for DOM-based XSS attempts
function monitorDOMChanges() {
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) { // Element node
                    sanitizeDynamicContent(node);
                }
            });
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}

// Function to secure localStorage/sessionStorage operations
function secureStorage() {
    // Encrypt sensitive data before storing
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
        // Don't store sensitive API keys in localStorage
        if (key.toLowerCase().includes('api') || key.toLowerCase().includes('key')) {
            console.warn('Attempt to store sensitive data in localStorage blocked');
            return;
        }
        originalSetItem.call(this, key, value);
    };
}

// Initialize security measures on page load
function initSecurity() {
    console.log('🔒 Initializing security measures...');
    
    // Basic security
    preventClickjacking();
    enforceCSP();
    
    // Enhanced protections
    monitorDOMChanges();
    secureStorage();
    
    // Add CSRF tokens to forms
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', addCSRFToken);
    } else {
        addCSRFToken();
    }
    
    console.log('✅ Security initialized');
}

// Call initialization
initSecurity();

// Export security functions for use in main script
if (typeof window !== 'undefined') {
    window.SecurityUtils = {
        encodeHTMLEntities,
        sanitizeURL,
        sanitizeImageURL,
        sanitizeNewsArticle,
        validateAPIKey,
        RateLimiter,
        safeJSONParse,
        sanitizeDynamicContent,
        validateExternalLink
    };
}

// Console warning about security
console.log('%c⚠️ SECURITY WARNING', 'color: red; font-size: 20px; font-weight: bold;');
console.log('%cDo not paste any code in this console unless you know what you are doing!', 'color: orange; font-size: 14px;');
console.log('%cPasting malicious code here can compromise your security.', 'color: orange; font-size: 14px;');