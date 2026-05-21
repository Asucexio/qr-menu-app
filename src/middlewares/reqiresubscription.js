import supabase from '../lib/supabaseClient.js';
import { getUserId } from './auth.js';

export const requireSubscription = async (req, res, next) => {
  try {
    const ownerId = getUserId(req);

    const { data } = await supabase
      .from('subscriptions')
      .select('status, expires_at')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const isActive =
      data?.status === 'active' && new Date(data.expires_at) > new Date();

    if (!isActive) {
      return res.status(403).json({
        error: 'Active subscription required. Please subscribe to continue.',
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
