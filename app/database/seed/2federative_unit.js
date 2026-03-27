const URL_ESTADOS = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados';
exports.seed = async function (knex) {
  const response = await fetch(URL_ESTADOS);
  if (!response.ok) {
    throw new Error(`Falha ao buscar os dados dos estados: ${response.statusText}`);
  }
  const estados = await response.json();
  const brasil = await knex('country').select('id').where('codigo', 'BR').first();
  if (!brasil) {
    throw new Error('País Brasil (codigo = BR) não encontrado na tabela country. Execute a seed de países antes.');
  }
  const id_pais = brasil.id;
  await knex('federative_unit').del();
  const dados = estados.map((estado) => ({
    id_pais,
    codigo: String(estado.id),
    nome: estado.nome,
    sigla: estado.sigla,
  }));
  await knex('federative_unit').insert(dados);
  console.log(`${dados.length} estados inseridos com sucesso!`);

};