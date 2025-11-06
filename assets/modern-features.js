// ============================================
// MODERN FEATURES - Advanced UI/UX Components
// ============================================

// Theme Manager - Dark/Light Mode Toggle
class ThemeManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        // Apply saved theme
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        // Create theme toggle button
        this.createToggleButton();
        
        // Listen for system preference changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    createToggleButton() {
        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.className = 'theme-toggle-btn';
        button.setAttribute('aria-label', 'Toggle theme');
        button.innerHTML = this.currentTheme === 'dark' ? '☀️' : '🌙';
        
        button.addEventListener('click', () => this.toggleTheme());
        
        document.body.appendChild(button);
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.currentTheme);
    }

    setTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const button = document.getElementById('theme-toggle');
        if (button) {
            button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
        }
    }
}

// Lazy Loading Manager
class LazyLoadManager {
    constructor() {
        this.init();
    }

    init() {
        // Lazy load images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Lazy load content sections
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.lazy-section').forEach(section => {
            sectionObserver.observe(section);
        });
    }
}

// Smooth Scroll Manager
class SmoothScrollManager {
    constructor() {
        this.init();
    }

    init() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Loading Animation Manager
class LoadingManager {
    constructor() {
        this.createLoader();
    }

    createLoader() {
        const loader = document.createElement('div');
        loader.id = 'page-loader';
        loader.className = 'page-loader';
        loader.innerHTML = `
            <div class="loader-content">
                <div class="loader-spinner"></div>
                <div class="loader-text">Chargement...</div>
            </div>
        `;
        document.body.appendChild(loader);
    }

    show() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('active');
        }
    }

    hide() {
        const loader = document.getElementById('page-loader');
        if (loader) {
            loader.classList.add('fade-out');
            setTimeout(() => {
                loader.classList.remove('active', 'fade-out');
            }, 500);
        }
    }
}

// Parallax Effect Manager
class ParallaxManager {
    constructor() {
        this.init();
    }

    init() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.init();
    }

    init() {
        if ('performance' in window && 'PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }
}

// Notification System
class NotificationManager {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification-container';
        document.body.appendChild(container);
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        notification.innerHTML = `
            <span class="notification-icon">${icons[type] || icons.info}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close">×</button>
        `;
        
        this.container.appendChild(notification);
        
        // Add close button listener
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => this.remove(notification));
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => this.remove(notification), duration);
        }
        
        return notification;
    }

    remove(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

// Service Worker Registration for PWA
class PWAManager {
    constructor() {
        this.init();
    }

    async init() {
        if ('serviceWorker' in navigator) {
            try {
                const registration = await navigator.serviceWorker.register('/sw.js');
                console.log('✅ Service Worker registered:', registration);
                
                // Check for updates
                registration.addEventListener('updatefound', () => {
                    console.log('🔄 Service Worker update found');
                });
            } catch (error) {
                console.warn('❌ Service Worker registration failed:', error);
            }
        }
    }

    async checkForUpdates() {
        if ('serviceWorker' in navigator) {
            const registration = await navigator.serviceWorker.getRegistration();
            if (registration) {
                registration.update();
            }
        }
    }
}

// Scroll Progress Indicator
class ScrollProgressIndicator {
    constructor() {
        this.createIndicator();
        this.init();
    }

    createIndicator() {
        const indicator = document.createElement('div');
        indicator.id = 'scroll-progress';
        indicator.className = 'scroll-progress';
        document.body.appendChild(indicator);
        this.indicator = indicator;
    }

    init() {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            this.indicator.style.width = scrolled + '%';
        });
    }
}

// Back to Top Button
class BackToTopButton {
    constructor() {
        this.createButton();
        this.init();
    }

    createButton() {
        const button = document.createElement('button');
        button.id = 'back-to-top';
        button.className = 'back-to-top-btn';
        button.setAttribute('aria-label', 'Back to top');
        button.innerHTML = '↑';
        document.body.appendChild(button);
        this.button = button;
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });

        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Initialize all features
function initializeModernFeatures() {
    console.log('🚀 Initializing modern features...');
    
    // Core features
    const themeManager = new ThemeManager();
    const lazyLoadManager = new LazyLoadManager();
    const smoothScrollManager = new SmoothScrollManager();
    const loadingManager = new LoadingManager();
    const parallaxManager = new ParallaxManager();
    const performanceMonitor = new PerformanceMonitor();
    
    // UI enhancements
    const notificationManager = new NotificationManager();
    const scrollProgress = new ScrollProgressIndicator();
    const backToTop = new BackToTopButton();
    
    // PWA support
    const pwaManager = new PWAManager();
    
    // Hide loader after page fully loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingManager.hide();
            notificationManager.show('Bienvenue sur mon portfolio!', 'success', 4000);
        }, 500);
    });
    
    // Make notification manager globally available
    window.notificationManager = notificationManager;
    
    console.log('✅ Modern features initialized');
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeModernFeatures);
} else {
    initializeModernFeatures();
}

// Export for external use
if (typeof window !== 'undefined') {
    window.ModernFeatures = {
        ThemeManager,
        LazyLoadManager,
        SmoothScrollManager,
        LoadingManager,
        ParallaxManager,
        PerformanceMonitor,
        NotificationManager,
        PWAManager,
        ScrollProgressIndicator,
        BackToTopButton
    };
}
