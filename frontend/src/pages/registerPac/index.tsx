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
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export default function RegisterPac() {

    const [name, setName] = useState('');
    const [socialName, setSocialName] = useState(false);
    const [birthDate, setBirthDate] = useState("0000-00-00T00:00:00.000Z");
    const [schooling, setSchooling] = useState('Ensino Fundamental Incompleto');
    const [gender, setGender] = useState('');
    const [rg, setRg] = useState('');
    const [cpf, setCpf] = useState('');
    const [status, setStatus] = useState('Solteiro');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [familyIncome, setFamilyIncome] = useState(0);
    const [career, setCareer] = useState('');
    const [workplace, setWorkplace] = useState('');

    const [minor, setMinor] = useState(false);
    const [accountable, setAccountable] = useState('');
    const [kindship, setKindship] = useState('');
    const [rgAccountable, setRgAccountable] = useState('');
    const [cpfAccountable, setCpfAccountable] = useState('');

    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [district, setDistrict] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');

    const [menuAdress, setMenuAdress] = useState(false)


    function verifyIfMinor(date: string) {

        setBirthDate(date)

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

    function handleAdressMenu() {
        setMenuAdress(!menuAdress)
    }

    async function handleRegister(event: FormEvent) {
        event.preventDefault();
        let message: string = ''
        try {
            if (name === '') {
                message = message + " nome "
            }
            if (birthDate === '') {
                message = message + " data de nascimento "
            }
            if (phone === '') {
                message = message + "  Telefone "
            }
            if (email === '') {
                message = message + "  Email "
            }
            if (rg === '' && cpf === '') {
                message = message + "  RG ou CPF "
            }
            if (minor) {
                if (accountable === '' || kindship === '' || rgAccountable === null || cpfAccountable === null) {
                    message = message + "  Dados do Responsáveis "
                }
            }

            if (message !== '') {
                toast.error('Preencha os campos: ' + message);
                return;
            }

            const dateConvertUTC = dayjs(birthDate).utc().format()
            setBirthDate(dateConvertUTC)

            const apiClient = setupAPIClient();
            const response = await apiClient.post("/patient", {
                name: name,
                social_name: socialName,
                birthDate: dateConvertUTC,
                schooling: schooling,
                gender: gender,
                rg: rg,
                cpf: cpf,
                status: status,
                phone: phone,
                email: email,
                family_income: familyIncome,
                career: career,
                workplace: workplace,
                minor: minor,
                accountableName: accountable,
                kindship: kindship,
                rgAccountable: rgAccountable,
                cpfAccountable: cpfAccountable,
                cep: cep,
                city: city,
                state: state,
                district: district,
                street: street,
                number: number
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

                        <div className={styles.dualComponent}>
                            <div className={styles.formComponent}>
                                <input
                                    type="text"
                                    placeholder=' '
                                    className={styles.input}
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                />
                                <label className={styles.placeholder}>
                                    Gênero:
                                </label>

                            </div>
                            <div className={styles.checkbox}>
                                <label >
                                    Nome Social:
                                </label>
                                <input type="checkbox" checked={socialName} onChange={(e) => setSocialName(!socialName)} />
                            </div>
                        </div>


                        <div className={styles.formComponent}>
                            <input
                                type="date"
                                className={styles.input}
                                value={birthDate}
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
                                onChange={(e) => setFamilyIncome(e.target.valueAsNumber)}
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

                        <div className={menuAdress ? styles.adressConteinerClose : styles.adressConteinerOpen}>
                            <div onClick={handleAdressMenu} className={styles.menuAdress}>
                                <h2>Endereço</h2>
                                <div>
                                    <label className={styles.containerHamburguer}>
                                        <div className={styles.checkmark}>
                                            <span></span>
                                            <span></span>
                                            <span></span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                            <div className={styles.adressContent}>
                                <div className={styles.formComponent}>
                                    <input
                                        type="number"
                                        placeholder=' '
                                        className={styles.input}
                                        value={cep}
                                        onChange={(e) => setCep(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        CEP:
                                    </label>
                                </div>
                                <div className={styles.formComponent}>
                                    <input
                                        type="text"
                                        placeholder=' '
                                        className={styles.input}
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        Cidade:
                                    </label>
                                </div>
                                <div className={styles.formComponent}>
                                    <input
                                        type="text"
                                        placeholder=' '
                                        className={styles.input}
                                        value={state}
                                        onChange={(e) => setState(e.target.value)}
                                    />
                                    <label className={styles.placeholder}>
                                        Estado:
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

                                <div className={styles.dualComponent}>
                                    <div className={styles.formComponent}>
                                        <input
                                            type="text"
                                            placeholder=' '
                                            className={styles.input}
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                        <label className={styles.placeholder}>
                                            Rua:
                                        </label>
                                    </div>
                                    <div className={styles.formComponent}>
                                        <input
                                            type="number"
                                            placeholder=' '
                                            className={styles.input}
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                        <label className={styles.placeholder}>
                                            Numero:
                                        </label>
                                    </div>
                                </div>
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


    return {
        props: {

        }
    }
})