import * as svc from '../services/items.js';
import { getUserId } from '../middlewares/auth.js';

export const create = async (req, res, next) => {
  try { res.status(201).json(await svc.createItem(getUserId(req), req.body)); } catch (e) { next(e); }
};
export const listByCategory = async (req, res, next) => {
  try { res.json(await svc.getItemsByCategory(req.params.categoryId)); } catch (e) { next(e); }
};
export const getOne = async (req, res, next) => {
  try { res.json(await svc.getItemById(req.params.id)); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try { res.json(await svc.updateItem(getUserId(req), req.params.id, req.body)); } catch (e) { next(e); }
};
export const toggle = async (req, res, next) => {
  try { res.json(await svc.toggleAvailability(getUserId(req), req.params.id)); } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try { await svc.deleteItem(getUserId(req), req.params.id); res.json({ message: 'Item deleted' }); } catch (e) { next(e); }
};
