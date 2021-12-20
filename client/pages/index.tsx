import Head from 'next/head'
import NextLink from 'next/link'
import React from 'react'
import { Films, GetAllFilmsDocument } from '../generated/graphql'
import { Box, Button } from '@mui/material'
import { initializeApollo } from '../helpers/client'

const Home = (props: Props): JSX.Element => {
  return (
    <div>
      <Head>
        <title>Films And Actors List - Home</title>
      </Head>

      <NextLink href={'/create-film'}>
        <Button>create post</Button>
      </NextLink>
      <main>
        <Box
          sx={{
            padding: '2rem',
          }}
        >
          {!props.data
            ? null
            : props.data?.getAllFilms.map((film, index) => {
                return <p key={index}>{film.title}</p>
              })}
        </Box>
      </main>
    </div>
  )
}

export default Home

interface Props {
  data: {
    getAllFilms: Films[]
  }
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const apolloClient = initializeApollo()

  const { data } = await apolloClient.query<{ getAllFilms: Films[] }>({
    query: GetAllFilmsDocument,
  })
  return {
    props: {
      data: data,
    },
  }
}
