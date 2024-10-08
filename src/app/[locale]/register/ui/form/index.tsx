'use client'
import { TextField } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import useStyles, { SignInButton } from './styles'
import { GmailIcon } from '@/shared/icons'
import { Link } from '@/navigation'
import { Routes } from '@/shared/routes'
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useRouter } from '@/navigation'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '@/shared/lib/firebaseConfig'
import { useTranslations } from 'next-intl'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { SignIn } from '../../../../../shared/ui/sign-in'

interface IFormValues {
  email: string
  password: string
}

interface IFormValues {
  email: string
  password: string
  password_confirmation: string
}

const Register = () => {
  const t = useTranslations('Register')
  const err = useTranslations('Errors')

  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      try {
        await createUserWithEmailAndPassword(auth, data.email, data.password).then(() => {
          route.push(Routes.ProfileSetting)
        })
      } catch (error) {
        setLoading(false)
        toast.error(err('unexpected_error'))
      }
    }
  }

  const { errors } = formState

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      signInWithPopup(auth, provider).then(async () => {
        route.push(Routes.ProfileSetting)
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
        <div className={classes.bgSection}>
          <div className={classes.bgContent}>
            <div className={classes.title}>“My Event”</div>
            <div className={classes.registerContent}>
              <div className={classes.registerContent}>
                {/* {t('already_have_account')}{' '}
                <Link href={Routes.Signin} className={classes.linkRegister}>
                  {t('sign_in')}
                </Link>{' '} */}
                <SignIn withText content={t('already_have_account')} />
              </div>
            </div>
          </div>
        </div>
        <div className={classes.formSection}>
          <div className={classes.formWrapper}>
            <div className={classes.formTitle}>{t('register')}</div>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                required
                {...register('email')}
                fullWidth
                variant="outlined"
                label={t('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                className={classes.textField}
              />
              <TextField
                required
                {...register('password')}
                fullWidth
                variant="outlined"
                label={t('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                className={classes.textField}
              />
              <TextField
                required
                {...register('password_confirmation')}
                fullWidth
                variant="outlined"
                label={t('confirm_password')}
                error={!!errors.password}
                helperText={errors.password_confirmation?.message}
                className={classes.textField}
              />
              <SignInButton
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                className={classes.signInButton}
                onSubmit={handleSubmit(onSubmit)}
                disabled={formState.isSubmitted && (loading || !formState.isValid)}
              >
                {t('register')}
              </SignInButton>
            </form>
            <div className={classes.withEmail}>
              <div className={classes.line} />
              <div className={classes.withEmailText}>{t('sign_up_with_email')}</div>
              <div className={classes.line} />
            </div>
            <button className={classes.googleBtn} onClick={signInWithGoogle}>
              <GmailIcon /> {t('sign_up_with_email')}
            </button>
            <div className={classes.registerSection}>
              <div className={classes.registerContentForm}>
                <SignIn withText content={t('already_have_account')} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlay>
  )
}

export default Register
