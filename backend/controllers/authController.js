
import { generateVerificationCode, sendVerificationEmail} from '../utils/emailUtils.js'
import { db } from '../config/db.js';
import {hashPassword} from "../utils/passwordUtils.js"


export const handleSignUp = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); 
    const hashedPassword = hashPassword(password)


    try {
     
        await db.query(
            'INSERT INTO pending_users (email, first_name, last_name, password, verification_code, expires_at) VALUES ($1, $2, $3, $4, $5, $6)',
            [email, firstName, lastName, hashedPassword, code, expiresAt]
        );

        await sendVerificationEmail(email, code);
    
        res.status(200).json({ message: 'Verification email sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error during signup', error });
    }
};

export const verifyCode = async (req, res) => {
    
    const { email, code } = req.body;
   

    try {
        
        const result = await db.query(
            'SELECT email, first_name, last_name, password FROM pending_users WHERE email = $1 AND verification_code = $2 AND expires_at > NOW()',
            [email, code]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired verification code' });
        }

        
        const user = result.rows[0];
      
        
        await db.query(
            'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)',
            [user.email, user.first_name, user.last_name, user.password]
        );

       
        await db.query('DELETE FROM pending_users WHERE email = $1 AND verification_code = $2', [email, code]);

        res.status(200).json({ message: 'Account successfully verified' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying code', error });
    }
};
