import { FC, PropsWithChildren } from 'react'
import Navbar from './Navbar'
import { DefaultSeo } from 'next-seo'
import nextSeoConfig from '@/common/config/next-seo'
import { Container } from '@chakra-ui/react'
import Footer from './Footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <Navbar />
      <Container
        as="main"
        maxW={'container.lg'}
        flex={'1'}
        p={8}
        display={'flex'}
        flexDirection={'column'}
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
