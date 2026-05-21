// api/src/routes/restaurants.js
import express from 'express';
import { clerkAuth } from '../middleware/auth.js';
import { supabase } from '../supabaseClient.js';

const router = express.Router();

// Require auth for all routes
router.use(clerkAuth);

// Create a restaurant
router.post('/', async (req, res, next) => {
  const { name, description } = req.body;
  const owner_id = req.userId;
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .insert({ name, description, owner_id })
      .single();
    if (error) throw error;
    res.status(201).json(data);
  } catch (e) {
    next(e);
  }
});

// Get a single restaurant (owner only)
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', id)
      .eq('owner_id', req.userId)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Not found' });
      throw error;
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// Update a restaurant
router.put('/:id', async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .update({ ...updates })
      .eq('id', id)
      .eq('owner_id', req.userId)
      .single();
    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Not found' });
      throw error;
    }
    res.json(data);
  } catch (e) {
    next(e);
  }
});

// Delete a restaurant
router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('restaurants')
      .delete()
      .eq('id', id)
      .eq('owner_id', req.userId);
    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Not found' });
      throw error;
    }
    res.json({ message: 'Deleted' });
  } catch (e) {
    next(e);
  }
});
router.get('/', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', req.userId);
    if (error) throw error;
    res.json(data);
  } catch (e) {
    next(e);
  }
});

export default router;
