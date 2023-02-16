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

import { FiUser } from 'react-icons/fi'

type UserProps = {
    id: string
    name: string
    email: string
    registration: string
    patients: []
}

interface data{
    user: UserProps
}

export default function Dashboard(data: data) {

    const [userInfo, setUserInfo] = useState(data.user || "")

    return (
        <>
            <Head>
                <title>Painel - Prontuario Cepsi</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <h1>Dashboard</h1>
                    <div className={styles.content}>
                        <div className={styles.card}>
                            <div className={styles.userConteiner}>
                                <div className={styles.circleUser}>
                                    <FiUser size={50} />
                                </div>
                                <div className={styles.userInfo}>
                                    <h3>{userInfo.name}</h3>
                                    <p><strong>Matricula:</strong> {userInfo.registration}</p>
                                    <p><strong>email:</strong> {userInfo.email}</p>
                                </div>
                            </div>
                        </div>
                        <Link href={'/patients'}>
                            <div className={styles.card}>
                                <h2>Pacientes</h2>
                                <p></p>
                            </div>
                        </Link>
                        <div className={styles.card}>
                            <h2>Agenda</h2>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get(`/user/info`);

    return {
        props: {
            user: response.data
        }
    }
})