import { validatePassword } from "../../utils/password_utils";


export const signUp = async (req, res) =>{

    // Default empty error object
    
    const error = {};
    let response_status_code = 200 // Default success code
    const {email, first_name, last_name, password} = req.body;


    // Email is not provided
    if(!email){
        error.email = {
            error: 400,
            message: "Email field is required",
        }
        console.log(error.email);
    }

    // Password is not provided
    if(!password){
        error.password = {
            error: 400,
            message: "Password field is required",
        }
        console.log(error.password);
    }
    else{
        // Checks for password validation properties (uppercase, lowercase, digit, special char, unsupported char)
        const password_error = await validatePassword(password);
        
        if(Object.keys(password_error).length > 0){
            error.password = {
                error: 422,
                message: {}

            }

            // For each key in the password_error object add the corresponding error message to the message object
            for(let key in password_error){
                if(password_error.hasOwnProperty(key))
                error.password.message[key] = password_error[key];
            }

            console.log(error.password)
            
        }
    }

    
}