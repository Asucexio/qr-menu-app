import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/auth.js';

const r = Router();

// Public
r.post('/signup',   ctrl.signUp);   // register new owner
r.post('/signin',   ctrl.signIn);   // login → returns access_token + refresh_token
r.post('/refresh',  ctrl.refresh);  // get new access_token using refresh_token

// Protected
r.get('/profile',           protect, ctrl.getProfile);
r.patch('/profile',         protect, ctrl.updateProfile);
r.patch('/change-password', protect, ctrl.changePassword);

export default r;
