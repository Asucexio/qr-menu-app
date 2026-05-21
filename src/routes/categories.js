import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/categories.js';

const r = Router();
r.get('/menu/:menuId', ctrl.listByMenu); // public — used by menu page
r.use(protect);
r.post('/',      ctrl.create);
r.patch('/:id',  ctrl.update);
r.delete('/:id', ctrl.remove);
export default r;
