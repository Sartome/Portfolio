<?php 
// Inclure le header
require_once __DIR__ . '/../layouts/header.php'; 
?>

<div class="container mx-auto px-4 py-12 lg:py-16 max-w-6xl">
    <header class="text-center mb-10 lg:mb-12 fade-in-section space-y-3">
        <h1 class="text-4xl md:text-5xl font-extrabold gradient-text tracking-tight">Actualités Tech</h1>
        <p class="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">Flux d'actualités en direct, sélectionnés pour vous.</p>
    </header>

    <div id="rss-controls" class="flex flex-wrap gap-4 items-center justify-center p-4 md:px-8 rounded-2xl glass shadow-xl border border-white/10 mb-10 fade-in-section">
        <strong class="text-white">Trier par :</strong>
        
        <label class="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input type="radio" name="sort" value="recent" checked 
                   class="form-radio bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-opacity-50">
            <span>Plus récent</span>
        </label>
        
        <label class="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input type="radio" name="sort" value="old"
                   class="form-radio bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-opacity-50">
            <span>Plus ancien</span>
        </label>
        
        <label class="flex items-center space-x-2 cursor-pointer text-gray-300 hover:text-white">
            <input type="radio" name="sort" value="popular"
                   class="form-radio bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500 focus:ring-opacity-50">
            <span>Plus populaire</span>
        </label>
        
        <button id="favorites-toggle" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors text-white font-semibold">
            ⭐ Favoris
        </button>
        
        <div class="relative">
            <button id="favorites-notification" class="absolute -top-2 -right-2 w-6 h-6 bg-red-600 text-white rounded-full text-xs font-bold flex items-center justify-center" style="display: none;">
                0
            </button>
        </div>
    </div>

    <div id="rss-feed-container" class="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
        <p class="text-gray-400 col-span-full text-center">
            Chargement des actualités...
        </p>
    </div>
</div>

<?php 
// Inclure le footer
require_once __DIR__ . '/../layouts/footer.php'; 
?>