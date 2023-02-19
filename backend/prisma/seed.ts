import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const idOwner = "fb27f05d-ab95-443b-8bb5-de72c45f0c20"

async function main() {
    await prisma.patient.deleteMany()
    
    await prisma.patient.create({
        data: {
            name:  "Marília Amaral Feltrin",
            social_name: false,
            birthDate: "2014-07-15T00:00:00.000Z",
            schooling: "Ensino Fundamental Incompleto",
            rg: "5555",
            cpf: "6666",
            phone: "4899922392",
            status: "solteiro",
            career: "estudante",
            workplace: "Ingleses",
            family_income: 2000,
            email: "marilia@gmail.com",
            gender: "Mulher",
            Owner_id: idOwner,
            minor: true,
            accountable:{
                create:{
                    name: "Janice Amaral",
                    kindship: "Mãe",
                    rgAccountable: "34242522",
                    cpfAccountable: "2342424"
                }
            },
            address:{
                create:{
                    cep: "8805888",
                    street: "Servidão Floresta Azul",
                    number: "75",
                    district: "ingleses",
                    city: "Florianópolis",
                    state: "Santa Catarina",
                }
            },
            cepsi_insert:{
                create:{
                    type: "Por encaminhamento interno",
                    forwarding_agency: "Colégio Cruz e Souza",
                    forwarding_professional: "Psicopedagoga Julia Ribeiro",
                    phone: "34343434",
                    reason: "Encaminhada pela escola por apresentar dificuldades na realização de algumas tarefas",
                    looked_for_another_service: true,
                    name_another_service: "Centro de Saúde Norte da Ilha - psicólogia",
                    lenght_of_stay_in_months: "2 meses",
                }
            },
            charts:{
                create:{
                    title: "História clinica do sofrimento psiquico",
                    description: "Mãe relata que a escola pediu para Marília ser encaminhada por apresentar dificuldades em algumas tarefas escolares e a escola a encaminhou ao CEPSI. Segundo professores, Marília fica uito ansiosa na realização de algumas tarefaas, mas tem bom comportamento.",

                }
            }

            
        }
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })