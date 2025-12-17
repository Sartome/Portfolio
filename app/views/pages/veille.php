<?php require_once __DIR__ . '/../layouts/header.php'; ?>

<!-- Veille Header -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4 gradient-text">Veille Technologique</h1>
        <p class="text-xl text-gray-400 mb-4">Neural Processing Units (NPU)</p>
        <p class="text-gray-500 max-w-3xl mx-auto">
            Exploration approfondie des NPU, ces processeurs spécialisés qui révolutionnent le traitement
            en apportant des capacités de calcul avancées directement dans nos appareils.
        </p>
    </div>
</section>

<!-- NPU Introduction -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto glass p-8 rounded-xl fade-in-section">
        <h2 class="text-3xl font-bold mb-6 flex items-center">
            <svg class="w-8 h-8 mr-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            Pourquoi une veille sur les NPU ?
        </h2>
        <div class="space-y-4 text-gray-300">
            <p>
                Les NPU (Neural Processing Units) représentent une révolution dans le monde de l'informatique et du traitement avancé. 
                Ces processeurs spécialisés transforment notre façon d'utiliser les capacités de calcul au quotidien.
            </p>
            <p>
                Cette veille technologique explore comment les NPU impactent le développement web, mobile et desktop, 
                créant de nouvelles opportunités pour les développeurs et redéfinissant les possibilités des applications modernes.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div class="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
                    <div class="text-3xl font-bold text-blue-400 mb-2">10x</div>
                    <div class="text-sm">Plus efficace énergétiquement que les GPU</div>
                </div>
                <div class="bg-purple-600/10 border border-purple-600/30 rounded-lg p-4">
                    <div class="text-3xl font-bold text-purple-400 mb-2">40+ TOPS</div>
                    <div class="text-sm">Performance des NPU modernes</div>
                </div>
                <div class="bg-green-600/10 border border-green-600/30 rounded-lg p-4">
                    <div class="text-3xl font-bold text-green-400 mb-2">100%</div>
                    <div class="text-sm">Traitement local sans cloud</div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Articles Grid -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-8">Articles de veille</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <?php foreach ($articles as $index => $article): ?>
            <div class="glass rounded-xl overflow-hidden hover-glow transition-all fade-in-section" style="animation-delay: <?= $index * 0.1 ?>s">
                <img src="<?= htmlspecialchars($article['image']) ?>" alt="<?= htmlspecialchars($article['title']) ?>" class="w-full h-48 object-cover">
                
                <div class="p-6">
                    <div class="flex items-center justify-between mb-3">
                        <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-xs">
                            <?= htmlspecialchars($article['category']) ?>
                        </span>
                        <span class="text-gray-400 text-sm">
                            <?= date('d/m/Y', strtotime($article['date'])) ?>
                        </span>
                    </div>
                    
                    <h3 class="text-xl font-bold mb-3 hover:text-blue-400 transition-colors cursor-pointer" 
                        onclick="openArticle<?= $index ?>()">
                        <?= htmlspecialchars($article['title']) ?>
                    </h3>
                    
                    <p class="text-gray-400 text-sm mb-4">
                        <?= htmlspecialchars($article['summary']) ?>
                    </p>
                    
                    <div class="flex flex-wrap gap-2 mb-4">
                        <?php foreach ($article['tags'] as $tag): ?>
                            <span class="px-2 py-1 bg-white/5 rounded text-xs">#<?= htmlspecialchars($tag) ?></span>
                        <?php endforeach; ?>
                    </div>
                    
                    <button onclick="openArticle<?= $index ?>()" class="text-blue-400 hover:text-blue-300 transition-colors text-sm font-semibold">
                        Lire l'article →
                    </button>
                </div>
                
                <!-- Hidden article content -->
                <div id="articleModal<?= $index ?>" class="hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto" onclick="closeArticle<?= $index ?>()">
                    <div class="container mx-auto px-4 py-12" onclick="event.stopPropagation()">
                        <div class="max-w-4xl mx-auto glass rounded-xl overflow-hidden">
                            <img src="<?= htmlspecialchars($article['image']) ?>" alt="<?= htmlspecialchars($article['title']) ?>" class="w-full h-64 object-cover">
                            
                            <div class="p-8">
                                <div class="flex items-center justify-between mb-4">
                                    <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">
                                        <?= htmlspecialchars($article['category']) ?>
                                    </span>
                                    <button onclick="closeArticle<?= $index ?>()" class="text-gray-400 hover:text-white">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                
                                <h2 class="text-3xl font-bold mb-4"><?= htmlspecialchars($article['title']) ?></h2>
                                
                                <div class="flex items-center gap-4 mb-6 text-sm text-gray-400">
                                    <span><?= date('d/m/Y', strtotime($article['date'])) ?></span>
                                    <span>•</span>
                                    <span>5 min de lecture</span>
                                </div>
                                
                                <div class="prose prose-invert max-w-none">
                                    <p class="text-lg text-gray-300 mb-6"><?= htmlspecialchars($article['summary']) ?></p>
                                    <p class="text-gray-300 leading-relaxed"><?= nl2br(htmlspecialchars($article['content'])) ?></p>
                                </div>
                                
                                <div class="mt-8 pt-8 border-t border-white/10">
                                    <div class="flex flex-wrap gap-2">
                                        <?php foreach ($article['tags'] as $tag): ?>
                                            <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">
                                                #<?= htmlspecialchars($tag) ?>
                                            </span>
                                        <?php endforeach; ?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <script>
                    function openArticle<?= $index ?>() {
                        document.getElementById('articleModal<?= $index ?>').classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }
                    
                    function closeArticle<?= $index ?>() {
                        document.getElementById('articleModal<?= $index ?>').classList.add('hidden');
                        document.body.style.overflow = 'auto';
                    }
                </script>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Key Takeaways -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto glass p-8 rounded-xl fade-in-section">
        <h2 class="text-3xl font-bold mb-6">Points clés à retenir</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="text-xl font-bold mb-3 text-blue-400">Pour les développeurs</h3>
                <ul class="space-y-2 text-gray-300">
                    <li class="flex items-start">
                        <span class="text-blue-400 mr-2">✓</span>
                        Les NPU ouvrent de nouvelles possibilités d'applications locales
                    </li>
                    <li class="flex items-start">
                        <span class="text-blue-400 mr-2">✓</span>
                        Meilleure confidentialité avec le traitement on-device
                    </li>
                    <li class="flex items-start">
                        <span class="text-blue-400 mr-2">✓</span>
                        Réduction des coûts d'infrastructure cloud
                    </li>
                </ul>
            </div>
            
            <div>
                <h3 class="text-xl font-bold mb-3 text-purple-400">Impact sur l'industrie</h3>
                <ul class="space-y-2 text-gray-300">
                    <li class="flex items-start">
                        <span class="text-purple-400 mr-2">✓</span>
                        Démocratisation de l'IA sur tous les appareils
                    </li>
                    <li class="flex items-start">
                        <span class="text-purple-400 mr-2">✓</span>
                        Nouvelles catégories de logiciels possibles
                    </li>
                    <li class="flex items-start">
                        <span class="text-purple-400 mr-2">✓</span>
                        Transformation de l'expérience utilisateur
                    </li>
                </ul>
            </div>
        </div>
    </div>
</section>

<!-- Additional Resources -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <div class="glass p-8 rounded-xl fade-in-section">
            <h2 class="text-3xl font-bold mb-8 text-center">Pour aller plus loin</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="text-center">
                    <div class="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Documentation Technique</h3>
                    <p class="text-gray-400 mb-4">Spécifications et architectures des NPU modernes</p>
                    <a href="https://developer.nvidia.com/" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">Site officiel NVIDIA →</a>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Actualités NPU</h3>
                    <p class="text-gray-400 mb-4">Dernières innovations et annonces du secteur</p>
                    <a href="https://www.anandtech.com/" target="_blank" class="text-purple-400 hover:text-purple-300 transition-colors">Site officiel AnandTech →</a>
                </div>
                
                <div class="text-center">
                    <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a- 5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Recherche NPU</h3>
                    <p class="text-gray-400 mb-4">Papiers de recherche et avancées scientifiques</p>
                    <a href="https://arxiv.org/list/cs.LG/recent" target="_blank" class="text-green-400 hover:text-green-300 transition-colors">Site officiel arXiv →</a>
                </div>
            </div>
            
            <div class="text-center mt-8">
                <a href="<?= url('/rss') ?>" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-2.498a1 1 0 00-1.168.233l-2.816 2.816a1 1 0 01-1.414 0l-2.816-2.816a1 1 0 00-1.168-.233L4.684 5.771A1 1 0 004 6.72V10a2 2 0 002 2z"></path>
                    </svg>
                    Voir les actualités tech
                </a>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
