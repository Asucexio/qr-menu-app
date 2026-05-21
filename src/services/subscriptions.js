import { v4 as uuid } from 'uuid';
import { chapaInitialize, chapaVerify } from '../lib/chapaClient.js';
import supabase from '../lib/supabaseClient.js';

const PLANS = {
  basic: { amount: 199, label: 'Basic Plan', durationDays: 30 },
  pro:   { amount: 499, label: 'Pro Plan',   durationDays: 30 },
};

export const initializePayment = async (ownerId, body) => {
  const { plan, email, first_name, last_name } = body;
  if (!PLANS[plan])
    throw Object.assign(new Error('Invalid plan. Choose basic or pro'), { status: 400 });
  if (!email || !first_name || !last_name)
    throw Object.assign(new Error('email, first_name and last_name are required'), { status: 400 });

  const txRef = `qrmenu-${plan}-${uuid()}`;
  const { amount, label } = PLANS[plan];

  const result = await chapaInitialize({
    amount, currency: 'ETB', email, first_name, last_name,
    tx_ref: txRef,
    callback_url: `${process.env.API_URL}/api/webhooks/chapa`,
    return_url:   `${process.env.CLIENT_URL}/dashboard?payment=success&ref=${txRef}`,
   customization: {
  title: 'QRMenu',
  description: '30-day subscription'
},
  });

  if (result.status !== 'success')
    throw  Object.assign(
  new Error(
    typeof result.message === "string"
      ? result.message
      : JSON.stringify(result.message)
  ),
  { status: 400 }
);
console.log('chapaInitialize result:', result);

  // cancel previous pending subscriptions for this user
  await supabase.from('subscriptions')
    .update({ status: 'cancelled' })
    .eq('owner_id', ownerId).eq('status', 'pending');

  await supabase.from('subscriptions')
    .insert({ owner_id: ownerId, plan, status: 'pending', chapa_tx_ref: txRef });

  return { checkout_url: result.data.checkout_url, tx_ref: txRef };
};

export const verifyPayment = async (ownerId, txRef) => {
  const result = await chapaVerify(txRef);

  const { data: sub } = await supabase.from('subscriptions')
    .select('id, plan').eq('chapa_tx_ref', txRef).eq('owner_id', ownerId).single();
  if (!sub) throw Object.assign(new Error('Transaction not found'), { status: 404 });

  if (result.data?.status === 'success') {
    const durationDays = PLANS[sub.plan]?.durationDays || 30;
    const expiresAt = new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString();
    await supabase.from('subscriptions')
      .update({ status: 'active', started_at: new Date().toISOString(), expires_at: expiresAt })
      .eq('id', sub.id);
    return { verified: true, status: 'active', expires_at: expiresAt };
  }

  return { verified: false, status: result.data?.status };
};

export const getSubscriptionStatus = async (ownerId) => {
  const { data } = await supabase
    .from('subscriptions').select('plan, status, started_at, expires_at, created_at')
    .eq('owner_id', ownerId)
    .order('created_at', { ascending: false })
    .limit(1).single();

  if (!data) return { plan: 'free', status: 'inactive', active: false };
  const active = data.status === 'active' && new Date(data.expires_at) > new Date();
  return { ...data, active };
};
