import jsPDF from 'jspdf';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import Image from 'next/image';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { parseCookies } from 'nookies';
import { setupAPIClient } from '../../services/api';
import { HomeProps } from '../viewPat';

export default function PDFModel({ pacs }: HomeProps) {

    function dateConvert(date: string) {
        var data = new Date(date);
        var formattedDate = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return formattedDate;
    }

    function getAge(date: string) {
        let birthDate = new Date(date)
        var today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }
    function getDate() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = dd + '/' + mm + '/' + yyyy;
        return date
    }

    function patientPdfGenerator() {

        var doc = new jsPDF("p", "pt", "a4")

        doc.html(document.body, {
            callback: function (doc) {
                doc.save(`${pacs.name}.pdf`)
            },
            margin: [10, 10, 10, 10],
            autoPaging: 'text',
            x: 15,
            y: 15,
            width: 570,
            windowWidth: 570,
        })
    }

    useEffect(() => {
        patientPdfGenerator()
    })

    return (
        <div className={styles.pdf}>
            <header>

                <p className={styles.titulo}>CLÍNICA-ESCOLA PSICOLOGIA</p>
                <p className={styles.subtitulo}>PRONTUÁRIO</p>
                <Image className={styles.logoHeader}
                    src="/logoCesusc.png"
                    width={100}
                    height={100}
                    alt="logo"
                />
                <hr className={styles.linhaHeader}></hr>

                <div className={styles.containerHeader} >
                    <p>Idade: {getAge(pacs.birthDate)} anos </p>
                    <p className={styles.gen}>Gênero: {pacs.gender}</p>
                    <p className={styles.dta}>Data: {getDate()}</p>
                    <p className={styles.numid}>Nº de inscrição: {pacs.id}</p>
                </div>

            </header>

            <hr className={styles.linhaHeader}></hr>

            <div>
                <h3 className={styles.title}>Dados De Identificação</h3>

                <p className={styles.content}>Nome: {pacs.name} </p>
                <p className={styles.content}>Data de nascimento: {dateConvert(pacs.birthDate)}</p>
                <p className={styles.content}>Endereço: {pacs.address.street} {pacs.address.number} - {pacs.address.cep} </p>
                <p className={styles.content}>Bairro: {pacs.address.district}</p>
                <p className={styles.content}>Telefone: {pacs.phone}</p>
                <p className={styles.content}>Profissão: {pacs.career}</p>
                <p className={styles.content}>Local de Trabalho: {pacs.workplace}</p>
                <p className={styles.content}>Renda Familiar: {pacs.family_income}</p>
                <p className={styles.content}>Escolaridade: {pacs.schooling}</p>
                <p className={styles.content}>CPF: {pacs.cpf}</p>
                <p className={styles.content}>Estado Civil: {pacs.status}</p>

                <hr className={styles.linhaHeader}></hr>

                {pacs.accountable ?

                    <div>

                        <h3 className={styles.title}>Menores de 18 anos</h3>

                        <p className={styles.content}>Nome dos Responsáveis: {pacs.accountable.name} </p>
                        <p className={styles.content}>Parentesco: {pacs.accountable.kindship} </p>
                        <p className={styles.content}>RG: {pacs.accountable.rgAccountable} </p>
                        <p className={styles.content}>CPF: {pacs.accountable.cpfAccountable} </p>

                    </div>
                    :
                    <div>

                        <h3 className={styles.title}>Menores de 18 anos</h3>

                        <p className={styles.content}>Nome dos Responsáveis: </p>
                        <p className={styles.content}>Parentesco: </p>
                        <p className={styles.content}>RG: </p>
                        <p className={styles.content}>CPF: </p>

                    </div>

                }



                <hr className={styles.linhaHeader}></hr>

                <h3 className={styles.title}>Inserção no CEPSI</h3>

                {pacs.accountable ?
                    <div>
                        <p className={styles.content}>Tipo de inserção: {pacs.cepsi_insert.type} </p>
                        <p className={styles.content}>Orgão Encaminhador: {pacs.cepsi_insert.forwarding_agency} </p>
                        <p className={styles.content}>Profissional ou equipe de referência do Órgão encaminhador: {pacs.cepsi_insert.forwarding_professional} </p>
                        <p className={styles.content}>Telefone Encaminhador: {pacs.cepsi_insert.phone} </p>
                        <p className={styles.content}>Motivo do encaminhamento ou procura: {pacs.cepsi_insert.reason} </p>
                        <p className={styles.content}>Procurou outro serviço antes?: {pacs.cepsi_insert.looked_for_another_service ? 'sim' : 'não' } </p>
                        <p className={styles.content}>Nôme do local: {pacs.cepsi_insert.name_another_service} </p>
                        <p className={styles.content}>Tempo de permanência: {pacs.cepsi_insert.lenght_of_stay_in_months} </p>

                    </div>

                    :

                    <div>
                        <p className={styles.content}>Tipo de inserção:  </p>
                        <p className={styles.content}>Orgão Encaminhador:  </p>
                        <p className={styles.content}>Profissional ou equipe de referência do Órgão encaminhador:  </p>
                        <p className={styles.content}>Telefone Encaminhador:  </p>
                        <p className={styles.content}>Motivo do encaminhamento ou procura: </p>
                        <p className={styles.content}>Procurou outro serviço antes?: </p>
                        <p className={styles.content}>Nôme do local:  </p>
                        <p className={styles.content}>Tempo de permanência: </p>
                    </div>



                }

            </div>

        </div>

    )

}
export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const cookies = parseCookies(ctx);
    const id = cookies['@nextpac.id'];

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get(`/patient/info/${id}`);

    return {
        props: {
            pacs: response.data,
        }
    }
})