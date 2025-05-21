// server/index.js
const rand = Math.random(); // génère un nombre entre 0 (inclus) et 1 (exclus)
const bcrypt = require('bcrypt');
const http = require('http');
const fs = require('fs');
const path = require('path');


const usersFile = path.join(__dirname, 'data', 'users.json');

function getUsers() {
  const data = fs.readFileSync(usersFile, 'utf-8');
  return JSON.parse(data);
}


function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf-8');
}
function createId() {
  const id = Math.floor(Math.random() * 90000) + 10000;
  return id
}


function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => callback(JSON.parse(body)));
}


const server = http.createServer((req, res) => {
  // Autorise les requêtes cross-origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  //  // Gérer les requêtes préliminaires OPTIONS (préflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    return res.end();
  }

  if (req.url === '/register' && req.method === 'POST') {
    parseBody(req, async (userData) => {
      const users = getUsers();
      const exists = users.find(u => u.email === userData.email);
      if (exists) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Email déjà utilisé' }));
      }
      const newUser = {
        id: createId(),
        name: userData.name,
        email: userData.email,
        password: await bcrypt.hash(userData.password, 10),
      }

      users.push(newUser);
      saveUsers(users);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Inscription réussie' }));
    });
  }
  //  Vérifiez le mot de passe avec bcrypt.compare(...)
  else if (req.url === '/login' && req.method === 'POST') {
    parseBody(req, async (loginData) => {
      const users = getUsers();
      const foundUser = users.find(u => u.email === loginData.email);

      if (!foundUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Email incorrect' }));
      }

      try {
        const isPasswordValid = await bcrypt.compare(loginData.password, foundUser.password);
        if (isPasswordValid) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            message: 'Connexion réussie',
            user: { id: foundUser.id, name: foundUser.name, email: foundUser.email } // Ne pas renvoyer le mot de passe
          }));
        } else {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Mot de passe incorrect' }));
        }
      } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Erreur serveur' }));
      }
    });
  }
});

server.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});
