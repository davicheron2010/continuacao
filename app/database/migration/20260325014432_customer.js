exports.up = function(knex) {
    return knex.schema.createTable('customer', (table) => {
        table.bigIncrements('id').primary();
        table.text('nome').notNullable();
        table.text('cpf');
        table.text('rg');
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('customer');
};