import { useEffect, useState } from 'react'
import useIntersectionObserver from '@/blog/hooks/useIntersectionObserver'
import { Box, List, ListItem, Text, useColorMode } from '@chakra-ui/react'
import Link from 'next/link'

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

const useNestedHeadings = () => {
  const [nestedHeadings, setNestedHeadings] = useState<NestedHeading[]>([])
  useEffect(() => {
    const headingElements: HTMLHeadingElement[] = Array.from(
      document.querySelectorAll('#post-content h2, #post-content h3')
    )

    const newNestedHeadings = getNestedHeadings(headingElements)
    setNestedHeadings(newNestedHeadings)
  }, [])

  return { nestedHeadings }
}

const TableOfContent = () => {
  const [activeId, setActiveId] = useState()
  const { nestedHeadings } = useNestedHeadings()
  const { colorMode } = useColorMode()
  useIntersectionObserver(setActiveId)

  return (
    <Box
      as="aside"
      display={{ base: 'none', lg: 'flex' }}
      flexDir="column"
      position={'sticky'}
      pt="4em"
      h={'calc(100vh-12rem)'}
      fontSize={'sm'}
      gap={'3'}
      transitionProperty={'color'}
      transitionTimingFunction={'cubic-bezier(0.4, 0, 0.2, 1)'}
      transitionDuration={'150ms'}
      color={colorMode === 'dark' ? 'whiteAlpha.700' : 'blackAlpha.700'}
      top={'4'}
    >
      <Text textTransform={'uppercase'} fontWeight={'bold'}>
        Table Of Content
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
