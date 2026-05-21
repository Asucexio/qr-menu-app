import { createClient } from '@supabase/supabase-js';

// ── Admin client (service role) ─────────────────────────────
// Bypasses RLS — use only in Express backend, never expose to frontend
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

// ── Auth client (anon key) ──────────────────────────────────
// Used to verify user JWTs sent from the frontend
export const supabaseAuth = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
  { auth: { persistSession: false, autoRefreshToken: false } }
);

export default supabaseAdmin;
