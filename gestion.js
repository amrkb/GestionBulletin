const bcrypt = require('bcrypt');
const { randomUUID } = require('crypto');
const fs = require('fs').promises;
const path = require('path');

// Chemin vers le fichier users.json
const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Lecture des utilisateurs existants
        const usersData = await fs.readFile(usersFilePath, 'utf8');
        const users = JSON.parse(usersData || '[]');

        // Vérification de l'unicité du username
        if (users.some(user => user.username === username)) {
            return res.status(400).json({ message: "Le nom d'utilisateur existe déjà" });
        }

        // Génération de l'ID unique
        const id = randomUUID();

        // Hashage du mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Création du nouvel utilisateur
        const newUser = {
            id,
            username,
            password: hashedPassword,
            created_at: new Date().toISOString()
        };

        // Sauvegarde dans le fichier
        users.push(newUser);
        await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

        res.status(201).json({ message: "Utilisateur créé avec succès", userId: id });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
});