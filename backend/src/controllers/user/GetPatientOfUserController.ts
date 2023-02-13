import { Request, Response } from 'express';
import { GetPatientOfUserService } from '../../services/user/GetPatientOfUserService';

class GetPatientOfUserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const getPatientOfUserService = new GetPatientOfUserService()
        const user = await getPatientOfUserService.execute(user_id)

        return res.json(user)
    }
}

export { GetPatientOfUserController }