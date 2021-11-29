import React, { ChangeEvent, useState } from 'react'
import { Button, Paper, TextField, Typography } from '@mui/material'
import { gql, useMutation } from '@apollo/client'

const REGISTER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(data: { username: $username, password: $password }) {
      errors {
        message
      }
      user {
        username
      }
    }
  }
`
const Register = (): JSX.Element => {
  const [createUser] =
    useMutation<{ username: string; password: string }>(REGISTER)
  const [formState, setFormState] = useState({ username: '', password: '' })

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }
  return (
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
        Please enter your username and password to register
      </Typography>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          try {
            await createUser({ variables: formState })
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)
          }
        }}
      >
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
  )
}

export default Register
