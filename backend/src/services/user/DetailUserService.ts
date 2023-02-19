import prismaClient from "../../prisma";

class DetailUserService{
    async executeWithOutId(user_id: string){
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }, select:{
                id: true,
                name: true,
                email: true,
                admin: true,
                registration: true,
                patients: true,
            }
        })

        return user
    }
    async executeWithId(id: string){
        const user = await prismaClient.user.findFirst({
            where:{
                id: id
            }, select:{
                id: true,
                name: true,
                email: true,
                admin: true,
                registration: true,
                patients: true,
            }
        })

        return user
    }
}

export { DetailUserService }