import useSocialMediaList from '@/admin/hooks/useSocialMediaList'
import { User } from '@/common/types/User'
import { FC, useState } from 'react'
import withAdminRoute from 'src/modules/admin/hooks/withAdminRoute'
import Section from '@/admin/components/sections/Section'
import SectionListItem from '@/admin/components/sections/SectionListItem'
import { Button, List, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import SocialMediaFormModal from './SocialMediaFormModal'
import { AddIcon } from '@chakra-ui/icons'

type Props = {
  user: User
}

const SocialMediaList: FC<Props> = ({ user }) => {
  const { socialMediaList, isLoading, revalidate } = useSocialMediaList()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()
  const [modalSocialMediaId, setModalSocialMediaId] = useState<
    string | undefined
  >()

  if (isLoading) return <LoadingPage />

  const openFormModal = (socialMediaId?: string) => {
    return () => {
      setModalSocialMediaId(socialMediaId)
      onModalOpen()
    }
  }

  const closeFormModal = () => {
    revalidate()
    onModalClose()
  }

  return (
    <>
      <SocialMediaFormModal
        isOpen={isModalOpen}
        onClose={closeFormModal}
        socialMediaId={modalSocialMediaId}
      />
      <Section
        title="Social Media"
        rightTitleAction={
          <Button onClick={openFormModal()} leftIcon={<AddIcon />}>
            New
          </Button>
        }
      >
        <List w="full">
          {socialMediaList?.map(({ created_at, id, name, socialite_name }) => (
            <SectionListItem
              key={id}
              item={{
                date: new Date(created_at).toLocaleString(),
                description: `Socialite provider: ${socialite_name}`,
                title: name,
              }}
              onClick={openFormModal(id)}
            />
          ))}
        </List>
      </Section>
    </>
  )
}

export default withAdminRoute(SocialMediaList)
