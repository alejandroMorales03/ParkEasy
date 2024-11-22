import { ERROR_CODE, SUCCESS, SALT_ROUNDS, SERVER_ERROR_MESSAGE } from '../../Constants/constants.js';
import PENDING_USER from '../../models/pending_user_model.js';
import { Op } from 'sequelize';
import USER from '../../models/user_model.js';
import { hashPassword, setPasswordError } from '../../utils/password_utils.js';
import { setEmailError } from '../../utils/email_utils.js';

const verify_signup = async (req, res) => {
    let response_status_code = SUCCESS;
    const { email, code, first_name, last_name, password } = req.body;
    const error = {};

    // Check for missing verification code
    if (!code) {
        error.code = ERROR_CODE.BAD_REQUEST;
        error.message = 'Verification code field is required.';
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }

    // Check for missing required data that was not transfered during naviagation.

    if(!(last_name && first_name && email && password)){
        response_status_code = ERROR_CODE.BAD_REQUEST;
        error.code = ERROR_CODE.BAD_REQUEST,
        error.message = "One or more required fields were not passed during navigation.";
        console.log(error)
        return res.status(response_status_code).json({error: error });
    }
    
    

    try {
        // Find a pending user record with a matching email and valid verification code
        const pending_user_records = await PENDING_USER.findAll({
            where: {
                email: email,
                verification_code: code,
                expires_at: {
                    [Op.gt]: new Date(),
                },
            },
        });

        // Early exit if the code is invalid or expired
        if (pending_user_records.length === 0) {
            error.code = ERROR_CODE.UNAUTHORIZED;
            error.message = 'Verification code is invalid or expired.';
            response_status_code = ERROR_CODE.UNAUTHORIZED;
            console.log(error);
            return res.status(response_status_code).json({ error: error });
        }

        // If valid, create the user in the USER table
        const hashed_password = await hashPassword(password, SALT_ROUNDS);
        await USER.create({
            email: email,
            first_name: first_name,
            last_name: last_name,
            password: hashed_password,
        });

        // Clean up the PENDING_USER table by removing the pending verification record
        await PENDING_USER.destroy({
            where: {
                email: email,
            },
        });

        // Return success response
        return res.status(response_status_code).json({
            message: `Successfully verified sign-up for email ${email}.`,
        });
    } catch (err) {
        error.code = ERROR_CODE.SERVER_ERROR;
        error.message = SERVER_ERROR_MESSAGE;
        console.log(error);
        return res.status(response_status_code).json({ error: error });
    }
};

export default verify_signup;
