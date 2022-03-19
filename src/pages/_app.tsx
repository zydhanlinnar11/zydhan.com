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
        <meta name="description" content="Welcome to My Personal Portfolio" />
        <meta property="og:title" content="Zydhan Linnar Putra" />
        <meta property="og:url" content="https://zydhan.xyz" />
        <meta
          property="og:description"
          content="Welcome to Zydhan Linnar Putra Personal Website"
        />
        <meta name="theme-color" content="#111827" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Zydhan Linnar Putra" />
        <meta property="og:image" content="/logo.webp" />
        <meta property="og:image:width" content="1080" />
        <meta property="og:image:height" content="1080" />
        <meta property="og:image:alt" content="Cartoonized photo of Zydhan" />

        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
        <link rel="icon" href="/favicon.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        ></link>
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
