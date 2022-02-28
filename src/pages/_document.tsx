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
          <title>Zydhan Linnar Putra&apos;s Personal Portfolio</title>
          <meta name='description' content='Welcome to My Personal Portfolio' />
          <meta
            property='og:title'
            content="Zydhan Linnar Putra's Personal Portfolio"
          />
          <meta property='og:url' content='https://zydhan.xyz' />
          <meta
            property='og:description'
            content='Welcome to My Personal Portfolio'
          />
          <link rel='icon' href='/favicon.png' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          ></link>
          <meta name='theme-color' content='#111827' />
          <meta property='og:type' content='website' />
          <meta property='og:site_name' content='Zydhan Linnar Putra' />
          <meta property='og:image' content='/logo.webp' />
          <meta property='og:image:width' content='1080' />
          <meta property='og:image:height' content='1080' />
          <meta property='og:image:alt' content='Cartoonized photo of Zydhan' />
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
