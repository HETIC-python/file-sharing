import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users: Array<{ id: number; firstName: string; lastName: string; email: string; password: string }> = [];

// Function to generate JWT token
function generateToken(user: { id: number; firstName: string; lastName: string }) {
    return jwt.sign(
        { id: user.id, name: `${user.firstName} ${user.lastName}` },
        process.env.JWT_SECRET || 'default_secret', // Fallback secret for development
        { expiresIn: '1h' }
    );
}

// Home route
router.get('/', (req: Request, res: Response) => {
    res.json({ msg: "Bienvenue sur l'API" });
});

// Login route
router.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ msg: "Identifiants incorrects" });
    }

    const token = generateToken(user);
    res.json({ token });
});

// Signup route
router.post('/signup', (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(400).json({ msg: "Utilisateur déjà existant" });
    }

    const newUser = { id: users.length + 1, firstName, lastName, email, password };
    users.push(newUser);

    const token = generateToken(newUser);
    res.status(201).json({ token });
});

// Middleware for token authentication
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Protected route
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'Vous êtes autorisé', user: req.user });
});

export default router;


