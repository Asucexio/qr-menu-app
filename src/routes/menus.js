import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/menus.js';
import { requireSubscription } from '../middlewares/reqiresubscription.js';

const r = Router();
r.get('/public/:menuId', ctrl.getPublic); // public — customer view
r.use(protect);
r.post('/', requireSubscription, ctrl.create);
r.get('/restaurant/:restaurantId', ctrl.listByRestaurant);
r.get('/:id',                      ctrl.getOne);
r.patch('/:id', requireSubscription, ctrl.update);
r.delete('/:id', requireSubscription, ctrl.remove);
export default r;
