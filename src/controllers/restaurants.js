 import * as svc from '../services/restaurants.js';
import { getUserId } from '../middlewares/auth.js';

export const create = async (req, res, next) => {
  try { res.status(201).json(await svc.createRestaurant(getUserId(req), req.body)); }
  catch (e) { next(e); }
};
export const getMine = async (req, res, next) => {
  try { res.json(await svc.getMyRestaurant(getUserId(req))); }
  catch (e) { next(e); }
};
export const getBySlug = async (req, res, next) => {
  try { res.json(await svc.getRestaurantBySlug(req.params.slug)); }
  catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try { res.json(await svc.updateRestaurant(getUserId(req), req.params.id, req.body)); }
  catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try {
    await svc.deleteRestaurant(getUserId(req), req.params.id);
    res.json({ message: 'Restaurant deleted' });
  } catch (e) { next(e); }
};
