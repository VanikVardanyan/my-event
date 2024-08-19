'use client'

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import useStyle, { LoginButton, SignInButton } from './styles'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslations } from 'next-intl'
import { Dispatch } from '../../../store/store'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Link, useRouter } from '../../../navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../lib/firebaseConfig'
import { asyncSetProfileThunk } from '../../../store/features/profile-slice'
import { Routes } from '../../routes'
import toast from 'react-hot-toast'
import { LoadingOverlay } from '../loading-overlay'
import { GmailIcon } from '../../icons'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import PersonIcon from '@mui/icons-material/Person'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: 'calc(100% - 10px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  maxHeight: 'calc(100% - 10px)',
  overflowY: 'auto',
}

const closeBtnStyle = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
}

interface IFormValues {
  email: string
  password: string
}

interface IProps {
  withText?: boolean
  content?: string
}

export const SignIn = (props: IProps) => {
  const { withText, content } = props
  const [openModal, setOpenModal] = useState(false)
  const { classes } = useStyle()
  const handleCloseModal = () => setOpenModal(false)
  const handleOpenModal = () => setOpenModal(true)
  const tMenu = useTranslations('Menu')
  const t = useTranslations('Signin')

  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const err = useTranslations('Errors')
  const dispatch = Dispatch()

  const schema = yup.object().shape({
    email: yup.string().email(t('invalid_email')).required(t('required_field')),
    password: yup.string().min(6, t('password_min_length')).required(t('required_field')),
  })

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
        })
      })
    } catch (e) {
      setLoading(false)
      toast.error(err('invalid_email_or_password'))
    } finally {
      setLoading(false)
    }
  }

  const theme = useTheme()
  const MdUp = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <div>
      {!withText &&
        (MdUp ? (
          <LoginButton onClick={handleOpenModal}> {tMenu('login')}</LoginButton>
        ) : (
          <IconButton onClick={handleOpenModal} style={{ height: 40 }}>
            <PersonIcon style={{ fill: 'white' }} />
          </IconButton>
        ))}

      {withText && (
        <div>
          {content && content}{' '}
          <Button variant="text" onClick={handleOpenModal}>
            {tMenu('login')}
          </Button>
        </div>
      )}

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton onClick={handleCloseModal} style={closeBtnStyle}>
            <CloseIcon />
          </IconButton>
          <div className={classes.formSection}>
            <LoadingOverlay loading={loading} />
            <div className={classes.formWrapper}>
              <div className={classes.formTitle}>{t('welcome')}</div>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                  required
                  {...register('email')}
                  fullWidth
                  variant="outlined"
                  label="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  className={classes.textField}
                />
                <FormControl variant="filled">
                  <InputLabel htmlFor="outlined-adornment-password">{t('password')}</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    error={!!errors.email}
                    {...register('password')}
                    className={classes.textField}
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
                  />
                  <FormHelperText error>{errors.password?.message}</FormHelperText>
                  <Link href={Routes.ForgotPassword} className={classes.linkForgot} onClick={handleCloseModal}>
                    {t('forgot_password')}
                  </Link>
                </FormControl>
                <SignInButton
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={formState.isSubmitted && (loading || !formState.isValid)}
                  className={classes.signInButton}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {t('sign_in')}
                </SignInButton>
              </form>

              <div className={classes.withEmail}>
                <div className={classes.line} />
                <div className={classes.withEmailText}>{t('sign_in_with_email')}</div>
                <div className={classes.line} />
              </div>
              <button className={classes.googleBtn} onClick={signInWithGoogle}>
                <GmailIcon /> {t('sign_in_with_email')}
              </button>
              <div className={classes.registerSection}>
                <div className={classes.registerContent}>
                  {t('no_account')}{' '}
                  <Link href={Routes.Register} className={classes.linkRegister} onClick={handleCloseModal}>
                    {t('register')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
