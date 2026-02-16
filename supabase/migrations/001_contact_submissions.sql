-- =============================================
-- Migration: Create contact_submissions table
-- =============================================

CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security — no public access.
-- Only the Edge Function (using service_role key) can insert.
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- No RLS policies = no public read/write access.
-- The service_role key bypasses RLS, so the Edge Function can still insert.
