const express = require('express');
const jtw = require('jsonwebtoken');

const router = express.Router();

const userController = require('./controllers/userController');
const pacController = require('./controllers/pacController');
const userMiddleware = require('./middlewares/userMiddleware');
const pacMiddleware = require('./middlewares/pacMiddleware');

//User
router.get('/users', userController.getAll);
router.post('/users/singup',
  userMiddleware.validateFieldName,
  userMiddleware.validateFieldPassword,
  userController.registerUser
);
router.post('/users/login', userController.loginUser);

router.delete('/users/:id', userController.deleteUser);
router.put('/users/:id',
  userMiddleware.validateFieldName,
  userMiddleware.validateFieldPassword,
  userController.updateUser
);

//Paciente
router.get('/pacs',
  pacController.getAll
);

router.get('/user/pacs/:id',
  pacController.getAllForUser
);

router.get('/pac/:id',
  pacController.getPac
);

router.post('/pac/register',
  pacMiddleware.validateFieldName,
  pacMiddleware.validateFieldBirthDate,
  pacMiddleware.validateFieldschooling,
  pacMiddleware.validateFieldRg,
  pacMiddleware.validateFieldCpf,
  pacMiddleware.validateFieldDistrict,
  pacMiddleware.validateFieldPhoneNumber,
  pacMiddleware.validateFieldProfession,
  pacMiddleware.validateFieldMaritalStatus,
  pacMiddleware.validateFieldWorkplace,
  pacMiddleware.validateFieldFamilyIncome,
  pacMiddleware.validateFieldEmail,
  pacMiddleware.validateFieldUnderage,
  pacMiddleware.validateFieldOwnerName,
  pacMiddleware.validateFieldKinship,
  pacMiddleware.validateFieldOwnerRg,
  pacMiddleware.validateFieldOwnerCpf,
  pacController.registerPac
);

router.put('/pac/update/:id',
  pacController.updatePac
);

router.delete('/pac/:id',
  userMiddleware.veridateJWT,
  pacController.deletePac
);

//Prontuario
router.get('/pac/charts/:id',
  pacController.getChart
);

router.get('/pac/chart/:id',
  pacController.getChartById
);

router.post('/pac/register/chart',
  pacController.registerChart
);

module.exports = router;