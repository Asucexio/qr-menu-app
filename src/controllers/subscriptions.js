 import * as svc from '../services/subscriptions.js';
import { getUserId } from '../middlewares/auth.js';

export const initialize = async (req, res, next) => {
  try { res.json(await svc.initializePayment(getUserId(req), req.body)); } catch (e) { next(e); }
};
export const verify = async (req, res, next) => {
  try { res.json(await svc.verifyPayment(getUserId(req), req.params.txRef)); } catch (e) { next(e); }
};
export const getStatus = async (req, res, next) => {
  try { res.json(await svc.getSubscriptionStatus(getUserId(req))); } catch (e) { next(e); }
};
