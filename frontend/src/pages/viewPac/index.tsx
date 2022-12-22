import Head from 'next/head';
import { Header } from '../../components/Header'
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './styles.module.scss'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import { setupAPIClient } from '../../services/api'
import { useState } from 'react'
import { ModalChart } from '../../components/ModalChart'
import Modal from 'react-modal';
import { parseCookies, destroyCookie } from 'nookies';
import Link from 'next/link';

type PacProps = {
    id: number,
    nome: string,
    data_nascimento: string,
    escolaridade: string,
    rg: number,
    cpf: number,
    bairro: string,
    telefone: number,
    profissao: string,
    estado_civil: string,
    local_trabalho: string,
    email: string,
    menor_idade: boolean,
    nome_resp: string,
    parentesco: string,
    rg_resp: number,
    cpf_resp: number,
    ultima_visita: string
}

export type ChartProps = {
    id: number,
    title: string,
    description: string,
    date: string
}

interface HomeProps {
    pacs: PacProps[];
    charts: ChartProps[];
}

export default function ViewPac({ pacs, charts }: HomeProps) {
    const [pacList, setPacList] = useState(pacs || []);
    const [chartList, setChartList] = useState(charts || []);

    const [modalItem, setModalItem] = useState<ChartProps[]>()
    const [modalVisible, setModalVisible] = useState(false)


    function dateConvertChart({ date }: ChartProps) {
        var data = new Date(date);
        var dataFormatadaChart = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return dataFormatadaChart;
    }

    function dateConvertPac({ ultima_visita }: PacProps) {
        var data = new Date(ultima_visita);
        var dataFormatada = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return dataFormatada;
    }

    function handleCloseModal() {
        setModalVisible(false)
    }

    async function handleOpenModal(id: number) {

        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/pac/chart/${id}`);

        setModalItem(response.data);
        setModalVisible(true);

    }

    Modal.setAppElement('#__next');

    return (
        <>
            <Head>
                <title>Paciente - Prontuario Cepsi</title>
            </Head>
            <div>
                <Header />
                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Informações do Paciente</h1>
                        <button className={styles.buttonEdit}>
                            <AiFillEdit size={20} />
                        </button>
                    </div>
                    <div className={styles.containerPac}>
                        {pacList.map(item => (
                            <div key={item.id} className={styles.pacItem}>
                                <div className={styles.buttonContent}>
                                    <p>Nome: {item.nome}</p>
                                    <p>Data de nascimento: {dateConvertPac(item)}</p>
                                    <p>Escolaridade: {item.escolaridade}</p>
                                    <p>RG: {item.rg}</p>
                                    <p>CPF: {item.cpf}</p>
                                    <p>Bairro: {item.bairro}</p>
                                    <p>Telefone: {item.telefone}</p>
                                    <p>Profissão: {item.profissao}</p>
                                    <p>Estado Civil: {item.estado_civil}</p>
                                    <p>Locar de Trabalho: {item.local_trabalho}</p>
                                    <p>Email: {item.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={styles.containerSubHeader}>
                        <h1>Prontuarios</h1>
                        <Link href={'/registerChart'}>
                            <button className={styles.buttonAdd}>
                                <AiOutlinePlus size={20} />
                            </button>
                        </Link>
                    </div>
                    <table className={styles.listOrders}>
                        <tr className={styles.listHeader}>
                            <td>Titulo</td>
                            <td>Descrição</td>
                            <td>Data de Criação</td>
                        </tr>

                        {chartList.map(item => (
                            <tr key={item.id} className={styles.orderItem}>
                                <button onClick={() => handleOpenModal(item.id)}>
                                <hr />
                                    <div className={styles.buttonContent}>
                                        <td>{(item.title).substring(0, 20)} |</td>
                                        <td>{(item.description).substring(0, 20) + '...'} |</td>
                                        <td>{dateConvertChart(item)}</td>
                                    </div>
                                </button>
                            </tr>
                        ))}

                    </table>
                </main>

                {modalVisible && (
                    <ModalChart
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        chart={modalItem}
                    />
                )}

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const cookies = parseCookies(ctx);
    const id = cookies['@nextpac.id'];

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get(`/pac/${id}`);
    const responseChart = await apiClient.get(`/pac/charts/${id}`)

    return {
        props: {
            pacs: response.data,
            charts: responseChart.data
        }
    }
})