'use client'
import { Box, Divider, Flex, Link, Text } from '@chakra-ui/react'
import NextLink from 'next-intl/link'
import { ReactNode } from 'react'

export const PortofolioList = (props: {
  children: ReactNode
  'aria-busy'?: boolean
}) => (
  <Flex
    as={'ul'}
    listStyleType={'none'}
    flexDirection={'column'}
    aria-busy={props['aria-busy']}
  >
    {props.children}
  </Flex>
)
PortofolioList.Item = function PortofolioListItem({
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
}) {
  return (
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
}

PortofolioList.ItemContent = function ItemContent({
  children,
}: {
  children: ReactNode
}) {
  return <Box>{children}</Box>
}

PortofolioList.ItemTime = function ItemTime({
  children,
}: {
  children: ReactNode
}) {
  return (
    <Box minWidth={'fit-content'}>
      <Text>{children}</Text>
    </Box>
  )
}

PortofolioList.ItemTitle = function ItemTitle({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  return (
    <Text id={id} fontSize={'lg'} fontWeight={'semibold'}>
      {children}
    </Text>
  )
}

PortofolioList.ItemDescription = function ItemDescription({
  children,
  id,
}: {
  children: ReactNode
  id: string
}) {
  return <Text id={id}>{children}</Text>
}
