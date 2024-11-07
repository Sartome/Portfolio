// Récupérer les données du formulaire
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Vérifier les identifiants (à modifier selon vos besoins)
    const validUsername = "admin";
    const validPassword = "1234";

    if (username === validUsername && password === validPassword) {
        // Redirection vers yes.html si les identifiants sont corrects
        window.location.href = "yes.html";
    } else {
        // Redirection vers no.html si les identifiants sont incorrects
        window.location.href = "no.html";
    }
});
