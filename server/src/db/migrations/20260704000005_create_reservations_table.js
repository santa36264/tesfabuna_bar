export async function up(knex) {
  await knex.schema.createTable('reservations', (table) => {
    table.increments('id').primary()
    table.string('name', 255).notNullable()
    table.string('email', 255).notNullable()
    table.string('phone', 30).notNullable()
    table.date('date').notNullable()
    table.string('time', 20).notNullable()
    table.integer('guests').notNullable()
    table.text('special_requests').nullable()
    table
      .enu('status', ['pending', 'confirmed', 'cancelled'], {
        useNative: true,
        enumName: 'reservations_status_enum',
        defaultTo: 'pending',
      })
      .notNullable()
    table.timestamps(true, true)

    table.index('date', 'reservations_date_index')
    table.index('status', 'reservations_status_index')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('reservations')
}