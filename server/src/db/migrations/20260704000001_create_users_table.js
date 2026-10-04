/**
 * Mirrors 0001_01_01_000000_create_users_table.php + add_role + add_avatar.
 * `password_reset_tokens` and `sessions` are intentionally dropped: this API is
 * token authenticated and never issues sessions or password reset links.
 */
export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable().unique()
    table.timestamp('email_verified_at', { useTz: true }).nullable()
    table.string('password', 255).notNullable()
    table.string('role', 255).notNullable().defaultTo('admin')
    table.string('avatar', 255).nullable()
    table.string('remember_token', 100).nullable()
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('users')
}