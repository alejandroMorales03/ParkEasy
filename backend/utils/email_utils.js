import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

// Takes an email and checks if it follows the appropriate format
export const isEmailValid = (email_value) => {
    // Updated regular expression for validating email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Check if the email matches the pattern
    return emailPattern.test(email_value);  // Synchronous check
};

// Takes an error object and validates an email. If there is an error in the email object,
// the error object is modified.
export const setEmailError = async (email, error) => {
    if (!email) {
        // If email is not provided, set the "Email field is required" error
        error.email = {
            code: ERROR_CODE.BAD_REQUEST,
            message: "Email field is required.",
        };
    } else {
        // Check if email follows appropriate format
        const isValid = isEmailValid(email);  // Synchronous check

        if (!isValid) {
            error.email = {
                code: ERROR_CODE.UNPROCESSABLE_ENTITY, 
                message: "Invalid email format",
            };
        }
    }
};

// Generate a verification code (Synchronous)
export const generateVerificationCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

// Send verification email (Asynchronous)
export const sendVerificationEmail = async (email, code) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use 'gmail' for Gmail service
        auth: {
            user: config.notifier.email, // Email used for authentication
            pass: config.notifier.password // Password for the email account (application-specific password if 2SV is enabled)
        }
    });

    const mailOptions = {
        from: config.notifier.email, // Sender's email address
        to: email, // Recipient's email address
        subject: 'Your Verification Code',
        text: `Your verification code is: ${code}` // Email content
    };

    try {
        await transporter.sendMail(mailOptions);  // Async I/O operation
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw error;
    }
};
