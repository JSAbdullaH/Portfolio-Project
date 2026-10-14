CREATE TYPE user_role AS ENUM ('company_admin', 'site_manager');

CREATE TABLE companies (
    id                      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name                    VARCHAR(150) NOT NULL,
    commercial_registration VARCHAR(50),
    midday_ban_from_date    DATE,
    midday_ban_to_date      DATE,
    midday_ban_start_time   TIME NOT NULL DEFAULT '12:00',
    midday_ban_end_time     TIME NOT NULL DEFAULT '15:00',
    created_at              TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at              TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE users (
    id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id          UUID NOT NULL REFERENCES companies(id) ON DELETE RESTRICT,
    full_name           VARCHAR(120) NOT NULL,
    email               VARCHAR(255) NOT NULL,
    password_hash       VARCHAR(255),
    role                user_role NOT NULL,
    is_email_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    is_active           BOOLEAN NOT NULL DEFAULT TRUE,
    failed_login_count  SMALLINT NOT NULL DEFAULT 0,
    locked_until        TIMESTAMPTZ,
    created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX users_email_lower_key ON users (lower(email));
CREATE INDEX users_company_id_idx ON users (company_id);