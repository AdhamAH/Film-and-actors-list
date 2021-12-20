import React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../helpers/createEmotionCache'
import { EmotionCache } from '@emotion/cache'
import theme from '../helpers/theme'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateAdapter from '@mui/lab/AdapterDayjs'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../helpers/client'
import Header from '../components/Header'

interface Props {
  Component: React.ElementType
  pageProps: Record<string, string>
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()
export default function MyApp(props: Props): JSX.Element {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const apolloClient = useApollo(pageProps.initialApolloState)
  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Films And Actors List</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <CssBaseline />
            <Header />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}
