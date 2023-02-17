import Modal from 'react-modal';
import styles from './styles.module.scss';
import { useState, FormEvent } from 'react'
import { FiX } from 'react-icons/fi';

import { PacProps } from '../../pages/viewPat'

import { toast } from 'react-toastify'
import { setupAPIClient } from '../../services/api';
import moment from 'moment';
import Router from 'next/router';

interface ModalPacProps {
    isOpen: boolean,
    onRequestClose: () => void;
    pac: PacProps[];
}

export function ModalEditPac({ isOpen, onRequestClose, pac }: ModalPacProps) {

    const customStyles = {
        content: {
            top: '50%',
            bottom: 'auto',
            left: '50%',
            right: 'auto',
            padding: '30px',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#ffffff'
        }
    }

    const [id, setId] = useState(pac[0].id)
    const [name, setName] = useState(pac[0].nome);
    const [date, setDate] = useState(dateConvert(pac[0].data_nascimento));
    const [schooling, setSchooling] = useState(pac[0].escolaridade);
    const [rg, setRg] = useState(pac[0].rg);
    const [cpf, setCpf] = useState(pac[0].cpf);
    const [district, setDistrict] = useState(pac[0].bairro);
    const [phone, setPhone] = useState(pac[0].telefone);
    const [career, setCareer] = useState(pac[0].profissao);
    const [status, setStatus] = useState(pac[0].estado_civil);
    const [workplace, setWorkplace] = useState(pac[0].local_trabalho);
    const [familyIncome, setFamilyIncome] = useState(pac[0].renda_familiar);
    const [email, setEmail] = useState(pac[0].email);

    const [minor, setMinor] = useState('');
    const [accountable, setAccountable] = useState('');
    const [kindship, setKindship] = useState('');
    const [rgAccountable, setRgAccountable] = useState('');
    const [cpfAccountable, seCpfAccountable] = useState('');

    function dateConvert(date: string) {
        let newDate =  moment.utc(date).format('YYYY-MM-DD');
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

            if (name === '' || date === null || schooling === '' || rg === null || cpf === null || district === '' || phone === null || career === '' || status === '' || workplace === '' || familyIncome === null || email === '') {
                toast.error("Preencha todos os campos");
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.put(`/pac/update/${id}`, {
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

                //-------------------ALTERAR--------------------------
                menorIdade: false,
                nomeResp: "",
                parentesco: "",
                rgResp: null,
                cpfResp: null
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


                <h2>Dados do Paciente:</h2>
                <form className={styles.form} onSubmit={handleEditPac}>
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
                        <div className={styles.formContainerContent}>
                            <label> Data de Nascimento: </label>
                            <input
                                type="date"
                                placeholder={date}
                                className={styles.input}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
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
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formContainerContent}>
                            <label> RG: </label>
                            <input
                                type="number"
                                defaultValue={rg}
                                className={styles.input}
                                value={rg}
                                onChange={(e) => setRg(e.target.valueAsNumber)}
                            />
                        </div>
                        <div className={styles.formContainerContent}>
                            <label> CPF: </label>
                            <input
                                type="number"
                                defaultValue={cpf}
                                className={styles.input}
                                value={cpf}
                                onChange={(e) => setCpf(e.target.valueAsNumber)}
                            />
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formContainerContent}>
                            <label> Bairro: </label>
                            <input
                                type="text"
                                defaultValue={district}
                                className={styles.input}
                                value={district}
                                onChange={(e) => setDistrict(e.target.value)}
                            />
                        </div>
                        <div className={styles.formContainerContent}>
                            <label> Telefone: </label>
                            <input
                                type="number"
                                defaultValue={phone}
                                className={styles.input}
                                value={phone}
                                onChange={(e) => setPhone(e.target.valueAsNumber)}
                            />
                        </div>
                    </div>
                    <div className={styles.formContainer}>
                        <div className={styles.formContainerContentSelect}>
                            <label> Estado Civil: </label>
                            <select value={status} onChange={handleChangeStatus}>
                                <option>
                                    Solteiro
                                </option>
                                <option>
                                    Casado
                                </option>
                            </select>
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
                    <button className={styles.buttonAdd} type='submit'>
                        Salvar
                    </button>
                </form>


            </div >

        </Modal >
    )
}