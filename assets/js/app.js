document.addEventListener("DOMContentLoaded", () => {

    // Inscription

    //initialisation de la base donnée simulé
    let user = JSON.parse(localStorage.getItem("users")) || [];

    //Gestion d'inscription
    document.getElementById("formInscrip").addEventListener("submit", function (e) {
        e.preventDefault();

        //recuperation des champs
        const userName = document.getElementById("userName").value;
        const email = document.getElementById("mail").value;
        const motDePasse = document.getElementById("mdp").value;

        // Verifier si l'email existe deja
        let EmailExiste = user.find((u) => u.email === email);
        if (EmailExiste) {
            alert("Email existe deja");
        } else {
            const newUser = { userName, email, motDePasse };
            user.push(newUser);
            localStorage.setItem("users", JSON.stringify(user));
            alert("Inscription reussite");
        }

    })


    // Connexion

    document.getElementById("formConnexion").addEventListener("submit", function (e) {
        e.preventDefault();

        //recuperation des champs
        const email = document.getElementById("mailConnexion").value;
        const motDePasse = document.getElementById("mdpConnexion").value;

        // console.log(userName, email, motDePasse);
        // const user = JSON.parse(localStorage.getItem("users"))||[];
        const userFound = user.find((u) => u.email === email && u.motDePasse === motDePasse);

        if (userFound) {
            alert("Connexion reussite");
            // window.location.href = "index.html";
        } else {
            alert("Email ou mot de passe incorrect");
        }
    })
})
function register(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (name && email && password) {
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json())
            .then(data => alert(data.message || data.error));
    } else {
        alert('Veuillez remplir tous les champs');
    }
}
async function login(e) {
    e.preventDefault();
    const email = document.getElementById('emailConnexion').value;
    const password = document.getElementById('passwordConnexion').value;

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (response.ok) {
            alert(data.message);
            // Stocke les infos utilisateur (sans le mot de passe) pour une utilisation ultérieure
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            window.location.href = 'index.html'; // Redirection après connexion
        } else {
            alert(data.error);
        }
    } catch (err) {
        alert('Erreur réseau : ' + err);
    }
}