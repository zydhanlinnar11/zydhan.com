import { Heading, VStack } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

type Props = {
  title: string
}

const Section: FC<PropsWithChildren<Props>> = ({ title, children }) => {
  return (
    <VStack
      as="section"
      spacing={6}
      alignItems={'start'}
      justifyContent={'start'}
      w={'100%'}
    >
      <Heading as={'h2'} textAlign={'left'} fontSize={'2xl'}>
        {title}
      </Heading>
      {children}
    </VStack>
  )
}

export default Section
