<?php
/**
 * API Router - Handles all API requests
 */

// Set proper headers
header('Content-Type: application/json');

// Get the request path from query string or URL
if (isset($_GET['path'])) {
    $requestPath = $_GET['path'];
} else {
    $requestUri = $_SERVER['REQUEST_URI'];
    $requestPath = parse_url($requestUri, PHP_URL_PATH);
    
    // Remove the script name from the path
    $requestPath = str_replace('/api.php', '', $requestPath);
    $requestPath = str_replace('/public/api.php', '', $requestPath);
}

// Remove query string and base path (dynamically detected)

// calculer basePath comme dans header.php
$scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME'] ?? '/'), '/\\');
$basePath = preg_replace('#/public$#', '', $scriptDir);
if ($basePath === '' || $basePath === '\\') {
    $basePath = '/';
} elseif (substr($basePath, -1) !== '/') {
    $basePath .= '/';
}

if ($basePath !== '/') {
    $requestPath = preg_replace('#^' . preg_quote($basePath, '#') . '#', '/', $requestPath);
}
$requestPath = strtok($requestPath, '?');

// Parse the path components
$pathParts = explode('/', trim($requestPath, '/'));

// Check if this is an API request
if ($pathParts[0] === 'api') {
    // Route API requests
    array_shift($pathParts); // Remove 'api' from path
    
    $controller = $pathParts[0] ?? '';
    $method = $pathParts[1] ?? '';
    
    // Simulate AJAX request for API calls
    $_SERVER['HTTP_X_REQUESTED_WITH'] = 'XMLHttpRequest';
    
    if ($controller === 'rss' && $method === 'fetch') {
        // Load RSS controller and call fetch method
        require_once __DIR__ . '/../app/Core.php';
        require_once __DIR__ . '/../app/Controller.php';
        require_once __DIR__ . '/../app/controllers/RssController.php';
        
        try {
            $rssController = new RssController();
            $rssController->fetch();
        } catch (Exception $e) {
            echo json_encode([
                'error' => 'API Error',
                'message' => $e->getMessage()
            ]);
        }
    } elseif ($controller === 'projects') {
        // Return JSON list of projects from ProjectsController
        require_once __DIR__ . '/../app/Core.php';
        require_once __DIR__ . '/../app/Controller.php';
        require_once __DIR__ . '/../app/controllers/ProjectsController.php';
        
        try {
            $projCtrl = new ProjectsController();
            // if a specific method is requested we could branch here;
            // for now any /api/projects/* just returns the list
            $projCtrl->apiList();
        } catch (Exception $e) {
            echo json_encode([
                'error' => 'API Error',
                'message' => $e->getMessage()
            ]);
        }
    } elseif ($controller === 'journey') {
        // expose timeline data for SPA
        require_once __DIR__ . '/../app/Core.php';
        require_once __DIR__ . '/../app/Controller.php';
        require_once __DIR__ . '/../app/controllers/JourneyController.php';
        try {
            $jCtrl = new JourneyController();
            $jCtrl->apiTimeline();
        } catch (Exception $e) {
            echo json_encode([
                'error' => 'API Error',
                'message' => $e->getMessage()
            ]);
        }
    } elseif ($controller === 'veille') {
        // expose veille articles for SPA
        require_once __DIR__ . '/../app/Core.php';
        require_once __DIR__ . '/../app/Controller.php';
        require_once __DIR__ . '/../app/controllers/VeilleController.php';
        try {
            $vCtrl = new VeilleController();
            $vCtrl->apiList();
        } catch (Exception $e) {
            echo json_encode([
                'error' => 'API Error',
                'message' => $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            'error' => 'Not Found',
            'message' => 'API endpoint not found'
        ]);
    }
} else {
    echo json_encode([
        'error' => 'Invalid Request',
        'message' => 'This is an API endpoint only'
    ]);
}
?>
