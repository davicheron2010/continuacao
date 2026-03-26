const { faker } = require("@faker-js/faker/locale/pt_BR");

exports.seed = async function (knex) {
  await knex('customer').del();
  const batchSize = 1000;
  const total = 100000;

  for (let i = 0; i < total; i += batchSize) {
    const batch = Array.from({ length: batchSize }, () => ({
      nome: faker.person.fullName(),
      cpf: faker.string.numeric(11),
      rg: faker.string.numeric(8),
      ativo: faker.datatype.boolean(),
      excluido: false
    }));
    await knex('customer').insert(batch);
  }
};