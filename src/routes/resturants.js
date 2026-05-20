import { Router } from 'express';
import { protect } from '../middlewares/clerkAuth.js';
import * as ctrl from '../controllers/restaurants.js';

const r = Router();
r.use(protect);            // all restaurant routes need auth

r.post('/',    ctrl.create);
r.get('/me',   ctrl.getMine);
r.patch('/:id', ctrl.update);
r.delete('/:id', ctrl.remove);

export default r;