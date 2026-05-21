import supabase from '../lib/supabaseClient.js';

const assertCategoryOwner = async (ownerId, categoryId) => {
  const { data } = await supabase
    .from('categories')
    .select('id, menus!inner(restaurants!inner(owner_id))')
    .eq('id', categoryId)
    .eq('menus.restaurants.owner_id', ownerId)
    .single();
  if (!data) throw Object.assign(new Error('Category not found or access denied'), { status: 403 });
};

const assertItemOwner = async (ownerId, itemId) => {
  const { data } = await supabase
    .from('items')
    .select('id, categories!inner(menus!inner(restaurants!inner(owner_id)))')
    .eq('id', itemId)
    .eq('categories.menus.restaurants.owner_id', ownerId)
    .single();
  if (!data) throw Object.assign(new Error('Item not found or access denied'), { status: 403 });
  return data;
};

export const createItem = async (ownerId, body) => {
  const { category_id, name, description, price, image_url, sort_order = 0 } = body;
  if (!category_id || !name || price === undefined)
    throw Object.assign(new Error('category_id, name and price are required'), { status: 400 });
  await assertCategoryOwner(ownerId, category_id);

  const { data, error } = await supabase
    .from('items')
    .insert({ category_id, name, description, price, image_url, sort_order })
    .select().single();
  if (error) throw error;
  return data;
};

export const getItemsByCategory = async (categoryId) => {
  const { data, error } = await supabase
    .from('items').select('*').eq('category_id', categoryId).order('sort_order');
  if (error) throw error;
  return data;
};

export const getItemById = async (itemId) => {
  const { data, error } = await supabase
    .from('items').select('*').eq('id', itemId).single();
  if (error) throw Object.assign(new Error('Item not found'), { status: 404 });
  return data;
};

export const updateItem = async (ownerId, itemId, body) => {
  await assertItemOwner(ownerId, itemId);
  const allowed = ['name', 'description', 'price', 'image_url', 'is_available', 'sort_order'];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
  const { data, error } = await supabase
    .from('items').update(updates).eq('id', itemId).select().single();
  if (error) throw error;
  return data;
};

export const toggleAvailability = async (ownerId, itemId) => {
  await assertItemOwner(ownerId, itemId);
  const { data: current } = await supabase
    .from('items').select('is_available').eq('id', itemId).single();
  const { data, error } = await supabase
    .from('items').update({ is_available: !current.is_available })
    .eq('id', itemId).select().single();
  if (error) throw error;
  return data;
};

export const deleteItem = async (ownerId, itemId) => {
  await assertItemOwner(ownerId, itemId);
  const { error } = await supabase.from('items').delete().eq('id', itemId);
  if (error) throw error;
};
