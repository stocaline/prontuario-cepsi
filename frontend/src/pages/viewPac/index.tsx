import Head from 'next/head'
import { Header } from '../../components/Header'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import { AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import Image from 'next/image'
import { setupAPIClient } from '../../services/api'
import { useState } from 'react'
import { ModalChart } from '../../components/ModalChart'
import { ModalEditPac } from '../../components/ModalEditPac'
import Modal from 'react-modal';
import { parseCookies, destroyCookie } from 'nookies'
import Link from 'next/link'
import { Tab } from '@headlessui/react'

export type PacProps = {
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
    renda_familiar: number,
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

    const [pacMinor, setPacMinor] = useState(false);

    const [modalItem, setModalItem] = useState<ChartProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const [modalEditPac, setModalEditPac] = useState(pacs || [])
    const [modalEditPacVisible, setModalEditPacVisible] = useState(false)

    const [bottomTabsIndex, setBottomTabsIndex] = useState(0)

    function dateConvertChart({ date }: ChartProps) {
        var data = new Date(date);
        var dataFormatadaChart = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return dataFormatadaChart;
    }

    function dateConvertPac({ data_nascimento }: PacProps) {
        var data = new Date(data_nascimento);
        var dataFormatada = data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
        return dataFormatada;
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

    function handleCloseModal() {
        setModalVisible(false)
    }

    function handleCloseModalEdit() {
        setModalEditPacVisible(false)
    }

    async function handleOpenEditPac() {
        setModalEditPac(pacList);
        setModalEditPacVisible(true);
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
                        <button className={styles.buttonEdit} onClick={() => handleOpenEditPac()}>
                            <AiFillEdit size={20} />
                        </button>
                    </div>
                    <div className={styles.contentHeader}>
                        <Image src="/fotoUsuario.png" alt="" width={70} height={70} />
                        <div className={styles.contentHeaderPac}>
                            {pacList.map(item => (
                                <div key={item.id}>
                                    <p>{item.nome}</p>
                                    <p className={styles.contentHeaderPacAge}>{getAge(item.data_nascimento)} Anos</p>
                                </div>
                            ))}
                        </div>
                    </div>



                    <Tab.Group selectedIndex={bottomTabsIndex} onChange={setBottomTabsIndex}>
                        <Tab.List className={styles.bottomTabs}>
                            <Tab>Principal</Tab>
                            <Tab>Prontuários</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className={styles.containerPac}>
                                    {pacList.map(item => (
                                        <div key={item.id} className={styles.pacItem}>
                                            <h4>Identificação</h4>
                                            <div className={styles.pacItemConteiner}>
                                                <div className={styles.pacItemContent}>
                                                    <label>Nome:</label>
                                                    <input type="text" disabled value={item.nome} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Data de nascimeto:</label>
                                                    <input type="text" disabled value={dateConvertPac(item)} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Escolaridade:</label>
                                                    <input type="text" disabled value={item.escolaridade} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>RG:</label>
                                                    <input type="text" disabled value={item.rg} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Estado Civil:</label>
                                                    <input type="text" disabled value={item.estado_civil} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>CPF:</label>
                                                    <input type="text" disabled value={item.cpf} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Renda Familiar:</label>
                                                    <input type="text" disabled value={item.renda_familiar} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Profissão:</label>
                                                    <input type="text" disabled value={item.profissao} />
                                                </div>
                                            </div>
                                            <h4>Contatos</h4>
                                            <div className={styles.pacItemConteiner}>
                                                <div className={styles.pacItemContent}>
                                                    <label>Email:</label>
                                                    <input type="text" disabled value={item.email} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Telefone:</label>
                                                    <input type="text" disabled value={item.telefone} />
                                                </div>
                                            </div>
                                            <h4>Endereço</h4>
                                            <div className={styles.pacItemConteiner}>
                                                <div className={styles.pacItemContent}>
                                                    <label>Locar de Trabalho:</label>
                                                    <input type="text" disabled value={item.local_trabalho} />
                                                </div>
                                                <div className={styles.pacItemContent}>
                                                    <label>Bairro: </label>
                                                    <input type="text" disabled value={item.bairro} />
                                                </div>
                                            </div>

                                            {pacMinor &&
                                                <div>
                                                    <h4>Responsáveis</h4>
                                                    <div className={styles.pacItemConteiner}>
                                                        <div className={styles.pacItemContent}>
                                                            <label>Responsável:</label>
                                                            <input type="text" disabled value={item.nome_resp} />
                                                        </div>
                                                        <div className={styles.pacItemContent}>
                                                            <label>RG responsável: </label>
                                                            <input type="text" disabled value={item.rg_resp} />
                                                        </div>
                                                        <div className={styles.pacItemContent}>
                                                            <label>Parentesco: </label>
                                                            <input type="text" disabled value={item.parentesco} />
                                                        </div>
                                                        <div className={styles.pacItemContent}>
                                                            <label>CPF responsável: </label>
                                                            <input type="text" disabled value={item.cpf_resp} />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    ))}
                                </div>
                            </Tab.Panel>
                            <Tab.Panel>

                                <div className={styles.containerSubHeader}>
                                    <h1>Prontuarios</h1>
                                    <Link href={'/registerChart'}>
                                        <button className={styles.buttonAdd}>
                                            <AiOutlinePlus size={20} />
                                        </button>
                                    </Link>
                                </div>

                                <table className={styles.listOrders}>
                                    <thead >
                                        <tr className={styles.listHeader}>
                                            <th>Titulo</th>
                                            <th>Data de Criação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chartList.map(item => (
                                            <tr key={item.id} onClick={() => handleOpenModal(item.id)} className={styles.orderItem}>
                                                <td>{(item.title).substring(0, 20)}</td>
                                                <td>{dateConvertChart(item)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>

                </main>

                {modalEditPacVisible && (
                    <ModalEditPac
                        isOpen={modalEditPacVisible}
                        onRequestClose={handleCloseModalEdit}
                        pac={modalEditPac}
                    />
                )}

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