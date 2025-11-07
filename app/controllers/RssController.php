<?php
/**
 * RSS Controller
 * Handles RSS feed aggregation and display
 */

require_once '../app/Controller.php';

class RssController extends Controller {
    
    public function index() {
        $data = [
            'title' => 'Actualités Tech - Flux RSS',
            'description' => 'Dernières actualités technologiques agrégées',
            'page' => 'rss'
        ];
        
        $this->view('rss', $data);
    }
    
    /**
     * API endpoint to fetch news
     */
    public function fetch() {
        if (!$this->isAjax()) {
            $this->json(['error' => 'Invalid request'], 400);
        }
        
        $category = $_GET['category'] ?? 'technology';
        $apiKey = Core::config('newsapi_key');
        
        if ($apiKey === 'YOUR_API_KEY_HERE') {
            // Return mock data if API key not configured
            $this->json($this->getMockNews($category));
        }
        
        try {
            $news = $this->fetchFromNewsAPI($category, $apiKey);
            $this->json($news);
        } catch (Exception $e) {
            $this->json(['error' => 'Failed to fetch news'], 500);
        }
    }
    
    /**
     * Fetch news from NewsAPI
     */
    private function fetchFromNewsAPI($category, $apiKey) {
        $url = "https://newsapi.org/v2/top-headlines?category=$category&language=fr&apiKey=$apiKey";
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode !== 200) {
            throw new Exception('API request failed');
        }
        
        $data = json_decode($response, true);
        return $data['articles'] ?? [];
    }
    
    /**
     * Return mock news data for demo
     */
    private function getMockNews($category) {
        return [
            [
                'title' => 'Les NPU révolutionnent l\'IA sur PC',
                'description' => 'Les nouveaux processeurs neuraux permettent d\'exécuter des modèles d\'IA complexes localement.',
                'url' => '#',
                'urlToImage' => 'https://images.unsplash.com/photo-1518770660439-4636190af475',
                'publishedAt' => date('Y-m-d\TH:i:s\Z'),
                'source' => ['name' => 'Tech News']
            ],
            [
                'title' => 'Microsoft Copilot+ PC : Nouvelle ère de l\'informatique',
                'description' => 'Les PC Copilot+ intègrent des NPU puissants pour des fonctionnalités IA avancées.',
                'url' => '#',
                'urlToImage' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-1 hour')),
                'source' => ['name' => 'Microsoft News']
            ],
            [
                'title' => 'L\'IA embarquée dans les smartphones',
                'description' => 'Les NPU mobiles transforment nos téléphones en machines d\'intelligence artificielle.',
                'url' => '#',
                'urlToImage' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-2 hours')),
                'source' => ['name' => 'Mobile Tech']
            ],
            [
                'title' => 'Apple Neural Engine atteint 35 TOPS',
                'description' => 'Le NPU d\'Apple dans les puces M3 offre des performances record.',
                'url' => '#',
                'urlToImage' => 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-3 hours')),
                'source' => ['name' => 'Apple Insider']
            ],
            [
                'title' => 'Efficacité énergétique : L\'avantage des NPU',
                'description' => 'Les NPU consomment 10x moins d\'énergie que les GPU pour l\'IA.',
                'url' => '#',
                'urlToImage' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime('-4 hours')),
                'source' => ['name' => 'Green Tech']
            ]
        ];
    }
}
