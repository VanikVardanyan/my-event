'use client'
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from '@mui/material'

import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useStyles from './styles'
import { GmailIcon } from '@/shared/icons'
import Link from 'next/link'
import { Routes } from '@/shared/routes'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/lib/firebaseConfig'

interface IFormValues {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email('Неверный email').required('Обязательное поле'),
  password: yup.string().min(6, 'минимум 6 символов').required('Обязательное поле'),
})

export const SignIn = () => {
  const { classes } = useStyles()
  const route = useRouter()

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormValues> = async (data: any) => {
    if (data) {
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(() => {
          route.push(Routes.Profile)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const { errors } = formState

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const signInWithGoogle = () => {}

  return (
    <div className={classes.root}>
      <button className={classes.googleBtn} onClick={signInWithGoogle}>
        <GmailIcon /> Войти с помощю email
      </button>
      <div className={classes.withEmail}>
        <div className={classes.line} />
        <div className={classes.withEmailText}>Войти с помощю email</div>
        <div className={classes.line} />
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          required
          {...register('email')}
          fullWidth
          variant="outlined"
          label="email"
          error={!!errors.email}
          helperText={errors.email?.message}
          autoFocus
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            required
            error={!!errors.email}
            {...register('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Passworsd"
          />
          <FormHelperText error>{errors.password?.message}</FormHelperText>

          <FormHelperText id="filled-weight-helper-text">
            <Link href="#" className={classes.linkForgot}>
              Забыли пароль?
            </Link>
          </FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className={classes.signInButton}
          onSubmit={handleSubmit(onSubmit)}
        >
          Вход
        </Button>
      </form>

      <div className={classes.footer}>
        У вас еще нет аккаунта?{' '}
        <Link href={Routes.Register} className={classes.linkRegister}>
          Зарегистрироваться
        </Link>{' '}
      </div>
    </div>
  )
}
