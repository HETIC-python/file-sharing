// server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simuler une base de données d'utilisateurs
const users = []; // Un tableau pour stocker les utilisateurs

function generateToken(user) {
    return jwt.sign({ id: user.id, name: user.firstName + ' ' + user.lastName }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Route d'accueil
app.get('/', (req, res) => {
    res.json({ msg: "Bienvenue sur l'API" });
});

// Route de connexion
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Vérifiez si l'utilisateur existe
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ msg: "Identifiants incorrects" });
    }

    const token = generateToken(user);
    res.json({ token });
});

// Route d'inscription
app.post('/signup', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    // Vérifiez si l'utilisateur existe déjà
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ msg: "Utilisateur déjà existant" });
    }

    // Créez un nouvel utilisateur
    const newUser = { id: users.length + 1, firstName, lastName, email, password };
    users.push(newUser);

    const token = generateToken(newUser);
    res.status(201).json({ token });
});

// Middleware de vérification du token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Route protégée
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ message: 'Vous êtes autorisé', user: req.user });
});

// Démarrage du serveur
app.listen(PORT, (err) => {
    if (err) {
        console.error('Erreur lors du démarrage du serveur:', err);
    } else {
        console.log(`Server is running on http://localhost:${PORT}`);
    }
});
