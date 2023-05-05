import { useState } from 'react'
import Link from 'next/link';
import styles from './styles.module.scss'
import Router from 'next/router';
import { setCookie } from 'nookies';

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
    Router.push('/viewPat');
}

export function Patients({ patients }: HomeProps) {
    const [patientList, setPatientList] = useState(patients || []);

    return (
        <>
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Pacientes</h1>
                    <Link href='/registerPat'>
                        <button className={styles.buttonAdd}>
                            Adicionar
                        </button>
                    </Link>
                </div>

                {patientList.length > 0 ?
                    <table className={styles.listOrders}>
                        <thead >
                            <tr className={styles.listHeader}>
                                <th>Nome do Paciente</th>
                                <th>Ultima Visita</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patientList.map(item => (
                                <tr key={item.id} onClick={() => handleOpenViewPac(item.id)} className={styles.orderItem}>
                                    <td>{item.name}</td>
                                    <td>{dateConvert(item)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    : <div className={styles.patientListEmpty}>
                        <p>Você ainda não possui pacientes cadastrados!</p>
                    </div>
                }
            </main>
        </>
    )
}