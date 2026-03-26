exports.up = function(knex) {
    return knex.schema.createTable('product', (table) => {
        table.bigIncrements('id').primary();
        table.text('nome').notNullable();
        table.text('descricao');
        table.text('preco_compra').notNullable();
        table.text('preco_venda').notNullable();
        table.integer('estoque').defaultTo(0);
        table.bigInteger('codigo_barra').defaultTo(0);
        table.boolean('ativo').defaultTo(true);
        table.boolean('excluido').defaultTo(false);
        table.bigInteger('supplier_id').references('id').inTable('supplier');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('product');
};