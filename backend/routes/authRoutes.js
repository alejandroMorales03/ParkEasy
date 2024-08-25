import express from 'express';
import { handleSignUp, verifyCode } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', handleSignUp);
router.post('/verify-code', verifyCode);

export default router;
