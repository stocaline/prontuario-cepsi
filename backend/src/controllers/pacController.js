const pacModel = require('../models/pacModel');

const getAll = async (_req, res) => {
  const pacs = await pacModel.getAll();
  return res.status(200).json(pacs);
};

const getAllForUser = async (req, res) => {
  var { id } = req.params;
  const pacs = await pacModel.getAllForUser(id);
  return res.status(200).json(pacs);
};

const getPac = async (req, res) => {
  var pacId = req.params;
  const pac = await pacModel.getPac(pacId);
  return res.status(200).json(pac);
};

const registerPac = async (req, res) =>{
  var pacData = req.body;
  await pacModel.registerPac(pacData);
  return res.status(201).json();
};

const deletePac = async(req, res) => {
  const { id } = req.params;
  await pacModel.deletePac(id);
  return res.status(204).json();
};

const updatePac = async(req, res) =>{
  const { id } = req.params;
  await pacModel.updatePac(id, req.body);
  return res.status(200).json();
};

const registerChart = async(req, res) =>{
  var chartData = req.body;
  const createdChart = await pacModel.registerChart(chartData);
  await pacModel.updatePacDate(chartData.idOwner, createdChart);
  return res.status(200).json();
};

const getChart = async(req, res) =>{
  var pacId = req.params;
  const charts = await pacModel.getChart(pacId);
  return res.status(200).json(charts);
}

const getChartById = async(req, res) =>{
  var chartId = req.params;
  const chart = await pacModel.getChartById(chartId);
  return res.status(200).json(chart);
}

module.exports = {
  getAll,
  getAllForUser,
  getPac,
  registerPac,
  updatePac,
  deletePac,
  registerChart,
  getChartById,
  getChart,
};