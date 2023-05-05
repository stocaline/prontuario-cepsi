import { useState } from 'react'
import styles from './styles.module.scss';
import Link from 'next/link';
import { canSSRAuth } from '../../utils/canSSRAuth';
import DropdownAvatarMenu from '../ui/DropdownAvatarMenu';
import { BsFillGrid1X2Fill, BsFillPeopleFill, BsFillFileEarmarkFill, BsCalendarDateFill } from 'react-icons/bs';
import { FiChevronsLeft } from 'react-icons/fi';

export function Header() {

    const [active, setActive] = useState(false)


    const toggleMenu = () => {
        setActive(!active)
    }

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.headerContent}>
                    <Link href={'/dashboard'}>
                        <button className={styles.backBtn}>
                            <FiChevronsLeft size={30} />
                        </button>
                    </Link>

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