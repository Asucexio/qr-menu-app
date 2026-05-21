import * as svc from '../services/auth.js';
import { getUserId } from '../middlewares/auth.js';

export const signUp = async (req, res, next) => {
  try {
    const data = await svc.signUp(req.body);
    res.status(201).json(data);
  } catch (e) { next(e); }
};

export const signIn = async (req, res, next) => {
  try {
    const data = await svc.signIn(req.body);
    res.json(data);
  } catch (e) { next(e); }
};

export const refresh = async (req, res, next) => {
  try {
    const data = await svc.refreshToken(req.body.refresh_token);
    res.json(data);
  } catch (e) { next(e); }
};

export const getProfile = async (req, res, next) => {
  try {
    const data = await svc.getProfile(getUserId(req));
    res.json(data);
  } catch (e) { next(e); }
};

export const updateProfile = async (req, res, next) => {
  try {
    const data = await svc.updateProfile(getUserId(req), req.body);
    res.json(data);
  } catch (e) { next(e); }
};

export const changePassword = async (req, res, next) => {
  try {
    const data = await svc.changePassword(getUserId(req), req.body.password);
    res.json(data);
  } catch (e) { next(e); }
};
