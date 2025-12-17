<?php require_once __DIR__ . '/../layouts/header.php'; ?>

<!-- Journey Header -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4 gradient-text">Mon Parcours</h1>
        <p class="text-xl text-gray-400 mb-8">De mes débuts à aujourd'hui, découvrez mon évolution professionnelle</p>
    </div>
</section>

<!-- Timeline -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto">
        <div class="relative">
            <!-- Vertical line -->
            <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-purple-600 to-green-600"></div>
            
            <!-- Timeline items -->
            <div class="space-y-12">
                <?php foreach ($timeline as $index => $item): ?>
                <div class="relative pl-24 fade-in-section" style="animation-delay: <?= $index * 0.1 ?>s">
                    <!-- Icon -->
                    <div class="absolute left-0 w-16 h-16 rounded-full flex items-center justify-center glass border-2 
                        <?php 
                        switch($item['type']) {
                            case 'education': echo 'border-blue-500 bg-blue-600/20'; break;
                            case 'project': echo 'border-purple-500 bg-purple-600/20'; break;
                            case 'certification': echo 'border-green-500 bg-green-600/20'; break;
                            case 'experience': echo 'border-orange-500 bg-orange-600/20'; break;
                            default: echo 'border-gray-500 bg-gray-600/20';
                        }
                        ?>">
                        <?php if ($item['icon'] === 'education'): ?>
                            <svg class="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                            </svg>
                        <?php elseif ($item['icon'] === 'code' || $item['icon'] === 'project'): ?>
                            <svg class="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                            </svg>
                        <?php elseif ($item['icon'] === 'certificate'): ?>
                            <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                            </svg>
                        <?php else: ?>
                            <svg class="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                            </svg>
                        <?php endif; ?>
                    </div>
                    
                    <!-- Content -->
                    <div class="glass p-6 rounded-xl hover-glow transition-all">
                        <div class="flex items-start justify-between mb-3">
                            <div>
                                <div class="flex items-center gap-3 mb-1">
                                    <h3 class="text-2xl font-bold"><?= htmlspecialchars($item['title']) ?></h3>
                                    <?php if (isset($item['badge'])): ?>
                                        <span class="px-3 py-1 bg-green-600/20 border border-green-600/50 rounded-full text-xs text-green-400 font-semibold">
                                            <?= htmlspecialchars($item['badge']) ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                                <p class="text-gray-400"><?= htmlspecialchars($item['organization']) ?></p>
                            </div>
                            <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm whitespace-nowrap">
                                <?= htmlspecialchars($item['year']) ?>
                            </span>
                        </div>
                        
                        <p class="text-gray-300 mb-4"><?= htmlspecialchars($item['description']) ?></p>
                        
                        <?php if (isset($item['link']) && $item['link']): ?>
                            <div class="mb-4">
                                <a href="<?= htmlspecialchars($item['link']) ?>" target="_blank" class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
                                    <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 10"></path>
                                    </svg>
                                    Voir le projet
                                </a>
                            </div>
                        <?php endif; ?>
                        
                        <div class="flex flex-wrap gap-2">
                            <?php foreach ($item['skills'] as $skill): ?>
                                <span class="px-2 py-1 bg-white/5 rounded text-sm"><?= htmlspecialchars($skill) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </div>
</section>

<!-- Stats Section -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center mb-12">En chiffres</h2>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div class="glass p-6 rounded-xl text-center fade-in-section">
                <div class="text-4xl font-bold gradient-text mb-2">2+</div>
                <div class="text-gray-400">Années d'expérience</div>
            </div>
            
            <div class="glass p-6 rounded-xl text-center fade-in-section">
                <div class="text-4xl font-bold gradient-text mb-2">15+</div>
                <div class="text-gray-400">Projets réalisés</div>
            </div>
            
            <div class="glass p-6 rounded-xl text-center fade-in-section">
                <div class="text-4xl font-bold gradient-text mb-2">10+</div>
                <div class="text-gray-400">Technologies maîtrisées</div>
            </div>
            
            <div class="glass p-6 rounded-xl text-center fade-in-section">
                <div class="text-4xl font-bold gradient-text mb-2">100%</div>
                <div class="text-gray-400">Passion & engagement</div>
            </div>
        </div>
    </div>
</section>

<!-- Skills Evolution -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto glass p-8 rounded-xl fade-in-section">
        <h2 class="text-3xl font-bold mb-8 text-center">Évolution de mes compétences</h2>
        
        <div class="space-y-6">
            <div>
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">PHP / Backend</span>
                    <span class="text-blue-400">85%</span>
                </div>
                <div class="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full" style="width: 85%"></div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">JavaScript / Frontend</span>
                    <span class="text-purple-400">80%</span>
                </div>
                <div class="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full" style="width: 80%"></div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">Base de données (SQL)</span>
                    <span class="text-green-400">75%</span>
                </div>
                <div class="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full" style="width: 75%"></div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">Sécurité Web</span>
                    <span class="text-orange-400">70%</span>
                </div>
                <div class="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" style="width: 70%"></div>
                </div>
            </div>
            
            <div>
                <div class="flex justify-between mb-2">
                    <span class="font-semibold">UI/UX Design</span>
                    <span class="text-pink-400">65%</span>
                </div>
                <div class="h-3 bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-gradient-to-r from-pink-600 to-pink-400 rounded-full" style="width: 65%"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Future Goals -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto glass p-8 rounded-xl fade-in-section">
        <h2 class="text-3xl font-bold mb-6 text-center">Objectifs futurs</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="flex items-start">
                <div class="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-bold mb-1">Diplôme BTS SIO</h3>
                    <p class="text-gray-400 text-sm">Obtenir mon BTS avec mention</p>
                </div>
            </div>
            
            <div class="flex items-start">
                <div class="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-bold mb-1">Frameworks modernes</h3>
                    <p class="text-gray-400 text-sm">Maîtriser React, Vue.js et Laravel</p>
                </div>
            </div>
            
            <div class="flex items-start">
                <div class="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-bold mb-1">Alternance / Stage</h3>
                    <p class="text-gray-400 text-sm">Intégrer une entreprise innovante</p>
                </div>
            </div>
            
            <div class="flex items-start">
                <div class="w-10 h-10 bg-orange-600/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg class="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                    </svg>
                </div>
                <div>
                    <h3 class="font-bold mb-1">Open Source</h3>
                    <p class="text-gray-400 text-sm">Contribuer à des projets open source</p>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
