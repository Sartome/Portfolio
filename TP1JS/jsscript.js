// Fonction pour le calcul de la moyenne
function moy() {
    let note1 = parseFloat(prompt('Entrez la première note:'));
    let note2 = parseFloat(prompt('Entrez la deuxième note:'));
    let note3 = parseFloat(prompt('Entrez la troisième note:'));
    let moyenne = (note1 + note2 + note3) / 3;

    // Redirection vers admi.html avec la moyenne en paramètre
    window.location.href = `admi.html?moyenne=${moyenne.toFixed(2)}`;
}

// Fonction pour vérifier majeur ou mineur
function maj() {
    let age = parseInt(prompt('Entrez votre âge:'));
    if (age >= 18) {
        alert('Vous êtes majeur.');
    } else {
        alert('Vous êtes mineur.');
    }
}

// Fonction pour afficher le nom et le prénom
function nme() {
    let nom = prompt('Entrez votre nom:');
    let prenom = prompt('Entrez votre prénom:');
    alert('Nom: ' + nom + ', Prénom: ' + prenom);
}

// Fonction pour changer la couleur de fond de la page tp3index.html
function clr() {
    // Demande à l'utilisateur d'entrer une couleur
    const nouvelleCouleur = prompt('Entrez la couleur souhaitée (nom ou code hexadécimal) :');
    
    // Change la couleur de fond de la page principale si une couleur est entrée
    if (nouvelleCouleur) {
        document.body.style.backgroundColor = nouvelleCouleur;
    }
}