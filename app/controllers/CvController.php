<?php
/**
 * CV Controller
 * Handles CV display and download
 */

require_once __DIR__ . '/../Controller.php';

class CvController extends Controller {

    public function index() {
        $data = [
            'title' => 'Curriculum Vitae - Marwane El arrass',
            'description' => 'Parcours, compétences et expérience professionnelle de Marwane El arrass',
            'page' => 'cv',
            'cvData' => $this->getCvData()
        ];

        $this->view('cv', $data);
    }

    private function getCvData() {
        return [
            'name'     => 'Marwane El arrass',
            'title'    => 'Développeur Web Full-Stack',
            'email'    => 'elarrassmarwane@gmail.com',
            'github'   => 'https://github.com/Sartome',
            'linkedin' => 'https://www.linkedin.com/in/marwane-el-arrass/',
            'location' => 'Île-de-France',
            'summary'  => 'Étudiant en BTS SIO SLAM 2ème année, en alternance à la Mairie d\'Orly. Passionné par le développement web full-stack, la sécurité informatique et les technologies modernes. Rigoureux, autonome et toujours en quête d\'apprentissage.',
            'experience' => [
                [
                    'title'       => 'Alternance — Administrateur Système & Développeur',
                    'company'     => 'Mairie d\'Orly',
                    'period'      => '2025 – 2026',
                    'description' => 'Gestion et maintenance du parc informatique municipal. Administration GLPI pour la gestion des incidents, préparation d\'ordinateurs (mise à jour, logiciels, Windows 11), mise à niveau des infrastructures réseau et support technique aux agents.',
                    'skills'      => ['GLPI', 'Administration Système', 'Support Technique', 'Windows 11', 'Réseau']
                ]
            ],
            'education' => [
                [
                    'title'       => 'BTS SIO — Option SLAM (2ème année)',
                    'school'      => 'Ingetis, Paris',
                    'period'      => '2025 – 2026',
                    'description' => 'Solutions Logicielles et Applications Métiers. Alternance à la Mairie d\'Orly.'
                ],
                [
                    'title'       => 'BTS SIO — Option SLAM (1ère année)',
                    'school'      => 'Ingetis, Paris',
                    'period'      => '2023 – 2024',
                    'description' => 'Solutions Logicielles et Applications Métiers. Configuration Windows Server, bases PHP, JavaScript et MySQL.'
                ],
                [
                    'title'       => 'Auto-didacte en Développement Web',
                    'school'      => 'Formation personnelle',
                    'period'      => '2022 – 2023',
                    'description' => 'Apprentissage des fondamentaux : HTML, CSS, JavaScript, bases de la programmation.'
                ]
            ],
            'skills' => [
                'Frontend'  => ['HTML5', 'CSS3', 'JavaScript ES6+', 'React', 'TailwindCSS', 'Bootstrap', 'Responsive Design'],
                'Backend'   => ['PHP 8+', 'Architecture MVC', 'API REST', 'MySQL', 'PDO', 'Sécurité Web', 'CSRF/CSP'],
                'Outils'    => ['Git', 'GitHub', 'VS Code', 'GLPI', 'Agile/Scrum', 'Documentation'],
                'Systèmes'  => ['Windows Server 2022', 'Active Directory', 'GPO', 'PowerShell', 'Linux (bases)']
            ],
            'languages' => [
                ['name' => 'Français', 'level' => 'Maternelle'],
                ['name' => 'Anglais',  'level' => 'Courrant (C2)'],
                ['name' => 'Espagnole',    'level' => 'Intermédiaire (B1)']
            ],
            'certifications' => [
                'Certifications Web — développement, sécurité et bonnes pratiques (2023)'
            ],
            'pdfPath' => null // no PDF file currently present
        ];
    }

    public function download() {
        // Try multiple filename variants
        $candidates = [
            __DIR__ . '/../../public/assets/CV alternance.pdf',
            __DIR__ . '/../../public/assets/cv_alternance.pdf',
            __DIR__ . '/../../public/assets/CV_alternance.pdf',
        ];

        foreach ($candidates as $file) {
            if (file_exists($file)) {
                header('Content-Type: application/pdf');
                header('Content-Disposition: attachment; filename="CV_Marwane_ElArrass.pdf"');
                header('Content-Length: ' . filesize($file));
                ob_clean();
                flush();
                readfile($file);
                exit;
            }
        }

        http_response_code(404);
        echo "CV PDF non disponible pour le moment.";
    }

    /**
     * Serve other portfolio documents (attestation, lettre de motivation, BTS modules)
     * URL: /cv/doc/<name>  e.g. /cv/doc/attestation
     */
    public function doc($name = '') {
        $allowed = [
            'attestation' => ['file' => 'attestation.pdf',  'download' => 'Attestation_Marwane_ElArrass.pdf'],
            'motivation'  => ['file' => 'motivated.pdf',    'download' => 'Lettre_Motivation_Marwane_ElArrass.pdf'],
            'mod1'        => ['file' => 'mod1.pdf',         'download' => 'Module1_BTS_SIO.pdf'],
            'mod2'        => ['file' => 'mod2.pdf',         'download' => 'Module2_BTS_SIO.pdf'],
            'mod3'        => ['file' => 'mod3.pdf',         'download' => 'Module3_BTS_SIO.pdf'],
            'mod4'        => ['file' => 'mod4.pdf',         'download' => 'Module4_BTS_SIO.pdf'],
            'mod5'        => ['file' => 'mod5.pdf',         'download' => 'Module5_BTS_SIO.pdf'],
        ];

        if (!isset($allowed[$name])) {
            http_response_code(404);
            echo "Document non disponible.";
            return;
        }

        $entry    = $allowed[$name];
        $filePath = __DIR__ . '/../../public/assets/' . $entry['file'];

        if (!file_exists($filePath)) {
            http_response_code(404);
            echo "Document non disponible pour le moment.";
            return;
        }

        header('Content-Type: application/pdf');
        header('Content-Disposition: attachment; filename="' . $entry['download'] . '"');
        header('Content-Length: ' . filesize($filePath));
        ob_clean();
        flush();
        readfile($filePath);
        exit;
    }
}
