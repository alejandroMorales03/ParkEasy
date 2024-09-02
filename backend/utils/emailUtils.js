import crypto from 'crypto';
import nodemailer from 'nodemailer';
import config from '../config/config.js';

// Generate a verification code
const generateVerificationCode = () => crypto.randomBytes(3).toString('hex').toUpperCase();

// Send verification email
const sendVerificationEmail = async (email, code) => {
   
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
        
        await transporter.sendMail(mailOptions);
        console.log('Verification email sent successfully');
    } catch (error) {
        
        console.error('Error sending verification email:', error);
        throw error;
    }
};

export { generateVerificationCode, sendVerificationEmail };
