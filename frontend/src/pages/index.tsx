import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import logoImg from '../../public/animate.svg';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext';

import Link from 'next/link';

import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [matricula, setMatricula] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (matricula == '' || password === '') {
      toast.warning("Preencha os dados")
      return;
    }

    setLoading(true);

    let data = {
      matricula,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Prontuario CEPSI - Faça seu login</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.containerCenter}>
          <Image src={logoImg} alt="Imagem Psicologa" className={styles.img} />

          <div className={styles.login}>
            <form onSubmit={handleLogin}>
              <Input
                placeholder="Digite sua matricula"
                type="text"
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
              />

              <Input
                placeholder="Digite sua senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                loading={loading}
              >
                Acessar
              </Button>
            </form>

            <Link href="/singup">
              <p className={styles.text}>Não possui uma conta? Cadastre-se</p>
            </Link>

          </div>
        </div>
      </div>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})