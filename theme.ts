import { extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme(
  { config },
  withProse({
    baseStyle: {
      code: {
        wordBreak: 'break-all',
        overflowX: 'scroll',
      },
      pre: {
        maxW: '100%',
        p: '0',
      },
    },
  })
)

export default theme
