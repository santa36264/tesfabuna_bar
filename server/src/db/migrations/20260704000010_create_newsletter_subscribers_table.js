export async function up(knex) {
  await knex.schema.createTable('newsletter_subscribers', (table) => {
    table.increments('id').primary()
    table.string('email', 255).notNullable().unique()
    table.boolean('active').notNullable().defaultTo(true)
    table.timestamps(true, true)
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('newsletter_subscribers')
}