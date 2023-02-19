import prismaClient from "../../prisma";

interface PatientRequest{
    name: string;
    social_name: boolean;
    birthDate: Date;
    schooling: string;
    gender: string;
    rg: string;
    cpf: string;
    status: string;
    phone: string;
    email: string;
    family_income: number;
    career: string;
    workplace: string;
    minor: boolean;

    user_id: string
}

interface PatientAdressRequest{
    cep: string;
    city: string;
    state: string;
    district: string;
    street: string;
    number: string;
    patient_id: string;
}

interface PatientAccountableRequest{
    accountableName: string;
    kindship: string;
    rgAccountable: string;
    cpfAccountable: string;
    patient_id: string;
}

class CreatePatientService{
    async createPatient({ user_id, name, social_name, schooling, birthDate,  gender, rg, cpf, status, phone, email, family_income, career, workplace, minor}: PatientRequest){

        const RGPatientAlreadyExists = await prismaClient.patient.findFirst({
            where:{
                rg: rg
            }
        })
        const CPFPatientAlreadyExists = await prismaClient.patient.findFirst({
            where:{
                cpf: cpf
            }
        })

        if(RGPatientAlreadyExists || CPFPatientAlreadyExists){
            throw new Error("Patient already exists")
        }

        
        const patient = await prismaClient.patient.create({
            
            data: {
                name: name,
                social_name: social_name,
                schooling: schooling,
                gender: gender,
                rg: rg,
                cpf: cpf,
                status: status,
                phone: phone,
                email: email,
                family_income: family_income,
                career: career,
                workplace: workplace,
                minor: minor,
                Owner_id: user_id,
                birthDate: birthDate,
            },
            select:{
                id: true,
            }
        })
        
        return patient;
    }
    
    async createAdress({ cep, city, district, number, state, street, patient_id }: PatientAdressRequest){
        try{
            await prismaClient.address.create({
                data:{
                    cep: cep,
                    city: city,
                    district: district,
                    number: number,
                    state: state,
                    street: street,
                    patientId: patient_id,
                }
            })
        }catch(err){
            throw new Error(err)
        }
    }
    async createAccountable({accountableName, kindship, rgAccountable, cpfAccountable, patient_id}: PatientAccountableRequest){
        try{
            await prismaClient.accountable.create({
                data:{
                    patientId: patient_id,
                    name: accountableName,
                    kindship: kindship,
                    rgAccountable: rgAccountable,
                    cpfAccountable: cpfAccountable,
                }
            })
        }catch(err){
            throw new Error(err)
        }
    }
}

export { CreatePatientService }
