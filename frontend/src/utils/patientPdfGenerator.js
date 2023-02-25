import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

import { PatientsProps } from "../pages/viewPat";


function patientPdfGenerator(pat, insertionCepsi, chartList) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs

    const reportTitle = [
        {
            text: 'CLÍNICA-ESCOLA PSICOLOGIA',
            alignment: 'center',
            fontSize: 15,
            bold: true,
            margin: [15, 20, 0, 45]
        }
    ]

    const charts = chartList.map((chart) => {
        return [
            { text: "Titulo: " + chart.title, fontSize: 9, margin: [0, 10, 0, 2] },
            { text: "Descrição: " + chart.description, fontSize: 9, margin: [0, 2, 0, 2] },
        ]
    })

    const details = [
        { text: "Dados do Paciente", fontSize: 15, bold: true, margin: [0, 2, 0, 2] },
        { text: "Nome: " + pat.name, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Nome social: " + pat.social_name, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Data de nascimento: " + pat.birthDate, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Escolaridade: " + pat.schooling, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Gênero " + pat.gender, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "RG: " + pat.rg, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "CPF: " + pat.cpf, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Estado Civil: " + pat.status, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Telefone: " + pat.phone, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Email: " + pat.email, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Renda Familiar: " + pat.family_income, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Profissão: " + pat.career, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Local de Trabalho: " + pat.workplace, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Menor de Idade: " + pat.minor, fontSize: 9, margin: [0, 2, 0, 2] },
        
        { text: "Responsável", fontSize: 9, bold: true, margin: [0, 10, 0, 2] },
        { text: "Nome: " + pat.accountable.name, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Parentesco: " + pat.accountable.kindship, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "RG: " + pat.accountable.rgAccountable, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "CPF: " + pat.accountable.cpfAccountable, fontSize: 9, margin: [0, 2, 0, 2] },
        
        
        { text: "Endereço", fontSize: 9, bold: true, margin: [0, 10, 0, 2] },
        { text: "CEP: " + pat.address.cep, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Cidade: " + pat.address.city, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Estado: " + pat.address.state, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Bairro: " + pat.address.district, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Rua: " + pat.address.street, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Numero: " + pat.address.number, fontSize: 9, margin: [0, 2, 0, 2] },
        
        { text: "Inserção Cepsi", fontSize: 9, bold: true, margin: [0, 10, 0, 2] },
        { text: "Tipo: " + insertionCepsi.type, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Orgão Encaminhador: " + insertionCepsi.forwarding_agency, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Profissional ou equipe de referência do Órgão encaminhador: " + insertionCepsi.forwarding_professional, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Telefone: " + insertionCepsi.phone, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Motivo do Encaminhamento ou Procura: " + insertionCepsi.reason, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Procurou outro serviço antes? " + insertionCepsi.looked_for_another_service, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Nome do local: " + insertionCepsi.name_another_service, fontSize: 9, margin: [0, 2, 0, 2] },
        { text: "Tempo de Permanência: " + insertionCepsi.lenght_of_stay_in_months, fontSize: 9, margin: [0, 2, 0, 2] },

        { text: "Prontuários", fontSize: 15, bold: true, margin: [0, 10, 0, 2] },
        ...charts
    ]

    function Rodape(currentPage, pageCount) {
        return [
            {
                text: currentPage + ' / ' + pageCount,
                alignment: 'right',
                fontSize: 9,
                margin: [0, 10, 20, 0]
            }
        ]
    }

    const docDefinitios = {
        pageSize: 'A4',
        pageMargins: [15, 50, 15, 40],

        header: [reportTitle],
        content: [details],
        footer: Rodape,
    }

    pdfMake.createPdf(docDefinitios).download()
}

export default patientPdfGenerator