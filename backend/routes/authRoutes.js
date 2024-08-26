import express from 'express';
import { handleSignUp, verifyCode, handleLogin } from '../controllers/authController.js';

const router = express.Router();


router.post('/signup', handleSignUp);
router.post('/verify-code', verifyCode);
router.post('/login', handleLogin);

export default router;
