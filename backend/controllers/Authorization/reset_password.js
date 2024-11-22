import { generateVerificationCode, sendVerificationEmail, setEmailError } from "../../utils/email_utils.js";
import {SUCCESS, ERROR_CODE, EXPIRATION_MINUTES_FOR_CODE} from '../../Constants/constants.js'
import USER from "../../models/user_model.js";
import PASSWORD_RECOVERY from "../../models/password_recovery_model.js";


const reset_password = async(req, res) =>{
    const {email} = req.body;
    const error = {};
    let response_status_code = SUCCESS;

    await setEmailError(email, error);

    // Early exit if there is something wrong with the email address formatting related

    if(Object.keys(error).length > 0){
        response_status_code = ERROR_CODE.UNPROCESSABLE_ENTITY;
        return res.response_status_code(response_status_code).json({error: error});

    }

    try{

        const user_records = await USER.findAll({
            where:{
                email: email,
            },
        });

        // Early exit if there is no record associated with the email provided

        if(user_records.length === 0){
            response_status_code = ERROR_CODE.BAD_REQUEST,
            error.code = ERROR_CODE.BAD_REQUEST,
            error.message = "There is no account associated with that email. Please sign up."
        }

        // If there is no ongoing recover password attempt create a new one, otherwise update the existing one

        const code = generateVerificationCode();
        const expiration_time = new Date(Date.now + EXPIRATION_MINUTES_FOR_CODE * 60 * 1000).toISOString();

        const recovery_password_records = await PASSWORD_RECOVERY.findAll({
            where:{
                email: email,
            }
        });

        // If there is a record for this email means that there is an ongoing recovery attempt
        // so we update the code for that record, otherwise we make a new record

        if(recovery_password_records.length > 0){
            await PASSWORD_RECOVERY.create({
                email: email,
                expires_at: expiration_time,
                reset_code: code,
            });
        }else{
            PASSWORD_RECOVERY.update(
                {
                    reset_code: code,
                    expires_at: expiration_time,
                },
                {
                    where:{
                        email: email,

                    },
            });
        }

        // If this point is reached the user is sent a veritifaction code to establish their identity
        await sendVerificationEmail(email, code);

        // Successful response is sent indicating no errors were encountered

        return res.status(response_status_code).json({message: `Successful password recovery request operation with email ${email}. `})

    }catch(err){

    }
}