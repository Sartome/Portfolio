document.getElementById('calculateButton').addEventListener('click', function() {
    var prix1 = parseFloat(document.querySelector('input[placeholder="Prix unitaire 1"]').value);
    if (isNaN(prix1)) prix1 = 0;
    var quantite1 = parseFloat(document.querySelector('input[placeholder="Quantité 1"]').value);
    if (isNaN(quantite1)) quantite1 = 0;
    var resultat1 = prix1 * quantite1;
    document.querySelector('input[placeholder="Résultat 1"]').value = resultat1;

    var prix2 = parseFloat(document.querySelector('input[placeholder="Prix unitaire 2"]').value);
    if (isNaN(prix2)) prix2 = 0;
    var quantite2 = parseFloat(document.querySelector('input[placeholder="Quantité 2"]').value);
    if (isNaN(quantite2)) quantite2 = 0;
    var resultat2 = prix2 * quantite2;
    document.querySelector('input[placeholder="Résultat 2"]').value = resultat2;

    var prix3 = parseFloat(document.querySelector('input[placeholder="Prix unitaire 3"]').value);
    if (isNaN(prix3)) prix3 = 0;
    var quantite3 = parseFloat(document.querySelector('input[placeholder="Quantité 3"]').value);
    if (isNaN(quantite3)) quantite3 = 0;
    var resultat3 = prix3 * quantite3;
    document.querySelector('input[placeholder="Résultat 3"]').value = resultat3;

    var totalTTC = resultat1 + resultat2 + resultat3;
    document.querySelector('input[placeholder="Total TTC"]').value = totalTTC;
});

document.getElementById('resetButton').addEventListener('click', function() {
    document.querySelector('input[placeholder="Article 1"]').value = '';
    document.querySelector('input[placeholder="Prix unitaire 1"]').value = '';
    document.querySelector('input[placeholder="Quantité 1"]').value = '';
    document.querySelector('input[placeholder="Résultat 1"]').value = '';

    document.querySelector('input[placeholder="Article 2"]').value = '';
    document.querySelector('input[placeholder="Prix unitaire 2"]').value = '';
    document.querySelector('input[placeholder="Quantité 2"]').value = '';
    document.querySelector('input[placeholder="Résultat 2"]').value = '';

    document.querySelector('input[placeholder="Article 3"]').value = '';
    document.querySelector('input[placeholder="Prix unitaire 3"]').value = '';
    document.querySelector('input[placeholder="Quantité 3"]').value = '';
    document.querySelector('input[placeholder="Résultat 3"]').value = '';

    document.querySelector('input[placeholder="Total TTC"]').value = '';
});
