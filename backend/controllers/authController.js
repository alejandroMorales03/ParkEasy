import { generateVerificationCode, sendVerificationEmail } from '../utils/email_utils.js';
import { db } from '../config/db.js';
import { hashPassword, comparePasswords } from '../utils/password_utils.js'; 
import { hash } from 'bcrypt'; 


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
            return res.status(404).json({ message: 'No account found' });
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
    const { code, email, newPassword } = req.body;

    if (!email || !code || !newPassword) {
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
        const hashedPassword = await hashPassword(newPassword);

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


