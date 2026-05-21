import * as svc from '../services/menus.js';
import { getUserId } from '../middlewares/auth.js';

export const create = async (req, res, next) => {
  try { res.status(201).json(await svc.createMenu(getUserId(req), req.body)); } catch (e) { next(e); }
};
export const listByRestaurant = async (req, res, next) => {
  try { res.json(await svc.getMenusByRestaurant(getUserId(req), req.params.restaurantId)); } catch (e) { next(e); }
};
export const getOne = async (req, res, next) => {
  try { res.json(await svc.getMenuById(req.params.id)); } catch (e) { next(e); }
};
export const getPublic = async (req, res, next) => {
  try { res.json(await svc.getPublicMenu(req.params.menuId)); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try { res.json(await svc.updateMenu(getUserId(req), req.params.id, req.body)); } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try { await svc.deleteMenu(getUserId(req), req.params.id); res.json({ message: 'Menu deleted' }); } catch (e) { next(e); }
};
