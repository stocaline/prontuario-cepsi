import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUsercontroller';
import { UpdateUserController } from './controllers/user/UpdateUserController';
import { GetPatientOfUserController } from './controllers/user/GetPatientOfUserController';
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

//--User--
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

router.get('/user/info', isAuthenticated, new DetailUserController().handle)

router.get('/user/patient', isAuthenticated, new GetPatientOfUserController().handle)

router.put('/user', isAuthenticated, new UpdateUserController().handle)

//--Patient--
export { router }