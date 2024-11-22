import { setEmailError } from "../../utils/email_utils.js";
import { hashPassword, setPasswordError } from "../../utils/password_utils.js";
import PASSWORD_RECOVERY from "../../models/password_recovery_model.js";
import {ERROR_CODE, SALT_ROUNDS} from '../../Constants/constants.js'
import USER from "../../models/user_model.js";

const verify_reset_password = async(req, res) =>{
    let response_status_code = SUCCESS;
    const error = {}
    const {email, code, new_password} = req.body;

    await setEmailError(email, error);
    await setPasswordError(new_password, error);

    if (!code) {
        error.code = ERROR_CODE.BAD_REQUEST;
        error.message = 'Verification code field is required.';
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }

    // Early exit if there is a formatting realted error with the input fields
    if(Object.keys(error).length > 0){
        response_status_code = ERROR_CODE.BAD_REQUEST;
        return res.status(response_status_code).json({error: error});
    }

    try{
        const recover_records = await PASSWORD_RECOVERY.findAll({
            where:{
                email: email,
                reset_code: code,
            }
        })

        // Early exit if there is no record associated with the email and code 
        // Since the email has already been checked it must been the code is invalid
        
        if(recover_records.length === 0){
            error.code = ERROR_CODE.UNAUTHORIZED;
            error.message = "The error provided is invalid or expired.";
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            return res.status(response_status_code).json({error: error});
        }

        // New password gets encrypted
        const hashedPassword = await hashPassword(new_password, SALT_ROUNDS);

        // User record gets updated with new password
        await USER.update(
            {
                new_password: hashedPassword,
            },
            {
                where:{
                    email: email,
                }
            }
        ),

        // The password recovery record associated with this account gets deleted
        await PASSWORD_RECOVERY.destroy({
            where:{
                email:email
            }
        })

        return res.status(response_status_code).json({message: `Successful password recovery verification operation with email ${email} and code ${code}`});
    }catch(err){
        response_status_code = ERROR_CODE.BAD_REQUEST;
        error.code = ERROR_CODE.SERVER_ERROR;
        error.message = SERVER_ERROR_MESSAGE;
        return res.status(response_status_code).json({error: error});
    }



}

export default verify_reset_password;