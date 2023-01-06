import { Heading, HStack, VStack } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

type Props = {
  title: string
  rightTitleAction?: JSX.Element
}

const Section: FC<PropsWithChildren<Props>> = ({
  title,
  children,
  rightTitleAction,
}) => {
  return (
    <VStack
      as="section"
      spacing={6}
      alignItems={'start'}
      justifyContent={'start'}
      w={'100%'}
    >
      <HStack w={'full'} justifyContent={'space-between'} wrap={'wrap'}>
        <Heading as={'h2'} textAlign={'left'} fontSize={'2xl'}>
          {title}
        </Heading>
        {rightTitleAction}
      </HStack>
      {children}
    </VStack>
  )
}

export default Section
