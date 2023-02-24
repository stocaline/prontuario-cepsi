import { useState, useContext, useEffect } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth';
import Head from 'next/head';
import Link from 'next/link';
import styles from './styles.module.scss'
import { setupAPIClient } from '../../services/api'

import { FiLogOut, FiUser, FiUserPlus, FiSmile } from 'react-icons/fi'
import { AuthContext } from '../../contexts/AuthContext';
import { ModalEditUser } from '../../components/ModalEditUser';

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
    const { signOut } = useContext(AuthContext)

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
                        <div className={styles.contentTop}>
                            <div className={styles.card}>
                                <div className={styles.cardContent}>
                                    <div className={styles.cardText}>
                                        <h4>{userInfo.name}</h4>
                                        <p>{userInfo.email}</p>
                                        <p><strong>Matricula:</strong> {userInfo.registration}</p>
                                    </div>
                                    <div className={styles.circle} style={{ backgroundColor: "rgb(220, 20, 60)" }}>
                                        <FiUser size={40} color="#fff" />
                                    </div>
                                </div>
                                <div className={styles.userButtons}>
                                    <button className={styles.buttonSingOut} onClick={signOut}>
                                        <p>Sair</p>
                                        <FiLogOut color="#000" size={24} />
                                    </button>
                                    <ModalEditUser
                                        user={userInfo}
                                    />
                                </div>
                            </div>

                            <div className={styles.card}>
                                <Link href={'/patients'}>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardText}>
                                            <h4>Paciente cadastrados</h4>
                                            <h2>Total: 23</h2>
                                        </div>
                                        <div className={styles.circle} style={{ backgroundColor: "rgb(56, 190, 74)" }}>
                                            <FiUserPlus color='#fff' size={35} />
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            <div className={styles.card}>
                                <Link href={'/patients'}>
                                    <div className={styles.cardContent}>
                                        <div className={styles.cardText}>
                                            <h4>Ultimo Paciente cadastrado</h4>
                                            <h2>Alison Ferreira</h2>
                                        </div>
                                        <div className={styles.circle} style={{ backgroundColor: "rgb(43, 114, 247)" }}>
                                            <FiSmile color='#fff' size={35} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.supersCard}>
                            <div className={styles.scheduleContainer}>
                                <p>EM CONSTRUÇÃO: CALENDARIO</p>
                            </div>

                            <div className={styles.clockContainer}>
                                <p>EM CONSTRUÇÃO: RELÓGIO</p>
                            </div>

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