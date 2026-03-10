<?php
/**
 * RSS Controller
 * Gère l'agrégation et l'affichage des flux RSS
 */

require_once __DIR__ . '/../Controller.php';

class RssController extends Controller {

    /** Dernière erreur rencontrée lors du fetch des flux */
    private ?string $lastFeedError = null;

    /**
     * Page principale du flux RSS
     */
    public function index() {
        $data = [
            'title'       => 'Actualités Tech — Flux RSS',
            'description' => 'Dernières actualités technologiques agrégées',
            'page'        => 'rss',
            'articles'    => [],
        ];
        $this->view('rss', $data);
    }

    /** Cache TTL in seconds (15 minutes) */
    private const CACHE_TTL = 900;

    private function getCached(): ?array {
        $file = sys_get_temp_dir() . '/rss_cache_v5.json';
        if (!file_exists($file)) return null;
        if ((time() - filemtime($file)) > self::CACHE_TTL) return null;
        $data = json_decode(file_get_contents($file), true);
        return is_array($data) ? $data : null;
    }

    private function setCached(array $articles): void {
        $file = sys_get_temp_dir() . '/rss_cache_v5.json';
        file_put_contents($file, json_encode($articles), LOCK_EX);
    }

    /** RSS / Atom feeds to aggregate */
    private const RSS_FEEDS = [
        'https://www.google.fr/alerts/feeds/06235267178635802820/7750195999628698780',
    ];

    public function fetch() {
        if (!$this->isAjax()) {
            $this->json(['error' => 'Invalid request'], 400);
            return;
        }

        $sort = $_GET['sort'] ?? 'recent';

        try {
            $news = $this->getCached();

            if ($news === null) {
                $news = $this->fetchAllFeeds();
                if (empty($news)) {
                    $this->json([
                        'error'   => 'Aucun article récupéré',
                        'message' => $this->lastFeedError ?: 'Le flux RSS n\'a retourné aucun article.',
                    ], 502);
                    return;
                }
                $this->setCached($news);
            }

            $this->json($this->applySorting($news, $sort));

        } catch (Exception $e) {
            $this->json(['error' => 'Failed to fetch news', 'message' => $e->getMessage()], 500);
        }
    }

    private function fetchAllFeeds(): array {
        $all    = [];
        $seen   = [];
        $errors = [];

        foreach (self::RSS_FEEDS as $url) {
            try {
                foreach ($this->fetchFromRSS($url) as $article) {
                    $key = $article['url'] ?? '';
                    if ($key && !isset($seen[$key])) {
                        $seen[$key] = true;
                        $all[]      = $article;
                    }
                }
            } catch (Exception $e) {
                $msg = "Feed ($url): " . $e->getMessage();
                error_log($msg);
                $errors[] = $msg;
            }
        }

        if (empty($all) && !empty($errors)) {
            $this->lastFeedError = implode(' | ', $errors);
        }

        return $all;
    }

    private function applySorting(array $articles, string $sort): array {
        usort($articles, function ($a, $b) use ($sort) {
            $tA = strtotime($a['publishedAt'] ?? '') ?: 0;
            $tB = strtotime($b['publishedAt'] ?? '') ?: 0;
            if ($sort === 'old') return $tA <=> $tB;
            return $tB <=> $tA; // 'recent' (default)
        });
        return $articles;
    }

    private function fetchFromRSS(string $url): array {
        $xmlContent = '';

        if (function_exists('curl_init')) {
            $ch = curl_init();
            curl_setopt_array($ch, [
                CURLOPT_URL            => $url,
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 15,
                CURLOPT_USERAGENT      => 'Portfolio-RSS-Reader/1.0',
                CURLOPT_FOLLOWLOCATION => true,
                CURLOPT_SSL_VERIFYPEER => false,
                CURLOPT_SSL_VERIFYHOST => false,
            ]);
            $xmlContent = curl_exec($ch);
            $httpCode   = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            $curlError  = curl_error($ch);
            curl_close($ch);

            if ($httpCode !== 200 || empty($xmlContent)) {
                throw new Exception("HTTP $httpCode" . ($curlError ? " — $curlError" : '') . " (curl)");
            }
        } else {
            $ctx = stream_context_create(['http' => ['timeout' => 30, 'user_agent' => 'Portfolio-RSS-Reader/1.0']]);
            $xmlContent = @file_get_contents($url, false, $ctx);
            if ($xmlContent === false) {
                throw new Exception("file_get_contents a échoué pour $url");
            }
        }

        $rss = @simplexml_load_string($xmlContent);
        if ($rss === false) {
            throw new Exception("XML invalide reçu du flux");
        }

        $articles = [];

        // Atom feed (Google News / Google Alerts)
        if (isset($rss->entry)) {
            foreach ($rss->entry as $item) {
                $articles[] = [
                    'title'       => (string) $item->title,
                    'description' => strip_tags((string) ($item->summary ?? $item->content)),
                    'url'         => (string) ($item->link['href'] ?? $item->link),
                    'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime((string) $item->published)),
                    'source'      => (string) $rss->title,
                    'popularity'  => 0,
                ];
            }
            return $articles;
        }

        // Standard RSS feed
        $ns = $rss->getNamespaces(true);
        foreach ($rss->channel->item as $item) {
            $articles[] = [
                'title'       => (string) $item->title,
                'description' => strip_tags((string) $item->description),
                'url'         => (string) $item->link,
                'publishedAt' => date('Y-m-d\TH:i:s\Z', strtotime((string) $item->pubDate)),
                'source'      => (string) $rss->channel->title,
                'popularity'  => 0,
            ];
        }

        return $articles;
    }

}
