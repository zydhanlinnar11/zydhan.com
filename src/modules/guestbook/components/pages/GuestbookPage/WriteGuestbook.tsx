import { backendFetcher } from '@/common/hooks/useAxios'
import { useUser } from '@/common/providers/UserProvider'
import {
  emptyValidationError,
  ValidationErrorResponse,
} from '@/common/types/ValidationErrorResponse'
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
import { useRouter } from 'next/router'
import { FC, FormEventHandler, useState } from 'react'

type Props = {
  onSent: () => void
}

const WriteGuestbook: FC<Props> = ({ onSent }) => {
  const [guestbook, setGuestbook] = useState('')
  const [isSubmitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] =
    useState<ValidationErrorResponse>(emptyValidationError)
  const toast = useToast()
  const { state } = useUser()
  const { push } = useRouter()

  const send: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setValidationError(emptyValidationError)
    backendFetcher
      .post(`/api/guestbook/guestbooks`, { message: guestbook })
      .then((response) => {
        toast({
          title: 'Message successfully sent.',
          status: 'success',
          isClosable: true,
        })
        setGuestbook('')
        onSent()
      })
      .catch((e) => {
        if (!axios.isAxiosError(e) || e.response?.status !== 422) throw e
        setValidationError(e.response.data)
      })
      .finally(() => setSubmitting(false))
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
        {state !== 'AUTHENTICATED' ? (
          <Button
            w={'full'}
            onClick={() =>
              push({
                pathname: '/api/auth/login',
                query: { redirect: window.location.href },
              })
            }
          >
            Log in to write guestbook
          </Button>
        ) : (
          <form onSubmit={send}>
            <FormControl
              isDisabled={isSubmitting}
              isInvalid={'message' in validationError.errors}
            >
              <FormLabel>Message</FormLabel>
              <Input
                type="text"
                value={guestbook}
                onChange={(e) => setGuestbook(e.target.value)}
                placeholder={'Your message...'}
              />
              <FormErrorMessage>
                {'message' in validationError.errors &&
                  validationError.errors['message'][0]}
              </FormErrorMessage>
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
