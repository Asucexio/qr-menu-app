import * as svc from '../services/categories.js';
import { getUserId } from '../middlewares/auth.js';

export const create = async (req, res, next) => {
  try { res.status(201).json(await svc.createCategory(getUserId(req), req.body)); } catch (e) { next(e); }
};
export const listByMenu = async (req, res, next) => {
  try { res.json(await svc.getCategoriesByMenu(req.params.menuId)); } catch (e) { next(e); }
};
export const update = async (req, res, next) => {
  try { res.json(await svc.updateCategory(getUserId(req), req.params.id, req.body)); } catch (e) { next(e); }
};
export const remove = async (req, res, next) => {
  try { await svc.deleteCategory(getUserId(req), req.params.id); res.json({ message: 'Category deleted' }); } catch (e) { next(e); }
};
