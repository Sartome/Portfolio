<?php
/**
 * Front Controller - Application Entry Point
 * Modern MVC Portfolio
 */

// Start output buffering
ob_start();

// Error reporting for development (disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Load Core
require_once __DIR__ . '/../app/Core.php';

// Initialize Application
$app = new Core();

// Flush output buffer
ob_end_flush();
