<?php
// Include the header to get the path functions
require_once __DIR__ . '/../app/views/layouts/header.php';
?>

<div style="font-family: Arial; padding: 20px; background: #f5f5f5;">
    <h2>Path Test Results</h2>
    
    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
        <h3>Server Variables</h3>
        <p><strong>REQUEST_URI:</strong> <?= $_SERVER['REQUEST_URI'] ?? 'Not set' ?></p>
        <p><strong>SCRIPT_NAME:</strong> <?= $_SERVER['SCRIPT_NAME'] ?? 'Not set' ?></p>
        <p><strong>HTTP_HOST:</strong> <?= $_SERVER['HTTP_HOST'] ?? 'Not set' ?></p>
    </div>

    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
        <h3>Calculated Paths</h3>
        <p><strong>Base Path:</strong> <?= $basePath ?></p>
        <p><strong>URL for /cv:</strong> <?= url('/cv') ?></p>
        <p><strong>Asset for security.js:</strong> <?= asset('assets/security.js') ?></p>
        <p><strong>Manifest URL:</strong> <?= url('manifest.php') ?></p>
    </div>

    <div style="background: white; padding: 15px; margin: 10px 0; border-radius: 5px;">
        <h3>Test Links</h3>
        <p><a href="<?= url('/') ?>">Home</a></p>
        <p><a href="<?= url('/cv') ?>">CV</a></p>
        <p><a href="<?= url('/projects') ?>">Projects</a></p>
        <p><a href="<?= asset('assets/security.js') ?>" target="_blank">Security.js (should download)</a></p>
        <p><a href="<?= url('manifest.php') ?>" target="_blank">Manifest.php</a></p>
    </div>
</div>
