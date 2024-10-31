import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const users: Array<{ id: number; firstName: string; lastName: string; email: string; password: string }> = [];

// Function to generate JWT token
function generateToken(user: { id: number; firstName: string; lastName: string } | null) {
    if(user === null) return
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
    const { email, password } = {email: "", password: ""};

    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        res.status(401).json({ token: "Identifiants incorrects" });
        return
    }

    const token = generateToken(null);
    res.json({ token });
});

// Signup route
router.post('/signup', (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        res.status(400).json({ msg: "Utilisateur déjà existant" });
        return 
    }

    const newUser = { id: users.length + 1, firstName, lastName, email, password };
    users.push(newUser);

    const token = generateToken(newUser);
    res.status(201).json({ token });
});

// Middleware for token authentication
function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        res.sendStatus(401);
        return
    }

    jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err: any, user: any) => {
        if (err) return res.sendStatus(403);
        (req as any).user = user;
        next();
    });
}

// Protected route
router.get('/protected', authenticateToken, (req: Request, res: Response) => {
    res.json({ message: 'Vous êtes autorisé', user: (req as any ).user });
});

export default router;


