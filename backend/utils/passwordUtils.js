import bcrypt from 'bcrypt'

// Method to encyrpt password
export const hashPassword = async(password, saltRounds = 10) =>{
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;

    }catch(err){
        console.error('Error hashing password:', err.message);
        throw new Error('Error hashing password');
    }
}

//Method to compare the user entered password with the stored password

export const comparePasswords = async(password, hashedPassword) =>{
    try{
        const isMatch = bcrypt.compare(password, hashedPassword);
        return isMatch;

    }catch(err){
        console.error('Error comparing passwords:')
        throw new Error('Erro comparing passwords:')
    }

}

