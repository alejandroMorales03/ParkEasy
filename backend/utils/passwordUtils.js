import bcrypt from 'bcrypt';
import { db } from '../config/db.js';

// Method to encrypt password
export const hashPassword = async (password, saltRounds = 10) => {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err.message);
        throw new Error('Error hashing password');
    }
};

// Method to compare the user-entered password with the stored password
export const comparePasswords = async (plainPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
        return isMatch;
    } catch (err) {
        console.error('Error comparing passwords:', err.message);
        throw new Error('Error comparing passwords');
    }
};


export const resetPassword = async(email, verification_code, expiresAt) =>{

    const result = await db.query('SELECT * from forgot_password WHERE email = $1 AND reset_code = $2 AND  expires_at > NOW()', [email, verification_code]);

    if(result.rows.length != 0){
        res.status(500).json({message: "Unexpected error while resetting password"})
        return;
    }

    await db.query('UPDATE users SET password = $1 WHERE email = $2', [email])
}