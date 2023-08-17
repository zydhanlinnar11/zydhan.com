'use client'
import { Container, Divider, Flex, HStack, Icon } from '@chakra-ui/react'
import { FaLinkedin, FaGithub } from 'react-icons/fa'
import Link from 'next-intl/link'
import { IconType } from 'react-icons'
import { config } from '@/config/common'
import packageJson from '../../../package.json'

const Footer = () => {
  return (
    <Container as="footer" maxW={'container.lg'} mb={'5'}>
      <Divider orientation="horizontal" mb={'2'} />
      <Flex justifyContent={'space-between'}>
        <small>{`© ${new Date().getFullYear()} ${config.siteName} v${
          packageJson.version
        }`}</small>
        <HStack>
          <SocialIcon
            label="Github"
            icon={FaGithub}
            url={`https://github.com/${config.githubUsername}`}
          />
          <SocialIcon
            label="LinkedIn"
            icon={FaLinkedin}
            url={`https://www.linkedin.com/in/${config.linkedin}`}
          />
        </HStack>
      </Flex>
    </Container>
  )
}

const SocialIcon = ({
  label,
  icon,
  url,
}: {
  label: string
  icon: IconType
  url: string
}) => {
  return (
    <Link href={url} target={'_blank'} aria-label={label}>
      <Icon
        aria-label={label}
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

export default Footer
