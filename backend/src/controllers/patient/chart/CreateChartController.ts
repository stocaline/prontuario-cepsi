import { Request, Response } from 'express';
import { CreateChartService } from '../../../services/patient/chart/CreateChartService';

class CreateChartController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const { title, description } = req.body
        const patient_id = id

        const createChartService = new CreateChartService()

        const chart = await createChartService.execute({
            patient_id, 
            title, 
            description, 
        })

        return res.json(chart)
    }
}

export { CreateChartController }