/**
 * POST /api/webhooks/stripe
 *
 * Receives Stripe webhook events and fulfils them securely.
 *
 * Security checklist:
 *  ✅ Reads raw body bytes (not parsed JSON) before signature verification.
 *  ✅ Verifies the `Stripe-Signature` header using STRIPE_WEBHOOK_SECRET.
 *  ✅ Only processes events we explicitly handle; ignores everything else.
 *  ✅ Uses the admin Supabase client (service role) so RLS cannot block it.
 *  ✅ Returns 200 for both success and ignored events so Stripe stops retrying.
 *  ✅ Returns 400 only for genuine verification failures so Stripe keeps retrying
 *     on transient DB errors (we return 500 for those so Stripe retries).
 *
 * Stripe webhook configuration:
 *   Dashboard → Developers → Webhooks → Add endpoint
 *   URL:    https://your-domain.com/api/webhooks/stripe
 *   Events: checkout.session.completed
 *
 * IMPORTANT: This route MUST opt out of Next.js body parsing.
 *   We set `export const dynamic = 'force-dynamic'` and read `request.arrayBuffer()`
 *   so Stripe's signature verification receives the exact raw bytes.
 */
import { NextResponse } from 'next/server';
import type { Stripe as StripeType } from 'stripe';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic so Next.js never caches or pre-renders this route.
export const dynamic = 'force-dynamic';

// Disable Next.js body parsing — Stripe needs the raw bytes.
export const runtime = 'nodejs';

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('❌ STRIPE_WEBHOOK_SECRET is not set');
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  // ── 1. Read raw body ────────────────────────────────────────────────────────
  const rawBody = await request.arrayBuffer();
  const bodyBuffer = Buffer.from(rawBody);
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  // ── 2. Verify signature ─────────────────────────────────────────────────────
  let event: StripeType.Event;
  try {
    event = stripe.webhooks.constructEvent(bodyBuffer, signature, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`❌ Stripe webhook signature verification failed: ${message}`);
    // Return 400 → tells Stripe the payload is bad (it will NOT retry).
    return new NextResponse(`Webhook signature verification failed: ${message}`, {
      status: 400,
    });
  }

  console.log(`✅ Stripe event received: ${event.type} [${event.id}]`);

  // ── 3. Route on event type ──────────────────────────────────────────────────
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        await handleCheckoutSessionCompleted(
          event.data.object as StripeType.Checkout.Session
        );
        break;
      }
      // Add more cases here as you expand (e.g. refunds, subscription events)
      default:
        console.log(`⏭️  Unhandled Stripe event type: ${event.type}`);
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`❌ Error processing Stripe event ${event.id}: ${message}`);
    // Return 500 → Stripe will retry with back-off (good for transient DB errors).
    return new NextResponse('Internal error processing webhook', { status: 500 });
  }

  // Always acknowledge receipt to Stripe.
  return new NextResponse(null, { status: 200 });
}

// ── Handlers ──────────────────────────────────────────────────────────────────

async function handleCheckoutSessionCompleted(
  session: StripeType.Checkout.Session
) {
  const { portfolio_id, portfolio_slug, user_id } = session.metadata ?? {};

  console.log(
    `💳 checkout.session.completed — portfolio_id=${portfolio_id} slug=${portfolio_slug} user_id=${user_id}`
  );

  if (!portfolio_id) {
    // Metadata missing — this should never happen if /api/checkout is the only
    // place creating sessions. Log and skip rather than erroring.
    console.error(
      '❌ checkout.session.completed: no portfolio_id in metadata. Session:',
      session.id
    );
    return;
  }

  // ── Flip has_paid + is_published in a single atomic update ─────────────────
  const { error } = await supabaseAdmin
    .from('portfolios')
    .update({
      has_paid:    true,
      is_published: true,
      // Also persist the customer ID in case it wasn't saved during checkout creation
      stripe_customer_id: session.customer as string | null,
    })
    .eq('id', portfolio_id);

  if (error) {
    console.error(
      `❌ Supabase update failed for portfolio_id=${portfolio_id}:`,
      error.message
    );
    // Throw so the outer handler returns 500 and Stripe retries.
    throw new Error(`DB update failed: ${error.message}`);
  }

  console.log(
    `✅ Portfolio ${portfolio_id} (slug: ${portfolio_slug}) is now published.`
  );
}
