import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import styles from './styles.module.scss';
import { Header } from '../../components/Header'

import { canSSRAuth } from '../../utils/canSSRAuth';

import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api';
import Router from 'next/router';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { FiChevronsLeft } from 'react-icons/fi';

interface IdOwner {
    id: string
}

export default function RegisterPac({ id }: IdOwner) {

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [schooling, setSchooling] = useState('Ensino Fundamental Incompleto');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [district, setDistrict] = useState('');
    const [phone, setPhone] = useState('');
    const [career, setCareer] = useState('');
    const [status, setStatus] = useState('Solteiro');
    const [workplace, setWorkplace] = useState('');
    const [familyIncome, setFamilyIncome] = useState('');
    const [email, setEmail] = useState('');

    const [minor, setMinor] = useState(false);
    const [accountable, setAccountable] = useState('');
    const [kindship, setKindship] = useState('');
    const [rgAccountable, setRgAccountable] = useState('');
    const [cpfAccountable, setCpfAccountable] = useState('');

    const [idOwner, seIdOwner] = useState(id);

    function verifyIfMinor(date: string) {
        setDate(date)

        let birthDate = new Date(date)
        var today = new Date();


        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age > 17) {
            setMinor(false)
        } else {
            setMinor(true)
        }
    }

    function handleChangeSchooling(event: any) {
        setSchooling(event.target.value)
    }

    function handleChangeStatus(event: any) {
        setStatus(event.target.value)

    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        let message: string = ''
        try {
            if (name === '') {
                message = message + " nome "
            }
            if (date === '') {
                message = message + " data de nascimento "
            }
            if (phone === '') {
                message = message + "  Telefone "
            }
            if (email === '') {
                message = message + "  Email "
            }
            if (minor) {
                if(accountable === '' || kindship === '' || rgAccountable === null ||cpfAccountable === null) {
                message = message + "  Dados do Responsáveis "
                }
            }
                
            if (message !== '') {
                toast.error('Preencha os campos: ' + message);
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post("/patient", {
                nome: name,
                dataNascimento: date,
                escolaridade: schooling,
                rg: rg,
                cpf: cpf,
                bairro: district,
                telefone: phone,
                profissao: career,
                estadoCivil: status,
                localTrabalho: workplace,
                rendaFamiliar: familyIncome,
                email: email,

                id_dono: idOwner,

                menorIdade: minor,
                nomeResp: accountable,
                parentesco: kindship,
                rgResp: rgAccountable,
                cpfResp: cpfAccountable
            });

            toast.success("Paciente Cadastrado!");
            Router.push('/dashboard');

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
                        <h1>Novo paciente</h1>
                        <Link href={'/patients'}>
                            <button>
                                <FiChevronsLeft size={30} />
                            </button>
                        </Link>
                    </div>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Nome:
                            </label>
                        </div>
                        <div className={styles.formComponent}>
                            <input
                                type="date"
                                className={styles.input}
                                value={date}
                                onChange={(e) => verifyIfMinor(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Data de Nascimento:
                            </label>
                        </div>

                        <select value={schooling} onChange={handleChangeSchooling}>
                            <option selected>
                                Ensino Fundamental Incompleto
                            </option>
                            <option>
                                Ensino Fundamental Completo
                            </option>
                            <option>
                                Ensino Médio Incompleto
                            </option>
                            <option>
                                Ensino Médio Completo
                            </option>
                            <option>
                                Ensino Superior Incompleto
                            </option>
                            <option>
                                Ensino Superior Completo
                            </option>
                        </select>

                        <div className={styles.formComponent}>
                            <input
                                type="number"
                                placeholder=' '
                                className={styles.input}
                                onChange={(e) => setRg(e.target.value)}

                            />
                            <label className={styles.placeholder}>
                                RG:
                            </label>
                        </div>
                        <div className={styles.formComponent}>
                            <input
                                type="number"
                                placeholder=' '
                                className={styles.input}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                CPF:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Bairro:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="number"
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
                                value={career}
                                onChange={(e) => setCareer(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Profissão:
                            </label>
                        </div>

                        <select value={status} onChange={handleChangeStatus}>
                            <option selected>
                                Solteiro
                            </option>
                            <option>
                                Casado
                            </option>
                            <option>
                                Viuvo
                            </option>
                            <option>
                                Divorciado
                            </option>
                        </select>

                        <div className={styles.formComponent}>
                            <input
                                type="text"
                                placeholder=' '
                                className={styles.input}
                                value={workplace}
                                onChange={(e) => setWorkplace(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Local de Trabalho:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="number"
                                placeholder=' '
                                className={styles.input}
                                onChange={(e) => setFamilyIncome(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Renda Familiar:
                            </label>
                        </div>

                        <div className={styles.formComponent}>
                            <input
                                type="Email"
                                placeholder=' '
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <label className={styles.placeholder}>
                                Email:
                            </label>
                        </div>


                        {minor &&
                            <div className={styles.accountableContainer}>
                                <h2>Dados do Responsável</h2>

                                <div className={styles.formComponent}>
                                    <input
                                        type="text"
                                        placeholder=' '
                                        className={styles.input}
                                        value={accountable}
                                        onChange={(e) => setAccountable(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        Nome do responsável:
                                    </label>
                                </div>
                                <div className={styles.formComponent}>
                                    <input
                                        type="text"
                                        placeholder=' '
                                        className={styles.input}
                                        value={kindship}
                                        onChange={(e) => setKindship(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        Parentesco:
                                    </label>
                                </div>
                                <div className={styles.formComponent}>
                                    <input
                                        type="number"
                                        placeholder=' '
                                        className={styles.input}
                                        onChange={(e) => setRgAccountable(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        RG do responsável:
                                    </label>
                                </div>
                                <div className={styles.formComponent}>
                                    <input
                                        type="number"
                                        placeholder=' '
                                        className={styles.input}
                                        onChange={(e) => setCpfAccountable(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        CPF do Resposável:
                                    </label>
                                </div>
                            </div>
                        }

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
    const id = cookies['@nextuser.id'];

    return {
        props: {
            id: id
        }
    }
})