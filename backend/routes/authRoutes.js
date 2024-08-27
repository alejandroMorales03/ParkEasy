import express from 'express';
import { handleSignUp,  handleLogin, verifySignUp , handleForgottenPasswordRequest, handleResetPassword, handleResetPasswordCompletion} from '../controllers/authController.js';

const router = express.Router();


router.post('/signup', handleSignUp);
router.post('/verify-signup', verifySignUp);
router.post('/login', handleLogin);
router.post('/reset-password', handleForgottenPasswordRequest);
router.post('/new-password', handleResetPasswordCompletion);

export default router;
