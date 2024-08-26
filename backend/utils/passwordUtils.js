import bcrypt from 'bcrypt';

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
