'use client'
import { Flex, Heading } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const Section = ({ children }: { children: ReactNode }) => (
  <Flex as={'section'} direction={'column'} rowGap={6}>
    {children}
  </Flex>
)
Section.Title = ({ children }: { children: ReactNode }) => (
  <Heading as={'h2'} fontSize={'2xl'}>
    {children}
  </Heading>
)
