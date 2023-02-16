import { useState, useEffect } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { json } from 'stream/consumers';

type PatientsProps = {
    id: string,
    name: string,
    last_visit: string,
}

interface HomeProps {
    patients: PatientsProps[];
}

function dateConvert({ last_visit }: PatientsProps) {
    var data = new Date(last_visit);
    var dataFormatada = data.toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });
    return dataFormatada;
}

export function handleOpenViewPac(id: string) {
    setCookie(undefined, '@nextpac.id', id);
    Router.push('/viewPac');
}

export default function Patients({ patients }: HomeProps) {
    const [patientList, setPatientList] = useState(patients || []);

    return (
        <>
            <Head>
                <title>Painel - Prontuario Cepsi</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Pacientes</h1>
                        <Link href='/registerPac'>
                            <button className={styles.buttonAdd}>
                                Adicionar
                            </button>
                        </Link>
                    </div>

                    <table className={styles.listOrders}>
                        <thead >
                            <tr className={styles.listHeader}>
                                <th>Nome do Paciente</th>
                                <th>Ultima Visita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientList.map(item => (
                                <tr key={item.id} onClick={ () => handleOpenViewPac(item.id)} className={styles.orderItem}>
                                        <td>{item.name}</td>
                                        <td>{dateConvert(item)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get(`/user/patient`);

    return {
        props: {
            patients: response.data
        }
    }
})