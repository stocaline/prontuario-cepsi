import prismaClient from "../../prisma";

class DetailUserService{
    async execute(user_id: string){
        const user = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }, select:{
                id: true,
                name: true,
                email: true,
                admin: true,
                registration: true,
            }
        })

        return user
    }
}

export { DetailUserService }