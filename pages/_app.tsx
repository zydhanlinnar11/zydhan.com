import 'tailwindcss/tailwind.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../providers/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <div className='min-h-screen flex flex-col'>
      <AuthProvider>
        <Navbar />
        <main className='flex flex-col mx-auto grow max-w-5xl px-6'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default MyApp
