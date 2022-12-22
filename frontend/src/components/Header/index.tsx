import { useContext } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { canSSRAuth } from '../../utils/canSSRAuth';

import { FiLogOut } from 'react-icons/fi';

import { AuthContext } from '../../contexts/AuthContext'

export function Header() {

    const { signOut, user } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <Image src="/logoCesusc.png" alt='' width={130} height={130} />
                </Link>
                <div className={styles.userContent}>
                    <Image src="/fotoUsuario.png" alt="" width={70} height={70}/>
                    <h1>{user?.name}</h1>
                </div>
                <nav className={styles.menuNav}>
                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24} />
                    </button>
                </nav>

            </div>
        </header>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return{
        props:{}
    }
})