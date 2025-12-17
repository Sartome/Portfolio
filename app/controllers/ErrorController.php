<?php
/**
 * Error Controller
 * Handles error pages and exceptions
 */

require_once __DIR__ . '/../Controller.php';

class ErrorController extends Controller {
    
    /**
     * Handle 404 Not Found errors
     */
    public function notFound() {
        http_response_code(404);
        
        $data = [
            'title' => 'Page non trouvée - 404',
            'description' => 'La page que vous recherchez n\'existe pas.',
            'page' => 'error',
            'error_code' => 404,
            'error_message' => 'Page non trouvée'
        ];
        
        $this->view('error', $data);
    }
    
    /**
     * Handle 500 Internal Server errors
     */
    public function serverError() {
        http_response_code(500);
        
        $data = [
            'title' => 'Erreur serveur - 500',
            'description' => 'Une erreur interne du serveur s\'est produite.',
            'page' => 'error',
            'error_code' => 500,
            'error_message' => 'Erreur interne du serveur'
        ];
        
        $this->view('error', $data);
    }
    
    /**
     * Handle 403 Forbidden errors
     */
    public function forbidden() {
        http_response_code(403);
        
        $data = [
            'title' => 'Accès interdit - 403',
            'description' => 'Vous n\'avez pas l\'autorisation d\'accéder à cette page.',
            'page' => 'error',
            'error_code' => 403,
            'error_message' => 'Accès interdit'
        ];
        
        $this->view('error', $data);
    }
    
    /**
     * Default index method
     */
    public function index() {
        $this->notFound();
    }
}
