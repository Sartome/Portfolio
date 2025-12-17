<?php
/**
 * Application Configuration
 * Modern portfolio configuration file
 */

return [
    // App Settings
    'app_name' => 'Marwane El arrass - Portfolio',
    'app_url' => 'http://localhost',
    'debug' => true,
    
    // Security
    'session_lifetime' => 7200, // 2 hours
    'csrf_token_name' => '_token',
    
    // API Keys (use environment variables in production)
    'newsapi_key' => '23ee33423d094283b0fcdc22b67b5e3c',
    
    // Site Owner Info
    'owner' => [
        'name' => 'Marwane El arrass',
        'title' => 'Développeur Web Full-Stack',
        'email' => 'elarrassmarwane@gmail.com',
        'github' => 'https://github.com/Sartome',
        'linkedin' => 'https://www.linkedin.com/in/marwane-el-arrass/',
    ],
    
    // Paths
    'paths' => [
        'assets' => '/assets',
        'old_site' => '/old/index.html',
    ],
];
