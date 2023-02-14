import { Request, Response } from 'express';
import { DetailChartService } from '../../../services/patient/chart/DetailChartService';

class DetailChartController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const detailChartService = new DetailChartService()
        const charts = await detailChartService.execute(id)

        return res.json({charts})
    }
}

export { DetailChartController }