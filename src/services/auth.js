import { supabaseAdmin } from '../lib/supabaseClient.js';

// ── Sign Up ──────────────────────────────────────────────────
export const signUp = async ({ email, password, full_name }) => {
  if (!email || !password || !full_name)
    throw Object.assign(new Error('email, password and full_name are required'), { status: 400 });

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // auto-confirm (remove if you want email verification)
    user_metadata: { full_name },
  });

  if (error) throw Object.assign(new Error(error.message), { status: 400 });

  return {
    message: 'Account created successfully',
    user: { id: data.user.id, email: data.user.email, full_name },
  };
};

// ── Sign In ──────────────────────────────────────────────────
// We sign in by calling Supabase Auth REST directly
// so we can return the access_token to the client
export const signIn = async ({ email, password }) => {
  if (!email || !password)
    throw Object.assign(new Error('email and password are required'), { status: 400 });

  const res = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ email, password }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data.error_description || 'Login failed'), { status: 401 });

  return {
    access_token:  data.access_token,   // JWT — send in Authorization header for every request
    refresh_token: data.refresh_token,  // use to get a new access_token when it expires
    expires_in:    data.expires_in,
    user: {
      id:        data.user.id,
      email:     data.user.email,
      full_name: data.user.user_metadata?.full_name,
    },
  };
};

// ── Refresh Token ────────────────────────────────────────────
export const refreshToken = async (refresh_token) => {
  if (!refresh_token)
    throw Object.assign(new Error('refresh_token is required'), { status: 400 });

  const res = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: process.env.SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({ refresh_token }),
    }
  );

  const data = await res.json();
  if (!res.ok) throw Object.assign(new Error(data.error_description || 'Token refresh failed'), { status: 401 });

  return {
    access_token:  data.access_token,
    refresh_token: data.refresh_token,
    expires_in:    data.expires_in,
  };
};

// ── Get Profile ──────────────────────────────────────────────
export const getProfile = async (userId) => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw Object.assign(new Error('Profile not found'), { status: 404 });
  return data;
};

// ── Update Profile ───────────────────────────────────────────
export const updateProfile = async (userId, body) => {
  const allowed = ['full_name', 'avatar_url'];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// ── Change Password ──────────────────────────────────────────
export const changePassword = async (userId, newPassword) => {
  if (!newPassword || newPassword.length < 6)
    throw Object.assign(new Error('Password must be at least 6 characters'), { status: 400 });

  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    password: newPassword,
  });
  if (error) throw Object.assign(new Error(error.message), { status: 400 });
  return { message: 'Password updated successfully' };
};
