<?php require_once __DIR__ . '/../layouts/header.php'; ?>

<!-- CV Header -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
        <div class="text-center mb-8">
            <h1 class="text-5xl font-bold mb-4 gradient-text">Curriculum Vitae</h1>
            <p class="text-xl text-gray-400 mb-6">Marwane El arrass - Développeur Web Full-Stack</p>
            <a href="<?= url('/cv/download') ?>" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                Télécharger le CV (PDF)
            </a>
        </div>
    </div>
</section>

<!-- CV Content -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto space-y-12">
        
        <!-- Profile -->
        <div class="glass p-8 rounded-xl fade-in-section">
            <h2 class="text-3xl font-bold mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                Profil
            </h2>
            <p class="text-lg text-gray-300 leading-relaxed">
                Développeur Web Full-Stack passionné et motivé, actuellement en formation BTS SIO option SLAM. 
                Spécialisé dans le développement d'applications web modernes avec une forte attention portée à 
                la sécurité, aux performances et à l'expérience utilisateur. Autodidacte curieux, je reste en 
                veille constante sur les nouvelles technologies, notamment les NPU et le traitement avancé.
            </p>
        </div>
        
        <!-- Formation -->
        <div class="glass p-8 rounded-xl fade-in-section">
            <h2 class="text-3xl font-bold mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Formation
            </h2>
            <div class="space-y-6">
                <div class="border-l-4 border-blue-500 pl-6">
                    <div class="flex justify-between items-start mb-2">
                        <div class="flex items-center gap-3">
                            <h3 class="text-xl font-bold">BTS SIO - SLAM</h3>
                            <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-xs text-green-400 font-semibold">Formation en cours</span>
                        </div>
                        <span class="text-blue-400 font-semibold">2024-2026</span>
                    </div>
                    <p class="text-gray-400 mb-2">Lycée Vilgénis, Massy</p>
                    <p class="text-gray-300">
                        Solutions Logicielles et Applications Métiers - Développement d'applications web et desktop, 
                        bases de données, cybersécurité, gestion de projet agile.
                    </p>
                </div>
                
                <div class="border-l-4 border-purple-500 pl-6">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-bold">Auto-formation Développement Web</h3>
                        <span class="text-purple-400 font-semibold">2022-2024</span>
                    </div>
                    <p class="text-gray-300">
                        Apprentissage autonome des technologies web modernes : HTML5, CSS3, JavaScript, PHP, 
                        MySQL, frameworks et best practices. Réalisation de nombreux projets personnels.
                    </p>
                </div>
            </div>
        </div>
        
        <!-- Compétences Techniques -->
        <div class="glass p-8 rounded-xl fade-in-section">
            <h2 class="text-3xl font-bold mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
                Compétences Techniques
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 class="text-lg font-bold mb-3 text-blue-400">Langages & Frameworks</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">PHP 8+</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">JavaScript ES6+</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">HTML5</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">CSS3</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">SQL</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">TailwindCSS</span>
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">Bootstrap</span>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold mb-3 text-purple-400">Outils & Technologies</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">Git / GitHub</span>
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">MySQL / PDO</span>
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">REST API</span>
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">MVC</span>
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">POO</span>
                        <span class="px-3 py-1 bg-purple-600/20 border border-purple-600/50 rounded-full text-sm">VS Code</span>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold mb-3 text-green-400">Sécurité & Performances</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-sm">XSS Protection</span>
                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-sm">CSRF Tokens</span>
                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-sm">SQL Injection Prevention</span>
                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-sm">CSP Headers</span>
                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-sm">Optimization</span>
                    </div>
                </div>
                
                <div>
                    <h3 class="text-lg font-bold mb-3 text-orange-400">Méthodologies</h3>
                    <div class="flex flex-wrap gap-2">
                        <span class="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-sm">Agile / Scrum</span>
                        <span class="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-sm">Clean Code</span>
                        <span class="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-sm">Responsive Design</span>
                        <span class="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-sm">Testing</span>
                        <span class="px-3 py-1 bg-orange-600/20 border border-orange-600/50 rounded-full text-sm">Documentation</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Projets Réalisés -->
        <div class="glass p-8 rounded-xl fade-in-section">
            <h2 class="text-3xl font-bold mb-6 flex items-center">
                <svg class="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                Projets Réalisés
            </h2>
            <ul class="space-y-3 text-gray-300">
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">▸</span>
                    Portfolio moderne avec architecture MVC, sécurité renforcée et design responsive
                </li>
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">▸</span>
                    Applications CRUD complètes avec authentification et gestion de session
                </li>
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">▸</span>
                    API RESTful avec documentation et tests
                </li>
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">▸</span>
                    Progressive Web App (PWA) avec mode offline
                </li>
                <li class="flex items-start">
                    <span class="text-blue-400 mr-2">▸</span>
                    Dashboard analytics avec visualisation de données
                </li>
            </ul>
        </div>
        
        <!-- Langues & Soft Skills -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="glass p-8 rounded-xl fade-in-section">
                <h2 class="text-2xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                    </svg>
                    Langues
                </h2>
                <ul class="space-y-2">
                    <li class="flex justify-between">
                        <span class="text-gray-300">Français</span>
                        <span class="text-blue-400 font-semibold">Natif</span>
                    </li>
                    <li class="flex justify-between">
                        <span class="text-gray-300">Anglais</span>
                        <span class="text-blue-400 font-semibold">Courant (C1)</span>
                    </li>
                </ul>
            </div>
            
            <div class="glass p-8 rounded-xl fade-in-section">
                <h2 class="text-2xl font-bold mb-4 flex items-center">
                    <svg class="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Soft Skills
                </h2>
                <ul class="space-y-2 text-gray-300">
                    <li class="flex items-center">
                        <span class="text-purple-400 mr-2">✓</span>
                        Autonomie & Initiative
                    </li>
                    <li class="flex items-center">
                        <span class="text-purple-400 mr-2">✓</span>
                        Travail en équipe
                    </li>
                    <li class="flex items-center">
                        <span class="text-purple-400 mr-2">✓</span>
                        Résolution de problèmes
                    </li>
                    <li class="flex items-center">
                        <span class="text-purple-400 mr-2">✓</span>
                        Apprentissage continu
                    </li>
                </ul>
            </div>
        </div>
        
        <!-- Contact CTA -->
        <div class="glass p-8 rounded-xl text-center fade-in-section">
            <h3 class="text-2xl font-bold mb-4">Intéressé par mon profil ?</h3>
            <p class="text-gray-400 mb-6">N'hésitez pas à me contacter pour discuter d'opportunités ou de collaborations.</p>
            <div class="flex flex-wrap justify-center gap-4">
                <div class="relative">
                    <button onclick="toggleEmailTooltip('cv-email-tooltip')" class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                        Envoyer un email
                    </button>
                    <!-- Bulle d'information email interactive -->
                    <div id="cv-email-tooltip" class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-4 py-3 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none transition-opacity duration-200 whitespace-nowrap z-50">
                        <div class="flex items-center gap-2">
                            <span id="cv-email-text">elarrassmarwane@gmail.com</span>
                            <button onclick="copyEmail('cv-email-text')" class="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs transition-colors">
                                Copier
                            </button>
                        </div>
                        <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                    </div>
                </div>
                <a href="https://www.linkedin.com/in/marwane-el-arrass/" target="_blank" class="px-6 py-3 glass hover:bg-white/10 rounded-lg font-semibold transition-all">
                    Me contacter sur LinkedIn
                </a>
            </div>
        </div>
        
    </div>
</section>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
