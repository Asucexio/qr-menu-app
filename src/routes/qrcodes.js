import { Router } from 'express';
import { protect } from '../middlewares/clerkAuth.js';
import { generateQR } from '../services/qrCodes.js';

const r = Router();
r.use(protect);

r.post('/:menuId/generate', async (req, res, next) => {
  try {
    const qr = await generateQR(
      req.params.menuId,
      process.env.CLIENT_URL
    );
    res.json(qr);
  } catch(e) { next(e); }
});

export default r;