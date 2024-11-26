import {ERROR_CODE, SUCCESS, SERVER_ERROR_MESSAGE} from '../../Constants/constants.js'
import USER from '../../models/user_model.js';
import {setEmailError } from '../../utils/email_utils.js';
import { comparePasswords } from '../../utils/password_utils.js';
const login = async(req, res) =>{
    
    const {email, password} = req.body;
    let response_status_code = SUCCESS;
    const error = {};
    console.log(1);
    await setEmailError(email, error);
    if(!password){
        error.password = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Password field is required.",
        }
    }
    console.log(2);

    // Early exit if there is an error in the form
    if(Object.keys(error).length > 0){
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({error: error});
    }
    console.log(4);
    try{
        const user_records = await USER.findAll({
            where:{
                email: email,
            },
            logging: console.log,
        })
        console.log(5);
        // Early exit if email is not present in the database
        if(user_records.length === 0){
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            error.code = ERROR_CODE.UNAUTHORIZED;
            error.message = "Email and password combination is invalid.";
            console.log(error);
            return res.status(response_status_code).json({error: error});
        }
        console.log(6);
        

        // Exit if the entered password does not match the stored password
        const passwords_match = await comparePasswords(password, user_records[0].password);
        if(passwords_match){
            return res.status(response_status_code).json({message: `Successful login operation with ${email} and ${password}.`})

        }else{
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            error.code = ERROR_CODE.UNAUTHORIZED,
            error.message = "Email and password combination is invalid.";
            console.log(error);
            return res.status(response_status_code).json({error: error});
        }   

    }catch(err){
        error.code = ERROR_CODE.SERVER_ERROR;
        error.message = SERVER_ERROR_MESSAGE;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }
    
}

export default login;