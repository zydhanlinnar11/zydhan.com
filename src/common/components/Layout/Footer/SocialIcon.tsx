import Link from 'next/link'
import { Icon } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FC } from 'react'

type Props = {
  icon: IconType
  url: string
}

const SocialIcon: FC<Props> = ({ icon, url }) => {
  return (
    <Link href={url} target={'_blank'}>
      <Icon
        as={icon}
        color={'whiteAlpha.700'}
        _hover={{ color: 'whiteAlpha.900' }}
        boxSize={'5'}
        transitionProperty={'color'}
        transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
        transitionDuration={'150ms'}
      />
    </Link>
  )
}

export default SocialIcon
