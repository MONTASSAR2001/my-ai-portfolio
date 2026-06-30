/**
 * Stripe singleton — server-side only.
 * Import this instead of calling `new Stripe()` inline to avoid
 * multiple Stripe client instances across hot-reloads.
 *
 * NEVER import this in a Client Component ("use client").
 */
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    'Missing STRIPE_SECRET_KEY. Add it to .env.local'
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  // Lock the API version so a Stripe dashboard upgrade never breaks us silently.
  apiVersion: '2026-06-24.dahlia',
  typescript: true,
});
