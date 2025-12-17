<?php
/**
 * RSS Controller
 * Gère l'agrégation et l'affichage des flux RSS
 */

require_once __DIR__ . '/../Controller.php';

class RssController extends Controller {

    /**
     * Page principale du flux RSS
     */
    public function index() {
        $data = [
            'title' => 'Actualités Tech - Flux RSS',
            'description' => 'Dernières actualités technologiques agrégées',
            'page' => 'rss' // Pour la navigation active
        ];
        
        $this->view('rss', $data);
    }

    /**
     * Point d'entrée API pour récupérer les actualités (appelé en AJAX)
     */
    public function fetch() {
        // La vérification AJAX doit être la première chose à faire
        if (!$this->isAjax()) {
            $this->json(['error' => 'Invalid request'], 400);
            return;
        }

        // Récupérer les paramètres de la requête
        $category = $_GET['category'] ?? 'technology';
        $sort = $_GET['sort'] ?? 'recent'; // recent | old | popular

        try {
            $apiKey = Core::config('newsapi_key');
            $news = [];

            // NOTE : J'active le flux RSS par défaut car il ne nécessite pas de clé API.
            // Si vous voulez utiliser NewsAPI, commentez la ligne fetchFromRSS
            // et décommentez le bloc "if/else" ci-dessous.

            // Option 1 : Flux RSS (Frandroid)
            $news = $this->fetchFromRSS("https://www.frandroid.com/feed");
            $news = $this->filterAIArticles($news);

            if (empty($news)) {
                $news = $this->getMockNews($category);
            }

            // Option 2 : NewsAPI (si vous avez une clé)
            // if ($apiKey && $apiKey !== '23ee33423d094283b0fcdc22b67b5e3c') {
            //     $news = $this->fetchFromNewsAPI($category, $apiKey);
            // } else {
            //     // Fallback sur les données factices
            //     $news = $this->getMockNews($category);
            // }
            
            $sortedNews = $this->applySorting($news, $sort);
            
            $this->json($sortedNews);

        } catch (Exception $e) {
            $this->json([
                'error' => 'Failed to fetch news',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Applique le tri sur un tableau d'articles
     */
    private function applySorting($articles, $sort) {
        usort($articles, function($a, $b) use ($sort) {
            switch ($sort) {
                case 'old': // Le plus ancien
                    return (strtotime($a['publishedAt']) ?? 0) <=> (strtotime($b['publishedAt']) ?? 0);
                
                case 'popular': // Le plus populaire (fonctionne seulement avec getMockNews)
                    $popA = $a['popularity'] ?? 0;
                    $popB = $b['popularity'] ?? 0;
                    if ($popA == $popB) { // Si popularité égale, trier par date
                        return (strtotime($b['publishedAt']) ?? 0) <=> (strtotime($a['publishedAt']) ?? 0);
                    }
                    return $popB <=> $popA; // Tri décroissant par popularité
                
                case 'recent': // Le plus récent (défaut)
                default:
                    return (strtotime($b['publishedAt']) ?? 0) <=> (strtotime($a['publishedAt']) ?? 0);
            }
        });
        return $articles;
    }

    /**
     * Récupère les actualités depuis NewsAPI
     */
    private function fetchFromNewsAPI($category, $apiKey) {
        $url = "https://newsapi.org/v2/top-headlines?category=$category&language=fr&apiKey=$apiKey";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Portfolio-RSS-Reader/1.0');
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception('API request failed');
        }
        
        $data = json_decode($response, true);
        $articles = $data['articles'] ?? [];
        
        return array_map(function($article) {
            $imageUrl = $article['urlToImage'] ?? null;
            return [
                'title' => $article['title'] ?? '',
                'description' => $article['description'] ?? '',
                'url' => $article['url'] ?? '',
                'image' => ($imageUrl && filter_var($imageUrl, FILTER_VALIDATE_URL)) ? $imageUrl : 'https://via.placeholder.com/400x250/1e40af/ffffff?text=Tech+News',
                'publishedAt' => $article['publishedAt'] ?? date('Y-m-d\TH:i:s\Z'),
                'source' => $article['source']['name'] ?? 'Unknown',
                'popularity' => 0 // Ajout pour la cohérence du tri
            ];
        }, $articles);
    }

    /**
     * Récupère des articles depuis un flux RSS classique
     */
    private function fetchFromRSS($url) {
        // Essayer d'abord avec cURL si disponible, sinon avec file_get_contents
        $xmlContent = '';
        $httpCode = 200;
        
        if (function_exists('curl_init')) {
            // Utiliser cURL pour récupérer le flux (plus fiable que simplexml_load_file)
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_TIMEOUT, 15); // Augmenter le timeout
            curl_setopt($ch, CURLOPT_USERAGENT, 'Portfolio-RSS-Reader/1.0');
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Désactiver la vérification SSL pour éviter les problèmes
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
            $xmlContent = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $error = curl_error($ch);
            curl_close($ch);

            if ($httpCode !== 200 || empty($xmlContent)) {
                // Si le flux RSS échoue, utiliser les données factices
                error_log("RSS fetch failed: HTTP $httpCode, Error: $error");
                return $this->getMockNews('technology');
            }
        } else {
            // Alternative: utiliser file_get_contents si cURL n'est pas disponible
            $context = stream_context_create([
                'http' => [
                    'timeout' => 15,
                    'user_agent' => 'Portfolio-RSS-Reader/1.0'
                ]
            ]);
            
            $xmlContent = @file_get_contents($url, false, $context);
            if ($xmlContent === false) {
                error_log("RSS fetch failed with file_get_contents for URL: $url");
                return $this->getMockNews('technology');
            }
        }

        // Charger le XML depuis la chaîne
        $rss = @simplexml_load_string($xmlContent);
        if ($rss === false) {
            // Si le parsing XML échoue, utiliser les données factices
            error_log("RSS parsing failed for URL: $url");
            return $this->getMockNews('technology');
        }

        $articles = [];
        // S'assurer que le namespace 'media' est géré
        $namespaces = $rss->getNamespaces(true);

        foreach ($rss->channel->item as $item) {
            $imageUrl = 'https://via.placeholder.com/400x250/1e40af/ffffff?text=News'; // Image par défaut

            // 1) Essayer media:thumbnail puis media:content (Frandroid utilise souvent ce namespace)
            if (isset($namespaces['media'])) {
                $media = $item->children($namespaces['media']);

                if (isset($media->thumbnail) && isset($media->thumbnail->attributes()->url)) {
                    $imageUrl = (string) $media->thumbnail->attributes()->url;
                } elseif (isset($media->content) && isset($media->content->attributes()->url)) {
                    $imageUrl = (string) $media->content->attributes()->url;
                }
            }

            // 2) Fallback sur <enclosure> si c'est une image
            if (($imageUrl === '' || str_contains($imageUrl, 'placeholder.com'))
                && isset($item->enclosure) && isset($item->enclosure->attributes()->url)) {
                $type = (string) $item->enclosure->attributes()->type;
                if (stripos($type, 'image') !== false) {
                    $imageUrl = (string) $item->enclosure->attributes()->url;
                }
            }

            // 3) Nettoyage basique : s'assurer que c'est une URL http(s)
            if (!preg_match('~^https?://~i', $imageUrl)) {
                $imageUrl = 'https://via.placeholder.com/400x250/1e40af/ffffff?text=News';
            }

            // Récupérer les catégories de l'article (pour filtrage IA)
            $categories = [];
            if (isset($item->category)) {
                foreach ($item->category as $cat) {
                    $categories[] = (string) $cat;
                }
            }

            $articles[] = [
                'title' => (string) $item->title,
                'description' => (string) strip_tags($item->description),
                'url' => (string) $item->link,
                'image' => $imageUrl,
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime((string)$item->pubDate)),
                'source' => (string) $rss->channel->title,
                'popularity' => 0, // Ajout pour la cohérence du tri
                'categories' => $categories
            ];
        }

        return $articles;
    }
    
    /**
     * Données factices (fallback si pas de clé API)
     */
    private function getMockNews($category) {
        // Retourne juste les données. Le tri est géré par applySorting()
        return [
            [
                'title' => 'Les NPU révolutionnent l\'IA sur PC',
                'description' => 'Les nouveaux processeurs neuraux permettent d\'exécuter des modèles d\'IA complexes localement.',
                'url' => 'https://www.nvidia.com/fr-fr/ai-data-science/',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
                'publishedAt' => date('Y-m-d\TH:i:s\Z'),
                'source' => 'Tech News',
                'popularity' => 95
            ],
            [
                'title' => 'Microsoft Copilot+ PC : Nouvelle ère de l\'informatique',
                'description' => 'Les PC Copilot+ intègrent des NPU puissants pour des fonctionnalités IA avancées.',
                'url' => 'https://www.microsoft.com/fr-fr/windows/copilot-plus-pcs',
                'image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-1 hour')),
                'source' => 'Microsoft News',
                'popularity' => 88
            ],
            [
                'title' => 'L\'IA embarquée dans les smartphones',
                'description' => 'Les NPU mobiles transforment nos téléphones en machines d\'intelligence artificielle.',
                'url' => 'https://www.qualcomm.com/products/mobile/snapdragon/smartphones',
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-2 hours')),
                'source' => 'Mobile Tech',
                'popularity' => 82
            ]
        ];
    }

    /**
     * Filtre les articles pour ne garder que ceux liés à l'IA / NPU
     */
    private function filterAIArticles(array $articles): array {
        $keywords = [
            'ia', 'intelligence artificielle', 'ia générative',
            'ai ', 'ai,', 'ai:',
            'npu', 'neural processing unit', 'neural engine', 'processeur neuronal',
            'copilot', 'copilot+', 'chatgpt', 'llm', 'gpt',
            'machine learning', 'deep learning',
            'gpu rtx', 'tensor core', 'accélérateur d\'ia'
        ];

        $filtered = array_filter($articles, function ($article) use ($keywords) {
            $haystack = strtolower(($article['title'] ?? '') . ' ' . ($article['description'] ?? ''));
            if (!empty($article['categories']) && is_array($article['categories'])) {
                $haystack .= ' ' . strtolower(implode(' ', $article['categories']));
            }
            foreach ($keywords as $word) {
                if (str_contains($haystack, $word)) {
                    return true;
                }
            }
            return false;
        });

        // Ré-indexer les clés
        return array_values($filtered);
    }
}