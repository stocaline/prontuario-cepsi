import '../../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import type { AppProps } from 'next/app'
import Router from "next/router"
import NProgress from "nprogress"

import { AuthProvider } from '../contexts/AuthContext'

Router.events.on("routeChangeStart", (url) => {NProgress.start()})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <ToastContainer autoClose={3000}/>
    </AuthProvider>
  )
}
