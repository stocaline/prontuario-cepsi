import prismaClient from "../../prisma";
import { hash } from 'bcryptjs'

interface UserUpdateRequest{
    user_id: string;
    name: string;
    email: string;
}

class UpdateUserService{
    async handle({user_id, name, email}: UserUpdateRequest){

        const userExists = await prismaClient.user.findFirst({
            where:{
                id: user_id
            }
        })

        if(!userExists){
            throw new Error("User not exists")
        }

        //const passwordHash = await hash(password, 8)

        const user = await prismaClient.user.update({
            where: {
                id: user_id
            },
            data:{
                name: name,
                email: email,
            },
            select:{
                id: true,
                name: true,
                email: true,
                registration: true,
            }
        })

        return user;
    }
}

export { UpdateUserService }