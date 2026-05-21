import { requireAuth, getAuth } from '@clerk/express';

export const protect = requireAuth();

export const getUserId = (req) => {
  const { userId } = getAuth(req);
  if (!userId) throw new Error('Unauthorized');
  return userId;
};
