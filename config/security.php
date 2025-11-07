<?php
/**
 * Security Configuration
 * CSP, headers, and security policies
 */

return [
    // Content Security Policy
    'csp' => [
        'default-src' => ["'self'"],
        'script-src' => ["'self'", "'unsafe-inline'", "https://cdn.tailwindcss.com", "https://unpkg.com"],
        'style-src' => ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://cdn.tailwindcss.com"],
        'img-src' => ["'self'", "data:", "https:", "blob:"],
        'font-src' => ["'self'", "https://fonts.gstatic.com"],
        'connect-src' => ["'self'", "https://newsapi.org"],
        'frame-ancestors' => ["'none'"],
        'base-uri' => ["'self'"],
        'form-action' => ["'self'"],
    ],
    
    // Security Headers
    'headers' => [
        'X-Frame-Options' => 'DENY',
        'X-Content-Type-Options' => 'nosniff',
        'X-XSS-Protection' => '1; mode=block',
        'Referrer-Policy' => 'strict-origin-when-cross-origin',
        'Permissions-Policy' => 'geolocation=(), microphone=(), camera=()',
    ],
    
    // Rate Limiting
    'rate_limit' => [
        'enabled' => true,
        'max_requests' => 100,
        'time_window' => 60, // seconds
    ],
    
    // Allowed file uploads
    'allowed_extensions' => ['jpg', 'jpeg', 'png', 'gif', 'pdf', 'doc', 'docx'],
    'max_upload_size' => 5242880, // 5MB
];
