export async function up(knex) {
  await knex.schema.createTable('gallery_images', (table) => {
    table.increments('id').primary()
    table.string('category', 100).notNullable()
    table.string('src', 255).notNullable()
    table.string('path', 255).nullable()
    table.string('alt', 255).nullable()
    table.boolean('active').notNullable().defaultTo(true)
    table.integer('sort_order').notNullable().defaultTo(0)
    table.timestamps(true, true)

    table.index('category', 'gallery_images_category_index')
    table.index('active', 'gallery_images_active_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('gallery_images')
}