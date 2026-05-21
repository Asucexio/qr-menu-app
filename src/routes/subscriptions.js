 import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/subscriptions.js';

const r = Router();
r.use(protect);
r.post('/initialize',    ctrl.initialize);
r.get('/verify/:txRef',  ctrl.verify);
r.get('/status',         ctrl.getStatus);
export default r;
