document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:3000/users'); // Remplacez par l'URL de votre API
        const users = await response.json();// Remplacez par l'URL de votre API
        const tableBody = document.getElementById('usersBody');// Remplacez par l'ID de votre corps de tableau

        users.forEach(user => {
            const row = document.createElement('tr');// Remplacez par l'ID de votre corps de tableau
            // Créez une nouvelle ligne pour chaque utilisateur
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
            `;
            tableBody.appendChild(row);// Ajoutez la ligne au corps du tableau
        });

        // Active DataTables (optionnel)
        $('#usersTable').DataTable();// Remplacez par l'ID de votre tableau
    } catch (err) {
        console.error('Erreur:', err);// Affichez l'erreur dans la console
       
    }
});