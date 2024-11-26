import bcrypt from 'bcrypt';
import {ERROR_CODE} from '../Constants/constants.js'

// Method to encrypt password


export const isValidPassword = async (password_value) => {
    const password_error = {};

    // Check password length
    if (password_value.length < 16) {
        password_error.length = "Password must be at least 16 characters long.";
    }
    // Check for uppercase letter
    if (!/[A-Z]/.test(password_value)) {
        password_error.uppercase = "Password must contain at least one uppercase letter.";
    }
    // Check for lowercase letter
    if (!/[a-z]/.test(password_value)) {
        password_error.lowercase = "Password must contain at least one lowercase letter.";
    }
    // Check for a digit
    if (!/\d/.test(password_value)) {
        password_error.digit = "Password must contain at least one digit.";
    }
    // Check for special character
    if (!/[#*_]/.test(password_value)) {
        password_error.special = "Password must contain at least one special character (*, #, or _).";
    }
    // Check for unsupported characters
    if (/[^A-Za-z0-9#*_]/.test(password_value)) {
        password_error.unsupported = "Password must only contain letters, numbers, and the special characters (#, *, or _).";
    }

    return password_error;
};


export const setPasswordError = async(password, error) =>{
    if(!password){
        error.password = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Password field is required.",
        }
    }
    else{
        // Checks for password validation properties (uppercase, lowercase, digit, special char, unsupported char)
        const password_error = await isValidPassword(password);
        
        if(Object.keys(password_error).length > 0){
            error.password = {
                code: ERROR_CODE.UNPROCESSABLE_ENTITY,
                message: {}

            }

            // For each key in the password_error object add the corresponding error message to the message object
            for(let key in password_error){
                if(password_error.hasOwnProperty(key))
                error.password.message[key] = password_error[key];
            }
            
        }
    }
}

export const setConfirmPasswordError = async(password, confirmed_password, error) =>{
    if(confirmed_password !== password){
        error.confirmed_password ={
            code: ERROR_CODE.BAD_REQUEST,
            message: "Passwords do not match."
        }
    }

}
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

