import prismaClient from "../../../prisma";

interface ChartRequest{
    patient_id: string;
    title: string;
    description: string;
}

class CreateChartService{
    async execute({patient_id, title, description}: ChartRequest){


        const chart = await prismaClient.chart.create({
            data:{
                patientId: patient_id,
                title: title,
                description: description,
            }
        })

        return chart;
    }
}

export { CreateChartService }