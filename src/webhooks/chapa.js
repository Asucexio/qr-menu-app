 import crypto from 'crypto';
import { Router } from 'express';
import supabase from '../lib/supabaseClient.js';

const r = Router();

r.post('/', async (req, res) => {
  try {
    // 1. Verify Chapa HMAC signature
    const signature = req.headers['x-chapa-signature'];
    const expected = crypto
      .createHmac('sha256', process.env.CHAPA_WEBHOOK_SECRET)
      .update(req.body)
      .digest('hex');

    if (signature !== expected) {
      console.warn('[Chapa Webhook] Invalid signature — rejected');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // 2. Parse body (raw buffer → JSON)
    const event = JSON.parse(req.body.toString());
    console.log('[Chapa Webhook] Received:', event.status, event.tx_ref);

    // 3. Activate subscription on success
    if (event.status === 'success' && event.tx_ref) {
      const { data: sub } = await supabase
        .from('subscriptions').select('id, plan')
        .eq('chapa_tx_ref', event.tx_ref).single();

      if (sub) {
        const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
        await supabase.from('subscriptions').update({
          status: 'active',
          started_at: new Date().toISOString(),
          expires_at: expiresAt,
        }).eq('id', sub.id);

        console.log('[Chapa Webhook] Subscription activated:', sub.id);
      }
    }

    res.sendStatus(200); // always 200 so Chapa doesn't retry
  } catch (err) {
    console.error('[Chapa Webhook] Error:', err.message);
    res.sendStatus(200); // still 200 to prevent retries
  }
});

export default r;
