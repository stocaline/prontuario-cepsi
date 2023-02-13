import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

interface AuthRequest {
    registration: string;
    password: string;
}

class AuthUserService{
    async execute({ registration, password}: AuthRequest){
        const user = await prismaClient.user.findFirst({
            where:{
                registration: registration
            }
        })

        if(!user){
            throw new Error("User/Password incorrect")
        }

        const passwordMatch = await compare(password, user.password)

        if(!passwordMatch){
            throw new Error("User/Password incorrect")
        }

        const token = sign(
            {
            name: user.name,
            email: user.email,
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '1d'
            }

        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            token: token
        }
    }
}

export { AuthUserService }