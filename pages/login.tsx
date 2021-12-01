import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BlogConfig from '../config/BlogConfig'

export default function LoginPage() {
  return (
    <div>
      <Head>
        <title>Login - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={`Login`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Navbar />
      <main
        className='flex flex-col justify-center mx-auto'
        style={{
          minHeight: '75vh',
          maxWidth: '980px',
          paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
          paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
        }}
      >
        <div>
          <header className='text-center'>
            <h1 className='text-3xl font-semibold'>Login</h1>
            <p className='mt-3 text-gray-400'>Masuk ke akun anda</p>
          </header>
          <form className='text-center mt-5 max-w-xs mx-auto' method='POST'>
            <div>
              <label htmlFor='email' className='hidden' aria-hidden>
                E-mail
              </label>
              <div className='mt-1 relative rounded-md shadow-sm'>
                <input
                  type='email'
                  name='email'
                  id='email'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-t-md h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                    borderBottom: 'none',
                  }}
                  placeholder='E-mail'
                  autoComplete='email'
                />
              </div>
            </div>
            <div>
              <label htmlFor='password' className='hidden' aria-hidden>
                Password
              </label>
              <div className='relative rounded-md shadow-sm'>
                <input
                  type='password'
                  name='password'
                  id='password'
                  className='block focus:ring-4 focus:ring-blue-600 focus:ring-opacity-30 focus:outline-none w-full pl-4 pr-4 rounded-b-md h-10 bg-transparent'
                  style={{
                    border: '1px solid rgba(255, 255, 255, 0.24)',
                  }}
                  placeholder='Password'
                  autoComplete='current-password'
                />
              </div>
            </div>
            <button
              type='submit'
              className='rounded-md border-2 border-opacity-50 border-gray-600 w-full h-10 mt-3 hover:bg-blue-600 hover:bg-opacity-30 transition-colors duration-100 focus:bg-blue-900 focus:bg-opacity-30'
            >
              Log in
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
