 import { Router } from 'express';
import { protect } from '../middlewares/auth.js';
import * as ctrl from '../controllers/qrCodes.js';

const r = Router();
r.use(protect);
r.post('/:menuId/generate', ctrl.generate);
r.get('/:menuId',           ctrl.getByMenu);
r.get('/:menuId/download',  ctrl.download);
export default r;
