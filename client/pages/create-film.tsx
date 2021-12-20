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
import CloseIcon from '@mui/icons-material/Close'
import { useAddFilmMutation } from '../generated/graphql'
import { useRouter } from 'next/router'
import { isAuth } from '../helpers/isAuth'
import { DateTimePicker } from '@mui/lab'

const CreateFilm = (): JSX.Element => {
  const router = useRouter()
  isAuth()
  const [formControl, setFormControl] = useState({ error: false, message: '' })
  const [formState, setFormState] = useState({
    title: '',
    playTime: new Date(),
  })
  const [addFilm] = useAddFilmMutation()
  const onSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault()
    const response = await addFilm({ variables: formState })
    try {
      if (response.data.addFilm.errors) {
        setFormControl({
          error: true,
          message: `${response.data.addFilm.errors[0].message}`,
        })
      } else if (response.data.addFilm.film) {
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
  const onChangeDate = (value) => {
    setFormState({ ...formState, playTime: value.toJSON() })
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
          Add Film
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
          Please enter the title and the playtime to add
        </Typography>
        <form onSubmit={onSubmit}>
          <TextField
            error={formControl.error}
            color="primary"
            variant="outlined"
            fullWidth
            type="text"
            name="title"
            value={formState.title}
            onChange={onChange}
            label="Title"
            required
            sx={{ marginBottom: '1.5rem' }}
          />
          <DateTimePicker
            value={formState.playTime}
            onChange={onChangeDate}
            label="Play Time"
            renderInput={(params) => (
              <TextField
                color="primary"
                variant="outlined"
                fullWidth
                {...params}
                required
                sx={{ marginBottom: '1.5rem' }}
              />
            )}
          />
          <Collapse in={formControl.error}>
            <Alert
              severity={'error'}
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
            add film
          </Button>
        </form>
      </Paper>
    </Box>
  )
}

export default CreateFilm
