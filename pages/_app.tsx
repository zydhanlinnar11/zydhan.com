import 'tailwindcss/tailwind.css'
import { AuthProvider } from '../providers/AuthProvider'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
