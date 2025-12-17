<?php
/**
 * Security Configuration
 * CSP, headers, and security policies
 */

return [
    // Content Security Policy - Configuration assouplie pour le développement
    'csp' => [
        'default-src' => ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
        'script-src' => ["'self'", "'unsafe-inline'", "'unsafe-eval'", "*"],
        'style-src' => ["'self'", "'unsafe-inline'", "*"],
        'img-src' => ["'self'", "data:", "https:", "http:", "blob:", "*"],
        'font-src' => ["'self'", "*"],
        'connect-src' => ["'self'", "*"],
        'frame-ancestors' => ["'self'", "*"],
        'base-uri' => ["'self'"],
        'form-action' => ["'self'", "*"],
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
