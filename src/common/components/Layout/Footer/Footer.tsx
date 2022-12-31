import { personalInfo } from '@/common/config/personal-info'
import { Container, Divider, Flex, HStack } from '@chakra-ui/react'
import SocialIcon from './SocialIcon'
import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <Container as="footer" maxW={'container.lg'} mb={'5'}>
      <Divider orientation="horizontal" mb={'2'} />
      <Flex justifyContent={'space-between'}>
        <small>
          © {new Date().getFullYear()} {personalInfo.name}
        </small>
        <HStack>
          <SocialIcon
            icon={FaGithub}
            url={`https://github.com/${personalInfo.github}`}
          />
          <SocialIcon
            icon={FaLinkedin}
            url={`https://www.linkedin.com/in/${personalInfo.linkedin}`}
          />
        </HStack>
      </Flex>
    </Container>
  )
}

export default Footer
