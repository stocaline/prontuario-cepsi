import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUsercontroller';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { GetPatientOfUserController } from './controllers/user/GetPatientOfUserController';
import { CreatePatientController } from './controllers/patient/CreatePatientController';
import { DetailPatientController } from './controllers/patient/DetailPatientController';
import { UpdatePatientController } from './controllers/patient/UpdatePatientController';
import { CreateChartController } from './controllers/patient/chart/CreateChartController';
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

//--User--
router.post('/user', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/user/info', isAuthenticated, new DetailUserController().handle)

router.get('/user/patient', isAuthenticated, new GetPatientOfUserController().handle)

router.put('/user', isAuthenticated, new UpdateUserController().handle)

//--Patient--
router.post('/patient', isAuthenticated, new CreatePatientController().handle)

router.get('/patient/info/:id', isAuthenticated, new DetailPatientController().handle)

router.put('/patient/:id', isAuthenticated, new UpdatePatientController().handle)

//--Chart--

router.post('/patient/chart/:id', isAuthenticated, new CreateChartController().handle)

export { router }