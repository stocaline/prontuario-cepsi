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
    const [schooling, setSchooling] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [district, setDistrict] = useState('');
    const [phone, setPhone] = useState('');
    const [career, setCareer] = useState('');
    const [status, setStatus] = useState('');
    const [workplace, setWorkplace] = useState('');
    const [familyIncome, setFamilyIncome] = useState('');
    const [email, setEmail] = useState('');

    const [minor, setMinor] = useState('');
    const [accountable, setAccountable] = useState('');
    const [kindship, setKindship] = useState('');
    const [rgAccountable, setRgAccountable] = useState('');
    const [cpfAccountable, seCpfAccountable] = useState('');

    const [idOwner, seIdOwner] = useState(id);



    function handleChangeSchooling(event: any) {
        setSchooling(event.target.value)
    }

    function handleChangeStatus(event: any) {
        setStatus(event.target.value)

    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();

        try {

            if (name === '' || date === '' || schooling === '' || rg === '' || cpf === '' || district === '' || phone === '' || career === '' || status === '' || workplace === '' || familyIncome === '' || email === '') {
                toast.error("Preencha todos os campos");
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post("/pac/register", {
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
                //-------------------ALTERAR--------------------------
                menorIdade: false,
                nomeResp: "",
                parentesco: "",
                rgResp: null,
                cpfResp: null
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
                        <Link href={'/dashboard'}>
                            <button>
                                <FiChevronsLeft size={30} />
                            </button>
                        </Link>
                    </div>
                    <form className={styles.form} onSubmit={handleRegister}>
                        <input
                            type="text"
                            placeholder='Digite o nome do paciente'
                            className={styles.input}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input
                            type="date"
                            placeholder='Digite o nome do paciente'
                            className={styles.input}
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <select value={schooling} onChange={handleChangeSchooling}>
                            <option>
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

                        <input
                            type="number"
                            placeholder='Digite o RG do paciente'
                            className={styles.input}
                            value={rg}
                            onChange={(e) => setRg(e.target.value)}

                        />

                        <input
                            type="number"
                            placeholder='Digite o CPF do paciente'
                            className={styles.input}
                            value={cpf}
                            onChange={(e) => setCpf(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Digite o bairro do paciente'
                            className={styles.input}
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder='Digite o telefone do paciente'
                            className={styles.input}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Digite a profissão do paciente'
                            className={styles.input}
                            value={career}
                            onChange={(e) => setCareer(e.target.value)}
                        />

                        <select value={status} onChange={handleChangeStatus}>
                            <option>
                                Solteiro
                            </option>
                            <option>
                                Casado
                            </option>
                        </select>

                        <input
                            type="text"
                            placeholder='Digite o Local de trabalho do paciente'
                            className={styles.input}
                            value={workplace}
                            onChange={(e) => setWorkplace(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder='Digite a renda familiar do paciente'
                            className={styles.input}
                            value={familyIncome}
                            onChange={(e) => setFamilyIncome(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder='Digite o email do paciente'
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

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