import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useCreateUserMutation } from '../generated/graphql'
import { useRouter } from 'next/router'

const Register = (): JSX.Element => {
  const router = useRouter()

  const [createUser] = useCreateUserMutation()
  const [formState, setFormState] = useState({
    username: '',
    password: '',
    email: '',
  })

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const response = await createUser({ variables: formState })
    if (response.data.createUser.errors) {
      alert(response.data.createUser.errors[0].message)
    } else if (response.data.createUser.user) {
      await router.push('/')
    }
  }
  return (
    <Box
      sx={{
        padding: '1rem',
      }}
    >
      <Paper
        sx={{
          padding: '2rem',
          maxWidth: '35rem',
          margin: '4rem auto',
        }}
      >
        <Typography
          sx={{
            marginBottom: '1rem',
          }}
          color={'primary'}
          component={'h1'}
          variant={'h3'}
          align={'center'}
        >
          Welcome to <br />
          Films and Actors List
        </Typography>
        <Typography
          sx={{
            marginBottom: '1rem',
          }}
          component={'h2'}
          variant={'h6'}
          color={'secondary'}
          align={'center'}
        >
          Please enter a username and a password to register
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            color="primary"
            variant="outlined"
            fullWidth
            type="text"
            name="username"
            value={formState.username}
            onChange={onChange}
            label="Username"
            required
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            color="primary"
            variant="outlined"
            fullWidth
            type="email"
            name="email"
            value={formState.email}
            onChange={onChange}
            label="Email"
            required
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            color="primary"
            variant="outlined"
            fullWidth
            type="password"
            name="password"
            value={formState.password}
            onChange={onChange}
            label="Password"
            required
            sx={{ marginBottom: '1.5rem' }}
          />
          <Button fullWidth variant={'contained'} type={'submit'}>
            Register
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Register
