import { FC, PropsWithChildren } from 'react'
import Navbar from './Navbar'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  )
}

export default Layout
