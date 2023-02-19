import prismaClient from "../../../prisma";

class DetailInsertService{
    async execute(patient_id: string){
        const insertion = await prismaClient.cepsi_insertion.findFirst({
            where:{
                patientId: patient_id
            }
        })

        return insertion
    }
}

export { DetailInsertService }