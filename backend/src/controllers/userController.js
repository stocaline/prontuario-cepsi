const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('express');
require('dotenv').config();
const SECRET = process.env.SECRET;

const getAll = async (_req, res) => {
  const users = await userModel.getAll();
  return res.status(200).json(users);
};

const registerUser = async (req, res) => {
  var userData = req.body;
  userData.password = await bcrypt.hash(userData.password, 8);
  const createdUser = await userModel.registerUser(userData);
  return res.status(201).json(createdUser.id);
};

const loginUser = async (req, res) => {
  var { matricula, password } = req.body;
  if (!matricula || !password) {
    res.status(422).send('Você deve definir matricula e senha!');
  }

  try {
    const user = await userModel.loginUser(matricula);
    if (user) {
      console.log(password)
      const passwordMath = await bcrypt.compare(password, user.password);

      if (passwordMath) {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 3000 });
        const id = user.id;
        const name = user.name;
        return res.json({ id, name, matricula, auth: true, token });
      }
    }
    return res.status(401).end();

  } catch (erro) {
    return console.error("Login User", erro);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await userModel.deleteUser(id);
  return res.status(204).json();
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  await userModel.updateUser(id, req.body);
  return res.status(204).json();
};

module.exports = {
  getAll,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};