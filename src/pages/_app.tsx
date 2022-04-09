import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Footer from '@/common/components/Footer'
import { UserProvider } from '@/common/providers/UserProvider'
import Navbar from '@/common/components/Navbar/Navbar'
import Head from 'next/head'
import 'react-toastify/dist/ReactToastify.min.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
config.autoAddCss = false

const Toast = dynamic(
  async () => await import('@/common/components/Toast/Toast')
)

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const router = useRouter()

  if (router.pathname.startsWith('/og-image')) {
    return <Component {...pageProps} />
  }

  return (
    <>
      <Head>
        <meta name="theme-color" content="#111827" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="zydhan.com" />

        <link rel="icon" href="/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
      </Head>
      <Toast />
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black dark:text-white">
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
