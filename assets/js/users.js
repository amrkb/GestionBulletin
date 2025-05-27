document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Récupération des utilisateurs
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Erreur serveur');

        const users = await response.json();
        const tableBody = document.getElementById('usersBody');

        // Remplissage du tableau
        users.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            tableBody.appendChild(row);
        });

        // Configuration avancée de DataTables
        $('#usersTable').DataTable({
            language: {
                url: '//cdn.datatables.net/plug-ins/1.13.6/i18n/fr-FR.json'
            },
            responsive: true,
            order: [[1, 'asc']] // Tri par nom par défaut
        });

    } catch (error) {
        console.error(error);
        alert('Erreur lors du chargement des données');
    }
});

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth.html';
});