import { Request, Response } from 'express';
import { CreateInsertService } from '../../../services/patient/insertion/CreateInsertService';

class CreateInsertController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const { type, forwarding_agency, forwarding_professional, phone, reason, looked_for_another_service, name_another_service, lenght_of_stay_in_mouths } = req.body
        const patient_id = id

        const createInsertService = new CreateInsertService()

        const insertion = await createInsertService.execute({
            patient_id,
            type, 
            forwarding_agency, 
            forwarding_professional, 
            phone, 
            reason, 
            looked_for_another_service, 
            name_another_service, 
            lenght_of_stay_in_mouths
        })

        return res.json(insertion)
    }
}

export { CreateInsertController }