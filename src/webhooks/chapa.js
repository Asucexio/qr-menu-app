import crypto from 'crypto';
import supabase from '../lib/supabaseClient.js';
import { Router } from 'express';

const chapaWebhook = Router();

chapaWebhook.post('/', async (req, res) => {
  const sig = req.headers['chapa-signature'];
  const expected = crypto
    .createHmac('sha256', process.env.CHAPA_WEBHOOK_SECRET)
    .update(req.body).digest('hex');

  if (sig !== expected)
    return res.status(401).send('Invalid signature');

  const event = JSON.parse(req.body.toString());

  if (event.status === 'success') {
    await supabase.from('subscriptions')
      .update({
        status: 'active',
        started_at: new Date().toISOString(),
        expires_at: new Date(Date.now() +
          30*24*60*60*1000).toISOString()
      })
      .eq('chapa_tx_ref', event.tx_ref);
  }

  res.sendStatus(200);
});

export default chapaWebhook;