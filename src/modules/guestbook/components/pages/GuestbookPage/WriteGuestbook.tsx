import { backendFetcher } from '@/common/hooks/useAxios'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { FC, FormEventHandler, useState } from 'react'

type Props = {
  onSent: () => void
}

const WriteGuestbook: FC<Props> = ({ onSent }) => {
  const [guestbook, setGuestbook] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const toast = useToast()
  const { status } = useSession()
  const { push } = useRouter()

  const send: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      // Validation
      if (guestbook.trim().length > 255) {
        setError("Message length can't be more than 255.")
        return
      }
      await backendFetcher.post(`/api/guestbook/guestbooks`, {
        message: guestbook,
      })
      toast({
        title: 'Message successfully sent.',
        status: 'success',
        isClosable: true,
      })
      setGuestbook('')
      onSent()
    } catch (e) {
      toast({
        title: 'Failed to write message.',
        status: 'error',
        isClosable: true,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card w={'full'} variant={'outline'}>
      <CardHeader display={'flex'} flexDir={'column'} gap={'4'}>
        <Heading size="md" as={'h2'}>
          Write Guestbook
        </Heading>
        <Text>Share a message for a future visitor of my site.</Text>
      </CardHeader>
      <CardBody>
        {status !== 'authenticated' ? (
          <Button
            w={'full'}
            onClick={() =>
              push({
                pathname: '/auth/login',
                query: { callbackUrl: window.location.href },
              })
            }
          >
            Log in to write guestbook
          </Button>
        ) : (
          <form onSubmit={send}>
            <FormControl
              isDisabled={isSubmitting}
              isInvalid={error !== null}
              isRequired
            >
              <FormLabel>Message</FormLabel>
              <Input
                type="text"
                value={guestbook}
                onChange={(e) => setGuestbook(e.target.value)}
                placeholder={'Your message...'}
              />
              {error !== null && <FormErrorMessage>{error}</FormErrorMessage>}
            </FormControl>
            <Button
              marginTop={'4'}
              w={'full'}
              type="submit"
              colorScheme={'blue'}
              isDisabled={isSubmitting}
            >
              Submit
            </Button>
          </form>
        )}
      </CardBody>
      <CardFooter>
        Your information is only used to display your name and reply by email.
      </CardFooter>
    </Card>
  )
}

export default WriteGuestbook
