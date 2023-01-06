import { SectionListItem } from '@/portfolio/types/SectionListItem'
import { Box, Divider, Flex, ListItem, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'

type Props = {
  item: SectionListItem
  target?: HTMLAttributeAnchorTarget
}

interface SubComponents {
  Title: FC<PropsWithChildren>
}

const SectionListLink: FC<Props> & SubComponents = ({
  item: { date, description, title, url },
  target,
}) => {
  return (
    <ListItem
      _hover={{ transform: 'scale(1.02)' }}
      transitionProperty={'transform'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
    >
      <Link href={url} target={target ?? '_blank'}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          py={4}
          justifyContent={'space-between'}
        >
          <Box>
            {title}
            <Text>{description}</Text>
          </Box>
          <Text w={'15em'} textAlign={{ base: 'inherit', md: 'right' }}>
            {date}
          </Text>
        </Flex>
        <Divider />
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

SectionListLink.Title.displayName = 'SectionListLink.Title'

export default SectionListLink
