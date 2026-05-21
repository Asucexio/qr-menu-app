import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/restaurants.js';

const r = Router();

// Public
r.get('/slug/:slug', ctrl.getBySlug);

// Protected
r.use(protect);
r.post('/',      ctrl.create);
r.get('/me',     ctrl.getMine);
r.patch('/:id',  ctrl.update);
r.delete('/:id', ctrl.remove);

export default r;