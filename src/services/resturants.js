import supabase from '../lib/supabaseClient.js';
import { v4 as uuid } from 'uuid';

export const createRestaurant = async (clerkUserId, data) => {
  const slug = data.name.toLowerCase()
    .replace(/s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const { data: row, error } = await supabase
    .from('restaurants')
    .insert({ ...data, clerk_user_id: clerkUserId, slug })
    .select().single();

  if (error) throw error;
  return row;
};

export const getMyRestaurant = async (clerkUserId) => {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, menus(*)')
    .eq('clerk_user_id', clerkUserId)
    .single();
  if (error) throw error;
  return data;
};