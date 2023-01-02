import { SectionListItem as SectionListItemType } from '@/admin/types/SectionListItem'
import { Box, Flex, ListItem, Text } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  item: SectionListItemType
  onClick?: () => void
}

const SectionListItem: FC<Props> = ({
  item: { date, description, title },
  onClick,
}) => {
  return (
    <ListItem
      _hover={{ transform: 'scale(1.02)' }}
      transitionProperty={'transform'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
    >
      <Box role={'button'} onClick={onClick}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          py={4}
          justifyContent={'space-between'}
        >
          <Box>
            <Text fontSize={'xl'} fontWeight={'medium'}>
              {title}
            </Text>
            <Text>{description}</Text>
          </Box>
          <Text w={'15em'} textAlign={{ base: 'inherit', md: 'right' }}>
            {date}
          </Text>
        </Flex>
      </Box>
    </ListItem>
  )
}

export default SectionListItem
