import { useContext, useState } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../../contexts/AuthContext'
import DropdownAvatarMenu from '../ui/DropdownAvatarMenu';

export function Header() {

    const { signOut, user } = useContext(AuthContext)

    const [active, setActive] = useState(false)

    const toggleMenu = () => {
        setActive(!active)
    }

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <label htmlFor="burger" className={styles.burger} >
                        <input id="burger" type="checkbox" onClick={toggleMenu} />
                        <span></span>
                        <span></span>
                        <span></span>
                    </label>

                    <div className={active ? styles.slideMenuOpen : styles.slideMenuClose}>
                        <div className={active ? styles.menuOpen : styles.menuClose}>
                            <div className={styles.list}>
                                <ul className={styles.listItens}>
                                    <Link href="/dashboard">
                                        <li>
                                            Dashboard
                                        </li>
                                    </Link>
                                    <Link href="/patients">
                                        <li>
                                            Pacientes
                                        </li>
                                    </Link>
                                    <li>Documentos</li>
                                    <li>Agenda</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <nav className={styles.menuNav}>
                        <DropdownAvatarMenu />
                    </nav>

                </div>
            </header>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {}
    }
})