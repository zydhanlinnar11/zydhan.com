import { LanguageTool } from '@/portfolio/types/LanguageTool'
import { Card, CardBody, Text, VStack } from '@chakra-ui/react'
import Image from 'next/image'
import { FC } from 'react'

type Props = {
  languageTool: LanguageTool
}

const LanguageTool: FC<Props> = ({ languageTool: { image, name } }) => {
  return (
    <Card>
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
