import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import { backendFetcher } from '@/common/hooks/useAxios'
import { User } from '@/common/types/User'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import socialLoginHandler from '@/auth/components/Button/SocialMediaLoginButton/SocialLoginHandler'
import useLinkedSocialMedia from '@/auth/hooks/useLinkedSocialMedia'
import { signIn } from 'next-auth/react'
import Loading from '@/common/components/Loading'

type Props = {
  user: User
}

const isSocialLinked = (socialMedia: string[], id: string) =>
  typeof socialMedia.find((item) => item === id) !== 'undefined'

const SocialMediaSection: FC<Props> = ({ user }) => {
  const {
    error: errorSocialMedia,
    isLoading: isLoadingSocialMedia,
    socialMedia,
  } = useSocialMediaList()
  const {
    error: errorLinkedSocialMedia,
    isLoading: isLoadingLinkedSocialMedia,
    linked,
  } = useLinkedSocialMedia()

  const onlyHaveOneSocialLinked = linked?.length === 1

  return (
    <Card as={'section'} variant={'outline'}>
      <CardHeader>
        <Heading fontSize={'xl'}>Social Media</Heading>
      </CardHeader>
      <CardBody paddingY={0}>
        <Divider />
      </CardBody>
      <CardBody
        textAlign={'center'}
        display={'flex'}
        flexDirection={'column'}
        rowGap={'4'}
      >
        {isLoadingLinkedSocialMedia || isLoadingSocialMedia ? (
          <VStack py={4}>
            <Loading />
          </VStack>
        ) : errorLinkedSocialMedia || errorSocialMedia ? (
          <Text py={4}>
            Sorry, we can&apos;t fetch social media right now. Please try again
            later while we fix it!
          </Text>
        ) : (
          <>
            {onlyHaveOneSocialLinked && (
              <Alert status="warning">
                <AlertIcon />
                There must be at least 1 (one) social media linked
              </Alert>
            )}
            {linked &&
              socialMedia?.map((social) => (
                <SocialLinkButton
                  key={social.id}
                  isLinked={isSocialLinked(linked, social.id)}
                  isDisabled={
                    onlyHaveOneSocialLinked && isSocialLinked(linked, social.id)
                  }
                  {...social}
                />
              ))}
          </>
        )}
      </CardBody>
    </Card>
  )
}

type RedirectResponseData = {
  redirect_url: string
}

const SocialLinkButton = ({
  id,
  isLinked,
  name,
  isDisabled,
}: {
  id: string
  isLinked: boolean
  name: string
  isDisabled: boolean
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { refetch } = useLinkedSocialMedia()

  const toast = useToast()
  const [isLoading, setLoading] = useState(false)
  const unlink = async () => {
    setLoading(true)
    const loadingToast = toast({
      title: `Unlinking ${name} account...`,
      status: 'loading',
    })
    backendFetcher
      .delete(`/api/auth/users/linked-social-media/${id}/`)
      .then((response) => {
        refetch()
        toast.update(loadingToast, {
          title: `${name} account successfully unlinked!`,
          status: 'success',
          isClosable: true,
        })
        onClose()
      })
      .catch((e) => {
        toast.update(loadingToast, {
          title: `Unable to unlink ${name} account!`,
          status: 'error',
          isClosable: true,
        })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Unlink {name} Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure want to unlink your {name} account?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={unlink} isDisabled={isLoading}>
              {isLoading ? <Spinner /> : 'Unlink'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Button
        variant={isLinked ? 'outline' : 'solid'}
        onClick={isLinked ? () => onOpen() : () => signIn(id)}
        disabled={isLoading || isDisabled}
      >
        {isLinked ? 'Unlink from' : 'Link to'} {name}
      </Button>
    </>
  )
}

export default SocialMediaSection
