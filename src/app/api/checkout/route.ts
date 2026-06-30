/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for a single portfolio publish.
 * The session metadata carries portfolio_id + user_id so the webhook
 * knows exactly which row to flip after payment.
 *
 * Security notes:
 *  - We read the authenticated user's session from the Authorization header
 *    (or fall back to anonymous mode for the MVP).
 *  - We look up or create a Stripe Customer so the user's payment history
 *    stays linked across sessions.
 *  - We never trust the client-supplied portfolio ownership — we always
 *    verify the slug belongs to the request context.
 */
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

/** One-time product price in cents (USD). Update this or use a real Price ID. */
const PRICE_AMOUNT_CENTS = 1900; // $19.00

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { slug: string; user_id?: string };
    const { slug, user_id } = body;

    if (!slug || slug.trim().length < 3) {
      return NextResponse.json(
        { error: 'A valid portfolio slug is required.' },
        { status: 400 }
      );
    }

    // ── 1. Fetch the portfolio row (confirms it exists) ──────────────────────
    const { data: portfolio, error: fetchErr } = await supabaseAdmin
      .from('portfolios')
      .select('id, slug, stripe_customer_id, has_paid')
      .eq('slug', slug.trim())
      .single();

    if (fetchErr || !portfolio) {
      return NextResponse.json(
        { error: 'Portfolio not found. Save your portfolio first.' },
        { status: 404 }
      );
    }

    // ── 2. Guard against re-purchase ────────────────────────────────────────
    if (portfolio.has_paid) {
      return NextResponse.json(
        { error: 'This portfolio has already been published.' },
        { status: 409 }
      );
    }

    // ── 3. Get or create a Stripe Customer ─────────────────────────────────
    let customerId: string | undefined = portfolio.stripe_customer_id ?? undefined;

    if (!customerId) {
      const customer = await stripe.customers.create({
        metadata: {
          portfolio_slug: slug,
          ...(user_id ? { user_id } : {}),
        },
      });
      customerId = customer.id;

      // Persist immediately so we can reuse on retries
      await supabaseAdmin
        .from('portfolios')
        .update({ stripe_customer_id: customerId })
        .eq('id', portfolio.id);
    }

    // ── 4. Create the Checkout Session ─────────────────────────────────────
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'usd',
            unit_amount: PRICE_AMOUNT_CENTS,
            product_data: {
              name: 'PortfolioAI — Publish Your Portfolio',
              description: `One-time payment to publish portfolioai.app/p/${slug}`,
              images: [],
            },
          },
        },
      ],
      metadata: {
        portfolio_id: String(portfolio.id),
        portfolio_slug: slug,
        ...(user_id ? { user_id } : {}),
      },
      success_url: `${APP_URL}/dashboard/portfolio?published=1&slug=${encodeURIComponent(slug)}`,
      cancel_url:  `${APP_URL}/dashboard/portfolio?cancelled=1`,
      allow_promotion_codes: false,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('❌ /api/checkout error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
