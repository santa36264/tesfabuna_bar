export async function up(knex) {
  await knex.schema.createTable('contact_messages', (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable()
    table.string('subject', 255).nullable()
    table.text('message').notNullable()
    table.boolean('read').notNullable().defaultTo(false)
    table.timestamps(true, true)

    table.index('read', 'contact_messages_read_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('contact_messages')
}