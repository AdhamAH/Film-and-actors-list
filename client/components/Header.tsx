import React from 'react'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import Link from 'next/link'
import theme from '../helpers/theme'

const Header = (): JSX.Element => {
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
          <Link href={'/login'}>
            <Button color="inherit">Login</Button>
          </Link>
          <Link href={'/register'}>
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
