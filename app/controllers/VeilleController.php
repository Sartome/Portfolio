<?php
/**
 * Veille Controller
 * Technology watch on NPU (Neural Processing Units)
 */

require_once __DIR__ . '/../Controller.php';

class VeilleController extends Controller {
    
    public function index() {
        $data = [
            'title' => 'Veille Technologique - NPU',
            'description' => 'Veille technologique sur les Neural Processing Units (NPU) et leur impact sur l\'IA',
            'page' => 'veille',
            'articles' => $this->getNpuArticles()
        ];
        
        $this->view('veille', $data);
    }
    
    /**
     * Get curated NPU articles
     */
    private function getNpuArticles() {
        return [
            [
                'title' => 'Qu\'est-ce qu\'un NPU (Neural Processing Unit) ?',
                'date' => '2024-11-01',
                'category' => 'Introduction',
                'summary' => 'Les NPU sont des processeurs spécialisés conçus pour accélérer les calculs d\'intelligence artificielle et de machine learning. Contrairement aux CPU et GPU traditionnels, les NPU sont optimisés pour les opérations matricielles et les réseaux de neurones.',
                'content' => 'Les Neural Processing Units (NPU) représentent une évolution majeure dans le domaine des processeurs. Conçus spécifiquement pour l\'IA, ils offrent des performances exceptionnelles pour les tâches de deep learning tout en consommant moins d\'énergie que les solutions traditionnelles.',
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475',
                'tags' => ['NPU', 'IA', 'Hardware']
            ],
            [
                'title' => 'Intel, AMD et Qualcomm : La course aux NPU',
                'date' => '2024-10-15',
                'category' => 'Industrie',
                'summary' => 'Les trois géants du processeur investissent massivement dans les NPU pour leurs prochaines générations de puces. Intel avec son AI Boost, AMD avec XDNA, et Qualcomm avec Hexagon NPU.',
                'content' => 'La compétition s\'intensifie dans le domaine des NPU. Intel intègre des AI Boost dans ses processeurs Meteor Lake, AMD développe son architecture XDNA, et Qualcomm pousse son Hexagon NPU dans les Snapdragon. Cette course vise à rendre l\'IA accessible sur tous les appareils.',
                'image' => 'https://images.unsplash.com/photo-1555255707-c07966088b7b',
                'tags' => ['Intel', 'AMD', 'Qualcomm', 'NPU']
            ],
            [
                'title' => 'NPU dans les smartphones : L\'IA dans votre poche',
                'date' => '2024-09-20',
                'category' => 'Mobile',
                'summary' => 'Les NPU transforment les smartphones en véritables machines d\'IA. Photographie computationnelle, traduction en temps réel, reconnaissance vocale : découvrez les applications concrètes.',
                'content' => 'Les NPU mobiles permettent des fonctionnalités IA avancées sans connexion cloud. La photographie computationnelle améliore la qualité des photos en temps réel, la traduction vocale fonctionne offline, et la reconnaissance faciale devient plus rapide et sécurisée.',
                'image' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9',
                'tags' => ['Mobile', 'NPU', 'Smartphone', 'IA']
            ],
            [
                'title' => 'Apple Neural Engine : Le NPU de Cupertino',
                'date' => '2024-08-10',
                'category' => 'Apple',
                'summary' => 'Depuis l\'iPhone X, Apple intègre un Neural Engine dans ses puces. Avec les M3 et A17, ce NPU atteint 35 trillions d\'opérations par seconde.',
                'content' => 'L\'Apple Neural Engine est l\'un des NPU les plus avancés du marché. Intégré dans les puces A-series et M-series, il alimente Face ID, les modes photo intelligents, Siri, et bientôt des fonctionnalités d\'IA génératives locales.',
                'image' => 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9',
                'tags' => ['Apple', 'Neural Engine', 'NPU', 'M3']
            ],
            [
                'title' => 'NPU vs GPU : Quelle différence ?',
                'date' => '2024-07-25',
                'category' => 'Comparaison',
                'summary' => 'Bien que les GPU puissent exécuter des tâches d\'IA, les NPU sont spécifiquement optimisés pour ces workloads. Comparaison approfondie de l\'architecture et des performances.',
                'content' => 'Les GPU excellent dans les calculs parallèles massifs, mais les NPU vont plus loin pour l\'IA. Ils utilisent des architectures spécialisées comme les systolic arrays, consomment moins d\'énergie, et sont optimisés pour les opérations de quantification et sparsité des réseaux neuronaux.',
                'image' => 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea',
                'tags' => ['NPU', 'GPU', 'Comparaison', 'Performance']
            ],
            [
                'title' => 'Windows 11 et les PC AI : L\'ère Copilot+',
                'date' => '2024-06-05',
                'category' => 'Software',
                'summary' => 'Microsoft mise sur les NPU pour ses PC Copilot+. Ces machines requièrent un NPU capable de 40+ TOPS pour exécuter des modèles d\'IA localement.',
                'content' => 'Les PC Copilot+ de Microsoft représentent une nouvelle catégorie d\'ordinateurs. Avec un NPU puissant, ils peuvent exécuter des LLM localement, offrir des fonctionnalités de Studio Effects, de Windows Recall, et d\'autres features IA sans dépendre du cloud.',
                'image' => 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
                'tags' => ['Windows 11', 'Microsoft', 'Copilot', 'NPU']
            ],
            [
                'title' => 'L\'avenir des NPU : Edge AI et IoT',
                'date' => '2024-05-15',
                'category' => 'Futur',
                'summary' => 'Les NPU permettront l\'IA embarquée partout : voitures autonomes, objets connectés, robots. L\'Edge AI devient réalité grâce à ces processeurs spécialisés.',
                'content' => 'L\'avenir des NPU s\'étend au-delà des smartphones et PC. Dans l\'automobile, ils alimenteront les systèmes ADAS et la conduite autonome. Dans l\'IoT, ils permettront des caméras de sécurité intelligentes, des assistants domestiques performants, et des robots industriels avancés.',
                'image' => 'https://images.unsplash.com/photo-1535378917042-10a22c95931a',
                'tags' => ['Edge AI', 'IoT', 'NPU', 'Futur']
            ],
            [
                'title' => 'Efficacité énergétique : L\'atout majeur des NPU',
                'date' => '2024-04-20',
                'category' => 'Performance',
                'summary' => 'Les NPU consomment jusqu\'à 10x moins d\'énergie que les GPU pour les mêmes tâches d\'IA. Un avantage crucial pour les appareils mobiles et l\'informatique durable.',
                'content' => 'L\'efficacité énergétique des NPU est révolutionnaire. En utilisant des architectures dédiées et des techniques comme la quantification INT8, ils atteignent des ratios performance/watt exceptionnels. Cela permet des batteries plus durables et un impact environnemental réduit.',
                'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e',
                'tags' => ['Efficacité', 'NPU', 'Énergie', 'Écologie']
            ]
        ];
    }
}
