document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        const tableBody = document.getElementById('usersBody');

        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            tableBody.appendChild(row);
        });

        // Active DataTables (optionnel)
        $('#usersTable').DataTable();
    } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
});