import dotenv from 'dotenv';
import { Router } from 'express';
import { register, login, getUserProfile } from "../controllers/auth.controller.js"
import { logRequest } from '../middlewares/logRequest.js';
import { checkUserExists } from '../middlewares/checkUserExists.js';
import verifyToken from '../middlewares/verifyToken.js';

dotenv.config();
const router = Router();

//ROUTE FOR CREATING NEW USER
router.post('/register', logRequest, checkUserExists, register);

//ROUTE FOR LOGGING IN THE EXISTING USER
router.post('/login', logRequest, login);

// PROFILE
router.get('/profile', verifyToken, getUserProfile);

export default router;
