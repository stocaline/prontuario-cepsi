import Modal from 'react-modal';
import styles from './styles.module.scss';
import { useState, FormEvent } from 'react'
import { FiX } from 'react-icons/fi';

import { PatientsProps } from '../../pages/viewPat'

import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api';
import moment from 'moment';
import Router from 'next/router';
import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

interface ModalPacProps {
    isOpen: boolean,
    onRequestClose: () => void;
    pac: PatientsProps;
}

export function ModalEditPac({ isOpen, onRequestClose, pac }: ModalPacProps) {

    const customStyles = {
        content: {
            top: '45%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            marginTop: '50px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff'
        }
    }

    const [accordionOpen, setAccorrdioOpen] = useState(1)

    const [patientid, setPatientId] = useState(pac.id);
    const [name, setName] = useState(pac.name);
    const [socialName, setSocialName] = useState(pac.social_name);
    const [birthDate, setBirthDate] = useState(pac.birthDate);
    const [schooling, setSchooling] = useState(pac.schooling);
    const [gender, setGender] = useState(pac.gender);
    const [rg, setRg] = useState(pac.rg);
    const [cpf, setCpf] = useState(pac.cpf);
    const [status, setStatus] = useState(pac.status);
    const [phone, setPhone] = useState(pac.phone);
    const [email, setEmail] = useState(pac.email);
    const [familyIncome, setFamilyIncome] = useState(pac.family_income);
    const [career, setCareer] = useState(pac.career);
    const [workplace, setWorkplace] = useState(pac.workplace);

    const [minor, setMinor] = useState(pac.minor);
    const [accountable, setAccountable] = useState(pac.accountable);
    const [accountableName, setAccountableName] = useState(accountable.name)
    const [accountableKindship, setAccountableKindship] = useState(accountable.kindship)
    const [accountableRg, setAccountableRg] = useState(accountable.rgAccountable)
    const [accountableCpf, setAccountableCpf] = useState(accountable.cpfAccountable)


    const [cep, setCep] = useState(pac.address.cep);
    const [city, setCity] = useState(pac.address.city);
    const [state, setState] = useState(pac.address.state);
    const [district, setDistrict] = useState(pac.address.district);
    const [street, setStreet] = useState(pac.address.street);
    const [number, setNumber] = useState(pac.address.number);


    function dateConvert(date: string) {
        let newDate = moment.utc(date).format('YYYY-MM-DD');
        return newDate;
    }


    function handleChangeSchooling(event: any) {
        setSchooling(event.target.value)
    }

    function handleChangeStatus(event: any) {
        setStatus(event.target.value)
    }

    async function handleEditPac(event: FormEvent) {
        event.preventDefault();

        try {

            if (name === '' || birthDate === null || schooling === '' || rg === null || cpf === null || phone === null || career === '' || status === '' || workplace === '' || familyIncome === null || email === '') {
                toast.error("Preencha todos os campos");
                return;
            }

            const dateConvertUTC = dayjs(birthDate).utc().format()
            const apiClient = setupAPIClient();
            await apiClient.put(`/patient/${patientid}`, {
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
                accountableName: accountableName,
                kindship: accountableKindship,
                rgAccountable: accountableRg,
                cpfAccountable: accountableCpf,
                cep: cep,
                city: city,
                state: state,
                district: district,
                street: street,
                number: number
            });

            toast.success("Paciente Alterado!");
            Router.reload();

        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao editar!")
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}
        >

            <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border: 0 }}
            >
                <FiX size={45} color="#f34748" />
            </button>

            <div className={styles.container}>


                <form className={styles.form} onSubmit={handleEditPac}>
                    <h2>Dados do Paciente:</h2>
                    <div className={styles.conteiner}>
                        <div className={accordionOpen == 1 ? styles.contentOpen : styles.contentClose} onClick={() => setAccorrdioOpen(1)}>
                            <p>Identificação</p>
                            <div >
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Nome: </label>
                                        <input
                                            type="text"
                                            defaultValue={name}
                                            className={styles.input}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.checkbox}>
                                        <label >
                                            Nome Social:
                                        </label>
                                        <input type="checkbox" checked={socialName} onChange={(e) => setSocialName(!socialName)} />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Data de Nascimento: </label>
                                        <input
                                            type="date"
                                            placeholder={birthDate}
                                            className={styles.input}
                                            value={dateConvert(birthDate)}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContentSelect}>
                                        <label> Escolaridade: </label>
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
                                    </div>
                                    <div className={styles.formContainerContentSelect}>
                                        <label> Estado Civil: </label>
                                        <select value={status} onChange={handleChangeStatus}>
                                            <option>
                                                Solteiro
                                            </option>
                                            <option>
                                                Casado
                                            </option>
                                            <option>
                                                Viuvo
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> RG: </label>
                                        <input
                                            type="number"
                                            defaultValue={rg}
                                            className={styles.input}
                                            value={rg}
                                            onChange={(e) => setRg(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> CPF: </label>
                                        <input
                                            type="number"
                                            defaultValue={cpf}
                                            className={styles.input}
                                            value={cpf}
                                            onChange={(e) => setCpf(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Telefone: </label>
                                        <input
                                            type="number"
                                            defaultValue={phone}
                                            className={styles.input}
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Gênero: </label>
                                        <input
                                            type="text"
                                            defaultValue={gender}
                                            className={styles.input}
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Profissão: </label>
                                        <input
                                            type="text"
                                            defaultValue={career}
                                            className={styles.input}
                                            value={career}
                                            onChange={(e) => setCareer(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Local de Trabalho: </label>
                                        <input
                                            type="text"
                                            defaultValue={workplace}
                                            className={styles.input}
                                            value={workplace}
                                            onChange={(e) => setWorkplace(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Renda Familiar: </label>
                                        <input
                                            type="number"
                                            defaultValue={familyIncome}
                                            className={styles.input}
                                            value={familyIncome}
                                            onChange={(e) => setFamilyIncome(e.target.valueAsNumber)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Email: </label>
                                        <input
                                            type="text"
                                            defaultValue={email}
                                            className={styles.input}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={accordionOpen == 2 ? styles.contentOpen : styles.contentClose} onClick={() => setAccorrdioOpen(2)}>
                            <p>Endereço</p>
                            <div >
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> CEP: </label>
                                        <input
                                            type="number"
                                            defaultValue={cep}
                                            className={styles.input}
                                            value={cep}
                                            onChange={(e) => setCep(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Cidade: </label>
                                        <input
                                            type="text"
                                            placeholder={city}
                                            className={styles.input}
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Estado: </label>
                                        <input
                                            type="text"
                                            defaultValue={state}
                                            className={styles.input}
                                            value={state}
                                            onChange={(e) => setState(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> bairro: </label>
                                        <input
                                            type="text"
                                            placeholder={district}
                                            className={styles.input}
                                            value={district}
                                            onChange={(e) => setDistrict(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className={styles.formContainer}>
                                    <div className={styles.formContainerContent}>
                                        <label> Rua: </label>
                                        <input
                                            type="text"
                                            defaultValue={street}
                                            className={styles.input}
                                            value={street}
                                            onChange={(e) => setStreet(e.target.value)}
                                        />
                                    </div>
                                    <div className={styles.formContainerContent}>
                                        <label> Número: </label>
                                        <input
                                            type="number"
                                            placeholder={number}
                                            className={styles.input}
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {minor ?
                            <div className={accordionOpen == 3 ? styles.contentOpen : styles.contentClose} onClick={() => setAccorrdioOpen(3)}>
                                <p>Resposável</p>
                                <div >
                                    <div className={styles.formContainer}>
                                        <div className={styles.formContainerContent}>
                                            <label> Nome: </label>
                                            <input
                                                type="text"
                                                defaultValue={accountableName}
                                                className={styles.input}
                                                value={accountableName}
                                                onChange={(e) => setAccountableName(e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.formContainerContent}>
                                            <label> Parentesco: </label>
                                            <input
                                                type="text"
                                                placeholder={accountableKindship}
                                                className={styles.input}
                                                value={accountableKindship}
                                                onChange={(e) => setAccountableKindship(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formContainer}>
                                        <div className={styles.formContainerContent}>
                                            <label> RG: </label>
                                            <input
                                                type="number"
                                                defaultValue={accountableRg}
                                                className={styles.input}
                                                value={accountableRg}
                                                onChange={(e) => setAccountableRg(e.target.value)}
                                            />
                                        </div>
                                        <div className={styles.formContainerContent}>
                                            <label> CPF: </label>
                                            <input
                                                type="number"
                                                placeholder={accountableCpf}
                                                className={styles.input}
                                                value={accountableCpf}
                                                onChange={(e) => setAccountableCpf(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div></div>
                        }
                    </div>


                    <button className={styles.buttonAdd} type='submit'>
                        Salvar
                    </button>
                </form>

            </div >

        </Modal >
    )
}