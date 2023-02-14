import prismaClient from "../../prisma";

interface PatientUpdateRequest{
    patient_id: string;
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

class UpdatePatientService{
    async handlePatient({patient_id, name, social_name, birthDate, schooling, gender, rg, cpf, status, phone, email, family_income, career, workplace, minor}: PatientUpdateRequest){

        const patientExists = await prismaClient.patient.findFirst({
            where:{
                id: patient_id
            }
        })

        if(!patientExists){
            throw new Error("Patient not exists")
        }

        const patient = await prismaClient.patient.update({
            where: {
                id: patient_id
            },
            data:{
                name: name,
                social_name: social_name,
                birthDate: birthDate,
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
            }
        })

        return patient;
    }

    async handleAdress({patient_id, cep, city, state, district, street, number}: PatientAdressRequest){
        const address = await prismaClient.address.update({
            where: {
                patientId: patient_id
            },
            data:{
                cep: cep,
                city: city,
                state: state,
                district: district,
                street: street,
                number: number,
            }
        })

        return address;
    }

    async handleAccountable({patient_id, accountableName, kindship, rgAccountable, cpfAccountable}: PatientAccountableRequest){
        const accountable = await prismaClient.accountable.update({
            where: {
                patientId: patient_id
            },
            data:{
                name: accountableName,
                kindship: kindship,
                rgAccountable: rgAccountable,
                cpfAccountable: cpfAccountable,
            }
        })

        return accountable;
    }
}

export { UpdatePatientService }