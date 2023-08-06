'use client'

import { useEffect, useState } from 'react'
import { Box, List, ListItem, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'
import { useTranslations } from 'next-intl'

type NestedHeading = {
  id: string
  title: string
  items?: NestedHeading[]
}

const getNestedHeadings = (headingElements: HTMLHeadingElement[]) => {
  const nestedHeadings: NestedHeading[] = []

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] })
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items?.push({
        id,
        title,
      })
    }
  })

  return nestedHeadings
}

const useNestedHeadings = (contentId: string) => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([])
  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll(`#${contentId} h2, #${contentId} h3`)
    )

    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
  }, [])

  return { nestedHeadings }
}

const TableOfContent = ({ contentId }: { contentId: string }) => {
  const [activeId, setActiveId] = useState()
  const { nestedHeadings } = useNestedHeadings(contentId)
  const { colorMode } = useColorMode()
  useIntersectionObserver(setActiveId)
  const t = useTranslations('TableOfContent')

  return (
    <Box
      as="aside"
      display={{ base: 'none', md: 'flex' }}
      flexDir="column"
      position={'sticky'}
      pt="4em"
      width={'240px'}
      height={'fit-content'}
      fontSize={'sm'}
      gap={'3'}
      transitionProperty={'color'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
      color={colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700'}
      top={'4'}
      flexShrink={0}
      px={6}
    >
      <Text textTransform={'uppercase'} fontWeight={'bold'}>
        {t('title')}
      </Text>
      <List as={'ul'} display={'flex'} flexDir={'column'} gap={'2'}>
        {nestedHeadings.map((heading) => (
          <ListItem
            key={heading.id}
            color={
              heading.id === activeId
                ? colorMode === 'dark'
                  ? 'white'
                  : 'black'
                : 'inherit'
            }
            fontWeight={heading.id === activeId ? 'medium' : 'inherit'}
          >
            <Link href={`#${heading.id}`}>{heading.title}</Link>
            {heading && heading.items && heading.items?.length > 0 && (
              <List
                as={'ul'}
                display={'flex'}
                flexDir={'column'}
                gap={'2'}
                pt={'2'}
              >
                {heading.items?.map((child) => (
                  <ListItem
                    key={child.id}
                    listStylePosition={'inside'}
                    ml={'4'}
                    color={
                      heading.id === activeId
                        ? colorMode === 'dark'
                          ? 'white'
                          : 'black'
                        : 'inherit'
                    }
                    fontWeight={child.id === activeId ? 'medium' : 'inherit'}
                  >
                    <Link href={`#${child.id}`}>{child.title}</Link>
                  </ListItem>
                ))}
              </List>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default TableOfContent
