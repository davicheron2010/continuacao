const { faker } = require("@faker-js/faker/locale/pt_BR");
exports.seed = async function (knex) {
  await knex('product').del();
  const batchSize = 1000;
  const total = 1000000;
  for (let i = 0; i < total; i += batchSize) {
    const batch = Array.from({ length: batchSize }, () => ({
      nome: faker.commerce.productName(),
      descricao: faker.commerce.productDescription(),
      preco_compra: faker.commerce.price({ min: 10, max: 5000, dec: 2 }),
      preco_venda: faker.commerce.price({ min: 10, max: 8000, dec: 2 }),
      estoque: faker.number.int({ min: 0, max: 500 }),
      codigo_barra: faker.string.numeric(13),
      ativo: faker.datatype.boolean(),
      excluido: false
    }));
    await knex('product').insert(batch);
  }
};