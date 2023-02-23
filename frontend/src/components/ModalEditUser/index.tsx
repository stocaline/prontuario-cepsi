import React, { FormEvent, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import { setupAPIClient } from '../../services/api';

type UserProps = {
    id: string | undefined
    name: string | undefined
    email: string | undefined
}

type data = {
    user: UserProps | undefined
}

export function ModalEditUser({ user }: data) {

    const [loading, setLoading] = useState(false);

    const [userName, setUserName] = useState(user?.name)
    const [userEmail, setUserEmail] = useState(user?.email)

    async function handleEditUser(event: FormEvent) {
        event.preventDefault();

        try {
            setLoading(true);
            if (userName === '' || userEmail === '') {
                toast.error("Preencha todos os campos");
                setLoading(false);
                return;
            }

            const apiClient = setupAPIClient();
            await apiClient.put(`/user`, {
                name: userName,
                email: userEmail,
            });

            setLoading(false);
            toast.success("Usuário Alterado!");

        } catch (err) {
            console.log(err);
            toast.error("Ops, erro ao editar!")
        }
    }

    return (
        <>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className={styles.Button}>Editar perfil</button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className={styles.DialogOverlay} />
                    <Dialog.Content className={styles.DialogContent}>
                        <Dialog.Title className={styles.DialogTitle}>Edit profile</Dialog.Title>
                        <Dialog.Description className={styles.DialogDescription}>
                            Faça alterações no seu perfil aqui, click em salvar alterações quanto estiver pronto
                        </Dialog.Description>
                        <form onSubmit={handleEditUser}>
                            <fieldset className={styles.Fieldset}>
                                <label className={styles.Label} htmlFor="name">
                                    Nome
                                </label>
                                <input className={styles.Input} type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
                            </fieldset>
                            <fieldset className={styles.Fieldset}>
                                <label className={styles.Label} htmlFor="username">
                                    email
                                </label>
                                <input className={styles.Input} type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                            </fieldset>
                            <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
                                <button type="submit" className={styles.ButtonAdd}>Salvar alterações</button>
                            </div>
                        </form>
                        <Dialog.Close asChild>
                            <button className={styles.IconButton} aria-label="Close">
                                <Cross2Icon />
                            </button>
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root >
        </>
    )
}