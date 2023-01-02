import Loading from '@/common/components/Loading'
import { config } from '@/common/config'
import useGuestbooks from '@/guestbook/hooks/useGuestbooks'
import {
  Box,
  Divider,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import WriteGuestbook from './WriteGuestbook'

const description =
  'Write down your comment below 📖. It could be anything, I would be excited to hear that! 🌎'

const GuestbookPage = () => {
  const { guestbooks, isLoading, revalidate } = useGuestbooks()

  return (
    <VStack alignItems={'start'} h={'full'}>
      <NextSeo
        title="Guestbook"
        openGraph={{
          url: `${config.frontendUrl}/guestbook`,
          description: description,
          title: 'Guestbook',
          images: [],
        }}
        description={description}
      />
      <Heading as={'h1'}>Guestbook</Heading>
      <Text fontWeight={'semibold'} pb={'8'}>
        {description}
      </Text>

      <WriteGuestbook onSent={() => revalidate()} />

      {isLoading && (
        <VStack w={'full'}>
          <Loading />
        </VStack>
      )}

      <List w={'full'} pt={'8'}>
        {guestbooks?.map(({ id, content, createdAt, user }) => (
          <ListItem key={id}>
            <Flex
              direction={{ base: 'column', md: 'row' }}
              py={4}
              justifyContent={'space-between'}
            >
              <Box>
                <Text fontSize={'xl'} fontWeight={'medium'}>
                  {user}
                </Text>
                <Text>{content}</Text>
              </Box>
              <Text w={'15em'} textAlign={{ base: 'inherit', md: 'right' }}>
                {new Date(createdAt).toLocaleString()}
              </Text>
            </Flex>
            <Divider />
          </ListItem>
        ))}
      </List>
    </VStack>
  )
}

export default GuestbookPage
