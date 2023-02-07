import useSocialMediaList from '@/auth/hooks/useSocialMediaList'
import Loading from '@/common/components/Loading'
import { backendFetcher } from '@/common/hooks/useAxios'
import { User } from '@/common/types/User'
import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  Divider,
  Button,
  Box,
  useToast,
  Alert,
  AlertIcon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Spinner,
} from '@chakra-ui/react'
import { FC, useCallback, useState } from 'react'
import socialLoginHandler from '@/auth/components/Button/SocialMediaLoginButton/SocialLoginHandler'
import { useRefetchUser } from '@/common/providers/UserProvider'

type Props = {
  user: User
}

const isSocialLinked = (socialMedia: string[], id: string) =>
  typeof socialMedia.find((item) => item === id) !== 'undefined'

const SocialMediaSection: FC<Props> = ({ user }) => {
  const { socialMediaList, isLoading } = useSocialMediaList()

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
        {user.social_media.length === 1 && (
          <Alert status="warning">
            <AlertIcon />
            There must be at least 1 (one) social media linked
          </Alert>
        )}
        {isLoading && (
          <Box py={'4'}>
            <Loading />
          </Box>
        )}
        {socialMediaList?.map((social) => (
          <SocialLinkButton
            key={social.id}
            isLinked={isSocialLinked(user.social_media, social.id)}
            user={user}
            {...social}
          />
        ))}
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
  user,
}: {
  id: string
  isLinked: boolean
  name: string
  user: User
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const refetchUser = useRefetchUser()
  const link = useCallback(async () => {
    socialLoginHandler(name, `/api/auth/social-media/${id}/redirect`, () => {})
  }, [id, name])
  const isTheOnlyLinkedAccount = isLinked && user.social_media.length === 1

  const toast = useToast()
  const [isLoading, setLoading] = useState(false)
  const unlink = async () => {
    setLoading(true)
    const loadingToast = toast({
      title: `Unlinking ${name} account...`,
      status: 'loading',
    })
    backendFetcher
      .delete(`/api/auth/social-media/${id}/user`)
      .then((response) => {
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
        refetchUser && refetchUser()
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
        onClick={isLinked ? () => onOpen() : link}
        disabled={isLoading || isTheOnlyLinkedAccount}
      >
        {isLinked ? 'Unlink from' : 'Link to'} {name}
      </Button>
    </>
  )
}

export default SocialMediaSection
