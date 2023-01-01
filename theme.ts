import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({ config }, withProse())

export default theme
