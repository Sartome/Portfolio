document.getElementById('calculateButton').addEventListener('click', () => {
    let total = 0;
    
    for(let i = 1; i <= 3; i++) {
        let price = document.querySelector(`input[placeholder="Prix unitaire ${i}"]`).value * 1;
        let quantity = document.querySelector(`input[placeholder="Quantité ${i}"]`).value * 1;
        let result = price * quantity;
        
        document.querySelector(`input[placeholder="Résultat ${i}"]`).value = result;
        total += result;
    }
    
    document.querySelector('input[placeholder="Total TTC"]').value = total;
});

document.getElementById('resetButton').addEventListener('click', () => {
    const fields = ['Article', 'Prix unitaire', 'Quantité', 'Résultat'];
    
    for(let i = 1; i <= 3; i++) {
        fields.forEach(field => {
            document.querySelector(`input[placeholder="${field} ${i}"]`).value = '';
        });
    }
    
    document.querySelector('input[placeholder="Total TTC"]').value = '';
});
