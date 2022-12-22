const connection = require('./connection');

const getAll = async () => {
  const [pacs] = await connection.execute('SELECT * FROM pacs');
  return pacs;
};

const getAllForUser = async (iduser) => {
  const [pacs] = await connection.execute('SELECT * FROM pacs WHERE id_dono = ?', [iduser]);
  return pacs;
};

const getPac = async (pacId) => {
  const { id } = pacId;
  const [pac] = await connection.execute('SELECT * FROM pacs WHERE id = ?', [id]);
  return pac;
};

const registerPac = async (pac) =>{
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var mouth = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();
  currentDate = year + '-' + mouth + '-' + day;
  const { nome } = pac;
  const { dataNascimento } = pac;
  const { escolaridade } = pac;
  const { rg } = pac;
  const { cpf } = pac;
  const { bairro } = pac;
  const { telefone } = pac;
  const { profissao } = pac;
  const { estadoCivil } = pac;
  const { localTrabalho } = pac;
  const { rendaFamiliar } = pac;
  const { email } = pac;
  const { menorIdade } = pac;
  const { nomeResp } = pac;
  const { parentesco } = pac;
  const { rgResp } = pac;
  const { cpfResp } = pac;
  const ultimaVisita = currentDate;
  const { id_dono } = pac;

  const query = 'INSERT INTO pacs (id_dono, nome, data_nascimento, escolaridade, rg, cpf, bairro, telefone, profissao, estado_civil, local_trabalho, renda_familiar, email, menor_idade, nome_resp, parentesco, rg_resp, cpf_resp, ultima_visita) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const [createdPac] = await connection.execute(query, [id_dono, nome, dataNascimento, escolaridade, rg, cpf, bairro, telefone, profissao, estadoCivil, localTrabalho, rendaFamiliar, email, menorIdade, nomeResp, parentesco, rgResp, cpfResp, ultimaVisita]);
  return {insertId: createdPac.insertId};
};

const deletePac = async (id) => {
  const [removedPac] = await connection.execute('DELETE FROM pacs WHERE id = ?', [id]);
  return removedPac;
};

const updatePac = async (id, users) => {
  const { nome } = users;
  const { dataNascimento } = users;
  const { escolaridade } = users;
  const { rg } = users;
  const { cpf } = users;
  const { bairro } = users;
  const { telefone } = users;
  const { profissao } = users;
  const { estadoCivil } = users;
  const { localTrabalho } = users;
  const { rendaFamiliar } = users;
  const { email } = users;
  const { menorIdade } = users;
  const { nomeResp } = users;
  const { parentesco } = users;
  const { rgResp } = users;
  const { cpfResp } = users;
  const query = 'UPDATE pacs SET nome = ?, data_nascimento = ?, escolaridade = ?, rg = ?, cpf = ?, bairro = ?, telefone = ?, profissao = ?, estado_civil = ?, local_trabalho = ?, renda_familiar = ?, email = ?, menor_idade = ?, nome_resp = ?, parentesco = ?, rg_resp = ?, cpf_resp = ? WHERE id = ?';
  const [updatePac] = await connection.execute(query, [nome, dataNascimento, escolaridade, rg, cpf, bairro, telefone, profissao, estadoCivil, localTrabalho, rendaFamiliar, email, menorIdade, nomeResp, parentesco, rgResp, cpfResp, id]);
  return updatePac;
};

const updatePacDate = async(id, date) =>{
  const query = 'UPDATE pacs SET ultima_visita = ? WHERE id = ?';
  const pacDate = await connection.execute(query, [date, id])
  return pacDate;
}

//Charts
const getChart = async (pacId) => {
  const { id } = pacId;
  const [charts] = await connection.execute('SELECT * FROM charts WHERE id_dono = ?', [id]);
  return charts;
};

const getChartById = async (chartId) => {
  const { id } = chartId;
  const [chart] = await connection.execute('SELECT * FROM charts WHERE id = ?', [id]);
  return chart;
};

const registerChart = async (chart) => {
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var mouth = String(date.getMonth() + 1).padStart(2, '0');
  var year = date.getFullYear();
  currentDate = year + '-' + mouth + '-' + day;
  const {idOwner} = chart;
  const {title} = chart;
  const {desc} = chart;
  const dateChart = currentDate;
  
  const query = 'INSERT INTO charts (id_dono, title, description, date) VALUES(?, ?, ?, ?)';
  await connection.execute(query, [idOwner, title, desc, dateChart]);
  const pacDate = dateChart;
  return pacDate;
};

module.exports = {
  getAll,
  getAllForUser,
  getPac,
  registerPac,
  deletePac,
  updatePac,
  updatePacDate,
  getChart,
  getChartById,
  registerChart,
};