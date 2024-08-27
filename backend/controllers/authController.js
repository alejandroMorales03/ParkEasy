import { generateVerificationCode, sendVerificationEmail } from '../utils/emailUtils.js';
import { db } from '../config/db.js';
import { hashPassword } from "../utils/passwordUtils.js";

export const handleSignUp = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    
    if (!email || !firstName || !lastName || !password) {
        console.log('Missing email, first name, last name, or password');
        return res.status(400).json({ message: 'Email, first name, last name, and password are required' });
    }

    try {
        // Check if email already exists in the users table
        const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (rows.length > 0) {
            return res.status(409).json({ message: 'This email is already associated with an account' });
        }

        // Remove any existing entry with the same email in pending_users
        await db.query('DELETE FROM pending_users WHERE email = $1', [email]);

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Generate a secure verification code and set its expiration
        const code = await generateVerificationCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

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
        console.error('Error during signup:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Error during signup', error: error.message });
        }
    }
};


export const verifySignUp = async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
        console.log('Missing email or confirmation code');
        return res.status(400).json({ message: 'Email and confirmation code are required' });
    }

    try {
        // Verify the email and code against pending_users
        const result = await db.query(
            'SELECT email, first_name, last_name, password FROM pending_users WHERE email = $1 AND verification_code = $2 AND expires_at > NOW()',
            [email, code]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid or expired verification code' });
        }

        const user = result.rows[0];

        // Insert the verified user into the users table
        await db.query(
            'INSERT INTO users (email, first_name, last_name, password) VALUES ($1, $2, $3, $4)',
            [user.email, user.first_name, user.last_name, user.password]
        );

        // Delete the user from pending_users
        await db.query('DELETE FROM pending_users WHERE email = $1 AND verification_code = $2', [email, code]);

        return res.status(200).json({ message: 'Account successfully verified' });
    } catch (error) {
        console.error('Error verifying signup:', error);
        return res.status(500).json({ message: 'Error verifying code', error: error.message });
    }
};



export const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Missing email or password');
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Query the database for the user with the provided email
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            console.log('No user found with email:', email);
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Compare the provided password with the hashed password stored in the database
        const isMatch = await comparePasswords(password, user.password);

        if (isMatch) {
            // Password is correct; generate a token or session here
            return res.status(200).json({ message: 'Login successful' });
        } else {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error('Unexpected error during login:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};



export const handleForgottenPasswordRequest = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        console.log('Missing email');
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Ensure the user exists in the system
        const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'No account associated with this email address' });
        }

        // Remove any previous reset requests for this email
        await db.query('DELETE FROM forgot_password WHERE email = $1', [email]);

        // Generate a secure reset code and set its expiration
        const code = await generateVerificationCode();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        // Insert the new reset code into the database
        await db.query(
            'INSERT INTO forgot_password (email, reset_code, expires_at) VALUES ($1, $2, $3)',
            [email, code, expiresAt]
        );

        // Send the reset code to the user via email
        await sendVerificationEmail(email, code);

        // Respond to the client indicating success
        return res.status(200).json({ message: 'Reset password email sent successfully' });
    } catch (error) {
        console.error('Unexpected server error during password resetting:', error);
        return res.status(500).json({ message: 'Unexpected server error. Please try again or contact support', error: error.message });
    }
};



export const handleResetPasswordCompletion = async (req, res) => {
    const { code, email, password } = req.body;

    if (!email || !code || !password) {
        console.log('Missing email, reset code, or password');
        return res.status(400).json({ message: 'Email, reset code, and password are required' });
    }

    try {
        // Verify the reset code
        const result = await db.query(
            'SELECT * FROM forgot_password WHERE email = $1 AND reset_code = $2 AND expires_at > NOW()',
            [email, code]
        );

        if (result.rows.length === 0) {
            console.log('Invalid or expired reset code');
            return res.status(401).json({ message: 'Invalid or expired verification code' });
        }

        // Hash the new password
        const hashedPassword = await hashPassword(password);

        // Update the user's password
        await db.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, email]);

        // Optionally, delete the reset code entry to prevent reuse
        await db.query('DELETE FROM forgot_password WHERE email = $1 AND reset_code = $2', [email, code]);

        return res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Unexpected error during password reset:', error);
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
