import { useContext, FormEvent, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../../styles/home.module.scss';
import loginImg from '../../public/animate.svg';
import SigninImg from '../../public/Authentication.svg';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthContext';
import Link from 'next/link';
import { canSSRGuest } from '../utils/canSSRGuest';

export default function Home() {
  const { signIn } = useContext(AuthContext)
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");

  const [flipCard, setFlipCard] = useState(styles.boxContent)

  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if (registration == '' || password === '') {
      toast.warning("Preencha os dados")
      return;
    }

    setLoading(true);

    let data = {
      registration,
      password
    }

    await signIn(data)

    setLoading(false);
  }

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    if (name === '' || email === '' || registration === '' || password === '') {
      toast.error("Preencha todos os campos")
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      registration,
      password
    }

    await signUp(data)

    setLoading(false)

    handleFlipCard()

  }

  async function handleFlipCard() {
    if (flipCard == styles.boxContent) {
      setFlipCard(styles.boxContentFlip)
    } else {
      setFlipCard(styles.boxContent)
    }
  }

  return (
    <>
      <Head>
        <title>Prontuario CEPSI - Faça seu login</title>
      </Head>
      <div className={styles.container}>
        <div className={flipCard}>
          <div className={styles.containerFront}>
            <div className={styles.containerImgFront}>
              <Image src={loginImg} alt="Imagem Psicologa" className={styles.imgLogin} />
            </div>
            <div className={styles.login}>
              <h1>Login</h1>
              <form onSubmit={handleLogin}>
                <label>Matricula:</label>
                <Input
                  placeholder="Digite sua matricula"
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
                <label>Senha:</label>
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


              <p className={styles.text} onClick={handleFlipCard}>Não possui uma conta? Cadastre-se</p>


            </div>
          </div>
          {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className={styles.containerBack}>
            <div className={styles.containerImgBack}>
              <Image src={SigninImg} alt="Imagem Psicologa" className={styles.imgSingin} />
            </div>

            <div className={styles.signin}>
              <h1>Criando sua conta</h1>
              <form onSubmit={handleSignUp}>
                <label>Nome:</label>
                <Input
                  placeholder="Digite seu nome"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label>Email:</label>
                <Input
                  placeholder="Digite seu email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Matricula:</label>
                <Input
                  placeholder="Digite sua matricula"
                  type="text"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value)}
                />
                <label>Senha:</label>
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

              <p className={styles.text} onClick={handleFlipCard}>Já possue uma conta? Faça login</p>

            </div>
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