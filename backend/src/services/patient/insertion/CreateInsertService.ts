import prismaClient from "../../../prisma";

interface InsertRequest{
    patient_id: string;
    type: string
    forwarding_agency: string;
    forwarding_professional: string;
    phone: string;
    reason: string;
    looked_for_another_service: boolean;
    name_another_service: string;
    lenght_of_stay_in_mouths: string;
}

class CreateInsertService{
    async execute({patient_id, type, forwarding_agency, forwarding_professional, phone, reason, looked_for_another_service, name_another_service, lenght_of_stay_in_mouths}: InsertRequest){

        const insertAlreadyExists = await prismaClient.cepsi_insertion.findFirst({
            where:{
                patientId: patient_id
            }
        })

        if(insertAlreadyExists){
            throw new Error("Patient already have a cepsi insertion")
        }

        const insert = await prismaClient.cepsi_insertion.create({
            data:{
                patientId: patient_id,
                type: type,
                forwarding_agency: forwarding_agency,
                forwarding_professional: forwarding_professional,
                phone: phone,
                reason: reason,
                looked_for_another_service: looked_for_another_service,
                name_another_service: name_another_service,
                lenght_of_stay_in_months: lenght_of_stay_in_mouths
            }
        })

        return insert;
    }
}

export { CreateInsertService }