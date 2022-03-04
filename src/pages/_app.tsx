import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/common/components/elements/Footer'
import { UserProvider } from '@/common/providers/UserProvider'
import Navbar from '@/common/components/elements/Navbar/Navbar'
import Head from 'next/head'
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <>
      <Head>
        <title>Zydhan Linnar Putra&apos;s Personal Portfolio</title>
      </Head>
      <ToastContainer transition={Slide} />
      <div className='min-h-screen flex flex-col'>
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
