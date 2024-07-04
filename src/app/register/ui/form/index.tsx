'use client'
import { Button, TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import useStyles from './styles'
import { GmailIcon } from '@/shared/icons'
import Link from 'next/link'
import { Routes } from '@/shared/routes'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/shared/lib/firebaseConfig'

interface IFormValues {
  email: string
  password: string
}

interface IFormValues {
  email: string
  password: string
  password_confirmation: string
}
const schema = yup.object().shape({
  email: yup.string().email('Неверный email').required('Обязательное поле'),
  password: yup.string().min(6, 'пароль должен быть минимум 6 символа').required('Обязательное поле'),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
    .required('Обязательное поле'),
})

export const Register = () => {
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
        await createUserWithEmailAndPassword(auth, data.email, data.password).then((resp) => {
          route.push(Routes.Profile)
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const { errors } = formState

  return (
    <div className={classes.root}>
      <button className={classes.googleBtn}>
        <GmailIcon /> Зарегистрироваться с помощю email
      </button>
      <div className={classes.withEmail}>
        <div className={classes.line} />
        <div className={classes.withEmailText}>Зарегистрироваться с помощю email</div>
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
        <TextField
          required
          {...register('password')}
          fullWidth
          variant="outlined"
          label="пароль"
          error={!!errors.password}
          helperText={errors.password?.message}
          autoFocus
        />
        <TextField
          required
          {...register('password_confirmation')}
          fullWidth
          variant="outlined"
          label="повторите пароль"
          error={!!errors.password}
          helperText={errors.password_confirmation?.message}
          autoFocus
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          className={classes.signInButton}
          onSubmit={handleSubmit(onSubmit)}
        >
          Регистрация
        </Button>
      </form>

      <div className={classes.footer}>
        Уже есьт аккаунта?{' '}
        <Link href={Routes.Signin} className={classes.linkRegister}>
          Войти
        </Link>{' '}
      </div>
    </div>
  )
}
