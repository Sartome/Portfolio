function calculate(operation) {
    const value1 = parseFloat(document.getElementById('value1').value);
    const value2 = parseFloat(document.getElementById('value2').value);
    let result;

    switch (operation) {
        case '+':
            result = value1 + value2;
            break;
        case '-':
            result = value1 - value2;
            break;
        case '*':
            result = value1 * value2;
            break;
        case '/':
            result = value2 !== 0 ? value1 / value2 : 'Erreur: Division par zéro';
            break;
    }
    document.getElementById('result').innerText = 'Résultat: ' + result;
}

function checkParity() {
    const resultText = document.getElementById('result').innerText;
    const result = parseFloat(resultText.split(': ')[1]);

    if (!isNaN(result)) {
        const parity = result % 2 === 0 ? 'Le résultat est pair' : 'Le résultat est impair';
        document.getElementById('result').innerText = parity;
    } else {
        const lastResult = resultText.split(': ')[1]; // Conserve le dernier résultat
        document.getElementById('result').innerText = 'Résultat précédent: ' + lastResult;
    }
}

function swapValues() {
    const value1Input = document.getElementById('value1');
    const value2Input = document.getElementById('value2');
    const temp = value1Input.value;
    value1Input.value = value2Input.value;
    value2Input.value = temp;
}
