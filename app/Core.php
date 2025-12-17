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
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            
            // Déterminer le contrôleur (Validation Alphanumérique)
            if (!empty($url[0])) {
                $controllerName = preg_replace('/[^a-zA-Z0-9]/', '', $url[0]);
                $controller = ucfirst(strtolower($controllerName)) . 'Controller';
                
                if (file_exists(__DIR__ . '/controllers/' . $controller . '.php')) {
                    $this->currentController = $controller;
                    unset($url[0]);
                }
            }
            
            // Déterminer la méthode (Validation Alphanumérique + underscore)
            if (isset($url[1]) && !empty($url[1])) {
                $methodName = preg_replace('/[^a-zA-Z0-9_]/', '', $url[1]);
                if (!empty($methodName)) {
                    $this->currentMethod = $methodName;
                }
                unset($url[1]);
            }
            
            $this->params = $url ? array_values($url) : [];
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
}