import { Router } from 'express';
import { protect } from '../middlewares/clerkAuth.js';
import * as ctrl from '../controllers/items.js';

const r = Router();
r.use(protect);

r.post('/',        ctrl.create);   // body: { category_id, name, price, ... }
r.get('/category/:categoryId', ctrl.listByCategory);
r.patch('/:id',    ctrl.update);
r.delete('/:id',   ctrl.remove);
r.patch('/:id/toggle', ctrl.toggleAvailability);

export default r;