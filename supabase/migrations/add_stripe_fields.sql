-- ============================================================
-- PortfolioAI — Stripe Payment Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Add payment & publish columns to `portfolios`
ALTER TABLE portfolios
  ADD COLUMN IF NOT EXISTS stripe_customer_id text      DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS has_paid           boolean   NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_published       boolean   NOT NULL DEFAULT false;

-- 2. Index on stripe_customer_id for fast webhook lookups
CREATE INDEX IF NOT EXISTS idx_portfolios_stripe_customer_id
  ON portfolios (stripe_customer_id);

-- 3. Verify
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'portfolios'
  AND column_name IN ('stripe_customer_id', 'has_paid', 'is_published')
ORDER BY column_name;
