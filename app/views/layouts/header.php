<?php
    // Déterminer dynamiquement le base path (compatible XAMPP, DDEV, production...)
    // Simple : dériver à partir du chemin du script, puis enlever '/public'.
    $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/\\');
    $basePath = preg_replace('#/public$#', '', $scriptDir);

    if ($basePath === '' || $basePath === '\\') {
        $basePath = '/';
    } elseif (substr($basePath, -1) !== '/') {
        $basePath .= '/';
    }
    
    // Fonctions utilitaires pour générer des URL relatives au basePath
    if (!function_exists('url')) {
        function url($path = '') {
            global $basePath;
            // ensure basePath is never empty (sécurité supplémentaire)
            $bp = ($basePath ?? '/') ?: '/';
            // s'assurer qu'il y a un slash final
            if (substr($bp, -1) !== '/') {
                $bp .= '/';
            }
            return $bp . ltrim($path ?? '', '/');
        }
    }
    
    if (!function_exists('asset')) {
        function asset($path = '') {
            global $basePath;
            return $basePath . ltrim($path ?? '', '/');
        }
    }
?>
<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= Core::escape($description ?? 'Portfolio de Marwane El arrass') ?>">
    <meta name="author" content="Marwane El arrass">
    <meta name="theme-color" content="#3b82f6">
    
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= Core::escape($title ?? 'Portfolio') ?>">
    <meta property="og:description" content="<?= Core::escape($description ?? '') ?>">
    
    <title><?= Core::escape($title ?? 'Portfolio') ?></title>

    <link rel="icon" type="image/png" href="<?= asset('assets/Icon.png') ?>">
    <link rel="apple-touch-icon" href="<?= asset('assets/Icon.png') ?>">

    <link rel="manifest" href="<?= url('manifest.php') ?>">

    <?php $reactCss = Core::reactStylesheetTag(); ?>
    <?php if ($reactCss): ?>
    <?= $reactCss ?>
    <?php else: ?>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            darkMode: 'class',
            theme: {
                extend: {
                    colors: { primary: { 50: '#eff6ff', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8', 900: '#1e3a8a' } },
                    animation: { 'fade-in': 'fadeIn 0.5s ease-in forwards', 'slide-up': 'slideUp 0.5s ease-out forwards', 'slide-down': 'slideDown 0.3s ease-out forwards' },
                    keyframes: { fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } }, slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } }, slideDown: { '0%': { transform: 'translateY(-10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } } }
                }
            },
            plugins: []
        }
    </script>
    <?php endif; ?>
    <link rel="stylesheet" href="<?= asset('assets/animations.css') ?>">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body { font-family: 'Inter', sans-serif; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: #2563eb; }
        * { transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease; }
        .gradient-text {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .hover-glow { transition: box-shadow 0.3s ease; }
        .hover-glow:hover { box-shadow: 0 0 30px rgba(59, 130, 246, 0.3); }
    </style>
    <script>
        // Base path for JavaScript
        window.BASE_PATH = "<?= addslashes(rtrim($basePath, '/')) ?>";
    </script>

    <!-- React bundle will be injected later by Core::reactScriptTag() -->
    <!-- CDN scripts (React UMD + Babel) only loaded when Vite bundle is absent -->
    <?= Core::reactCdnScripts() ?>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">

<script>
    // DEBUG : afficher le lien d'accueil dans la console
    window.addEventListener('DOMContentLoaded', () => {
        console.log('DEBUG: basePath = "<?= $basePath ?>"');
        const homeLink = document.querySelector('a.nav-link[href]');
        if (homeLink) {
            console.log('DEBUG: home link href =', homeLink.getAttribute('href'), '->', homeLink.href);
        }
        // si un lien de navigation n'a pas de href (ou href vide), corriger dynamiquement
        document.querySelectorAll('a.nav-link').forEach(a => {
            if (!a.getAttribute('href') || a.getAttribute('href').trim() === '') {
                const bp = ('<?= $basePath ?>' || '/');
                a.setAttribute('href', bp);
                console.log('DEBUG: fixed empty nav href to', bp);
            }
        });

        // theme toggle button behaviour
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                document.documentElement.classList.toggle('dark');
                // simple icon swap
                toggle.textContent = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
            });
        }
    });
</script>
    

    <!-- mobile menu behaviour is now handled by React; keep old markup as fallback -->
    <nav id="fallback-nav" class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <a href="<?= url('/') ?>" class="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
                    MEA.dev
                </a>
                <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-white/10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>
    </nav>

    <!-- main content root for React; PHP-rendered content remains as fallback -->
    <?= \Core::reactRootStart($page ?? '', $data ?? []) /* opens <main> and #react-root div */ ?>
