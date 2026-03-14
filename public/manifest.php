<?php
// Indiquer au navigateur qu'il s'agit d'un fichier JSON
header('Content-Type: application/manifest+json');

// Recréer la logique de base_path (copiée de votre header.php)
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/\\');
$basePath = preg_replace('#/public$#', '', $scriptDir);

if ($basePath === '' || $basePath === '\\') {
    $basePath = '/';
} elseif (substr($basePath, -1) !== '/') {
    $basePath .= '/';
}

/**
 * Helper pour générer des URL absolues correctes
 */
function url($path) {
    global $basePath;
    $root = ($basePath === '/') ? '' : rtrim($basePath, '/');
    return $root . '/' . ltrim($path, '/');
}

// Définir le contenu du manifest en utilisant la fonction url()
$manifest = [
    "name" => "El arrass Marwane - Portfolio",
    "short_name" => "Portfolio",
    "description" => "Portfolio professionnel de Marwane El arrass - Développeur Web",
    
    // CORRIGÉ : Utilise la fonction url()
    "start_url" => url('/'), 
    "scope" => url('/'),
    
    "display" => "standalone",
    "background_color" => "#121725",
    "theme_color" => "#16AAD9",
    // "orientation": "portrait-primary", // Supprimé : trop restrictif
    "icons" => [
        [
            // NOTE : Vous devriez créer des images distinctes
            "src" => url('assets/Logo_Vilgenis_192.png'), 
            "sizes" => "192x192",
            "type" => "image/png",
            "purpose" => "any maskable"
        ],
        [
            "src" => url('assets/Logo_Vilgenis_512.png'),
            "sizes" => "512x512",
            "type" => "image/png",
            "purpose" => "any maskable"
        ]
    ],
    "categories" => [
        "portfolio",
        "education",
        "productivity"
    ],
    "screenshots" => [
        [
            "src" => url('assets/screenshot.png'),
            "sizes" => "1280x720",
            "type" => "image/png"
        ]
    ],
    "shortcuts" => [
        [
            "name" => "Actualités",
            "short_name" => "News",
            "description" => "Voir les actualités tech",
            
            // CORRIGÉ : Pointe vers votre route /rss
            "url" => url('/rss'),
            
            "icons" => [
                [
                    "src" => url('assets/Logo_Vilgenis_96.png'),
                    "sizes" => "96x96"
                ]
            ]
        ]
    ]
    // NOTE : Le 'share_target' a été retiré.
    // Rajoutez-le uniquement si vous créez un ShareController.
];

// Imprimer le JSON
echo json_encode($manifest, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);