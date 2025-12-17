<?php
/**
 * Simple diagnostic script to test if the application is working
 * Access this at: http://localhost/portfolio/test.php
 */

echo "<h1>Portfolio Diagnostic Test</h1>";

// Test 1: PHP Version
echo "<h2>1. PHP Version</h2>";
echo "PHP Version: " . phpversion() . "<br>";

// Test 2: Required extensions
echo "<h2>2. Required Extensions</h2>";
$extensions = ['curl', 'xml', 'json', 'session'];
foreach ($extensions as $ext) {
    $status = extension_loaded($ext) ? "✅ Loaded" : "❌ Missing";
    echo "$ext: $status<br>";
}

// Test 3: File permissions
echo "<h2>3. File Structure</h2>";
$files = [
    'app/Core.php',
    'app/Controller.php',
    'app/controllers/HomeController.php',
    'app/controllers/ErrorController.php',
    'config/app.php',
    'public/index.php',
    'public/.htaccess'
];

foreach ($files as $file) {
    $exists = file_exists($file) ? "✅ Exists" : "❌ Missing";
    echo "$file: $exists<br>";
}

// Test 4: Configuration
echo "<h2>4. Configuration Test</h2>";
try {
    require_once 'config/app.php';
    echo "✅ Configuration loaded successfully<br>";
} catch (Exception $e) {
    echo "❌ Configuration error: " . $e->getMessage() . "<br>";
}

// Test 5: Core class test
echo "<h2>5. Core Class Test</h2>";
try {
    require_once 'app/Core.php';
    echo "✅ Core class loaded successfully<br>";
} catch (Exception $e) {
    echo "❌ Core class error: " . $e->getMessage() . "<br>";
}

// Test 6: URL routing test
echo "<h2>6. URL Routing Test</h2>";
echo "Current URL: " . $_SERVER['REQUEST_URI'] . "<br>";
echo "Script Name: " . $_SERVER['SCRIPT_NAME'] . "<br>";

// Test 7: Session test
echo "<h2>7. Session Test</h2>";
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
$_SESSION['test'] = 'working';
echo "Session status: " . (isset($_SESSION['test']) ? "✅ Working" : "❌ Not working") . "<br>";

echo "<h2>Test Complete</h2>";
echo "<p><a href='public/'>Go to Portfolio</a></p>";
?>
