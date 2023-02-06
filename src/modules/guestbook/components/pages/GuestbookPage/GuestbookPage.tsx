import Loading from '@/common/components/Loading'
import { config } from '@/common/config'
import useGuestbooks from '@/guestbook/hooks/useGuestbooks'
import { Guestbook } from '@/guestbook/types/Guestbook'
import {
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { FaRegSadTear } from 'react-icons/fa'
import WriteGuestbook from './WriteGuestbook'

const description =
  'Write down your comment below 📖. It could be anything, I would be excited to hear that! 🌎'

type GuestbooksProps = {
  guestbooks: Guestbook[] | undefined
  isLoading: boolean
  isError: any
}

const Guestbooks = ({ guestbooks, isError, isLoading }: GuestbooksProps) => {
  if (isError)
    return (
      <VStack w={'full'} py={16} spacing={'4'}>
        <Icon as={FaRegSadTear} boxSize={'16'} />
        <Text textAlign={'center'}>
          I&apos;m sorry, but we are unable to load Guestbooks for some reason.
          📖
        </Text>
        <Text textAlign={'center'}>Please come back later! ☕</Text>
      </VStack>
    )

  if (isLoading)
    return (
      <VStack w={'full'} py={16}>
        <Loading />
      </VStack>
    )

  return (
    <List w={'full'} pt={'8'}>
      {guestbooks?.map(({ id, content, created_at, user }) => (
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
              {new Date(created_at).toLocaleString()}
            </Text>
          </Flex>
          <Divider />
        </ListItem>
      ))}
    </List>
  )
}

const GuestbookPage = () => {
  const { guestbooks, isLoading, revalidate, isError } = useGuestbooks()

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
      <Guestbooks
        guestbooks={guestbooks}
        isError={isError}
        isLoading={isLoading}
      />
    </VStack>
  )
}

export default GuestbookPage
