'use client'
import { TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import useStyles, { SignInButton } from './styles'
import { Link } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from '@/navigation'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '@/shared/lib/firebaseConfig'
import { useTranslations } from 'next-intl'
import { Dispatch } from '@/store/store'
import toast from 'react-hot-toast'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { SignIn } from '../../../../../../shared/ui/sign-in'

interface IFormValues {
  email: string
}

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false)
  const route = useRouter()

  const { classes } = useStyles()

  const t = useTranslations('Signin')
  const err = useTranslations('Errors')

  const schema = yup.object().shape({
    email: yup.string().email(t('invalid_email')).required(t('required_field')),
  })

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit: SubmitHandler<IFormValues> = async (data: any) => {
    if (data) {
      setLoading(true)
      try {
        await sendPasswordResetEmail(auth, data.email).then(() => {
          setLoading(false)
          toast.success(t('forgot_password_description'))
          route.push(Routes.Signin)
        })
      } catch (error) {
        setLoading(false)
        toast.error(err('invalid_email_or_password'))
      }
    }
  }

  const { errors } = formState

  return (
    <div className={classes.formSection}>
      <LoadingOverlay loading={loading} />
      <div className={classes.formWrapper}>
        <div className={classes.formTitle}>{t('reset_password')}</div>
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
            className={classes.textField}
          />
          {/* <Link href={Routes.Signin} className={classes.linkForgot}>
            {t('sign_in')}
          </Link> */}
          <SignIn withText />
          <SignInButton
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            onSubmit={handleSubmit(onSubmit)}
            disabled={formState.isSubmitted && (loading || !formState.isValid)}
          >
            {t('send')}
          </SignInButton>
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword
