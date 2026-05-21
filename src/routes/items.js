 import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/items.js';

const r = Router();
r.get('/category/:categoryId', ctrl.listByCategory); // public
r.get('/:id',                  ctrl.getOne);          // public
r.use(protect);
r.post('/',            ctrl.create);
r.patch('/:id',        ctrl.update);
r.patch('/:id/toggle', ctrl.toggle);
r.delete('/:id',       ctrl.remove);
export default r;
