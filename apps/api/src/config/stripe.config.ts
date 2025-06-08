import Stripe from 'stripe';

import { STRIPE_SECRET_KEY } from './env.config';

const stripe = new Stripe(STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16',
});

export { stripe };
