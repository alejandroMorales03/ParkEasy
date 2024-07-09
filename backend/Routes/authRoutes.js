import express from 'express'
import { handleLogin, handleSignup } from "../controllers/authentication.js";

const authentication = express.Router();

authentication.post('/login', handleLogin);
authentication.post('/signup', handleSignup);
//logout maybe?

export default authentication;