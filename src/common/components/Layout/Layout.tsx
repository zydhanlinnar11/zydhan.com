import { FC, PropsWithChildren } from 'react'
import Navbar from './Navbar'
import { DefaultSeo } from 'next-seo'
import nextSeoConfig from '@/common/config/next-seo'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <Navbar />
      <div>{children}</div>
    </>
  )
}

export default Layout
