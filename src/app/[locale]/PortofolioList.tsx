'use client'
import { Box, Divider, Flex, Link, Text } from '@chakra-ui/react'
import { DateTimeFormatOptions } from 'next-intl'
import NextLink from 'next/link'
import { ReactNode } from 'react'

export const dateFormatting: DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
}

export const PortofolioList = ({ children }: { children: ReactNode }) => (
  <Flex as={'ul'} listStyleType={'none'} flexDirection={'column'}>
    {children}
  </Flex>
)
PortofolioList.Item = ({
  children,
  descriptionId,
  external,
  titleId,
  url,
}: {
  children: ReactNode
  titleId: string
  descriptionId: string
  url: string
  external: boolean
}) => (
  <Box
    as={'li'}
    aria-labelledby={titleId}
    aria-describedby={descriptionId}
    transition={'transform 0.2s ease-in-out'}
    _hover={{
      transform: 'scale(1.02)',
    }}
  >
    <Link
      as={NextLink}
      href={url}
      target={external ? '_blank' : '_self'}
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      rowGap={{ base: 2 }}
      columnGap={{ base: 0, md: 4 }}
      paddingY={4}
      _hover={{
        textDecoration: 'none',
      }}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      justifyContent={{ base: 'flex-start', md: 'space-between' }}
    >
      {children}
    </Link>
    <Divider />
  </Box>
)
PortofolioList.ItemContent = ({ children }: { children: ReactNode }) => (
  <Box>{children}</Box>
)
PortofolioList.ItemTime = ({ children }: { children: ReactNode }) => (
  <Box minWidth={'fit-content'}>
    <Text>{children}</Text>
  </Box>
)
PortofolioList.ItemTitle = ({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) => (
  <Text id={id} fontSize={'lg'} fontWeight={'semibold'}>
    {children}
  </Text>
)
PortofolioList.ItemDescription = ({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) => <Text id={id}>{children}</Text>
