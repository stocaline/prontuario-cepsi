const jwt = require('jsonwebtoken');
require('dotenv').config();
const SECRET = process.env.SECRET;

const validateFieldName = (req, res, next) => {
  const { body } = req;

  if(body.name == undefined){
    return res.status(400).json({message: 'the field "name" is required'});
  }

  if(body.name == ''){
    return res.status(400).json({message: 'name cannot be empty'});
  }

  next();
};

const validateFieldPassword = (req, res, next) => {
  const { body } = req;

  if(body.password == undefined){
    return res.status(400).json({message: 'the field "password" is required'});
  }

  if(body.password == ''){
    return res.status(400).json({message: 'password cannot be empty'});
  }

  next();
};

const veridateJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, SECRET, (err, decoded) =>{
    if(err) return res.status(401).end();
    
    req.userId = decoded.userId;
    next();
  })
}

module.exports = {
  validateFieldName,
  validateFieldPassword,
  veridateJWT
};