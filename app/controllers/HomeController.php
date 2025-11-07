<?php
/**
 * Home Controller
 * Handles the main landing page
 */

require_once __DIR__ . '/../Controller.php';

class HomeController extends Controller {
    
    public function index() {
        $data = [
            'title' => 'Accueil - Portfolio',
            'description' => 'Portfolio professionnel de Marwane El arrass - Développeur Web Full-Stack',
            'page' => 'home'
        ];
        
        $this->view('home', $data);
    }
}
