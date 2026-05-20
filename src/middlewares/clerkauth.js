import { requireAuth, getAuth } from '@clerk/express';

// attach to any route that needs a logged-in user
export const protect = requireAuth();

// helper — get clerk user id from request
export const getUserId = (req) => getAuth(req).userId;