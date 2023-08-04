'use client'

import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'
import {
  Button,
  Collapse,
  Container,
  HStack,
  Link,
  Stack,
  StackDivider,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'
import logo from '../../../public/logo.webp'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import NextLink from 'next-intl/link'
import { usePathname } from 'next-intl/client'

const menus = [
  {
    slug: 'home',
    url: '/',
  },
  // {
  //   slug: 'guestbook',
  //   url: '/guestbook',
  // },
  // {
  //   slug: 'blog',
  //   url: '/blog',
  // },
]

const Navbar = ({ locale }: { locale: 'id' | 'en' }) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const t = useTranslations('Navbar')
  const { isOpen, onToggle } = useDisclosure()
  const collapseId = `Navbar__collapse`
  const pathName = usePathname()

  return (
    <>
      <Container
        maxW={'container.lg'}
        as={'header'}
        py={4}
        display={'flex'}
        justifyContent={'space-between'}
      >
        <Button
          size={'sm'}
          aria-label={t(
            isOpen ? 'close_navigation_menu' : 'open_navigation_menu'
          )}
          aria-expanded={isOpen}
          aria-controls={collapseId}
          onClick={onToggle}
          display={{ base: 'block', md: 'none' }}
        >
          <HamburgerIcon aria-hidden />
        </Button>
        <Link as={NextLink} href={'/'} display={{ base: 'block', md: 'none' }}>
          <Image src={logo} alt={t('logo')} width={32} height={32} />
        </Link>

        <HStack as={'nav'} display={{ base: 'none', md: 'flex' }} columnGap={4}>
          <Link as={NextLink} href={'/'}>
            <Image src={logo} alt={t('logo')} width={32} height={32} />
          </Link>
          <HStack as={'ul'} listStyleType={'none'}>
            {menus.map((menu) => (
              <li key={menu.slug}>
                <Button as={NextLink} href={menu.url} variant="ghost" size="sm">
                  {t(menu.slug as any)}
                </Button>
              </li>
            ))}
            <li>
              <Button
                as={NextLink}
                variant="ghost"
                size="sm"
                href={pathName}
                locale={locale === 'id' ? 'en' : 'id'}
              >
                {locale === 'id'
                  ? 'Switch to English'
                  : 'Ganti ke Bahasa Indonesia'}
              </Button>
            </li>
          </HStack>
        </HStack>

        <Button
          size={'sm'}
          onClick={toggleColorMode}
          aria-label={t(
            colorMode ? 'switch_to_dark_mode' : 'switch_to_light_mode'
          )}
        >
          {colorMode === 'light' ? (
            <MoonIcon aria-hidden />
          ) : (
            <SunIcon aria-hidden />
          )}
        </Button>
      </Container>

      <Collapse id={collapseId} in={isOpen} animateOpacity>
        <Container
          maxW={'container.lg'}
          as={'nav'}
          paddingBottom={4}
          display={{ base: 'block', md: 'none' }}
        >
          <Stack as={'ul'} listStyleType={'none'} divider={<StackDivider />}>
            {menus.map((menu) => (
              <li key={menu.slug}>
                <NextLink href={menu.url}>{t(menu.slug as any)}</NextLink>
              </li>
            ))}
            <li>
              <NextLink href={pathName} locale={locale === 'id' ? 'en' : 'id'}>
                {locale === 'id'
                  ? 'Switch to English'
                  : 'Ganti ke Bahasa Indonesia'}
              </NextLink>
            </li>
          </Stack>
        </Container>
      </Collapse>
    </>
  )
}

export default Navbar
