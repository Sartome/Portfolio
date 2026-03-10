<?php
/**
 * Core Application Class
 * Handles routing, security, and request processing
 */

class Core {
    private $config;
    private $securityConfig;
    private $currentController = 'HomeController';
    private $currentMethod = 'index';
    private $params = [];
    
    public function __construct() {
        // Démarrer la session si elle n'est pas déjà active
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $this->config = require_once __DIR__ . '/../config/app.php';
        $this->securityConfig = require_once __DIR__ . '/../config/security.php';
        
        $this->applySecurityHeaders();
        
        $this->parseUrl();
        $this->loadController();
    }
    
    /**
     * Applique les en-têtes de sécurité à toutes les réponses
     */
    private function applySecurityHeaders() {
        if (headers_sent()) {
            return; // Ne pas appliquer si les en-têtes sont déjà envoyés
        }
        
        $csp = [];
        foreach ($this->securityConfig['csp'] as $directive => $values) {
            $csp[] = $directive . ' ' . implode(' ', $values);
        }
        header('Content-Security-Policy: ' . implode('; ', $csp));
        
        foreach ($this->securityConfig['headers'] as $header => $value) {
            header("$header: $value");
        }
    }
    
    /**
     * Analyse l'URL pour déterminer le contrôleur, la méthode et les paramètres
     */
    private function parseUrl() {
        $url = null;

        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
        } else {
            // Fallback : analyser REQUEST_URI pour prendre en charge les requêtes
            // utilisant uniquement des paramètres de requête (ex : /veille?category=x)
            $requestUri = $_SERVER['REQUEST_URI'] ?? '';
            $requestUri = parse_url($requestUri, PHP_URL_PATH);

            // retirer le script name (ex : /portfolio/index.php) ou le dossier public
            $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? ''), '/\\');
            if ($scriptDir !== '' && $scriptDir !== '/') {
                $requestUri = preg_replace('#^' . preg_quote($scriptDir, '#') . '#', '', $requestUri);
            }

            // retirer eventuel '/public' si présent dans l'URL
            $requestUri = preg_replace('#^/public#', '', $requestUri);

            $url = trim($requestUri, '/');
        }

        if ($url !== null && $url !== '') {
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $segments = explode('/', $url);

            // Déterminer le contrôleur (Validation Alphanumérique)
            if (!empty($segments[0])) {
                $controllerName = preg_replace('/[^a-zA-Z0-9]/', '', $segments[0]);
                $controller = ucfirst(strtolower($controllerName)) . 'Controller';

                if (file_exists(__DIR__ . '/controllers/' . $controller . '.php')) {
                    $this->currentController = $controller;
                    unset($segments[0]);
                }
            }

            // Déterminer la méthode (Validation Alphanumérique + underscore)
            if (isset($segments[1]) && !empty($segments[1])) {
                $methodName = preg_replace('/[^a-zA-Z0-9_]/', '', $segments[1]);
                if (!empty($methodName)) {
                    $this->currentMethod = $methodName;
                }
                unset($segments[1]);
            }

            $this->params = $segments ? array_values($segments) : [];
        }
    }
    
    /**
     * Charge et instancie le contrôleur
     */
    private function loadController() {
        $controllerFile = __DIR__ . '/controllers/' . $this->currentController . '.php';
        
        if (!file_exists($controllerFile)) {
             // Gérer l'erreur 404 - charger un contrôleur d'erreur
             require_once __DIR__ . '/controllers/ErrorController.php';
             $this->currentController = 'ErrorController';
             $this->currentMethod = 'notFound';
             $controllerFile = __DIR__ . '/controllers/ErrorController.php';
        }

        require_once $controllerFile;
        $controller = new $this->currentController();
        
        // CORRECTION SÉCURITÉ :
        // 1. Bloque les méthodes magiques (commençant par __)
        // 2. Utilise is_callable pour s'assurer que la méthode est PUBLIQUE
        if (strpos($this->currentMethod, '__') === 0 || !is_callable([$controller, $this->currentMethod])) {
            $this->currentMethod = 'index';
            
             // Si même la méthode 'index' n'est pas appelable, déclencher une 404
            if (!is_callable([$controller, $this->currentMethod])) {
                 require_once __DIR__ . '/controllers/ErrorController.php';
                 $controller = new ErrorController();
                 $this->currentMethod = 'notFound';
            }
        }
        
        call_user_func_array([$controller, $this->currentMethod], $this->params);
    }
    
    /**
     * Récupère une valeur de configuration
     */
    public static function config($key = null, $default = null) {
        static $config = null;
        if ($config === null) {
            $config = require __DIR__ . '/../config/app.php';
        }
        
        if ($key === null) {
            return $config;
        }
        
        $keys = explode('.', $key);
        $value = $config;
        
        foreach ($keys as $k) {
            if (!isset($value[$k])) {
                return $default;
            }
            $value = $value[$k];
        }
        
        return $value;
    }
    
    /**
     * Génère un jeton CSRF
     */
    public static function generateCsrfToken() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    /**
     * Vérifie un jeton CSRF (protégé contre les attaques par synchronisation)
     */
    public static function verifyCsrfToken($token) {
        if (!isset($_SESSION['csrf_token']) || !$token) {
            return false;
        }
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    
    /**
     * Échappe les données pour un affichage HTML sécurisé (prévention XSS)
     */
    public static function escape($data) {
        if (is_array($data)) {
            return array_map([self::class, 'escape'], $data);
        }
        return htmlspecialchars($data ?? '', ENT_QUOTES, 'UTF-8');
    }

    /**
     * Output opening tags for React root area.  Returns a string so
     * it can be echoed in layouts.  The caller is responsible for
     * closing it via reactRootEnd().
     *
     * @param string $page  short page identifier (used by JS router)
     * @param array $props  associative data to serialize and pass
     * @return string
     */
    public static function reactRootStart($page = '', $props = []) {
        $p = htmlspecialchars($page ?? '', ENT_QUOTES, 'UTF-8');
        $json = htmlspecialchars(json_encode($props ?? []), ENT_QUOTES, 'UTF-8');
        return "<main>\n" .
               "    <div id=\"react-root\" data-page=\"{$p}\" data-props='{$json}'>\n";
    }

    /**
     * Close the tags opened by reactRootStart().
     * @return string
     */
    public static function reactRootEnd() {
        return "    </div>\n</main>\n";
    }

    /**
     * Generate the appropriate <script> tag(s) for the React bundle.
     *
     * - If a Vite build exists in public/assets/react/assets/index.js, load
     *   it as a module.
     * - Otherwise, if a Vite dev server is reachable on localhost:5173,
     *   inject the client + module from the server.
     * - Fallback: use the legacy Babel-based script in assets/js/app.jsx.
     *
     * The helper uses the global asset() function if available; if not,
     * it computes a naive path based on the $basePath variable.
     *
     * @return string
     */
    /**
     * Returns a <link> tag for the Vite-built Tailwind CSS, or empty string if not found.
     */
    public static function reactStylesheetTag(): string {
        $asset = function($path) {
            if (function_exists('asset')) {
                return asset($path);
            }
            $bp = ($GLOBALS['basePath'] ?? '/');
            if (substr($bp, -1) !== '/') {
                $bp .= '/';
            }
            return $bp . ltrim($path, '/');
        };

        $builtCss = __DIR__ . '/../public/assets/react/assets/index.css';
        if (file_exists($builtCss)) {
            return '<link rel="stylesheet" href="' . $asset('assets/react/assets/index.css') . '">';
        }

        // Dev server
        $fp = @fsockopen('localhost', 5173, $errno, $errstr, 0.05);
        if ($fp) {
            fclose($fp);
            return ''; // Vite dev server injects CSS via JS module
        }

        return ''; // No built CSS found; CDN fallback handled in header
    }

    /**
     * Returns <script> tags for React / Babel CDN only when needed (Babel fallback mode).
     * When the Vite bundle or dev server is available, returns empty string.
     */
    public static function reactCdnScripts(): string {
        $builtPath = __DIR__ . '/../public/assets/react/assets/index.js';
        if (file_exists($builtPath)) {
            return ''; // Vite bundle is present — no CDN needed
        }
        $fp = @fsockopen('localhost', 5173, $errno, $errstr, 0.05);
        if ($fp) { fclose($fp); return ''; } // Vite dev server — no CDN needed
        if (!file_exists(__DIR__ . '/../public/assets/js/app.jsx')) {
            return ''; // nothing to fall back to
        }
        // Babel fallback — load UMD React + Babel transpiler
        return implode("\n", [
            '<script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>',
            '<script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>',
            '<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>',
        ]);
    }

    public static function reactScriptTag() {
        // helper to resolve asset paths
        $asset = function($path) {
            if (function_exists('asset')) {
                return asset($path);
            }
            // rudimentary fallback: assume $basePath has been set globally
            $bp = ($GLOBALS['basePath'] ?? '/');
            if (substr($bp, -1) !== '/') {
                $bp .= '/';
            }
            return $bp . ltrim($path, '/');
        };

        $builtPath = __DIR__ . '/../public/assets/react/assets/index.js';
        if (file_exists($builtPath)) {
            return '<script type="module" src="' . $asset('assets/react/assets/index.js') . '"></script>';
        }

        // detect dev server
        $dev = false;
        $fp = @fsockopen('localhost', 5173, $errno, $errstr, 0.05);
        if ($fp) {
            $dev = true;
            fclose($fp);
        }
        if ($dev) {
            // during development, point at the Vite server for HMR
            // vite.config.js sets root:'./frontend', so entry is /src/main.jsx
            return '<script type="module" src="http://localhost:5173/@vite/client"></script>' . "\n"
                 . '<script type="module" src="http://localhost:5173/src/main.jsx"></script>';
        }

        $fallbackPath = $asset('assets/js/app.jsx');
        if (file_exists(__DIR__ . '/../public/assets/js/app.jsx')) {
            return '<script type="text/babel" src="' . $fallbackPath . '"></script>';
        }
        return '<!-- React bundle not found; run `npm run build` or start the dev server -->';
    }
}