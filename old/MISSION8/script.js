function testqcm() {
    const form = document.getElementById('quiz-form');
    const answers = {
        q1: ['Paris'],
        q2: ['Berlin'],
        q3: ['Madrid'],
        q4: ['Rome'],
        q5: ['Lisbonne'],
        q6: ['Athènes'],
        q7: ['Bruxelles'],
        q8: ['Amsterdam'],
        q9: ['Vienne'],
        q10: ['Berne']
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
    answersWindow.document.write('<p>Question 2: Berlin</p>');
    answersWindow.document.write('<p>Question 3: Madrid</p>');
    answersWindow.document.write('<p>Question 4: Rome</p>');
    answersWindow.document.write('<p>Question 5: Lisbonne</p>');
    answersWindow.document.write('<p>Question 6: Athènes</p>');
    answersWindow.document.write('<p>Question 7: Bruxelles</p>');
    answersWindow.document.write('<p>Question 8: Amsterdam</p>');
    answersWindow.document.write('<p>Question 9: Vienne</p>');
    answersWindow.document.write('<p>Question 10: Berne</p>');
    answersWindow.document.write('<button onclick="window.close()">Fermer</button>');
}
