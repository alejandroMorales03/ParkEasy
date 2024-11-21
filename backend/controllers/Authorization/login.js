import {ERROR_CODE, SUCCESS} from '../../Constants/constants.js'
import USER from '../../models/user_model.js';
import { isEmailValid, setEmailError } from '../../utils/email_utils';
import { comparePasswords, setPasswordError } from '../../utils/password_utils';
const login = async(req, res) =>{
    
    const {email, password} = req.body;
    let response_status_code = SUCCESS;
    const error = {};

    await setEmailError(email, error);
    await setPasswordError(password, error);

    // Early exit if there is an error in the form
    if(Object.keys(error).length > 0){
        response_status_code = ERROR_CODE.BAD_REQUEST;
        return res.status(response_status_code).json({error: error});
    }

    try{
        const user_records = await USER.findAll({
            where:{
                email: email
            }
        })

        // Early exit if email is not present in the database
        if(user_records.length === 0){
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            error.code = ERROR_CODE.UNAUTHORIZED;
            error.message = "Email and password combination is invalid.";
            return res.status(response_status_code).json({error: error});
        }
        

        // Exit if the entered password does not match the stored password
        const passwords_match = await comparePasswords(password, user_records.password);
        if(passwords_match){
            return res.status(response_status_code).json({message: `Successful login operation with ${email} and ${password}.`})

        }else{
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            error.code = ERROR_CODE.UNAUTHORIZED,
            error.message = "Email and password combination is invalid.";
            return res.status(response_status_code).json({error: error});
        }
        
            

    }catch(err){
        error.code = ERROR_CODE.SERVER_ERROR;
        error.message = SERVER_ERROR_MESSAGE;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }
    
}