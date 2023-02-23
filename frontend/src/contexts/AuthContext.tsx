import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/apiClient';

import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router'

import { toast } from 'react-toastify'


type UserProps = {
    id: string;
    name: string;
    registration: string;
    email: string;
}

type SignInProps = {
    registration: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    registration: string;
    password: string;
}

type AuthContextData = {
    user: UserProps | null;
    isAuthenticated: boolean;
    signIn: (credential: SignInProps) => Promise<void>;
    signOut: () => void;
    signUp: (credential: SignUpProps) => Promise<void>
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
    const [user, setUser] = useState<UserProps | null>(null)
    const isAuthenticated = !!user;

    async function signIn({registration, password}: SignInProps){
        try{
            const response = await api.post('/session', {
            registration,
             password
            })

            const { id, name, email, token} = response.data;

            setCookie(undefined, '@nextauth.token', token,{
            maxAge: 60 * 60 * 24 * 1,
            path: "/"
        });
            setCookie(undefined, '@nextuser.id', id);

        setUser({
            id,
            name,
            email,
            registration,
        })

        api.defaults.headers['Authorization'] = `x-access-token ${token}`

        toast.success('Logado com sucesso')

        Router.push('/dashboard')

        }catch(err){
            toast.error('Erro ao acessar')
            console.log("Erro ao acessar")
        }
    }

    async function signUp({  name, email, registration, password}: SignUpProps) {
        try{
            const response = await api.post('/user',{
                name,
                email,
                password,
                registration,
            })

            toast.success("Cadastrado com sucesso!")

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