import express from 'express';
import login from '../controllers/Authorization/login.js'
import verify_signup from '../controllers/Authorization/verify_signup.js';
import sign_up from '../controllers/Authorization/signup.js';
import reset_password from '../controllers/Authorization/reset_password.js';
import verify_reset_password from '../controllers/Authorization/verify_reset_password.js';

const router = express.Router();


router.post('/signup', sign_up);
router.post('/verify-signup', verify_signup);
router.post('/login', login);
router.post('/reset-password', reset_password);
router.post('/new-password', verify_reset_password);

export default router;
