import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { render } from '@testing-library/react'
import theme from '../helpers/theme'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../helpers/createEmotionCache'
import fetch from 'isomorphic-fetch'
const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000/graphql', fetch }),

  credentials: 'include',
  cache: new InMemoryCache(),
})
const clientSideEmotionCache = createEmotionCache()
const Providers = ({ children }: { children: JSX.Element }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <CacheProvider value={clientSideEmotionCache}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </CacheProvider>
      </ApolloProvider>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const customRender = (
  ui: React.ReactElement,
  options: Record<string, unknown>
) => render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
