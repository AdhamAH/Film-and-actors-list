import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import theme from '../helpers/theme'
import { useLogoutMutation, useMeQuery } from '../generated/graphql'
import { useRouter } from 'next/router'

const Header = (): JSX.Element => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { loading, data, refetch } = useMeQuery()

  const [logout] = useLogoutMutation()
  useEffect(() => {
    if (!data?.me) {
      setIsLoggedIn(false)
    } else if (data?.me) {
      setIsLoggedIn(true)
    }
  }, [loading, data?.me, router.pathname])

  const handleLogout = async (): Promise<void> => {
    await logout()
    await refetch()
    await sessionStorage.clear()
    setIsLoggedIn(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              [theme.breakpoints.down('sm')]: {
                fontSize: '1.1rem',
              },
            }}
          >
            Films And Actors List
          </Typography>
          {loading ? (
            <p>loading</p>
          ) : isLoggedIn ? (
            <>
              <Typography sx={{ marginRight: '.5rem' }}>
                {data?.me?.username}
              </Typography>
              <Button
                color={'inherit'}
                variant={'outlined'}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              {' '}
              <Link href={'/login'}>
                <Button
                  sx={{ marginRight: '.5rem' }}
                  color="inherit"
                  variant={'outlined'}
                >
                  Login
                </Button>
              </Link>
              <Link href={'/register'}>
                <Button color="inherit" variant={'outlined'}>
                  Register
                </Button>
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
