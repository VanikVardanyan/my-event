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
import { useTranslations } from 'next-intl'

interface IFormValues {
  email: string
  password: string
}

interface IFormValues {
  email: string
  password: string
  password_confirmation: string
}

export const Register = () => {
  const t = useTranslations('Register')

  const schema = yup.object().shape({
    email: yup.string().email(t('invalid_email')).required(t('required_field')),
    password: yup.string().min(6, t('password_min_length')).required(t('required_field')),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password'), ''], t('password_match'))
      .required(t('required_field')),
  })

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
        <GmailIcon /> {t('sign_up_with_email')}
      </button>
      <div className={classes.withEmail}>
        <div className={classes.line} />
        <div className={classes.withEmailText}>{t('sign_up_with_email')}</div>
        <div className={classes.line} />
      </div>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          required
          {...register('email')}
          fullWidth
          variant="outlined"
          label={t('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          autoFocus
        />
        <TextField
          required
          {...register('password')}
          fullWidth
          variant="outlined"
          label={t('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoFocus
        />
        <TextField
          required
          {...register('password_confirmation')}
          fullWidth
          variant="outlined"
          label={t('confirm_password')}
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
          {t('register')}
        </Button>
      </form>

      <div className={classes.footer}>
        {t('already_have_account')}{' '}
        <Link href={Routes.Signin} className={classes.linkRegister}>
          {t('sign_in')}
        </Link>{' '}
      </div>
    </div>
  )
}
