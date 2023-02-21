import { useState, useContext, useEffect } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import Link from 'next/link';
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'
import Router from 'next/router';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import { json } from 'stream/consumers';

import { FiLogOut, FiUser } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';

type UserProps = {
    id: string
    name: string
    email: string
    registration: string
    patients: []
}

interface data {
    user: UserProps
}

export default function Dashboard(data: data) {

    const [userInfo, setUserInfo] = useState(data.user || "")
    const { signOut} = useContext(AuthContext)
    
    return (
        <>
            <Head>
                <title>Painel - Prontuario Cepsi</title>
            </Head>
            <div>
                <main className={styles.container}>
                    <div className={styles.headerConteiner}>
                        <div className={styles.header}>
                            <h1>Dashboard</h1>
                        </div>
                    </div>
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
                                    <button className={styles.buttonSingOut} onClick={signOut}>
                                        <p>Sair</p>
                                        <FiLogOut color="#000" size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={styles.card}>
                            <Link href={'/patients'}>
                                <h2>Pacientes</h2>
                                <p></p>
                            </Link>
                        </div>
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