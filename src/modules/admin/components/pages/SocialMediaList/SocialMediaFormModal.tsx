import useSocialMedia from '@/admin/hooks/useSocialMedia'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from '@chakra-ui/react'
import { FC, FormEventHandler, useEffect, useRef, useState } from 'react'
import { backendFetcher } from '@/common/hooks/useAxios'
import {
  emptyValidationError,
  ValidationErrorResponse,
} from '@/common/types/ValidationErrorResponse'
import axios from 'axios'

type Props = {
  isOpen: boolean
  onClose: () => void
  socialMediaId?: string
}

const SocialMediaFormModal: FC<Props> = ({
  isOpen,
  onClose,
  socialMediaId,
}) => {
  const isEditing = typeof socialMediaId === 'string'
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [socialiteName, setSocialiteName] = useState('')
  const [clientId, setClientId] = useState('')
  const [clientSecret, setClientSecret] = useState('')
  const toast = useToast()

  const { isLoading, socialMedia } = useSocialMedia(socialMediaId)

  useEffect(() => {
    if (!socialMedia) return
    const { client_id, client_secret, id, name, socialite_name } = socialMedia
    setId(id)
    setName(name)
    setSocialiteName(socialite_name)
    setClientId(client_id)
    setClientSecret(client_secret)
  }, [socialMedia])

  const inputs = [
    {
      formKey: 'id',
      label: 'ID',
      value: id,
      setter: setId,
      hint: 'Identifier for route link',
    },
    {
      formKey: 'name',
      label: 'Name',
      value: name,
      setter: setName,
      hint: 'Social media name',
    },
    {
      formKey: 'socialite_name',
      label: 'Socialite Name',
      value: socialiteName,
      setter: setSocialiteName,
      hint: 'Identifier for socialite',
    },
    {
      formKey: 'client_id',
      label: 'Client ID',
      value: clientId,
      setter: setClientId,
      hint: 'OAuth 2.0 Client ID',
    },
    {
      formKey: 'client_secret',
      label: 'Client Secret',
      value: clientSecret,
      setter: setClientSecret,
      hint: 'OAuth 2.0 Client Secret',
    },
  ]

  const formRef = useRef<HTMLFormElement>(null)
  const [isSubmitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] =
    useState<ValidationErrorResponse>(emptyValidationError)

  const edit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setValidationError(emptyValidationError)
    backendFetcher
      .put(`/admin/social-media/${socialMediaId}`, {
        id,
        name,
        socialite_name: socialiteName,
        client_id: clientId,
        client_secret: clientSecret,
      })
      .then((response) => {
        toast({
          title: 'Successfully edited.',
          status: 'success',
          isClosable: true,
        })
      })
      .catch((e) => {
        if (!axios.isAxiosError(e) || e.response?.status !== 422) throw e
        setValidationError(e.response.data)
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditing ? 'Edit' : 'Create'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={'4'}>
          <form
            id="form-social-media"
            ref={formRef}
            onSubmit={isEditing ? edit : undefined}
            style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}
          >
            {inputs.map(({ formKey, label, value, setter, hint }) => (
              <FormControl
                key={formKey}
                isDisabled={isLoading || isSubmitting}
                isInvalid={formKey in validationError.errors}
                isRequired
              >
                <FormLabel>{label}</FormLabel>
                <Input
                  type="text"
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                />
                {formKey in validationError.errors ? (
                  <FormErrorMessage>
                    {validationError.errors[formKey][0]}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>{hint}</FormHelperText>
                )}
              </FormControl>
            ))}
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" type="submit" form={formRef.current?.id}>
            {isEditing ? 'Edit' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SocialMediaFormModal
