import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// routes
import authRoutes         from './routes/auth.js';
// import restaurantRoutes   from './routes/restaurants.js';
// import menuRoutes         from './routes/menus.js';
// import categoryRoutes     from './routes/categories.js';
// import itemRoutes         from './routes/items.js';
// import subscriptionRoutes from './routes/subscriptions.js';
// import qrRoutes           from './routes/qrCodes.js';

// webhook (needs raw body — registered BEFORE json parser)
// import chapaWebhook from './webhooks/chapa.js';

// error handler
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// ── Security & logging ──────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(morgan('dev'));

// ── Chapa webhook — raw body BEFORE json parser ─────────────
// app.use('/api/webhooks/chapa', express.raw({ type: '*/*' }), chapaWebhook);

// ── Body parsers ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health check ────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'Dhena Negn', timestamp: new Date().toISOString() });
});

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth',          authRoutes);
// app.use('/api/restaurants',   restaurantRoutes);
// app.use('/api/menus',         menuRoutes);
// app.use('/api/categories',    categoryRoutes);
// app.use('/api/items',         itemRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/qr',            qrRoutes);

// ── 404 ─────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.method} ${req.path} not found` });
});

// ── Global error handler ────────────────────────────────────
app.use(errorHandler);

// ── Start ───────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ┌────────────────────────────────────────┐
  │   QR Menu Backend                      │
  │   http://localhost:${PORT}                │
  │   Auth: Supabase Auth                  │
  │   ENV:  ${process.env.NODE_ENV || 'development'}                   │
  └────────────────────────────────────────┘
  `);
});

export default app;
