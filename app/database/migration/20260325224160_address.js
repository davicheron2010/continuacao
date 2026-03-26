exports.up = function(knex) {
    return knex.schema.createTable('address', (table) => {
        table.bigIncrements('id').primary();
        table.text('logradouro').notNullable();
        table.text('numero');
        table.text('complemento');
        table.text('bairro');
        table.text('cep');
        table.bigInteger('city_id').references('id').inTable('city');
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('address');
};