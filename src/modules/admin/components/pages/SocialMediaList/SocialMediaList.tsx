import useSocialMediaList from '@/admin/hooks/useSocialMediaList'
import { User } from '@/common/types/User'
import { FC, useState } from 'react'
import withAdminRoute from 'src/modules/admin/hooks/withAdminRoute'
import Section from '@/admin/components/sections/Section'
import SectionListItem from '@/admin/components/sections/SectionListItem'
import { List, useDisclosure } from '@chakra-ui/react'
import LoadingPage from '@/common/components/Pages/LoadingPage'
import SocialMediaFormModal from './SocialMediaFormModal'

type Props = {
  user: User
}

const SocialMediaList: FC<Props> = ({ user }) => {
  const { socialMediaList, isLoading } = useSocialMediaList()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure()
  const [modalSocialMediaId, setModalSocialMediaId] = useState('')

  if (isLoading) return <LoadingPage />

  const openFormModal = (socialMediaId: string) => {
    return () => {
      setModalSocialMediaId(socialMediaId)
      onModalOpen()
    }
  }

  return (
    <>
      <SocialMediaFormModal
        isOpen={isModalOpen}
        onClose={onModalClose}
        socialMediaId={modalSocialMediaId}
      />
      <Section title="Social Media">
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
