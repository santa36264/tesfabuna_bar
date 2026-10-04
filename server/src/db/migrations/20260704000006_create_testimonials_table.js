export async function up(knex) {
  await knex.schema.createTable('testimonials', (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('avatar', 255).nullable()
    table.integer('rating').notNullable().defaultTo(5)
    table.text('review').notNullable()
    table.boolean('approved').notNullable().defaultTo(false)
    table.timestamps(true, true)

    table.index('approved', 'testimonials_approved_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('testimonials')
}