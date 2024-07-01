import db from '../config/db.js'
import bcrypt from 'bcrypt'
const saltRounds = 10;

export const handleLogin = async(req, res) =>{
    const {email, password, latitude, longitude} = req.body;

    try{
        const checkResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if(checkResult.rows.length > 0){
            const storedPassword = checkResult.rows[0].password;

            bcrypt.compare(password, storedPassword, async (err, result) =>{
                if(err){
                    console.log('Error comparing passwords: ', err)
                    return res.status(500).json({error: 'Server error'});
                }
                if(result){
                    await db.query('UPDATE users SET lat = $1, log = $2 WHERE email = $3', [latitude, longitude, email]);
                    console.log('Latitude and longitude updated successfully')
                    return res.status(200).json({message: 'Login successful'})
                }
                else{
                    return res.status(401).json({error: 'Invalid Password'});
                }
            })


        }else{
            return res.status(404).json({error: 'No account found'})
            //take user to sign up
        }

    }catch(error){
        console.error('Error occured when trying to login')
        return res.status(401).json({error: 'Unidentified Server Error'})

    }
};

export const handleSignup = async (req, res) =>{
    const {email, password, first, last, latitude, longitude} = req.body;

    try{
        const checkResult =  await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if(checkResult.rows > 0){
            return res.status(409).json({error: 'This email is already associated with an account'});

        }

        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if(err){
                console.log('Error hashing: ', err);
                return res.status(500).json({error: 'Server error'})
            }

            await db.query('INSERT INTO users VALUES ($1, $2, $3, $4, $5, $6', [first, last, email, hash, latitude, longitude])
            return res.status(201).json({message: 'Signup Successful'})
        })
    }catch(error){
        console.log('Error checking email existence', err);
        return res.status(500).json({message: 'Server error'})
    }
};

export default{
    handleLogin,
    handleSignup
}