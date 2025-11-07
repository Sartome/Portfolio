<!DOCTYPE html>
<html lang="fr" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= htmlspecialchars($description ?? 'Portfolio de Marwane El arrass') ?>">
    <meta name="author" content="Marwane El arrass">
    <meta name="theme-color" content="#3b82f6">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="<?= htmlspecialchars($title ?? 'Portfolio') ?>">
    <meta property="og:description" content="<?= htmlspecialchars($description ?? '') ?>">
    
    <title><?= htmlspecialchars($title ?? 'Portfolio') ?></title>

    <?php
        // Compute base path to support subfolder deployments (e.g., /portfolio)
        $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/\\');
        $basePath = preg_replace('#/public$#', '', $scriptDir);
        if ($basePath !== '' && substr($basePath, -1) !== '/') { $basePath .= '/'; }
        // Small helper for URLs
        if (!function_exists('url')) {
            function url($path) {
                global $basePath;
                return $basePath . ltrim($path, '/');
            }
        }
    ?>
    
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Custom Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: {
                            50: '#eff6ff',
                            500: '#3b82f6',
                            600: '#2563eb',
                            700: '#1d4ed8',
                            900: '#1e3a8a'
                        }
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.5s ease-in',
                        'slide-up': 'slideUp 0.5s ease-out',
                        'slide-down': 'slideDown 0.3s ease-out',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' }
                        },
                        slideUp: {
                            '0%': { transform: 'translateY(20px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        },
                        slideDown: {
                            '0%': { transform: 'translateY(-10px)', opacity: '0' },
                            '100%': { transform: 'translateY(0)', opacity: '1' }
                        }
                    }
                }
            }
        }
    </script>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    
    <style>
        body {
            font-family: 'Inter', sans-serif;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
            width: 10px;
        }
        
        ::-webkit-scrollbar-track {
            background: #1e293b;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #3b82f6;
            border-radius: 5px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #2563eb;
        }
        
        /* Smooth transitions */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Gradient text */
        .gradient-text {
            background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        /* Glass effect */
        .glass {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        /* Hover glow effect */
        .hover-glow {
            transition: box-shadow 0.3s ease;
        }
        
        .hover-glow:hover {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
        }
    </style>
    <script>
        window.BASE_PATH = "<?= addslashes($basePath) ?>";
    </script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white min-h-screen">
    
    <!-- Navigation -->
    <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10">
        <div class="container mx-auto px-4 py-4">
            <div class="flex items-center justify-between">
                <!-- Logo -->
                <a href="<?= url('/') ?>" class="text-2xl font-bold gradient-text hover:scale-105 transition-transform">
                    MEA.dev
                </a>
                
                <!-- Desktop Navigation -->
                <div class="hidden md:flex items-center space-x-8">
                    <a href="<?= url('/') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'home' ? 'text-blue-400' : '' ?>">
                        Accueil
                    </a>
                    <a href="<?= url('/cv') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'cv' ? 'text-blue-400' : '' ?>">
                        CV
                    </a>
                    <a href="<?= url('/projects') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'projects' ? 'text-blue-400' : '' ?>">
                        Projets
                    </a>
                    <a href="<?= url('/veille') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'veille' ? 'text-blue-400' : '' ?>">
                        Veille Tech
                    </a>
                    <a href="<?= url('/journey') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'journey' ? 'text-blue-400' : '' ?>">
                        Parcours
                    </a>
                    <a href="<?= url('/rss') ?>" class="nav-link hover:text-blue-400 transition-colors <?= ($page ?? '') === 'rss' ? 'text-blue-400' : '' ?>">
                        Actualités
                    </a>
                </div>
                
                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn" class="md:hidden p-2 rounded-lg hover:bg-white/10">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
            
            <!-- Mobile Navigation -->
            <div id="mobile-menu" class="hidden md:hidden mt-4 pb-4 space-y-2 animate-slide-down">
                <a href="<?= url('/') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'home' ? 'bg-white/10' : '' ?>">
                    Accueil
                </a>
                <a href="<?= url('/cv') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'cv' ? 'bg-white/10' : '' ?>">
                    CV
                </a>
                <a href="<?= url('/projects') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'projects' ? 'bg-white/10' : '' ?>">
                    Projets
                </a>
                <a href="<?= url('/veille') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'veille' ? 'bg-white/10' : '' ?>">
                    Veille Tech
                </a>
                <a href="<?= url('/journey') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'journey' ? 'bg-white/10' : '' ?>">
                    Parcours
                </a>
                <a href="<?= url('/rss') ?>" class="block py-2 px-4 rounded-lg hover:bg-white/10 <?= ($page ?? '') === 'rss' ? 'bg-white/10' : '' ?>">
                    Actualités
                </a>
            </div>
        </div>
    </nav>
    
    <!-- Page Content -->
    <main class="pt-20">
