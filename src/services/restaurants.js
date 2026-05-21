 import supabase from '../lib/supabaseClient.js';

const makeSlug = (name) =>
  name.toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .slice(0, 60);

export const createRestaurant = async (ownerId, body) => {
  const { name, description, address, phone, logo_url } = body;
  if (!name) throw Object.assign(new Error('name is required'), { status: 400 });

  const { data: existing } = await supabase
    .from('restaurants').select('id').eq('owner_id', ownerId).single();
  if (existing) throw Object.assign(new Error('You already have a restaurant'), { status: 409 });

  let slug = makeSlug(name);
  const { data: slugExists } = await supabase
    .from('restaurants').select('id').eq('slug', slug).single();
  if (slugExists) slug = `${slug}-${Date.now()}`;

  const { data, error } = await supabase
    .from('restaurants')
    .insert({ owner_id: ownerId, name, slug, description, address, phone, logo_url })
    .select().single();
  if (error) throw error;
  return data;
};

export const getMyRestaurant = async (ownerId) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, menus(id, name, is_active, created_at)')
    .eq('owner_id', ownerId)
    .single();
  if (error) throw Object.assign(new Error('Restaurant not found'), { status: 404 });
  return data;
};

export const getRestaurantBySlug = async (slug) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('id, name, slug, description, logo_url, address, phone')
    .eq('slug', slug)
    .single();
  if (error) throw Object.assign(new Error('Restaurant not found'), { status: 404 });
  return data;
};

export const updateRestaurant = async (ownerId, id, body) => {
  const { data: existing } = await supabase
    .from('restaurants').select('id').eq('id', id).eq('owner_id', ownerId).single();
  if (!existing) throw Object.assign(new Error('Restaurant not found'), { status: 404 });

  const allowed = ['name', 'description', 'address', 'phone', 'logo_url'];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));

  const { data, error } = await supabase
    .from('restaurants').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data;
};

export const deleteRestaurant = async (ownerId, id) => {
  const { data: existing } = await supabase
    .from('restaurants').select('id').eq('id', id).eq('owner_id', ownerId).single();
  if (!existing) throw Object.assign(new Error('Restaurant not found'), { status: 404 });

  const { error } = await supabase.from('restaurants').delete().eq('id', id);
  if (error) throw error;
};
