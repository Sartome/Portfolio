<?php
/**
 * Projects Controller
 * Showcase of important projects
 */

require_once __DIR__ . '/../Controller.php';

class ProjectsController extends Controller {
    
    public function index() {
        $data = [
            'title' => 'Projets - Portfolio',
            'description' => 'Découvrez mes projets les plus importants et significatifs',
            'page' => 'projects',
            'projects' => $this->getProjects()
        ];
        
        $this->view('projects', $data);
    }
    
    /**
     * Get featured projects
     */
    private function getProjects() {
        return [
            [
                'title' => 'Portfolio MVC Moderne',
                'description' => 'Portfolio professionnel avec architecture MVC complète, sécurité renforcée (CSP, CSRF), design responsive et animations modernes.',
                'technologies' => ['PHP', 'MVC', 'TailwindCSS', 'Security', 'MySQL'],
                'image' => 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
                'github' => 'https://github.com/Sartome/portfolio',
                'demo' => null,
                'featured' => true,
                'year' => '2025'
            ],
            [
                'title' => 'SoundFly - Application YouTube',
                'description' => 'Application web moderne pour la recherche et le téléchargement de vidéos YouTube. Interface intuitive avec API intégrée, recherche avancée et gestion des téléchargements.',
                'technologies' => ['JavaScript', 'API YouTube', 'Frontend', 'HTML5', 'CSS3'],
                'image' => 'https://storage.googleapis.com/pr-newsroom-wp/1/2025/09/Spotify_Generic-Headers_092325_MC_03_V3-1.jpg',
                'github' => 'https://github.com/matskobinks/soundfly',
                'demo' => null,
                'featured' => true,
                'year' => '2024'
            ],
            [
                'title' => 'Gestionnaire GLPI - Mairie d\'Orly',
                'description' => 'Administration et configuration de GLPI pour la gestion des incidents informatiques. Personnalisation des workflows et intégration avec l\'infrastructure existante.',
                'technologies' => ['GLPI', 'PHP', 'MySQL', 'Administration', 'Support Technique'],
                'image' => 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
                'github' => null,
                'demo' => null,
                'featured' => false,
                'year' => '2024'
            ],
            [
                'title' => 'Infrastructure Windows Server - GPO',
                'description' => 'Compte-rendu de Projet : Optimisation et Sécurisation de l\'Infrastructure via GPO. Mise en place de stratégies de groupe pour uniformiser la gestion des postes de travail, sécuriser les accès et automatiser le déploiement des ressources dans un environnement Windows Server 2022.',
                'technologies' => ['Windows Server 2022', 'Active Directory', 'GPO', 'PowerShell', 'Sécurité', 'RGPD'],
                'image' => 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop',
                'github' => null,
                'demo' => null,
                'featured' => false,
                'year' => '2024'
            ],
            [
                'title' => 'Marketplace - Sell and Buy',
                'description' => 'Place de marché complète pour l\'achat et la vente de produits. Interface moderne avec gestion des annonces, panier d\'achat et système de paiement intégré.',
                'technologies' => ['PHP', 'JavaScript', 'MySQL', 'HTML5', 'CSS3', 'E-commerce'],
                'image' => 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
                'github' => 'https://github.com/Sartome/sellandbuy',
                'demo' => 'http://localhost/sellandbuy/',
                'featured' => true,
                'year' => '2024'
            ],
            [
                'title' => 'Digital Zoo - Gestion Zoo',
                'description' => 'Site de gestion complet pour un zoo fictif. Suivi des animaux, planning des soigneurs, gestion des enclos et interface d\'administration.',
                'technologies' => ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3', 'Administration'],
                'image' => 'https://i.ytimg.com/vi/QB7JwYCHyD4/maxresdefault.jpg',
                'github' => 'https://github.com/Sartome/digital-zoo',
                'demo' => 'http://localhost/digital-zoo/login.php',
                'featured' => true,
                'year' => '2024'
            ],
            [
                'title' => 'API de Gestion des Incidents',
                'description' => 'Développement d\'une API REST pour la gestion des incidents techniques avec authentification JWT et documentation Swagger.',
                'technologies' => ['PHP', 'API REST', 'JWT', 'MySQL', 'Swagger'],
                'image' => 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop',
                'github' => null,
                'demo' => null,
                'featured' => false,
                'year' => '2023'
            ],
            [
                'title' => 'Projet Unreal Engine 5',
                'description' => 'Création d\'un projet interactif avec Unreal Engine 5. Exploration des graphismes temps réel, développement de gameplay et utilisation des Blueprints.',
                'technologies' => ['Unreal Engine 5', 'Blueprints', '3D', 'C++', 'Game Development'],
                'image' => 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop',
                'github' => null,
                'demo' => null,
                'featured' => false,
                'year' => '2023'
            ]
        ];
    }
}
