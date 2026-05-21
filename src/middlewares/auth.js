import { supabaseAdmin } from '../lib/supabaseClient.js';

// ── protect ─────────────────────────────────────────────────
// Validates the Supabase JWT from Authorization header.
// Attaches req.user = { id, email, ...metadata }
export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid Authorization header' });
    }

    const token = authHeader.split(' ')[1];

    // verify JWT with Supabase — returns the user if valid
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    req.user = user; // { id, email, user_metadata, ... }
    next();
  } catch (err) {
    next(err);
  }
};

// ── getUserId ────────────────────────────────────────────────
// Helper to pull the user's UUID from req.user inside controllers
export const getUserId = (req) => {
  if (!req.user?.id) throw Object.assign(new Error('Unauthorized'), { status: 401 });
  return req.user.id;
};
