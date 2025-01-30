document.addEventListener('DOMContentLoaded', () => {
    const addLineButton = document.getElementById('add-line');
    const fillRandomButton = document.getElementById('fill-random');
    const calculateButton = document.getElementById('calculate');

    addLineButton.addEventListener('click', addLine);
    fillRandomButton.addEventListener('click', fillRandom);
    calculateButton.addEventListener('click', calculate);

    function addLine() {
        const table = document.getElementById('invoice-table').getElementsByTagName('tbody')[0];
        const newRow = table.rows[0].cloneNode(true);
        newRow.querySelectorAll('input').forEach(input => input.value = '');
        newRow.querySelector('.line-total').textContent = '0';
        table.appendChild(newRow);
    }

    function fillRandom() {
        const descriptions = ['Item A', 'Item B', 'Item C', 'Item D'];
        document.querySelectorAll('.invoice-line').forEach(line => {
            line.querySelector('.desc').value = descriptions[Math.floor(Math.random() * descriptions.length)];
            line.querySelector('.qte').value = Math.floor(Math.random() * 10) + 1;
            line.querySelector('.prix').value = Math.floor(Math.random() * 100) + 1;
        });
    }

    function calculate() {
        let subtotal = 0;
        document.querySelectorAll('.invoice-line').forEach(line => {
            const quantity = parseInt(line.querySelector('.qte').value) || 0;
            const price = parseInt(line.querySelector('.prix').value) || 0;
            const lineTotal = quantity * price;
            line.querySelector('.line-total').textContent = lineTotal;
            subtotal += lineTotal;
        });

        const discount = parseInt(document.getElementById('discount').value) || 0;
        const taxRate = parseInt(document.getElementById('tax-rate').value) || 0;
        const shipping = parseInt(document.getElementById('shipping').value) || 0;

        const discountAmount = subtotal * (discount / 100);
        const taxAmount = subtotal * (taxRate / 100);
        const total = subtotal - discountAmount + taxAmount + shipping;

        document.getElementById('subtotal').textContent = subtotal;
        document.getElementById('total').textContent = total;
    }
});
