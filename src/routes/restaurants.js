import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/restaurants.js';

const r = Router();
r.get('/slug/:slug', ctrl.getBySlug); // public
r.use(protect);
r.post('/',      ctrl.create);
r.get('/me',     ctrl.getMine);
r.patch('/:id',  ctrl.update);
r.delete('/:id', ctrl.remove);
export default r;
