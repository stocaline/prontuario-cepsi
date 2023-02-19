import prismaClient from "../../prisma";

class DetailPatientService{
    async execute(patient_id: string){
        const patient = await prismaClient.patient.findFirst({
            where:{
                id: patient_id
            }, select:{
                id: true,
                name: true,
                social_name: true,
                birthDate: true,
                schooling: true,
                gender: true,
                rg: true,
                cpf: true,
                status: true,
                phone: true,
                email: true,
                family_income: true,
                career: true,
                workplace: true,
                minor: true,
                accountable: true,
                last_visit: true,
                Owner_id: true,
                address:true,
                cepsi_insert: true,
                charts: true
            }
        })

        return patient
    }
}

export { DetailPatientService }