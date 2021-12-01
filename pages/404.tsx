import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import BlogConfig from '../config/BlogConfig'

export default function Custom404() {
  return (
    <div>
      <Head>
        <title>Not Found - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <link rel='icon' href='/favicon.ico' />
        <meta
          property='og:title'
          content={`Not Found - ${BlogConfig.BLOG_TITLE}`}
        />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <Navbar />
      <main
        className='flex justify-center mx-auto'
        style={{
          minHeight: '75vh',
          maxWidth: '980px',
          paddingLeft: 'calc(max(22px, env(safe-area-inset-left)))',
          paddingRight: 'calc(max(22px, env(safe-area-inset-right)))',
        }}
      >
        <header className='my-auto text-center'>
          <h1 className='text-4xl'>404 Not Found</h1>
          <p className='mt-3 text-gray-400'>
            Halaman yang anda cari tidak ditemukan.
          </p>
        </header>
      </main>
      <Footer />
    </div>
  )
}
