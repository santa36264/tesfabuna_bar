import app, { init } from './app.js'
import config from './config/index.js'
import db from './db/index.js'

const start = async () => {
  try {
    await init()
  } catch (error) {
    console.error('\n  Cannot reach PostgreSQL.\n')
    console.error(`  ${error.message}\n`)
    console.error('  Check the DB_* values in server/.env and that the server is running.\n')
    process.exit(1)
  }

  const server = app.listen(config.app.port, () => {
    const dbInfo = config.db.connectionString 
      ? config.db.connectionString.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:****@')
      : `${config.db.host}:${config.db.port}/${config.db.database}`
    
    console.log(`  ${config.app.name} API  ${config.app.env}`)
    console.log(`  listening on  ${config.app.url}`)
    console.log(`  database      ${dbInfo}`)
    console.log(`  uploads       ${config.uploads.dir}`)
    console.log(`  cors origins  ${config.app.frontendUrls.join(', ')}\n`)
  })

  const shutdown = async (signal) => {
    console.log(`\n  ${signal} received, shutting down.`)
    server.close(async () => {
      await db.destroy()
      process.exit(0)
    })
  }

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

start()