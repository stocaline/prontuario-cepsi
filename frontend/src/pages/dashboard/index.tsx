import { useState, useEffect } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import Link from 'next/link';
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies';

type PacProps = {
    id: string,
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

interface HomeProps {
    pacs: PacProps[];
}

function dateConvert({ ultima_visita }: PacProps) {
    var data = new Date(ultima_visita);
    var dataFormatada = data.toLocaleDateString('pt-BR', {
        timeZone: 'UTC'
    });
    return dataFormatada;
}

export function handleOpenViewPac(id: string) {
    setCookie(undefined, '@nextpac.id', id);
    Router.push('/viewPac');
}

export default function Dashboard({ pacs }: HomeProps) {

    const [pacList, setPacList] = useState(pacs || []);

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
                            {pacList.map(item => (
                                <tr key={item.id} onClick={ () => handleOpenViewPac(item.id)} className={styles.orderItem}>
                                        <td>{item.nome}</td>
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

    const cookies = parseCookies(ctx);
    const id = cookies['@nextuser.id'];

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get(`/user/pacs/${id}`);

    return {
        props: {
            pacs: response.data
        }
    }
})