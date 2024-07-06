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
import { signInWithPopup } from 'firebase/auth'

import { yupResolver } from '@hookform/resolvers/yup'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useStyles from './styles'
import { GmailIcon } from '@/shared/icons'
import { Link } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from '@/navigation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, provider } from '@/shared/lib/firebaseConfig'
import { useTranslations } from 'next-intl'
import { Dispatch } from '@/store/store'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import toast from 'react-hot-toast'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'

interface IFormValues {
  email: string
  password: string
}

export const SignIn = () => {
  const [loading, setLoading] = useState(false)

  const t = useTranslations('Signin')
  const err = useTranslations('Errors')
  const dispatch = Dispatch()

  const schema = yup.object().shape({
    email: yup.string().email(t('invalid_email')).required(t('required_field')),
    password: yup.string().min(6, t('password_min_length')).required(t('required_field')),
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
      setLoading(true)
      try {
        await signInWithEmailAndPassword(auth, data.email, data.password).then(async () => {
          await dispatch(asyncSetProfileThunk()).then(() => {
            route.push(Routes.Profile)
            setLoading(false)
          })
        })
      } catch (error) {
        setLoading(false)
        toast.error(err('invalid_email_or_password'))
      }
    }
  }

  const { errors } = formState

  const [showPassword, setShowPassword] = useState(false)
  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      signInWithPopup(auth, provider).then(async () => {
        await dispatch(asyncSetProfileThunk()).then(() => {
          route.push(Routes.Profile)
          setLoading(false)
        })
      })
    } catch (e) {
      setLoading(false)
      toast.error(err('invalid_email_or_password'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoadingOverlay loading={loading}>
      <div className={classes.root}>
        <button className={classes.googleBtn} onClick={signInWithGoogle}>
          <GmailIcon /> {t('sign_in_with_email')}
        </button>
        <div className={classes.withEmail}>
          <div className={classes.line} />
          <div className={classes.withEmailText}>{t('sign_in_with_email')}</div>
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
            <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
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
              label={t('password')}
            />
            <FormHelperText error>{errors.password?.message}</FormHelperText>

            {/* <FormHelperText id="filled-weight-helper-text">
            <Link href="#" className={classes.linkForgot}>
              Забыли пароль?
            </Link>
          </FormHelperText> */}
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
            {t('sign_in')}
          </Button>
        </form>

        <div className={classes.footer}>
          {t('no_account')}{' '}
          <Link href={Routes.Register} className={classes.linkRegister}>
            {t('register')}
          </Link>
        </div>
      </div>
    </LoadingOverlay>
  )
}