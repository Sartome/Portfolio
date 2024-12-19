document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    const viewDataBtn = document.getElementById('viewData');
    const exportSQLBtn = document.getElementById('exportSQL');
    const downloadSchemaBtn = document.getElementById('downloadSchema');


    const clientsData = [
        { id_client: 1, nom: 'Dupont', prenom: 'Marie', email: 'marie.dupont@example.com', date_inscription: '2023-01-10' },
        { id_client: 2, nom: 'Durand', prenom: 'Paul', email: 'paul.durand@example.com', date_inscription: '2023-02-20' },
        { id_client: 3, nom: 'Martin', prenom: 'Alice', email: 'alice.martin@example.com', date_inscription: '2023-03-15' },
    ];

    const container = document.querySelector('.container-columns');
    container.style.opacity = '1';
    container.classList.add('fade-in');

    function createClientTable() {
        const table = document.createElement('table');
        table.className = 'data-table';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        const headers = ['ID', 'Nom', 'Prénom', 'Email', 'Date d\'inscription'];

        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');

        clientsData.forEach(client => {
            const row = document.createElement('tr');
            Object.values(client).forEach(value => {
                const td = document.createElement('td');
                td.textContent = value;
                row.appendChild(td);
            });
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        return table;
    }

    viewDataBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const tableContainer = document.querySelector('.table-container');
        tableContainer.innerHTML = '';
        tableContainer.appendChild(createClientTable());
        modal.style.display = 'block';
    });

    exportSQLBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'clients.sql';
    });

    downloadSchemaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'capture.png';
    });

    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const buttons = document.querySelectorAll('.bouton');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
});
