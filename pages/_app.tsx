import 'tailwindcss/tailwind.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../providers/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <main
        className='flex flex-col mx-auto'
        style={{
          minHeight: '75vh',
          maxWidth: '980px',
          paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
          paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
    </AuthProvider>
  )
}

export default MyApp
