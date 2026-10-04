import config from './src/config/index.js'

export default {
  client: config.db.client,
  connection: config.db.connection,
  pool: config.db.pool,
  migrations: {
    directory: './src/db/migrations',
    tableName: 'migrations',
    loadExtensions: ['.js'],
  },
  seeds: {
    directory: './src/db/seeds',
    loadExtensions: ['.js'],
  },
}