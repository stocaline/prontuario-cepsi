import { Request, Response } from 'express';
import { UpdatePatientService } from '../../services/patient/UpdatePatientService';

class UpdatePatientController{
    async handle(req: Request, res: Response){
        const { id } = req.params
        const { name, social_name, birthDate, schooling, gender, rg, cpf, status, phone, email, family_income, career, workplace, minor } = req.body
        const { cep, city, state, district, street, number } = req.body
        const { accountableName, kindship, rgAccountable, cpfAccountable } = req.body
        const patient_id = id
        const updatePatientService = new UpdatePatientService()
        const user = await updatePatientService.handlePatient({
            patient_id,
            name, 
            social_name, 
            birthDate, 
            schooling, 
            gender, 
            rg, 
            cpf, 
            status, 
            phone, 
            email, 
            family_income, 
            career, 
            workplace, 
            minor
        })

        if(user.minor){
            const accountable = await  updatePatientService.handleAccountable({
                patient_id,
                accountableName, 
                kindship, 
                rgAccountable, 
                cpfAccountable
            })
            const address = await updatePatientService.handleAdress({
                patient_id,
                cep,
                city, 
                state, 
                district, 
                street, 
                number
            })
            return res.json({ user, address, accountable })
        }

        const address = await updatePatientService.handleAdress({
            patient_id,
            cep,
            city, 
            state, 
            district, 
            street, 
            number
        })

        return res.json({ user, address })
    }
}

export { UpdatePatientController }