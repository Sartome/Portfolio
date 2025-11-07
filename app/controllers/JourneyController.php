<?php
/**
 * Journey Controller
 * Professional and educational journey
 */

require_once '../app/Controller.php';

class JourneyController extends Controller {
    
    public function index() {
        $data = [
            'title' => 'Parcours Professionnel',
            'description' => 'Mon parcours éducatif et professionnel en développement web',
            'page' => 'journey',
            'timeline' => $this->getTimeline()
        ];
        
        $this->view('journey', $data);
    }
    
    /**
     * Get professional timeline
     */
    private function getTimeline() {
        return [
            [
                'year' => '2024-2025',
                'type' => 'experience',
                'title' => 'Alternance - Administrateur Système',
                'organization' => 'Mairie d\'Orly',
                'description' => 'Gestion et maintenance du parc informatique municipal. Configuration Windows Server, administration GLPI pour la gestion des incidents, mise à niveau des infrastructures et support technique aux agents.',
                'skills' => ['GLPI', 'Windows Server', 'Administration', 'Support Technique', 'Maintenance'],
                'icon' => 'work'
            ],
            [
                'year' => '2024-2025',
                'type' => 'education',
                'title' => 'BTS SIO - SLAM (2ème année)',
                'organization' => 'Lycée Vilgénis, Massy',
                'description' => 'Formation en développement d\'applications, spécialisation Solutions Logicielles et Applications Métiers. Alternance à la Mairie d\'Orly.',
                'skills' => ['PHP', 'JavaScript', 'MySQL', 'MVC', 'POO', 'Git'],
                'icon' => 'education'
            ],
            [
                'year' => '2024',
                'type' => 'project',
                'title' => 'SoundFly - Application YouTube',
                'organization' => 'Projet Personnel',
                'description' => 'Développement d\'une application web de recherche et téléchargement YouTube avec API intégrée. Interface moderne et fonctionnalités avancées.',
                'skills' => ['API YouTube', 'JavaScript', 'Frontend', 'Integration API'],
                'icon' => 'code',
                'link' => 'https://github.com/matskobinks/soundfly'
            ],
            [
                'year' => '2025',
                'type' => 'project',
                'title' => 'Refonte Portfolio MVC',
                'organization' => 'Projet Personnel',
                'description' => 'Développement d\'un portfolio moderne avec architecture MVC, sécurité renforcée et design responsive.',
                'skills' => ['PHP MVC', 'Security', 'TailwindCSS', 'UX/UI'],
                'icon' => 'code'
            ],
            [
                'year' => '2023',
                'type' => 'project',
                'title' => 'Projet Unreal Engine 5',
                'organization' => 'Projet Personnel',
                'description' => 'Création d\'un projet interactif avec Unreal Engine 5, exploration des graphismes temps réel et développement de gameplay.',
                'skills' => ['Unreal Engine 5', 'Blueprints', '3D', 'Game Development'],
                'icon' => 'code'
            ],
            [
                'year' => '2023-2024',
                'type' => 'education',
                'title' => 'BTS SIO - SLAM (1ère année)',
                'organization' => 'Lycée Vilgénis, Massy',
                'description' => 'Formation en développement d\'applications, spécialisation Solutions Logicielles et Applications Métiers.',
                'skills' => ['HTML5', 'CSS3', 'JavaScript ES6+', 'Responsive Design'],
                'icon' => 'education'
            ],
            [
                'year' => '2023',
                'type' => 'certification',
                'title' => 'Certifications Web',
                'organization' => 'Plateformes en ligne',
                'description' => 'Obtention de certifications en développement web, sécurité et bonnes pratiques.',
                'skills' => ['Web Security', 'Best Practices', 'Performance'],
                'icon' => 'certificate'
            ],
            [
                'year' => '2022-2023',
                'type' => 'education',
                'title' => 'Début en Développement Web',
                'organization' => 'Auto-didacte',
                'description' => 'Découverte et apprentissage des fondamentaux du développement web.',
                'skills' => ['HTML', 'CSS', 'JavaScript', 'Problem Solving'],
                'icon' => 'start'
            ]
        ];
    }
}
