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
      <Container as="main" maxW={'container.lg'} p={8}>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
