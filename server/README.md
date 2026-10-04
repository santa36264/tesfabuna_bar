# TesfaBunna Bar API

Restaurant management API for TesfaBunna Bar, rebuilt on Node.js + Express + PostgreSQL.

This is a drop-in replacement for the original Laravel backend: the Vue frontend in
`../frontend` talks to it unchanged, including response envelopes, validation errors,
authentication and upload URLs.

## Requirements

- Node.js >= 20.11
- PostgreSQL >= 13, either local or a hosted provider (Supabase, Neon, Railway, ...)

## Setup

```bash
npm install
cp .env.example .env
```

### Connecting to the database

Set `DATABASE_URL` in `.env` and you're done:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/DATABASE?sslmode=require
```

Notes:

- **Percent-encode reserved characters in the password.** A literal `@` must be
  written `%40`. Supabase's dashboard gives you the already-encoded form, so paste
  it as-is.
- `sslmode=require` is rewritten to `no-verify` internally. `pg` aliases `require`
  to `verify-full`, which rejects Supabase's certificate chain. `no-verify` still
  encrypts the traffic, it just does not demand a trusted CA.
- If `DATABASE_URL` is empty the server falls back to the discrete `DB_HOST`,
  `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD` and `DB_DATABASE` values.

You do **not** need to create the database yourself when using a provider — the
`postgres` database in the URL already exists.

Build the schema and load the sample content:

```bash
npm run migrate
npm run seed
```

Start the server:

```bash
npm run dev     # auto-restarts on change
npm start       # plain node
```

The API listens on `http://localhost:8000` by default, which is what
`VITE_API_URL` in `../frontend/.env` already expects.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start with `node --watch` |
| `npm start` | Start normally |
| `npm run migrate` | Apply pending migrations |
| `npm run migrate:rollback` | Roll back the last batch |
| `npm run migrate:status` | Show applied/pending migrations |
| `npm run seed` | Load sample data |
| `npm run db:fresh` | Drop, re-migrate and re-seed (**destructive**) |
| `npm run db:reset` | Roll back everything, re-migrate, re-seed (**destructive**) |
| `npm run create-admin` | Create an admin account interactively |

### Seeded admin

| Field | Value |
| --- | --- |
| Email | `admin@tesfabunna.com` |
| Password | `password` |

Change it immediately via `PUT /api/admin/profile/password`, or run
`npm run create-admin` to add a new one.

## Environment

| Variable | Default | Notes |
| --- | --- | --- |
| `APP_NAME` | `TesfaBunna` | |
| `APP_ENV` | `local` | |
| `APP_DEBUG` | `true` | Stack traces in error responses |
| `APP_URL` | `http://localhost:8000` | Base URL used to build upload links |
| `PORT` | `8000` | |
| `FRONTEND_URL` | `http://localhost:5173,http://localhost:3000` | Comma-separated CORS allowlist |
| `DATABASE_URL` | _empty_ | Hosted Postgres URL. Overrides every `DB_*` value below |
| `DB_HOST` / `DB_PORT` | `127.0.0.1` / `5432` | Used only when `DATABASE_URL` is empty |
| `DB_USERNAME` / `DB_PASSWORD` / `DB_DATABASE` | `postgres` / empty / `tesfabunna` | |
| `DB_SSL` | `false` | Force TLS for the discrete `DB_*` fields |
| `DB_POOL_MIN` / `DB_POOL_MAX` | `0` / `10` | |
| `AUTH_TOKEN_NAME` | `admin-token` | Label stored with each token |
| `AUTH_TOKEN_TTL_DAYS` | `0` | `0` means tokens never expire |
| `BCRYPT_ROUNDS` | `12` | |
| `UPLOAD_DIR` | `storage/uploads` | Relative to the `server` folder |
| `UPLOAD_MAX_KB` | `5120` | |

## Project layout

```
src/
  config/          environment + app configuration
  db/
    migrations/    10 timestamped PostgreSQL migrations
    seeds/         sample data, run in filename order
  models/          Knex queries, one per table
  validators/      Zod schemas mirroring the Laravel validation rules
  middleware/      auth guard, admin guard, image upload
  controllers/     public/ and admin/
  routes/          route tables
  utils/           errors, messages, serialization, helpers
  app.js           Express app (exported for tests)
  server.js        Entry point, DB check, graceful shutdown
```

## Authentication

Login returns an opaque random token, which the admin frontend stores and sends as
`Authorization: Bearer <token>`.

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@tesfabunna.com","password":"password"}'
```

```json
{ "data": { "token": "...", "user": { "id": 1, "name": "...", "email": "..." } } }
```

Use `POST /api/admin/logout` to revoke the current token.

## Response format

Success responses are wrapped:

```json
{ "data": { "items": [], "total": 0 } }
```

Validation failures use Laravel's 422 shape, so the frontend's existing error
handling keeps working:

```json
{
  "message": "The given data was invalid.",
  "errors": { "email": ["The email field must be a valid email address."] }
}
```

`DELETE` endpoints return `204 No Content`.

## Endpoints

Public:

```
POST   /api/auth/login
GET    /api/menu-items          GET    /api/menu-items/{id}
GET    /api/drinks              GET    /api/drinks/{id}
GET    /api/gallery
GET    /api/blog                GET    /api/blog/{id}
GET    /api/testimonials        POST   /api/testimonials
POST   /api/reservations
POST   /api/newsletter/subscribe
POST   /api/contact
GET    /api/health
GET    /up
```

Admin (require `Authorization: Bearer <token>`):

```
POST   /api/admin/logout
GET    /api/admin/me
GET    /api/admin/profile       PUT    /api/admin/profile
PUT    /api/admin/profile/password
GET    /api/admin/dashboard/stats
GET    /api/admin/dashboard/recent-reservations
GET    /api/admin/dashboard/recent-messages
POST   /api/admin/upload        DELETE /api/admin/upload
       /api/admin/menu-items    CRUD
       /api/admin/drinks        CRUD
       /api/admin/gallery       list / create / update / delete
       /api/admin/blog          CRUD
       /api/admin/reservations  list / stats / show / update / delete
       /api/admin/testimonials  list / update / delete
       /api/admin/messages      list / show / delete
```

## Uploads

`POST /api/admin/upload` accepts `multipart/form-data` with a `file` field and only
JPEG, PNG, GIF and WebP up to `UPLOAD_MAX_KB`. Files are validated by inspecting
their magic bytes rather than trusting the declared MIME type, stored under
`UPLOAD_DIR`, and served from `/storage/uploads/<name>`.

## Notable compatibility behaviour

- `POST /api/reservations` accepts `special` (what the Vue form sends) and stores it
  in `special_requests`.
- `PUT /api/admin/profile/password` accepts `current` or `current_password`.
- Monetary columns are `decimal(10,2)` but serialize as JSON numbers.
- `date` columns serialize as `YYYY-MM-DD`.
- Menu item search uses PostgreSQL `ILIKE`, so it is case-insensitive.
- Timestamps are `timestamptz`; all writes go through `NOW()`.