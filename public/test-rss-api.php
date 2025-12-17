<?php
/**
 * Test simple de l'API RSS
 */

echo "<h1>Test API RSS</h1>";
echo "<style>body{font-family:Arial;padding:20px;} .result{background:#f5f5f5;padding:15px;margin:10px 0;border-radius:5px;}</style>";

echo "<div class='result'>";
echo "<h2>Test de l'endpoint /rss/fetch</h2>";

// Simuler une requête AJAX
$_SERVER['HTTP_X_REQUESTED_WITH'] = 'XMLHttpRequest';

// Charger le Core et appeler la méthode fetch
require_once __DIR__ . '/../app/Core.php';

try {
    $core = new Core();
    
    // Forcer l'appel à la méthode fetch du RssController
    $rssController = new RssController();
    
    echo "<p>Appel de l'API RSS...</p>";
    
    // Simuler les paramètres GET
    $_GET['category'] = 'technology';
    $_GET['sort'] = 'recent';
    
    ob_start();
    $rssController->fetch();
    $output = ob_get_clean();
    
    echo "<h3>Résultat de l'API :</h3>";
    echo "<pre style='background:#000;color:#0f0;padding:10px;'>" . htmlspecialchars($output) . "</pre>";
    
} catch (Exception $e) {
    echo "<p style='color:red;'>Erreur : " . $e->getMessage() . "</p>";
}

echo "</div>";

echo "<div class='result'>";
echo "<h2>Test JavaScript</h2>";
echo "<p>Pour tester manuellement :</p>";
echo "<ol>";
echo "<li>Ouvrez <code>http://localhost/portfolio/rss</code></li>";
echo "<li>Ouvrez F12 → Console</li>";
echo "<li>Tapez : <code>fetch('/portfolio/rss/fetch', {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(r=>r.json()).then(console.log)</code></li>";
echo "</ol>";
echo "</div>";
?>
