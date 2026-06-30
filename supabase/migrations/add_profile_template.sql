-- ============================================================
-- PortfolioAI — Schema Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Add missing columns to `portfolios`
ALTER TABLE portfolios
  ADD COLUMN IF NOT EXISTS profile_image text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS template_id   text DEFAULT 'minimal';

-- 2. (Optional) Create a storage bucket for avatars
-- Run only if you want Supabase Storage instead of base64.
-- The API currently uses base64 which needs no bucket.
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('avatars', 'avatars', true)
-- ON CONFLICT (id) DO NOTHING;

-- 3. Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'portfolios'
ORDER BY ordinal_position;
