import path from 'node:path'
import { fileURLToPath } from 'node:url'
import 'dotenv/config'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..')

const env = (key, fallback) => {
  const value = process.env[key]
  return value === undefined || value === '' ? fallback : value
}

const envInt = (key, fallback) => {
  const parsed = Number.parseInt(env(key, ''), 10)
  return Number.isFinite(parsed) ? parsed : fallback
}

const envBool = (key, fallback) => {
  const value = env(key, '')
  if (value === '') return fallback
  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase())
}

const envList = (key, fallback) =>
  env(key, fallback)
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean)

/*
| A hosted Postgres provider (Supabase, Neon, Railway, ...) is configured with a
| single URL. When DATABASE_URL is present it is passed to node-postgres verbatim
| so percent-encoded credentials survive intact: the `%40` in a password must not
| be decoded by us, only by pg's own connection-string parser.
|
| Supabase's dashboard hands out `?sslmode=require`, but pg-connection-string v2
| aliases `require` to `verify-full`, which then rejects Supabase's certificate
| chain. Its `no-verify` mode is the one that actually encrypts without demanding
| a trusted CA, so rewrite the former to the latter instead of failing at runtime.
|
| Neon requires channel_binding, but older pg drivers don't support it, so we strip
| it out to avoid connection errors.
*/
const rawConnectionString = env('DATABASE_URL', '')
const connectionString = rawConnectionString
  .replace(/([?&])sslmode=require\b/, '$1sslmode=no-verify')
  .replace(/[?&]channel_binding=require/, '')
const useSsl = envBool('DB_SSL', false)

const dbConnection = connectionString
  ? { connectionString, ssl: { rejectUnauthorized: false } }
  : {
      host: env('DB_HOST', '127.0.0.1'),
      port: envInt('DB_PORT', 5432),
      user: env('DB_USERNAME', 'postgres'),
      password: env('DB_PASSWORD', ''),
      database: env('DB_DATABASE', 'tesfabunna'),
      ...(useSsl ? { ssl: { rejectUnauthorized: false } } : {}),
    }

const config = {
  rootDir,
  app: {
    name: env('APP_NAME', 'TesfaBunna'),
    env: env('APP_ENV', 'local'),
    debug: envBool('APP_DEBUG', true),
    url: env('APP_URL', 'http://localhost:8000').replace(/\/+$/, ''),
    port: envInt('PORT', 8000),
    frontendUrls: envList('FRONTEND_URL', 'http://localhost:5173,http://localhost:3000'),
  },
  db: {
    client: 'pg',
    connectionString,
    ssl: useSsl,
    host: dbConnection.host ?? null,
    port: dbConnection.port ?? null,
    user: dbConnection.user ?? null,
    database: dbConnection.database ?? null,
    connection: dbConnection,
    pool: {
      min: envInt('DB_POOL_MIN', 0),
      max: envInt('DB_POOL_MAX', 10),
    },
  },
  auth: {
    tokenName: env('AUTH_TOKEN_NAME', 'admin-token'),
    tokenTtlDays: envInt('AUTH_TOKEN_TTL_DAYS', 0),
    bcryptRounds: envInt('BCRYPT_ROUNDS', 12),
  },
  uploads: {
    dir: path.resolve(rootDir, env('UPLOAD_DIR', 'storage/uploads')),
    urlPrefix: '/storage/uploads',
    maxSizeKb: envInt('UPLOAD_MAX_KB', 5120),
    mimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  },
}

export default config