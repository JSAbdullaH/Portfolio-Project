-- Lock the Supabase Data API out of the public schema (SITE-69 setup).
-- This migration creates no tables.
--
-- Supabase grants its API roles (anon, authenticated, service_role) full
-- rights on every table, sequence and function created in the public schema,
-- so that its auto-generated REST API (the Data API) can serve them. SITE14
-- does not use that API: our Express API is the only way to the data (school
-- rule), and worker locations are personal data. This migration removes those
-- rights from what exists now and from everything this role creates later.
--
-- It is the second lock. The first is in the dashboard of every Supabase
-- project: Integrations, Data API, turn "Enable Data API" off.
--
-- On a database without these roles (a plain PostgreSQL) it does nothing.

-- Up Migration
DO $$
DECLARE
  api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated', 'service_role'] LOOP
    CONTINUE WHEN NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role);
    -- what exists now (for example the pgmigrations table)
    EXECUTE format('REVOKE ALL ON ALL TABLES IN SCHEMA public FROM %I', api_role);
    EXECUTE format('REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM %I', api_role);
    EXECUTE format('REVOKE ALL ON ALL FUNCTIONS IN SCHEMA public FROM %I', api_role);
    -- everything the migrations create from now on
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON TABLES FROM %I', api_role);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON SEQUENCES FROM %I', api_role);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE ALL ON FUNCTIONS FROM %I', api_role);
  END LOOP;
END
$$;

-- Down Migration
-- Puts back the Supabase defaults (full rights), in reverse order.
DO $$
DECLARE
  api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['service_role', 'authenticated', 'anon'] LOOP
    CONTINUE WHEN NOT EXISTS (SELECT 1 FROM pg_roles WHERE rolname = api_role);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO %I', api_role);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO %I', api_role);
    EXECUTE format('ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO %I', api_role);
    EXECUTE format('GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO %I', api_role);
    EXECUTE format('GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO %I', api_role);
    EXECUTE format('GRANT ALL ON ALL TABLES IN SCHEMA public TO %I', api_role);
  END LOOP;
END
$$;
