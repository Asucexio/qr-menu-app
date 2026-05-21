import supabase from '../lib/supabaseClient.js';
import { getUserId } from './clerkAuth.js';

export const requireSubscription = async (req, res, next) => {
  try {
    const clerkUserId = getUserId(req);

    const { data, error } = await supabase
      .from('subscriptions')
      .select('status, expires_at')
      .eq('clerk_user_id', clerkUserId)
      .single();

    if (error || !data) {
      return res.status(403).json({ error: 'No active subscription found' });
    }

    const isActive =
      data.status === 'active' &&
      new Date(data.expires_at) > new Date();

    if (!isActive) {
      return res.status(403).json({
        error: 'Subscription expired. Please renew to continue.',
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
