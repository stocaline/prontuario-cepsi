import prismaClient from "../../../prisma";

class DetailChartService{
    async executeAll(patient_id: string){
        const charts = await prismaClient.chart.findMany({
            where:{
                patientId: patient_id
            }
        })

        return charts
    }
    async executeUnique(chart_id: string){
        const charts = await prismaClient.chart.findFirst({
            where:{
                id: chart_id
            }
        })

        return charts
    }
}

export { DetailChartService }