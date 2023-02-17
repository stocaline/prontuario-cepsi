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

export type PatientsProps = {
    id: string,
    name: string,
    social_name: boolean,
    birthDate: string,
    schooling: string,
    gender: string,
    rg: string,
    cpf: string,
    status: string,
    phone: string,
    email: string,
    family_income: number,
    career: string,
    workplace: string,
    minor: boolean,
    last_visit: string,
    accountable: AccountableProps
    address: AddressProps
    cepsi_insert: CepsiInsertProps
    charts: ChartProps[]
}

type CepsiInsertProps = {
type: string,
forwarding_agency: string,
forwarding_professional: string,
phone: string,
reason: string,
looked_for_another_service: boolean,
name_another_service: string,
lenght_of_stay_in_months: string,
}

type AccountableProps = {
    id: string
    name: string
    kindship: string
    rgAccountable: string
    cpfAccountable: string
}

type AddressProps = {
    id: string
    cep: string
    city: string
    state: string
    district: string
    street: string
    number: string
}

export type ChartProps = {
    id: string,
    title: string,
    description: string,
    created_at: string
}

type OwnerProps = {
    name: string
    registration: string
}

interface HomeProps {
    pacs: PatientsProps;
    owner: OwnerProps
}


export default function ViewPat({ pacs, owner }: HomeProps) {
    const [pacList, setPacList] = useState(pacs || []);
    const [chartList, setChartList] = useState(pacs.charts || []);
    const [ownerProps, setOwnerProps] = useState(owner || "")
    const [pacMinor, setPacMinor] = useState(verifyIfMinor(pacList.minor));

    const [modalItem, setModalItem] = useState<ChartProps>()
    const [modalVisible, setModalVisible] = useState(false)

    const [modalEditPac, setModalEditPac] = useState(pacs || [])
    const [modalEditPacVisible, setModalEditPacVisible] = useState(false)

    const [bottomTabsIndex, setBottomTabsIndex] = useState(0)

    function verifyIfMinor(minor: any) {
        if (minor == 0) {
            return false
        } else {
            return true
        }
    }

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

    async function handleOpenModal(id: string) {

        const apiClient = setupAPIClient();
        const response = await apiClient.get(`/patient/chart/detail/${id}`);

        setModalItem(response.data.charts);
        setModalVisible(true);

    }

    function seletedTab1() {
        if (bottomTabsIndex === 0) {
            return styles.bottomTabsSelect
        } else {
            return
        }

    }
    function seletedTab2() {
        if (bottomTabsIndex === 1) {
            return styles.bottomTabsSelect
        } else {
            return
        }
    }

    function seletedTab3() {
        if (bottomTabsIndex === 2) {
            return styles.bottomTabsSelect
        } else {
            return
        }
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
                            <div key={pacList.id}>
                                <p>{pacList.name}</p>
                                <p className={styles.contentHeaderPacAge}>{getAge(pacList.birthDate)} Anos</p>
                            </div>
                        </div>
                    </div>



                    <Tab.Group selectedIndex={bottomTabsIndex} onChange={setBottomTabsIndex}>
                        <Tab.List className={styles.bottomTabs}>
                            <Tab className={seletedTab1()}>Principal</Tab>
                            <Tab className={seletedTab2()}>Prontuários</Tab>
                            <Tab className={seletedTab3()}>Inserção Cepsi</Tab>
                        </Tab.List>
                        <Tab.Panels>
                            <Tab.Panel>
                                <div className={styles.containerPac}>

                                    <div className={styles.pacItem}>
                                        <h4>Cadastrado por</h4>
                                        <div className={styles.pacItemConteiner}>
                                            <div className={styles.pacItemContent}>
                                                <label>Nome:</label>
                                                <input type="text" disabled value={ownerProps.name} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Matricula:</label>
                                                <input type="text" disabled value={ownerProps.registration} />
                                            </div>
                                        </div>
                                        <h4>Identificação</h4>
                                        <div className={styles.pacItemConteiner}>
                                            <div className={styles.pacItemContent}>
                                            {pacList.social_name ?
                                                        <label>Nome Social:</label>
                                                        : <label>Nome:</label>
                                                }
                                                <input type="text" disabled value={pacList.name} />
                                            </div>
                                            
                                            <div className={styles.pacItemContent}>
                                                <label>Data de nascimeto:</label>
                                                <input type="text" disabled value={dateConvert(pacList.birthDate)} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Gênero:</label>
                                                <input type="text" disabled value={pacList.gender} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Escolaridade:</label>
                                                <input type="text" disabled value={pacList.schooling} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>RG:</label>
                                                <input type="text" disabled value={pacList.rg} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>CPF:</label>
                                                <input type="text" disabled value={pacList.cpf} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Estado Civil:</label>
                                                <input type="text" disabled value={pacList.status} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Renda Familiar:</label>
                                                <input type="text" disabled value={pacList.family_income} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Profissão:</label>
                                                <input type="text" disabled value={pacList.career} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Local de Trabalho:</label>
                                                <input type="text" disabled value={pacList.workplace} />
                                            </div>
                                        </div>
                                        <h4>Contatos</h4>
                                        <div className={styles.pacItemConteiner}>
                                            <div className={styles.pacItemContent}>
                                                <label>Email:</label>
                                                <input type="text" disabled value={pacList.email} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Telefone:</label>
                                                <input type="text" disabled value={pacList.phone} />
                                            </div>
                                        </div>
                                        <h4>Endereço</h4>
                                        <div className={styles.pacItemConteiner}>
                                            <div className={styles.pacItemContent}>
                                                <label>CEP: </label>
                                                <input type="text" disabled value={pacList.address.cep} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Cidade: </label>
                                                <input type="text" disabled value={pacList.address.city} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Estado: </label>
                                                <input type="text" disabled value={pacList.address.state} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Bairro: </label>
                                                <input type="text" disabled value={pacList.address.district} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Rua: </label>
                                                <input type="text" disabled value={pacList.address.street} />
                                            </div>
                                            <div className={styles.pacItemContent}>
                                                <label>Numero: </label>
                                                <input type="text" disabled value={pacList.address.number} />
                                            </div>
                                        </div>

                                        {pacMinor &&
                                            <div>
                                                <h4>Responsáveis</h4>
                                                <div className={styles.pacItemConteiner}>
                                                    <div className={styles.pacItemContent}>
                                                        <label>Responsável:</label>
                                                        <input type="text" disabled value={pacList.accountable.name} />
                                                    </div>
                                                    <div className={styles.pacItemContent}>
                                                        <label>RG responsável: </label>
                                                        <input type="text" disabled value={pacList.accountable.rgAccountable} />
                                                    </div>
                                                    <div className={styles.pacItemContent}>
                                                        <label>Parentesco: </label>
                                                        <input type="text" disabled value={pacList.accountable.kindship} />
                                                    </div>
                                                    <div className={styles.pacItemContent}>
                                                        <label>CPF responsável: </label>
                                                        <input type="text" disabled value={pacList.accountable.cpfAccountable} />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>

                                </div>
                            </Tab.Panel>
                            <Tab.Panel>

                                <div className={styles.containerSubHeader}>
                                    <h1>Prontuários</h1>
                                    <Link href={'/registerChart'}>
                                        <button className={styles.buttonAdd}>
                                            <AiOutlinePlus size={20} />
                                        </button>
                                    </Link>
                                </div>
                                
                                {pacList.charts.length > 0 ?
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
                                                <td>{dateConvert(item.created_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                
                                : <div className={styles.withOutChartDescription}>
                                    <p>Este paciente ainda não possui prontuarios!</p>
                                </div>
                                }
                            </Tab.Panel>

                            <Tab.Panel>
                                <div className={styles.containerSubHeader}>
                                    <h1>Inserção Cepsi</h1>
                                </div>
                                {pacList.cepsi_insert ?
                               
                               <div className={styles.pacItem}>
                               <h4>Tipo</h4>
                               <div className={styles.pacItemConteiner}>
                                   <div className={styles.pacItemContent}>
                                       <label>Nome:</label>
                                       <input type="text" disabled value={ownerProps.name} />
                                   </div>
                                   <div className={styles.pacItemContent}>
                                       <label>Matricula:</label>
                                       <input type="text" disabled value={ownerProps.registration} />
                                   </div>
                               </div>
                               </div>
                                
                                : <div className={styles.withOutChartDescription}>
                                    <p>Cadastre a Inserção Cepsi do Paciente </p>
                                    <Link href={'/registerInsertion'}>
                                        <button className={styles.buttonAdd}>
                                            <AiOutlinePlus size={15} />
                                        </button>
                                    </Link>
                                </div>
                                }

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
    const response = await apiClient.get(`/patient/info/${id}`);
    const OwnerId = response.data.Owner_id
    const Owner = await apiClient.get(`/user/info/${OwnerId}`);
    return {
        props: {
            pacs: response.data,
            owner: Owner.data
        }
    }
})