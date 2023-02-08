import { backendFetcher } from '@/common/hooks/useAxios'
import { User } from '@/common/types/User'
import {
  emptyValidationError,
  ValidationErrorResponse,
} from '@/common/types/ValidationErrorResponse'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  FormControl,
  FormLabel,
  Input,
  chakra,
  Button,
  useToast,
  FormErrorMessage,
  Spinner,
} from '@chakra-ui/react'
import axios from 'axios'
import { FC, FormEventHandler, useState } from 'react'

type Props = {
  user: User
}

const Form = chakra('form')

const PersonalInfoFormSection: FC<Props> = ({ user }) => {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [isSubmitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] =
    useState<ValidationErrorResponse>(emptyValidationError)
  const toast = useToast()

  const inputs = [
    {
      formKey: 'name',
      label: 'Name',
      type: 'text',
      value: name,
      setter: setName,
    },
    {
      formKey: 'email',
      label: 'Email',
      type: 'email',
      value: email,
      setter: setEmail,
    },
  ]

  const change: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setValidationError(emptyValidationError)
    backendFetcher
      .patch('/api/auth/users/personal-info', { name, email })
      .then((response) => {
        toast({
          title: 'Personal information successfully updated!',
          status: 'success',
          isClosable: true,
        })
        // TODO: refetch user
      })
      .catch((e) => {
        if (!axios.isAxiosError(e) || e.response?.status !== 422) throw e
        setValidationError(e.response.data)
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Card as={'section'} variant={'outline'}>
      <CardHeader>
        <Heading fontSize={'xl'}>Personal Information</Heading>
      </CardHeader>
      <CardBody paddingY={0}>
        <Divider />
      </CardBody>
      <CardBody textAlign={'center'}>
        <Form
          display={'flex'}
          flexDirection={'column'}
          rowGap={'4'}
          onSubmit={change}
        >
          {inputs.map(({ formKey, label, setter, type, value }) => (
            <FormControl
              key={formKey}
              isDisabled={isSubmitting}
              isInvalid={formKey in validationError.errors}
              isRequired
            >
              <FormLabel>{label}</FormLabel>
              <Input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
              {formKey in validationError.errors && (
                <FormErrorMessage>
                  {validationError.errors[formKey][0]}
                </FormErrorMessage>
              )}
            </FormControl>
          ))}
          <Button type="submit">{isSubmitting ? <Spinner /> : 'Submit'}</Button>
        </Form>
      </CardBody>
    </Card>
  )
}

export default PersonalInfoFormSection
