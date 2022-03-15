import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/common/components/Footer'
import { UserProvider } from '@/common/providers/UserProvider'
import Navbar from '@/common/components/Navbar/Navbar'
import Head from 'next/head'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title>Zydhan Linnar Putra</title>
      </Head>
      <ToastContainer transition={Slide} />
      <div className="min-h-screen flex flex-col">
        <UserProvider>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </UserProvider>
      </div>
    </>
  )
}

export default App
