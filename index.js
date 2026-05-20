 src/index.js

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { clerkMiddleware } from '@clerk/express';

import restaurantRoutes from './routes/restaurants.js';
import menuRoutes from './routes/menus.js';
import categoryRoutes from './routes/categories.js';
import itemRoutes from './routes/items.js';
import subscriptionRoutes from './routes/subscriptions.js';
import chapaWebhook from './webhooks/chapa.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(morgan('dev'));

// webhook needs raw body — register BEFORE json parser
app.use('/api/webhooks/chapa', express.raw({ type:'*/*' }), chapaWebhook);

app.use(express.json());
app.use(clerkMiddleware());

app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log('Server on port ' + process.env.PORT));

export default app;