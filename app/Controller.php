<?php
/**
 * Base Controller Class
 * All controllers extend this class
 */

class Controller {
    
    /**
     * Load and render a view
     */
    protected function view($view, $data = []) {
        // Extraire le tableau de données en variables
        extract($data);
        
        // Inclure le fichier de vue
        $viewFile = __DIR__ . '/views/pages/' . $view . '.php';
        
        if (file_exists($viewFile)) {
            require_once $viewFile;
        } else {
            die("View not found: " . $view);
        }
    }
    
    /**
     * Load a model
     */
    protected function model($model) {
        $modelFile = __DIR__ . '/models/' . $model . '.php';
        
        if (file_exists($modelFile)) {
            require_once $modelFile;
            return new $model();
        } else {
            die("Model not found: " . $model);
        }
    }
    
    /**
     * Redirect to another page
     */
    protected function redirect($url) {
        header('Location: ' . $url);
        exit;
    }
    
    /**
     * Return JSON response
     */
    protected function json($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }
    
    /**
     * Check if request is POST
     */
    protected function isPost() {
        return $_SERVER['REQUEST_METHOD'] === 'POST';
    }
    
    /**
     * Check if request is AJAX
     */
    protected function isAjax() {
        return !empty($_SERVER['HTTP_X_REQUESTED_WITH']) && 
               strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest';
    }
}
