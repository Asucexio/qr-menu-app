import { Router } from 'express';
import { protect } from '../middlewares/clerkAuth.js';
import * as ctrl from '../controllers/subscriptions.js';

const r = Router();

r.post('/initialize', protect, ctrl.initialize);
r.get('/verify/:txRef', protect, ctrl.verify);
r.get('/status', protect, ctrl.getStatus);

export default r;