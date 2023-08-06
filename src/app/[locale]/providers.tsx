'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { withProse } from '@nikolovlazar/chakra-ui-prose'

export const theme = extendTheme(
  {},
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
      h2: {
        scrollMarginTop: '1em',
      },
      h3: {
        scrollMarginTop: '1em',
      },
    },
  })
)

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </CacheProvider>
  )
}
