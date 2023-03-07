import { useState } from 'react'
import styles from './styles.module.scss';
import { canSSRAuth } from '../../utils/canSSRAuth';

export function Menssages() {

    const [menssages, setMenssages] = useState([])

    return (
        <div className={styles.conteiner}>
            <div className={styles.conteinerHeader}>
                <h2>Notificações</h2>
            </div>
            {menssages.length != 0 ?
                    <div className={styles.conteinerMenssages}>
                        <div className={styles.content}>
                            <p>sem notificações</p>
                        </div>
                    </div>
                    : 
                    <div className={styles.conteinerMenssagesIsEmpty}>
                        <p>SEM NOTIFICAÇÔES</p>
                    </div>
            }
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
        props: {
        }
    }
})