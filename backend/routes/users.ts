import express, { Request, Response } from 'express';
import {type UserI} from '../type/user';
import bcrypt from "bcrypt";
import connect from "../database/connect";
import {body,validationResult} from 'express-validator';
import { response } from 'express';
const saltRounds = 10;
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post(
  "/signup",
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

    const { firstName, lastName, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = { firstName, lastName, email, password: hashedPassword } as UserI;
      const con = await connect();
      const [user_result] = await con.execute("INSERT INTO users SET ?", user)
      res.status(201).json({ user: user_result });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);


router.get('/users', function(req, res, next) {
  
})
export default router;
