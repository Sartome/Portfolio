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
    $requestPath = str_replace('/portfolio/api.php', '', $requestPath);
    $requestPath = str_replace('/public/api.php', '', $requestPath);
}

// Remove query string and base path
$requestPath = str_replace('/portfolio/', '', $requestPath);
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
