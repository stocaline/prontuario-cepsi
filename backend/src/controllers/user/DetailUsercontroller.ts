import { Request, Response } from 'express';
import { DetailUserService } from '../../services/user/DetailUserService';

class DetailUserController{
    async getUserWithOutId(req: Request, res: Response){
        const user_id = req.user_id
        const detailUserService = new DetailUserService()
        const user = await detailUserService.executeWithOutId(user_id)

        return res.json(user)
    }
    async getUserWithId(req: Request, res: Response){
        const { id } = req.params
        const detailUserService = new DetailUserService()
        const user = await detailUserService.executeWithId(id)

        return res.json(user)
    }
}

export { DetailUserController }