-- Baseline (SITE-69 setup). This migration creates no tables.
--
-- It proves the migration pipeline works end to end, and it fixes the
-- database time zone to UTC so every TIMESTAMPTZ is displayed the same way
-- on every machine and server. Saudi time is applied by the API and the
-- reports, never by the database settings.
--
-- The schema itself (16 tables and 1 view, Stage3.md section 2.2) is added
-- by the next migrations.

-- Up Migration
DO $$
BEGIN
  EXECUTE format('ALTER DATABASE %I SET timezone TO %L', current_database(), 'UTC');
END
$$;

-- Down Migration
DO $$
BEGIN
  EXECUTE format('ALTER DATABASE %I RESET timezone', current_database());
END
$$;
