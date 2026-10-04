/**
 * Same shape as Laravel Sanctum's personal_access_tokens table.
 * `token` stores the SHA-256 of the plaintext token, never the token itself.
 */
export async function up(knex) {
  await knex.schema.createTable('personal_access_tokens', (table) => {
    table.increments('id').primary()
    table.string('tokenable_type', 255).notNullable()
    table.integer('tokenable_id').notNullable()
    table.text('name').notNullable()
    table.string('token', 64).notNullable().unique()
    table.text('abilities').nullable()
    table.timestamp('last_used_at', { useTz: true }).nullable()
    table.timestamp('expires_at', { useTz: true }).nullable()
    table.timestamps(true, true)

    table.index(['tokenable_type', 'tokenable_id'], 'pat_tokenable_morph_index')
    table.index('expires_at', 'pat_expires_at_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('personal_access_tokens')
}