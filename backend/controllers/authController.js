
import { generateVerificationCode, sendVerificationEmail} from '../utils/emailUtils.js'
import { db } from '../config/db.js';
import {comparePasswords, hashPassword} from "../utils/passwordUtils.js"


export const handleSignUp = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    const code = generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString(); 
    const hashedPassword = await hashPassword(password);

    try {
        // Check if email already exists in the users table
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'This email is already associated with an account' });
        }

        // Remove any existing entry with the same email in pending_users
        await db.query('DELETE FROM pending_users WHERE email = $1', [email]);

        // Insert the new user into pending_users
        await db.query(
            'INSERT INTO pending_users (email, first_name, last_name, password, verification_code, expires_at) VALUES ($1, $2, $3, $4, $5, $6)',
            [email, firstName, lastName, hashedPassword, code, expiresAt]
        );

        // Send verification email
        await sendVerificationEmail(email, code);

        // Send success response
        return res.status(200).json({ message: 'Verification email sent successfully' });

    } catch (error) {
        // Ensure only one response is sent
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error during signup', error });
        }
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



export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    console.log('Request body:', req.body); // Debug log

    // Check if email and password are not undefined or empty
    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Query the database for the user with the provided email
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            // No user found with that email
            console.log('No user found with email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];
        console.log('Retrieved user:', user);

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await comparePasswords(password, user.password);

        console.log('Password comparison result:', isMatch);

        if (isMatch) {
            // Password is correct; you might want to generate a token or session here
            return res.status(200).json({ message: 'Login Successful' });
        } else {
            // Password is incorrect
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        // Handle unexpected errors
        console.error('Unexpected error:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};




