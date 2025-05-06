const http =require("http");
const fs = require("fs"); // Lire fichier
const path = require("path");// lire un chemin

const userFile = path.join(__dirname, 'data','users.json');
function getUsers() {
    const data =fs.readFileSync(userFile,"utf-8");//Lire le contenu du fichier de maniere synchrone
    return JSON.parse(data);
}
function saveUsers(users){
    fs.writeFileSync(userFile,JSON.stringify(users,null,2),"utf-8");//Ecrire du contenu dans le fichier 

}
function body(req,callback){
    let body = "";//Initialise la variable body
    req.on("data",chunk => body += chunk); //Concatener les morceaux de donnees recu
    req.on("end", ()=>callback(JSON.parse(body)));//une fois toutes les donnees recu on appelle le callback avec le corps de la requete parsé
}
// creation du serveur hhtp
const server = http.createServer(req,res)=>{
    if (req.url === "/inscrip" && req.method === "POST") {
        body(req,(userData))=>{
            const data = getUsers();
            const userFound =userFile.find((u) => u.email ===  email && u.motDepasse === motDePasse);
            if (userFound) {
                res.writeHead(201,"Content-Type":"application/json");
                return res.end(JSON.stringify(error:"Email existe deja"))
            }
        }
    }
}