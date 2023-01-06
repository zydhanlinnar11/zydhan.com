import { Box, color, Link as ChakraLink, useColorMode } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC, HTMLAttributeAnchorTarget, PropsWithChildren } from 'react'

type Props = {
  href?: string
  isExternal?: boolean
  target?: HTMLAttributeAnchorTarget
}

const Link: FC<PropsWithChildren<Props>> = ({
  children,
  href,
  isExternal,
  target,
}) => {
  const { colorMode } = useColorMode()

  return (
    <ChakraLink
      as={NextLink}
      href={href}
      target={target}
      role={'group'}
      position={'relative'}
      _hover={{ textDecoration: 'none' }}
      isExternal={isExternal}
      color={colorMode === 'dark' ? 'blue.300' : 'blue.600'}
      _visited={{ color: colorMode === 'dark' ? '#63B3ED' : '#2B6CB0' }}
    >
      {children}
      <Box
        as="span"
        h={'1px'}
        position="absolute"
        bg={'white'}
        w={'full'}
        bottom={'0'}
        left={'0'}
        transform={'scale(0)'}
        bgColor={colorMode === 'dark' ? 'blue.300' : 'blue.600'}
        _groupHover={{
          transform: 'scale(1)',
        }}
        transitionProperty={'transform'}
        transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
        transitionDuration={'300ms'}
      ></Box>
    </ChakraLink>
  )
}

export default Link
