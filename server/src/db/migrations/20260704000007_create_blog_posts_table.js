export async function up(knex) {
  await knex.schema.createTable('blog_posts', (table) => {
    table.increments('id').primary()
    table.string('title', 255).notNullable()
    table.string('slug', 255).notNullable().unique()
    table.string('category', 100).nullable()
    table.text('excerpt').nullable()
    table.text('content').nullable()
    table.string('image', 255).nullable()
    table.string('author', 255).notNullable().defaultTo('TesfaBunna Team')
    table.boolean('published').notNullable().defaultTo(false)
    table.timestamp('published_at', { useTz: true }).nullable()
    table.timestamps(true, true)

    table.index('published', 'blog_posts_published_index')
    table.index('published_at', 'blog_posts_published_at_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('blog_posts')
}