function testqcm() {
    const form = document.getElementById('quiz-form');
    const answers = {
        q1: ['Paris']
        // Add more answers here
    };
    let score = 0;
    for (const [question, correctAnswers] of Object.entries(answers)) {
        const userAnswers = Array.from(form.elements[question])
            .filter(input => input.checked)
            .map(input => input.value);
        if (JSON.stringify(userAnswers) === JSON.stringify(correctAnswers)) {
            score++;
        }
    }
    alert(`Votre score est de ${score} / ${Object.keys(answers).length}`);
}

function showAnswers() {
    const answersWindow = window.open('', 'Answers', 'width=600,height=400');
    answersWindow.document.write('<h1>Corrigé</h1>');
    answersWindow.document.write('<p>Question 1: Paris</p>');
    // Add more answers here
    answersWindow.document.write('<button onclick="window.close()">Fermer</button>');
}
