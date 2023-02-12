import { Router } from 'express';
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUsercontroller';
import { isAuthenticated } from './middlewares/isAuthenticated'

const router = Router()

router.get('/user/info', isAuthenticated, new DetailUserController().handle)

router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle)

export { router }