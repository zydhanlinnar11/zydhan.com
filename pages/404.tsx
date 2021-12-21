import Head from 'next/head'
import CenteredErrorMessage from '../components/CenteredErrorMessage'
import BlogConfig from '../config/BlogConfig'

export default function Custom404() {
  return (
    <div className='my-auto'>
      <Head>
        <title>Not Found - {BlogConfig.BLOG_TITLE}</title>
        <meta name='description' content={BlogConfig.BLOG_DESC} />
        <meta property='og:title' content={`Not Found`} />
        <meta property='og:url' content={BlogConfig.BLOG_DOMAIN} />
        <meta property='og:description' content={BlogConfig.BLOG_DESC} />
      </Head>
      <CenteredErrorMessage
        header='404 Not Found'
        message='Halaman yang anda cari tidak ditemukan.'
      ></CenteredErrorMessage>
    </div>
  )
}
