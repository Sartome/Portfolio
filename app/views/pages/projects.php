<?php require_once '../app/views/layouts/header.php'; ?>

<!-- Projects Header -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl font-bold mb-4 gradient-text">Mes Projets</h1>
        <p class="text-xl text-gray-400 mb-8">Découvrez mes réalisations les plus significatives</p>
    </div>
</section>

<!-- Featured Projects -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-8">Projets phares</h2>
        
        <div class="space-y-8">
            <?php foreach ($projects as $project): ?>
                <?php if ($project['featured']): ?>
                <div class="glass rounded-xl overflow-hidden hover-glow transition-all fade-in-section">
                    <div class="grid grid-cols-1 md:grid-cols-2">
                        <div class="h-64 md:h-auto">
                            <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?>" class="w-full h-full object-cover">
                        </div>
                        <div class="p-8">
                            <div class="flex items-center justify-between mb-4">
                                <span class="px-3 py-1 bg-blue-600/20 border border-blue-600/50 rounded-full text-sm">
                                    <?= htmlspecialchars($project['year']) ?>
                                </span>
                                <span class="text-gray-400 text-sm"><?= htmlspecialchars($project['year']) ?></span>
                            </div>
                            
                            <h3 class="text-2xl font-bold mb-3"><?= htmlspecialchars($project['title']) ?></h3>
                            <p class="text-gray-400 mb-4"><?= htmlspecialchars($project['description']) ?></p>
                            
                            <div class="flex flex-wrap gap-2 mb-6">
                                <?php foreach ($project['technologies'] as $tech): ?>
                                    <span class="px-2 py-1 bg-white/5 rounded text-sm"><?= htmlspecialchars($tech) ?></span>
                                <?php endforeach; ?>
                            </div>
                            
                            <div class="flex gap-4">
                                <?php if ($project['github'] !== '#'): ?>
                                <a href="<?= htmlspecialchars($project['github']) ?>" target="_blank" class="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    Code source
                                </a>
                                <?php endif; ?>
                                
                                <?php if ($project['demo'] !== '#'): ?>
                                <a href="<?= htmlspecialchars($project['demo']) ?>" target="_blank" class="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    Voir la démo
                                </a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Other Projects -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold mb-8">Autres projets</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($projects as $project): ?>
                <?php if (!$project['featured']): ?>
                <div class="glass rounded-xl overflow-hidden hover-glow transition-all fade-in-section">
                    <img src="<?= htmlspecialchars($project['image']) ?>" alt="<?= htmlspecialchars($project['title']) ?>" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-3">
                            <span class="px-2 py-1 bg-purple-600/20 border border-purple-600/50 rounded text-xs">
                                <?= htmlspecialchars($project['year']) ?>
                            </span>
                            <span class="text-gray-400 text-xs"><?= htmlspecialchars($project['year']) ?></span>
                        </div>
                        
                        <h3 class="text-xl font-bold mb-2"><?= htmlspecialchars($project['title']) ?></h3>
                        <p class="text-gray-400 text-sm mb-4"><?= htmlspecialchars($project['description']) ?></p>
                        
                        <div class="flex flex-wrap gap-1 mb-4">
                            <?php foreach (array_slice($project['technologies'], 0, 3) as $tech): ?>
                                <span class="px-2 py-1 bg-white/5 rounded text-xs"><?= htmlspecialchars($tech) ?></span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
                <?php endif; ?>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- CTA -->
<section class="container mx-auto px-4 py-12">
    <div class="max-w-4xl mx-auto glass p-8 rounded-xl text-center fade-in-section">
        <h3 class="text-2xl font-bold mb-4">Vous avez un projet en tête ?</h3>
        <p class="text-gray-400 mb-6">Discutons de vos besoins et voyons comment je peux vous aider.</p>
        <a href="mailto:elarrassmarwane@gmail.com" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-all hover-glow">
            Commençons un projet
        </a>
    </div>
</section>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
