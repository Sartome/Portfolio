<?php require_once __DIR__ . '/../layouts/header.php'; ?>

<!-- Hero Section -->
<section class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            <span class="gradient-text">Marwane El arrass</span>
        </h1>
        <p class="text-2xl md:text-3xl text-gray-300 mb-4 animate-slide-up">
            Développeur Web Full-Stack
        </p>
        <p class="text-lg text-gray-400 mb-8 max-w-2xl mx-auto animate-slide-up">
            Passionné par les technologies modernes, la sécurité web et l'innovation. 
            Spécialisé en développement d'applications robustes et performantes.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 animate-slide-up">
            <a href="<?= url('/projects') ?>" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                Voir mes projets
            </a>
            <a href="<?= url('/cv') ?>" class="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all">
                Télécharger mon CV
            </a>
        </div>
    </div>
</section>

<!-- Skills Section -->
<section class="container mx-auto px-4 py-20">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-4xl font-bold text-center mb-12 gradient-text fade-in-section">
            Compétences Techniques
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Frontend -->
            <div class="glass p-6 rounded-xl hover-glow fade-in-section">
                <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Frontend</h3>
                <ul class="space-y-2 text-gray-400">
                    <li>• HTML5 / CSS3 / JavaScript ES6+</li>
                    <li>• TailwindCSS / Bootstrap</li>
                    <li>• React (bases)</li>
                    <li>• Responsive Design</li>
                    <li>• PWA / Service Workers</li>
                </ul>
            </div>
            
            <!-- Backend -->
            <div class="glass p-6 rounded-xl hover-glow fade-in-section">
                <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Backend</h3>
                <ul class="space-y-2 text-gray-400">
                    <li>• PHP 8+ / POO</li>
                    <li>• Architecture MVC</li>
                    <li>• API REST</li>
                    <li>• MySQL / PDO</li>
                    <li>• Sécurité & Authentification</li>
                </ul>
            </div>
            
            <!-- Tools -->
            <div class="glass p-6 rounded-xl hover-glow fade-in-section">
                <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">Outils & Méthodologies</h3>
                <ul class="space-y-2 text-gray-400">
                    <li>• Git / GitHub</li>
                    <li>• VS Code / PHPStorm</li>
                    <li>• Agile / Scrum</li>
                    <li>• Testing & Debugging</li>
                    <li>• Documentation</li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Featured Sections -->
<section class="container mx-auto px-4 py-20">
    <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Veille Tech Card -->
            <a href="<?= url('/veille') ?>" class="group glass p-8 rounded-xl hover-glow transition-all fade-in-section">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-400">8 articles</span>
                </div>
                <h3 class="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                    Veille Technologique
                </h3>
                <p class="text-gray-400 mb-4">
                    Exploration des NPU (Neural Processing Units) et leur impact sur l'intelligence artificielle
                </p>
                <span class="text-blue-400 font-semibold">En savoir plus →</span>
            </a>
            
            <!-- Journey Card -->
            <a href="<?= url('/journey') ?>" class="group glass p-8 rounded-xl hover-glow transition-all fade-in-section">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        </svg>
                    </div>
                    <span class="text-sm text-gray-400">2022 - 2026</span>
                </div>
                <h3 class="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                    Mon Parcours
                </h3>
                <p class="text-gray-400 mb-4">
                    De mes débuts en auto-didacte au BTS SIO - SLAM, découvrez mon évolution professionnelle
                </p>
                <span class="text-purple-400 font-semibold">Découvrir →</span>
            </a>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="container mx-auto px-4 py-20">
    <div class="max-w-4xl mx-auto text-center glass p-12 rounded-2xl fade-in-section">
        <h2 class="text-4xl font-bold mb-4">
            Travaillons ensemble
        </h2>
        <p class="text-xl text-gray-400 mb-8">
            Vous avez un projet ? Une opportunité ? N'hésitez pas à me contacter.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
            <div class="relative">
                <button onclick="toggleEmailTooltip('home-email-tooltip')" class="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                    Me contacter
                </button>
                <!-- Bulle d'information email interactive -->
                <div id="home-email-tooltip" class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                    <div class="flex items-center gap-2">
                        <span id="home-email-text">elarrassmarwane@gmail.com</span>
                        <button onclick="copyEmail('home-email-text')" class="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                            Copier
                        </button>
                    </div>
                    <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
            </div>
            <a href="https://www.linkedin.com/in/marwane-el-arrass/" target="_blank" class="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all">
                LinkedIn
            </a>
            <a href="https://github.com/Sartome" target="_blank" class="px-8 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all">
                GitHub
            </a>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
