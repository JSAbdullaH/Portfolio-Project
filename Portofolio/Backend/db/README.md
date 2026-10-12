# Database setup

PostgreSQL is the only database of the platform, hosted on **Supabase**. The
Express API is the only program that connects to it: the dashboard and the
device simulator always go through the API. The design of the schema is in
`Stage3.md`, section 2.2. This folder holds the setup only: no table of the
schema exists yet.

## Supabase is hosted PostgreSQL, nothing more

| We use | We do not use (school rule) |
|---|---|
| The PostgreSQL database, through a normal connection string | Supabase Auth: login is built in our API |
| The dashboard, to look at data and settings | The Data API (auto-generated REST): turned off, and locked by a migration |
| | Row Level Security policies as authorization: permissions are checked in our API |
| | Supabase Realtime: live updates come from our API |

## Quick start (every team member)

Requirements: Node.js 20.12 or newer, and a free Supabase account.

1. **Create two Supabase projects**: one for development (`site14-dev`) and one
   for the tests (`site14-test`). Write each database password down. The tests
   delete everything in their project, so never use the same project for both.
2. **Turn the Data API off in both projects**: Integrations, Data API, turn
   "Enable Data API" off.
3. **Get the connection strings**: in each project, "Connect", then
   "Session pooler". It looks like
   `postgresql://postgres.<project-ref>:[YOUR-PASSWORD]@aws-0-<region>.pooler.supabase.com:5432/postgres`.
4. **Download the CA certificate**: Database settings, SSL Configuration,
   "Download certificate". Save it as `Portofolio/Backend/certs/prod-ca-2021.crt`.
5. Then:

```bash
cd Portofolio/Backend
npm install                 # installs pg, node-pg-migrate and jest
cp .env.example .env        # paste both connection strings; never commit .env
npm run db:check            # prints what you are connected to
npm run db:migrate          # applies every migration to your development project
npm run db:mark-test        # labels the empty test project as the test database (once)
npm test                    # runs the tests against the test project
```

`db:check` should end with `time zone UTC` and `0 pending`.

Free Supabase projects pause after a week without activity. Restore a paused
project from its dashboard before you work, and before every demo.

## Commands

| Command | What it does |
|---|---|
| `npm run db:check` | Connect and print address, user, server version, time zone, SSL and migration count. |
| `npm run db:migrate` | Apply every pending migration. |
| `npm run db:rollback` | Undo the last migration. `npm run db:rollback -- --all` undoes all of them. |
| `npm run db:status` | List applied and pending migrations. |
| `npm run db:new -- create-sites` | Create an empty migration file with the current timestamp. |
| `npm run db:mark-test` | Label the test database. It only labels a database with no tables. |
| `npm test` / `npm run test:db` | Run every test / only the database tests. |

Add `-- --test` to a `db:` command to run it against the test database, e.g.
`npm run db:status -- --test`.

## The test database is protected twice

1. `DATABASE_URL_TEST` must point at a different database than `DATABASE_URL`.
2. The test database must carry a label (the table `site14_test_marker`),
   created by `npm run db:mark-test`, which refuses any database that already
   has tables. `npm test`, `db:migrate -- --test` and `db:rollback -- --test`
   stop before doing anything if the label is missing.

So a wrong `.env` can never let the tests delete the development or the
production data.

## How the pieces fit

| Path | Role |
|---|---|
| `.env` | Connection settings for this machine. Hosting providers set the same variables. |
| `certs/` | The Supabase CA certificate. Not committed. |
| `src/db/config.js` | Reads the settings, sets SSL, refuses a test database equal to the main one. |
| `src/db/pool.js` | The single connection pool used by the API: `query()`, `withTransaction()`, `ping()`, `close()`. |
| `src/db/migrations.js` | Runs the migrations with node-pg-migrate. |
| `src/db/guard.js` | The test database label: `markTestDatabase()`, `assertTestDatabase()`. |
| `scripts/db.js` | The command line behind the `npm run db:*` scripts. |
| `db/migrations/` | The schema history, one SQL file per change. |
| `tests/db/` | Configuration, connection, transaction, migration and safety tests. |
| `tests/setup/` | Runs before every test run and checks the test database label. |

## Migrations so far

| File | What it does |
|---|---|
| `..._baseline.sql` | No table. Sets the database time zone to UTC, so every time is stored and shown the same way. Saudi time is applied by the API and the reports. |
| `..._lock-supabase-data-api.sql` | No table. Removes the rights Supabase gives its API roles (`anon`, `authenticated`, `service_role`) on everything in the `public` schema, now and for every future table. Does nothing on a plain PostgreSQL. |

## Writing a migration

1. `npm run db:new -- short-description` creates `db/migrations/<timestamp>_short-description.sql`.
2. Write the change under `-- Up Migration` and its exact undo under `-- Down Migration`.
3. Check both directions: `npm run db:migrate`, `npm run db:rollback`, `npm run db:migrate`.
4. Run `npm test`, then commit the file with its Jira key.

Rules:

- **Never edit a migration after it is merged.** Teammates have already run it. Add a new one instead.
- **Never change the schema from the Supabase dashboard** (Table Editor or SQL Editor). A change made there is not in a migration, so no other database gets it.
- **One change per migration**, and always write the Down part.
- Each run of `db:migrate` is one transaction: if any statement fails, nothing from that run is kept.
- Pass values to queries as parameters (`$1`, `$2`), never by building SQL strings.

## Troubleshooting

| Message | Meaning and fix |
|---|---|
| `Invalid URL` | The password contains a character such as `@ : / ? # %`. URL-encode it in `.env` (`@` becomes `%40`). |
| `ENOTFOUND` | The host name is wrong. Copy the Session pooler string again. |
| `ENETUNREACH` or `EHOSTUNREACH` | You used the "Direct connection" string, which needs IPv6. Use the Session pooler string. |
| `Tenant or user not found` | With the pooler, the user is `postgres.<project-ref>`, not `postgres`. |
| `password authentication failed` | Wrong password. Reset it in Database settings and update `.env`. |
| `unable to verify the first certificate` / `self-signed certificate in certificate chain` | `DATABASE_SSL_CA` is missing or points at the wrong file. Download the certificate again (step 4). |
| `timeout expired` | No answer in 10 seconds. Check your network, and check that the project is not paused. |
| `is not labelled as a test database` | Run `npm run db:mark-test` once, on your empty test project. |
| `points at the same database` | `DATABASE_URL_TEST` and `DATABASE_URL` are the same project. Create a second project for the tests. |
| `Not run migration ... is preceding already run migration` | A migration file has an older timestamp than one already applied. Rename it with a newer timestamp. |
