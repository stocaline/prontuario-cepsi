import { useState } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import { canSSRAuth } from '../../utils/canSSRAuth';
import DropdownAvatarMenu from '../ui/DropdownAvatarMenu';
import { BsFillGrid1X2Fill, BsFillPeopleFill, BsFillFileEarmarkFill, BsCalendarDateFill } from 'react-icons/bs';

export function Header() {

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
                                            <BsFillGrid1X2Fill/>
                                            Dashboard
                                        </li>
                                    </Link>
                                    <Link href="/patients">
                                        <li>
                                            <BsFillPeopleFill/>
                                            Pacientes
                                        </li>
                                    </Link>
                                    <li>
                                        <BsFillFileEarmarkFill/>
                                        Documentos
                                    </li>
                                    <li>
                                        <BsCalendarDateFill/>
                                        Agenda
                                    </li>
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
        props: {
        }
    }
})