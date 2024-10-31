import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserI from '../type/user';
import connect from "../database/connect";
import { RowDataPacket } from "mysql2";
import {body,validationResult} from 'express-validator';
import bcrypt from "bcrypt";

const router = express.Router();
const users: Array<{ id: number; firstName: string; lastName: string; email: string; password: string }> = [];
const saltRounds = 10;

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
router.post('/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  ], 
    async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const con = await connect();
    
    try {
        const [user_result] = await con.execute("SELECT * FROM users WHERE email = ?", [email]);
        if (!user_result) {
            res.status(401).json({ token: "Identifiants incorrects" });
            return
        }
        
        const token = generateToken(null);
        res.json({ token });
    } 
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Internal Server Error");
        return
    }
});

// Signup route
router.post('/signup',
    [
    body('firstName').trim().notEmpty().withMessage('First name is required'),
    body('lastName').trim().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
  ], 
  async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const con = await connect();
    const { firstName, lastName, email, password } = req.body;
    console.log(firstName, lastName, email, password);
    try {
        const [user_result] = await con.execute("SELECT * FROM users WHERE email = ?", [email]);
        if ((user_result as Array<any>).length > 0) {
            res.status(400).json({ msg: "Utilisateur déjà existant" });
            return
        }
    } 
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user: UserI = { firstName, lastName, email, password: hashedPassword };
        const [user_result] = await con.execute("INSERT INTO users (first_name, last_name, email, password)  VALUES (?,?,?,?)", [firstName, lastName, email, hashedPassword]);
      
        // Define the type for the selected user rows
        type SelectedUser = { id: number; firstName: string; lastName: string };
        const [selected_user] = await con.execute<RowDataPacket[]>(
          "SELECT id, first_name, last_name FROM users WHERE email = ?",
          [email]
        );
      
        const token = generateToken({
          id: selected_user[0].id,
          firstName: selected_user[0].firstName,
          lastName: selected_user[0].lastName
        });
        
        res.status(201).json({ token });
      } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
      }
      
      

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


