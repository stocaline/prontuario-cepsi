import { Request, Response } from 'express';
import { DetailUserInDashboardService } from '../../services/dashboard/DetailUserInDashboardService'

class DetailUserInDashboardController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const detailUserService = new DetailUserInDashboardService()
        const data = await detailUserService.execute(user_id)

        return res.json(data)
    }
}

export { DetailUserInDashboardController }