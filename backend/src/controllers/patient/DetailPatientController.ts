import { Request, Response } from 'express';
import { DetailPatientService } from '../../services/patient/DetailPatientService';

class DetailPatientController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const detailPatientService = new DetailPatientService()
        const patient = await detailPatientService.execute(id)

        return res.json(patient)
    }
}

export { DetailPatientController }