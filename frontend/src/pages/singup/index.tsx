import { useState, FormEvent, useContext } from 'react';

import Head from 'next/head';
import Image from 'next/image';
import styles from '../../../styles/home.module.scss';
import logoImg from '../../../public/animate.svg';

import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link';

export default function SingUp() {
  const { signUp } = useContext(AuthContext);
  const [matricula, setMatricula] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if(matricula === '' || name === '' || password === ''){
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data={
      matricula,
      name,
      password
    }

    await signUp(data);

    setLoading(false);
    
  }

  return (
    <>
      <Head>
        <title>Prontuario CEPSI - Faça seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Imagem Psicologa" />

        <div className={styles.login}>
            <h1>Criando sua conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder="Digite sua matricula"
              type="text"
              value={matricula}
              onChange={ (e) => setMatricula(e.target.value)}
            />

            <Input
              placeholder="Digite seu nome"
              type="text"
              value={name}
              onChange={ (e) => setName(e.target.value)}
            />

            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={ (e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link href="/">
            <p className={styles.text}>Já possue uma conta? Faça login</p>
          </Link>

        </div>
      </div>
    </>
  )
}
