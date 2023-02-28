import prismaClient from "../../prisma";

class DetailUserInDashboardService {
    async execute(user_id: string) {
        const user = await prismaClient.user.findFirst({
            where: {
                id: user_id
            }, select: {
                id: true,
                name: true,
                email: true,
                admin: true,
                registration: true,
                patients: true,
            }
        })

        const patientLength = user.patients.length
        
        if (user.patients.at(-1)) {
            var lastPatient = user.patients.at(-1)
            return { user, patientLength, lastPatient }
        } else {
            lastPatient = null
            return { user, patientLength, lastPatient }

        }
    }
}
export { DetailUserInDashboardService }