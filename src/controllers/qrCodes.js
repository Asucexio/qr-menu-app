import * as svc from '../services/qrCodes.js';
import { getUserId } from '../middlewares/auth.js';

export const generate = async (req, res, next) => {
  try { res.json(await svc.generateQRCode(getUserId(req), req.params.menuId)); } catch (e) { next(e); }
};
export const getByMenu = async (req, res, next) => {
  try { res.json(await svc.getQRByMenu(getUserId(req), req.params.menuId)); } catch (e) { next(e); }
};
export const download = async (req, res, next) => {
  try {
    const buffer = await svc.downloadQRBuffer(getUserId(req), req.params.menuId);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `attachment; filename="qr-${req.params.menuId}.png"`);
    res.send(buffer);
  } catch (e) { next(e); }
};
