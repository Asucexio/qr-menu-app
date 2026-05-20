import { getUserId } from '../middlewares/clerkAuth.js';
import { chapaInitialize, chapaVerify }
  from '../lib/chapaClient.js';
import supabase from '../lib/supabaseClient.js';
import { v4 as uuid } from 'uuid';

export const initialize = async (req, res, next) => {
  try {
    const clerkUserId = getUserId(req);
    const { plan, email, first_name, last_name } = req.body;
    const txRef = `qrmenu-${uuid()}`;
    const amount = plan === 'pro' ? 299 : 99;  // ETB

    const result = await chapaInitialize({
      amount, currency: 'ETB',
      email, first_name, last_name,
      tx_ref: txRef,
      callback_url: `${process.env.API_URL}/api/webhooks/chapa`,
      return_url: `${process.env.CLIENT_URL}/dashboard?payment=success`,
      customization: { title: 'QR Menu Pro Subscription' }
    });

    if (result.status !== 'success')
      return res.status(400).json({ error: result.message });

    // save pending subscription
    await supabase.from('subscriptions').insert({
      clerk_user_id: clerkUserId, plan,
      status: 'pending', chapa_tx_ref: txRef
    });

    res.json({ checkout_url: result.data.checkout_url, txRef });
  } catch(e) { next(e); }
};

export const verify = async (req, res, next) => {
  try {
    const clerkUserId = getUserId(req);
    const result = await chapaVerify(req.params.txRef);
        if (result.data?.status === 'success') {
      await supabase.from('subscriptions')
        .update({
          status: 'active',
          started_at: new Date().toISOString(),
          expires_at: new Date(Date.now() +
            30*24*60*60*1000).toISOString()
        })
        .eq('chapa_tx_ref', req.params.txRef)
        .eq('clerk_user_id', clerkUserId);
    }
    res.json(result);
  } catch(e) { next(e); }
};