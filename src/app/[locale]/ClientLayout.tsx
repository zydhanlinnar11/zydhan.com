'use client'

import { Container } from '@chakra-ui/react'
import { ReactNode } from 'react'

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container
      as={'main'}
      p={8}
      maxW={'container.lg'}
      minHeight={'100%'}
      flex={1}
    >
      {children}
    </Container>
  )
}

export default ClientLayout
