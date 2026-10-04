export async function up(knex) {
  await knex.schema.createTable('drinks', (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('category', 100).notNullable()
    table.text('description').nullable()
    table.decimal('price', 10, 2).notNullable()
    table.boolean('available').notNullable().defaultTo(true)
    table.string('image', 255).nullable()
    table.integer('sort_order').notNullable().defaultTo(0)
    table.timestamps(true, true)

    table.index('category', 'drinks_category_index')
    table.index('available', 'drinks_available_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('drinks')
}