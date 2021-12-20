import React from 'react'
import { render } from '../testUtils'
import Home from '../../pages'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(
      <Home
        data={{
          getAllFilms: [
            {
              id: 48,
              title: 'film 2',
              playTime: '2021-12-14T10:51:13.000Z',
              createdAt: '2021-12-14T15:57:36.000Z',
              creatorUID: 2,
              updatedAt: '2021-12-14T15:57:36.000Z',
              user: {
                username: 'dude',
                createdAt: '2020-12-14T15:57:36.000Z',
                updatedAt: '2020-12-14T15:57:36.000Z',
                email: 'dude@dude.com',
                id: 2,
              },
            },
          ],
        }}
      />,
      {}
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
