import { LanguageTool } from '@/portfolio/types/LanguageTool'
import { Card, CardBody, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
  languageTool: LanguageTool
}

const LanguageTool: FC<Props> = ({ languageTool: { image, name } }) => {
  return (
    <Card
      _hover={{ transform: 'scale(1.05)' }}
      transitionProperty={'transform'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
    >
      <CardBody>
        <VStack w={'120px'}>
          <Image src={image} alt={`${name} logo`} width={48} height={48} />
          <Text fontWeight={'medium'}>{name}</Text>
        </VStack>
      </CardBody>
    </Card>
  )
}

export default LanguageTool
