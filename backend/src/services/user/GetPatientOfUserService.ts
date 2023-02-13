import prismaClient from "../../prisma";

class GetPatientOfUserService{
    async execute(user_id: string){
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }, select:{
                patients: true
            }
        })

        return user
    }
}

export { GetPatientOfUserService }