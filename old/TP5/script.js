document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const box1 = document.querySelector('.box1');

    // Function to handle mouse movement
    function handleMouseMove(e) {
        // Get the container's dimensions and position
        const rect = container.getBoundingClientRect();
        
        // Calculate the mouse position relative to the container
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the center of the container
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Calculate rotation based on mouse position
        const rotateX = (mouseY - centerY) / 20;
        const rotateY = -(mouseX - centerX) / 20;

        // Apply transformation
        container.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    }

    // Function to reset transformation when mouse leaves
    function handleMouseLeave() {
        container.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
});

// Existing form submission logic
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