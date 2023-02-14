import prismaClient from "../../../prisma";

class DetailChartService{
    async execute(patient_id: string){
        const charts = await prismaClient.chart.findMany({
            where:{
                patientId: patient_id
            }
        })

        return charts
    }
}

export { DetailChartService }