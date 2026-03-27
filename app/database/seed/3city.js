const URL_MUNICIPIOS = (codigoEstado) =>
  `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${codigoEstado}/municipios`;
exports.seed = async function (knex) {
  const estados = await knex('federative_unit').select('id', 'codigo');
  if (!estados.length) { throw new Error('Nenhum estado encontrado na tabela federative_unit. Execute a seed de estados antes.'); }
  await knex('city').del();
  for (const estado of estados) {
    const response = await fetch(URL_MUNICIPIOS(estado.codigo));
    if (!response.ok) { throw new Error(`Falha ao buscar municípios do estado ${estado.codigo}: ${response.statusText}`); }
    const municipios = await response.json();
    const dados = municipios.map((municipio) => ({
      id_uf: estado.id,
      codigo: String(municipio.id),
      nome: municipio.nome,
    }));
    await knex('city').insert(dados);
  }
};