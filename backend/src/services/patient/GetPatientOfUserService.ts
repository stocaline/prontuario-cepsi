import prismaClient from "../../prisma";

class GetPatientOfUserService{
    async execute(user_id: string){
        const patients = await prismaClient.patient.findMany({
            where:{
                Owner_id: user_id
            }
        })

        
        return patients.reverse()
    }
}

export { GetPatientOfUserService }