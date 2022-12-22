const connection = require('./connection');

const getAll = async () => {
  const [users] = await connection.execute('SELECT * FROM users');
  return users;
};

const registerUser = async (users) =>{
  const { name } = users;
  const { password } = users;
  const { matricula } = users;
  const query = 'INSERT INTO users (name, password, matricula) VALUES (?, ?, ?)';
  const [createdUser] = await connection.execute(query, [name, password, matricula]);
  return createdUser;
};

const loginUser = async (matricula) => {
  const query = 'SELECT id, name, password FROM users WHERE matricula = ?';
  const [findUser] = await connection.execute(query, [matricula]); 
  return findUser.at(0);
};

const deleteUser = async (id) => {
  const [removedUser] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
  return removedUser;
};

const updateUser = async (id, users) => {
  const {name, password } = users;
  const query = 'UPDATE users SET id = ?, name = ?, password = ? WHERE id = ?';
  const [updateUser] = await connection.execute(query, [id, name, password, id]);
  return updateUser;
};

module.exports = {
  getAll,
  registerUser,
  loginUser,
  deleteUser,
  updateUser,
};