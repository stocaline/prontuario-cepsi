import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router'

import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credential: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credential: SignUpProps) => Promise<void>
}

type UserProps = {
    id: number;
    name: string;
    matricula: string;
}

type SignInProps = {
    matricula: string;
    password: string;
}

type SignUpProps = {
    matricula: string;
    name: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        destroyCookie(undefined, '@nextuser.id')
        destroyCookie(undefined, '@nextpac.id')
        Router.push('/')
    }catch{
        console.log('Erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps){
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user;

    async function signIn({matricula, password}: SignInProps){
        try{
            const response = await api.post('/users/login', {
             matricula,
             password
            })

            const { id, name, token} = response.data;

            setCookie(undefined, '@nextauth.token', token,{
            maxAge: 60 * 60 * 24 * 30,
            path: "/"
        });
            setCookie(undefined, '@nextuser.id', id);

        setUser({
            id,
            name,
            matricula,
        })

        api.defaults.headers['Authorization'] = `x-access-token ${token}`

        toast.success('Logado com sucesso')

        Router.push('/dashboard')

        }catch(err){
            toast.error('Erro ao acessar')
            console.log("Erro ao acessar")
        }
    }

    async function signUp({ matricula, name, password}: SignUpProps) {
        try{
            const response = await api.post('/users/singup',{
                matricula,
                name,
                password
            })

            toast.success("Cadastrado com sucesso!")

            Router.push('/')

        }catch(err){
            toast.error('Erro ao cadastrar')
            console.log("Erro ao cadastrar", err)
        }
    }

    return(
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}