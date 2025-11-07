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
            'description' => 'Découvrez mon parcours, mes compétences et mon expérience professionnelle',
            'page' => 'cv'
        ];
        
        $this->view('cv', $data);
    }
    
    public function download() {
        $file = __DIR__ . '/../../assets/cv_alternance.pdf';
        
        if (file_exists($file)) {
            header('Content-Type: application/pdf');
            header('Content-Disposition: attachment; filename="CV_Marwane_ElArrass_Alternance.pdf"');
            header('Content-Length: ' . filesize($file));
            readfile($file);
            exit;
        } else {
            http_response_code(404);
            echo "CV non trouvé";
        }
    }
}
