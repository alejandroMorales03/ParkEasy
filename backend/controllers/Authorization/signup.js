import { ERROR_CODE, SUCCESS } from "../../Constants/error_code";
import { generateVerificationCode, sendVerificationEmail, setEmailError } from "../../utils/email_utils";
import { setPasswordError, setConfirmPasswordError } from "../../utils/password_utils";
import USER from "../../models/user_model";
import PENDING_USER from "../../models/pending_user_model";

const signUp = async (req, res) => {
    // Default empty error object
    const error = {};
    let response_status_code = SUCCESS;
    const { email, first_name, last_name, password, confirmed_password } = req.body;

    // Validate input fields
    await setEmailError(email, error);
    await setPasswordError(password, error);
    await setConfirmPasswordError(password, confirmed_password, error);

    // Check for missing first name and last name
    if (!first_name) {
        error.first_name = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "First name field is required",
        };
    }
    if (!last_name) {
        error.last_name = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Last name field is required",
        };
    }

    // Early exit if there is a formatting problem in the form
    if (Object.keys(error).length > 0) {
        response_status_code = ERROR_CODE.BAD_REQUEST;
        console.log(error);
        return res.status(response_status_code).json({
            error: error
        });
    }

    try {
        // Check if email already exists in the USER model
        const userRecords = await USER.findAll({
            where: {
                email: email,
            },
        });

        // Early exit if the email is already in use
        if (userRecords.length > 0) {
            response_status_code = ERROR_CODE.BAD_REQUEST;
            error.code = ERROR_CODE.BAD_REQUEST;
            error.message = "This email is already associated with an account.";
            console.log(error);
            return res.status(response_status_code).json({ error: error });
        }

        // Generate verification code and expiration time
        const code = generateVerificationCode();
        const expiration_time = new Date(Date.now() + 15 * 60 * 1000).toISOString();

        // Check if there's an existing pending sign-up attempt for the email
        const pendingUserRecords = await PENDING_USER.findAll({
            where: {
                email: email,
            },
        });

        if (pendingUserRecords.length > 0) {
            // Update the existing pending user with new verification code and expiration
            await PENDING_USER.update(
                {
                    verification_code: code,
                    expires_at: expiration_time,
                },
                {
                    where: {
                        email: email,
                    },
                }
            );
        } else {
            // Create a new pending user record
            await PENDING_USER.create({
                email: email,
                verification_code: code,
                expires_at: expiration_time,
            });
        }

        // Send verification email
        await sendVerificationEmail(email, code);

        // Return success response after all operations
        res.status(response_status_code).json({
            message: `Successful sign-up operation with ${email}.`
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong. Please try again later!" });
    }
};

export default signUp;
