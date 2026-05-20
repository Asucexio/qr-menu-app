// Chapa has no official Node SDK — we use fetch
const CHAPA_BASE = 'https://api.chapa.co/v1';

const chapaHeaders = () => ({
  'Authorization': `Bearer ${process.env.CHAPA_SECRET_KEY}`,
  'Content-Type': 'application/json',
});

export const chapaInitialize = async (payload) => {
  const res = await fetch(`${CHAPA_BASE}/transaction/initialize`, {
    method: 'POST',
    headers: chapaHeaders(),
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const chapaVerify = async (txRef) => {
  const res = await fetch(`${CHAPA_BASE}/transaction/verify/${txRef}`, {
    headers: chapaHeaders(),
  });
  return res.json();
};