import React, { ChangeEvent, FormEvent, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Collapse,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useLoginMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import CloseIcon from '@mui/icons-material/Close'

const Login = (): JSX.Element => {
  const router = useRouter()
  const [formControl, setFormControl] = useState({ error: false, message: '' })
  const [formState, setFormState] = useState({ username: '', password: '' })
  const [login] = useLoginMutation()
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const response = await login({ variables: formState })
    try {
      if (response.data.logIn.errors) {
        setFormControl({
          error: true,
          message: `${response.data.logIn.errors[0].message}`,
        })
      } else if (response.data.logIn.user) {
        await router.push('/')
      }
    } catch (error) {
      setFormControl({
        error: true,
        message: `${error.message}`,
      })
    }
  }
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault()
    setFormControl({
      error: false,
      message: '',
    })
    setFormState({ ...formState, [event.target.name]: event.target.value })
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
          Please enter your username and password to login
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            error={formControl.error}
            color="primary"
            variant="outlined"
            fullWidth
            type="text"
            name="username"
            value={formState.username}
            onChange={onChange}
            label="username"
            required
            sx={{ marginBottom: '1.5rem' }}
          />
          <TextField
            error={formControl.error}
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
          <Collapse in={formControl.error}>
            <Alert
              color={'error'}
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setFormControl({
                      error: false,
                      message: '',
                    })
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {formControl.message}
            </Alert>
          </Collapse>
          <Button fullWidth variant={'contained'} type={'submit'}>
            Login
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default Login
