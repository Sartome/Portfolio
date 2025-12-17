<?php require_once __DIR__ . '/../layouts/header.php'; ?>

<main class="error-page">
    <div class="container">
        <div class="error-content">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            
            <h1 class="error-code"><?= isset($error_code) ? $error_code : '404' ?></h1>
            
            <h2 class="error-title">
                <?= isset($error_message) ? Core::escape($error_message) : 'Page non trouvée' ?>
            </h2>
            
            <p class="error-description">
                <?php if (isset($error_code) && $error_code == 404): ?>
                    La page que vous recherchez n'existe pas ou a été déplacée.
                <?php elseif (isset($error_code) && $error_code == 500): ?>
                    Une erreur interne du serveur s'est produite. Veuillez réessayer plus tard.
                <?php elseif (isset($error_code) && $error_code == 403): ?>
                    Vous n'avez pas l'autorisation d'accéder à cette ressource.
                <?php else: ?>
                    Une erreur s'est produite lors du traitement de votre demande.
                <?php endif; ?>
            </p>
            
            <div class="error-actions">
                <a href="/" class="btn btn-primary">
                    <i class="fas fa-home"></i>
                    Retour à l'accueil
                </a>
                
                <button onclick="history.back()" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i>
                    Page précédente
                </button>
            </div>
        </div>
    </div>
</main>

<style>
.error-page {
    min-height: 70vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem 0;
}

.error-content {
    max-width: 600px;
    margin: 0 auto;
}

.error-icon {
    font-size: 4rem;
    color: #e74c3c;
    margin-bottom: 1rem;
}

.error-code {
    font-size: 6rem;
    font-weight: bold;
    color: #2c3e50;
    margin: 0;
    line-height: 1;
}

.error-title {
    font-size: 2rem;
    color: #34495e;
    margin: 1rem 0;
}

.error-description {
    font-size: 1.1rem;
    color: #7f8c8d;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.error-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
}

.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    text-decoration: none;
    border-radius: 5px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
    font-size: 1rem;
}

.btn-primary {
    background-color: #3498db;
    color: white;
}

.btn-primary:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: #95a5a6;
    color: white;
}

.btn-secondary:hover {
    background-color: #7f8c8d;
    transform: translateY(-2px);
}

@media (max-width: 768px) {
    .error-code {
        font-size: 4rem;
    }
    
    .error-title {
        font-size: 1.5rem;
    }
    
    .error-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .btn {
        width: 200px;
        justify-content: center;
    }
}
</style>

<?php require_once __DIR__ . '/../layouts/footer.php'; ?>
