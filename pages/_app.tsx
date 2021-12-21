import { useEffect } from 'react'
import 'tailwindcss/tailwind.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../providers/AuthProvider'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if ('serviceWorker' in navigator === false) return
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
    })
  }, [])

  return (
    <div className='min-h-screen flex flex-col'>
      <AuthProvider>
        <Navbar />
        <main className='flex flex-col mx-auto grow w-full max-w-5xl px-6'>
          <Component {...pageProps} />
        </main>
        <Footer />
      </AuthProvider>
    </div>
  )
}

export default MyApp
