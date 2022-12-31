import { SectionListItem } from '@/portfolio/types/SectionListItem'
import { Box, ListItem, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

type Props = {
  item: SectionListItem
}

interface SubComponents {
  Title: FC<PropsWithChildren>
}

const SectionListLink: FC<Props> & SubComponents = ({
  item: { date, description, title, url },
}) => {
  return (
    <ListItem
      _hover={{ transform: 'scale(1.02)' }}
      transitionProperty={'transform'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
    >
      <Link href={url}>
        <Stack direction={{ base: 'column', md: 'row' }} py={4}>
          <Box>
            {title}
            <Text>{description}</Text>
          </Box>
          <Text w={'15em'} textAlign={{ base: 'inherit', md: 'right' }}>
            {date}
          </Text>
        </Stack>
      </Link>
    </ListItem>
  )
}

SectionListLink.Title = ({ children }) => {
  return (
    <Text fontSize={'xl'} fontWeight={'medium'}>
      {children}
    </Text>
  )
}

export default SectionListLink
