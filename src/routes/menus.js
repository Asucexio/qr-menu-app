import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/menus.js';

const r = Router();
r.get('/public/:menuId', ctrl.getPublic); // public — customer view
r.use(protect);
r.post('/',                        ctrl.create);
r.get('/restaurant/:restaurantId', ctrl.listByRestaurant);
r.get('/:id',                      ctrl.getOne);
r.patch('/:id',                    ctrl.update);
r.delete('/:id',                   ctrl.remove);
export default r;
