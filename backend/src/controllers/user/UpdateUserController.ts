import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/user/UpdateUserService';

class UpdateUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const { name, email, password } = req.body
        const updateUserService = new UpdateUserService()
        const user = await updateUserService.handle({
            user_id,
            name, 
            email, 
            password
        })

        return res.json(user)
    }
}

export { UpdateUserController }