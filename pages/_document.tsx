import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html
        className='bg-gray-900 text-white'
        lang='id-ID'
        style={{ scrollBehavior: 'smooth' }}
      >
        <Head>
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css'></link>
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content="Zydhan's Blog" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
