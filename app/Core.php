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
        session_start();
        $this->config = require_once __DIR__ . '/../config/app.php';
        $this->securityConfig = require_once __DIR__ . '/../config/security.php';
        
        // Apply security headers
        $this->applySecurityHeaders();
        
        // Parse URL and route
        $this->parseUrl();
        $this->loadController();
    }
    
    /**
     * Apply security headers to all responses
     */
    private function applySecurityHeaders() {
        // CSP Header
        $csp = [];
        foreach ($this->securityConfig['csp'] as $directive => $values) {
            $csp[] = $directive . ' ' . implode(' ', $values);
        }
        header('Content-Security-Policy: ' . implode('; ', $csp));
        
        // Other security headers
        foreach ($this->securityConfig['headers'] as $header => $value) {
            header("$header: $value");
        }
    }
    
    /**
     * Parse URL to determine controller, method, and parameters
     */
    private function parseUrl() {
        if (isset($_GET['url'])) {
            $url = rtrim($_GET['url'], '/');
            $url = filter_var($url, FILTER_SANITIZE_URL);
            $url = explode('/', $url);
            
            // Determine controller
            if (!empty($url[0])) {
                $controller = ucfirst($url[0]) . 'Controller';
                if (file_exists(__DIR__ . '/controllers/' . $controller . '.php')) {
                    $this->currentController = $controller;
                    unset($url[0]);
                }
            }
            
            // Determine method
            if (isset($url[1]) && !empty($url[1])) {
                $this->currentMethod = $url[1];
                unset($url[1]);
            }
            
            // Remaining values are parameters
            $this->params = $url ? array_values($url) : [];
        }
    }
    
    /**
     * Load and instantiate controller
     */
    private function loadController() {
        require_once __DIR__ . '/controllers/' . $this->currentController . '.php';
        $controller = new $this->currentController();
        
        // Check if method exists
        if (!method_exists($controller, $this->currentMethod)) {
            $this->currentMethod = 'index';
        }
        
        // Call controller method with parameters
        call_user_func_array([$controller, $this->currentMethod], $this->params);
    }
    
    /**
     * Get configuration value
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
     * Generate CSRF token
     */
    public static function generateCsrfToken() {
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }
    
    /**
     * Verify CSRF token
     */
    public static function verifyCsrfToken($token) {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }
    
    /**
     * Sanitize input
     */
    public static function sanitize($data) {
        if (is_array($data)) {
            return array_map([self::class, 'sanitize'], $data);
        }
        return htmlspecialchars(strip_tags($data), ENT_QUOTES, 'UTF-8');
    }
}
