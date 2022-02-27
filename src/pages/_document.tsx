import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel='stylesheet' href='https://rsms.me/inter/inter.css'></link>
        </Head>
        <body className='bg-gray-900 text-white scroll-smooth'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
