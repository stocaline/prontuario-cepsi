import { Request, Response } from 'express';
import { DetailInsertService } from '../../../services/patient/insertion/DetailInsertService';

class DetailInsertController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const detailInsertService = new DetailInsertService()
        const insertion = await detailInsertService.execute(id)

        return res.json(insertion)
    }
}

export { DetailInsertController }