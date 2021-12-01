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
        <meta property='og:title' content={`Not Found`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <header className='my-auto text-center'>
        <h1 className='text-4xl'>404 Not Found</h1>
        <p className='mt-3 text-gray-400'>
          Halaman yang anda cari tidak ditemukan.
        </p>
      </header>
    </div>
  )
}
