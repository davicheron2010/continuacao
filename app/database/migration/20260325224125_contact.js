exports.up = function(knex) {
    return knex.schema.createTable('contact', (table) => {
        table.bigIncrements('id').primary();
        table.text('tipo').notNullable();
        table.text('valor').notNullable();
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('contact');
};