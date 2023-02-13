import { Request, Response } from 'express';
import { CreatePatientService } from '../../services/patient/CreatePatientService';

class CreatePatientController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id
        const { name, social_name, birthDate, schooling, gender, rg, cpf, status, phone, email, family_income, career, workplace, minor, accountableName, kindship, rgAccountable, cpfAccountable } = req.body
        const { cep, city, district, number, state, street } = req.body
        
        const createPatientService = new CreatePatientService()

        const patient = await createPatientService.createPatient({
            user_id,
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
            minor,
        })
        
        const patient_id = patient.id

        if(minor){
            await createPatientService.createAccountable({
                patient_id,
                accountableName,
                kindship,
                rgAccountable,
                cpfAccountable,
            })
        }


        await createPatientService.createAdress({
            cep,
            city,
            district,
            number,
            state,
            street,
            patient_id
        })

        return res.json(patient)
    }
}

export { CreatePatientController }