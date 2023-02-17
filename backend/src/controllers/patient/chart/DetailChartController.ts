import { Request, Response } from 'express';
import { DetailChartService } from '../../../services/patient/chart/DetailChartService';

class DetailChartController{
    async handleAll(req: Request, res: Response){
        const { id } = req.params
        const detailChartService = new DetailChartService()
        const charts = await detailChartService.executeAll(id)

        return res.json({charts})
    }
    async handleUnique(req: Request, res: Response){
        const { id } = req.params
        const detailChartService = new DetailChartService()
        const charts = await detailChartService.executeUnique(id)

        return res.json({charts})
    }
}

export { DetailChartController }