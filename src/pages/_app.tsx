import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/common/components/elements/Navbar'
import Footer from '@/common/components/elements/Footer'
import { UserProvider } from '@/common/providers/UserProvider'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <div className='min-h-screen flex flex-col'>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </UserProvider>
    </div>
  )
}

export default App
