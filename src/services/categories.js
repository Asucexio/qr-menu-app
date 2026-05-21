import supabase from '../lib/supabaseClient.js';

const assertMenuOwner = async (ownerId, menuId) => {
  const { data } = await supabase
    .from('menus')
    .select('id, restaurants!inner(owner_id)')
    .eq('id', menuId)
    .eq('restaurants.owner_id', ownerId)
    .single();
  if (!data) throw Object.assign(new Error('Menu not found or access denied'), { status: 403 });
};

const assertCategoryOwner = async (ownerId, categoryId) => {
  const { data } = await supabase
    .from('categories')
    .select('id, menus!inner(restaurants!inner(owner_id))')
    .eq('id', categoryId)
    .eq('menus.restaurants.owner_id', ownerId)
    .single();
  if (!data) throw Object.assign(new Error('Category not found or access denied'), { status: 403 });
  return data;
};

export const createCategory = async (ownerId, body) => {
  const { menu_id, name, sort_order = 0 } = body;
  if (!menu_id || !name)
    throw Object.assign(new Error('menu_id and name are required'), { status: 400 });
  await assertMenuOwner(ownerId, menu_id);

  const { data, error } = await supabase
    .from('categories').insert({ menu_id, name, sort_order }).select().single();
  if (error) throw error;
  return data;
};

export const getCategoriesByMenu = async (menuId) => {
  const { data, error } = await supabase
    .from('categories').select('*, items(*)').eq('menu_id', menuId).order('sort_order');
  if (error) throw error;
  return data;
};

export const updateCategory = async (ownerId, categoryId, body) => {
  await assertCategoryOwner(ownerId, categoryId);
  const allowed = ['name', 'sort_order'];
  const updates = Object.fromEntries(Object.entries(body).filter(([k]) => allowed.includes(k)));
  const { data, error } = await supabase
    .from('categories').update(updates).eq('id', categoryId).select().single();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (ownerId, categoryId) => {
  await assertCategoryOwner(ownerId, categoryId);
  const { error } = await supabase.from('categories').delete().eq('id', categoryId);
  if (error) throw error;
};
