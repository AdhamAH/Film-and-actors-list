import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../helpers/createEmotionCache'
import { EmotionCache } from '@emotion/cache'
import theme from '../helpers/theme'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

interface Props {
  Component: React.ElementType
  pageProps: Record<string, unknown>
  emotionCache: EmotionCache
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
})

const clientSideEmotionCache = createEmotionCache()
export default function MyApp(props: Props): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <ApolloProvider client={client}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Films And Actors List</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}
