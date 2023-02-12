import { Request, Response } from 'express';
import { AuthUserService } from '../../services/user/AuthUserService'


class AuthUserController{
    async handle(req: Request, res: Response){
        const {registration, password} = req.body

        const authUserService = new AuthUserService()

        const auth = await authUserService.execute({
            registration,
            password
        })

        return res.json(auth)
    }
}

export { AuthUserController }