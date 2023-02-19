import { useState, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'
import { canSSRAuth } from '../../utils/canSSRAuth';
import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api';
import Link from 'next/link';
import { FiChevronsLeft } from 'react-icons/fi';
import Router from 'next/router';
import { parseCookies } from 'nookies';

interface IdPatient {
    id: string
}

export default function RegisterInsertion({ id }: IdPatient) {

    const [patientId, setPatientId] = useState(id);

    const [type, setType] = useState('Por Renda');
    const [forwardingAgency, setForwardingAgency] = useState('');
    const [forwardingProfessional, setForwardingProfessional] = useState('');
    const [phone, setPhone] = useState('');
    const [reason, setReason] = useState('');
    const [lookedForAnotherService, setLookedForAnotherService] = useState(false);
    const [nameAnotherService, setNameAnotherService] = useState('');
    const [lenghtOfStayInMouths, setLenghtOfStayInMouths] = useState('');

    function handleChangeType(event: any) {
        setType(event.target.value)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        let message: string = ''
        try {
            if (type === '') {
                message = message + " Tipo "
            }

            if (lookedForAnotherService) {
                if (nameAnotherService === '' || lenghtOfStayInMouths === '' ) {
                    message = message + "  Dados do outro serviço "
                }
            }

            if (message !== '') {
                toast.error('Preencha os campos: ' + message);
                return;
            }

            const apiClient = setupAPIClient();
            const response = await apiClient.post(`/patient/insertion/${patientId}`, {
                type: type,
                forwarding_agency: forwardingAgency,
                forwarding_professional: forwardingProfessional,
                phone: phone,
                reason: reason,
                looked_for_another_service: lookedForAnotherService,
                name_another_service: nameAnotherService,
                lenght_of_stay_in_mouths: lenghtOfStayInMouths
            });

            toast.success("Inserção Cepsi Cadastrado!");
            Router.push('/viewPat');

        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar!")
        }
    }

    return (
        <>
            <Head>
                <title>Novo Paciente - Prontuario Cepsi</title>
            </Head>
            <div>
                <Header />

                <main className={styles.container}>
                    <div className={styles.containerHeader}>
                        <h1>Inserção CEPSI</h1>
                        <Link href={'/viewPat'}>
                            <button>
                                <FiChevronsLeft size={30} />
                            </button>
                        </Link>
                    </div>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <label>Tipo:</label>
                        <select value={type} onChange={handleChangeType}>
                            <option selected>
                                Por Renda
                            </option>
                            <option>
                                Por encaminhamento interno (NAPSI CESUSC, NAP CESUSC, Cruz e Souza)
                            </option>
                            <option>
                                Por encaminhamento externo (Instituições de educação, saúde, assistência, etc)
                            </option>
                        </select>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={forwardingAgency}
                                onChange={(e) => setForwardingAgency(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Agencia encaminhadora:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={forwardingProfessional}
                                onChange={(e) => setForwardingProfessional(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Profissional encaminhador:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Telefone:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Motivo:
                            </label>
                        </div>

                        <div className={styles.checkbox}>
                                <label >
                                    Procurou por outro serviço?
                                </label>
                                <input type="checkbox" checked={lookedForAnotherService} onChange={(e) => setLookedForAnotherService(!lookedForAnotherService)} />
                            </div>

                        <div className={lookedForAnotherService ? styles.dualComponentOpen : styles.dualComponentClose}>
                            <div className={styles.formComponent}>
                                <input
                                    type="text"
                                    placeholder=' '
                                    className={styles.input}
                                    value={nameAnotherService}
                                    onChange={(e) => setNameAnotherService(e.target.value)}
                                />
                                <label className={styles.placeholder}>
                                    Nome do outro serviço:
                                </label>

                            </div>
                            <div className={styles.formComponent}>
                                <input
                                    type="text"
                                    placeholder=' '
                                    className={styles.input}
                                    value={lenghtOfStayInMouths}
                                    onChange={(e) => setLenghtOfStayInMouths(e.target.value)}
                                />
                                <label className={styles.placeholder}>
                                    Tempo (em meses):
                                </label>
                            </div>

                        </div>



                        <button className={styles.buttonAdd} type='submit'>
                            Cadastrar
                        </button>

                    </form>
                </main>

            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const cookies = parseCookies(ctx);
    const id = cookies['@nextpac.id'];

    return {
        props: {
            id: id
        }
    }
})