import { useState, FormEvent, useContext } from 'react';
import { Header } from '../../components/Header'
import Head from 'next/head';
import styles from './styles.module.scss';
import Router from 'next/router';
import { Input } from '../../components/ui/Input';
import { FiChevronsLeft } from 'react-icons/fi';
import { toast } from 'react-toastify'

import { setupAPIClient } from '../../services/api'
import { canSSRAuth } from '../../utils/canSSRAuth';

import { parseCookies } from 'nookies';
import Link from 'next/link';

interface IdPatient {
    id: string
}

export default function RegisterChart({ id }: IdPatient) {

    const [idOwner, setIdOwner] = useState(id)
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    async function handleSetChart(event: FormEvent) {
        event.preventDefault();

        try {
            if (title === '' || description === '') {
                toast.error("Preencha todos os campos")
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.post(`/patient/chart/${idOwner}`, {
                title: title,
                description: description,
            });

            toast.success("Prontuario Cadastrado!");
            Router.push('/viewPat');

        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao cadastrar!")
        }
    }

    return (
        <>
            <Head>
                <title>Cadastro Prontuario - Prontuario CEPSI</title>
            </Head>
            <Header />
            <main className={styles.container}>
                <div className={styles.containerHeader}>
                    <h1>Cadastro de Prontuario</h1>
                    <Link href={'/viewPat'}>
                        <button>
                            <FiChevronsLeft size={30}/>
                        </button>
                    </Link>
                </div>
                    <form className={styles.form} onSubmit={handleSetChart}>
                        <Input
                            placeholder="Digite o titulo"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            placeholder="Digite a descrição"
                            className={styles.textArea}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        <button
                            type="submit"
                        >
                            Cadastrar
                        </button>
                    </form>
            </main>
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