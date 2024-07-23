'use client'

import ProgressBar from '@/shared/ui/progress-bar'
import useStyles from './styles'
import UserTypeSelection from './ui/user-type-select'
import { UserType } from '@/shared/types/user.types'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import { ClientForm } from './ui/client-form'
import { ProviderForm } from './ui/provider-form'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { db, storage } from '@/shared/lib/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useAuth } from '@/shared/lib/auth-context'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Routes } from '@/shared/routes'
import { useRouter } from '@/navigation'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { Dispatch } from '@/store/store'
import { useTranslations } from 'next-intl'
import { ProtectedRoute } from '@/shared/lib/protected-router'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import toast from 'react-hot-toast'
import { Container } from '../styles'
import { v4 as uuidv4 } from 'uuid'
import { deleteImage, getPresignedUrl } from '@/shared/ui/image-uploader/lib/getPresignedUrl'
import imageCompression from 'browser-image-compression'

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
}

function getFilePathFromUrl(url: string) {
  const regex = /\/avatar\/(.+)$/
  const match = url.match(regex)
  return match ? `avatar/${match[1]}` : null
}

interface IFormValues {
  name: string
  role: string
  profession?: string[] | [] | null
  country?: string | null
  avatar?: any
  facebook?: string | null
  instagram?: string | null
  youtube?: string | null
  tiktok?: string | null
  phone?: string | null
  email?: string | null
  description?: string | null
}

const ProfileSetting = () => {
  const { classes } = useStyles()
  const router = useRouter()
  const [loadingRegister, setLoadingRegister] = useState(false)

  const t = useTranslations('ProfileSetting')

  const userAuth = useAuth()
  const { profile, loading } = useSelector(getProfile)
  const dispatch = Dispatch()

  const [userType, setUserType] = useState<UserType | ''>('')

  const [step, setStep] = useState<number>(1)

  const schema = yup.object().shape({
    name: yup.string().min(2, t('minimum_characters')).required(t('required_field')),
    role: yup.string().required(t('required_field')),
    profession: yup.array().when('role', {
      is: UserType.PROVIDER,
      then: () => yup.array().required(t('required_field')),
      otherwise: () => yup.array(),
    }),
    country: yup.string(),
    email: yup.string().email(t('invalid_email')),
    phone: yup.string(),
    avatar: yup.mixed(),
    facebook: yup.string().url(t('invalid_format')),
    instagram: yup.string().url(t('invalid_format')),
    youtube: yup.string().url(t('invalid_format')),
    tiktok: yup.string().url(t('invalid_format')),
    description: yup.string(),
  })

  const methods = useForm({
    defaultValues: {
      name: '',
      role: '',
      profession: undefined,
      country: '',
      avatar: undefined,
      facebook: '',
      instagram: '',
      youtube: '',
      tiktok: '',
      phone: '',
      email: '',
      description: '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (profile !== null && profile?.role) {
      setUserType(profile?.role as UserType)
      setStep(2)
    }
  }, [profile])

  const onSubmit: SubmitHandler<IFormValues> = async (data: any) => {
    if (!userAuth.user) return
    setLoadingRegister(true)
    try {
      let avatarImage = ''
      let oldAvatar = profile?.avatar

      if (data.avatar) {
        const uniqueId = uuidv4()
        const url = await getPresignedUrl(`avatar/${uniqueId}_${data.avatar.name}`)
        const compressedFile = await imageCompression(data.avatar, options)
        const uploadResponse = await fetch(url, {
          method: 'PUT',
          body: compressedFile,
        })

        if (uploadResponse.ok) {
          avatarImage = `https://van-event.b-cdn.net/avatar/${uniqueId}_${data.avatar.name}`
        } else {
          toast.error(t('error_submitting_form'))
          return
        }
      }

      const userProfileRef = doc(db, 'profiles', userAuth.user?.uid)
      const userProfileSnap = await getDoc(userProfileRef)
      const currentProfile = userProfileSnap.data()

      const updatedProfile = {
        ...currentProfile,
        ...data,
      }

      if (avatarImage) {
        updatedProfile.avatar = avatarImage
      }

      await setDoc(doc(db, 'profiles', userAuth.user.uid), updatedProfile)
      await dispatch(asyncSetProfileThunk())

      if (oldAvatar && avatarImage) {
        const avatarUri = getFilePathFromUrl(oldAvatar) || ''
        console.log('avatarUri', avatarUri)
        await deleteImage(avatarUri)
      }
      router.push(Routes.Profile)
    } catch (error) {
      setLoadingRegister(false)
      toast.error(t('error_submitting_form'))
    }
  }
  const onNextStep = () => {
    setStep((prev) => prev + 1)
  }

  const onPrevStep = () => {
    if (profile?.role) {
      router.push(Routes.Profile)
      return
    }
    setStep((prev) => prev - 1)
  }

  const onSelectUserType = (type: UserType) => {
    return () => {
      setUserType(type)
    }
  }

  const getContent = {
    [UserType.CLIENT]: <ClientForm />,
    [UserType.PROVIDER]: <ProviderForm />,
  }

  if (loading || userAuth.loading) return <LoadingOverlay loading />

  return (
    <Container>
      <ProtectedRoute>
        <LoadingOverlay loading={loadingRegister}>
          <div className={classes.root}>
            <form>
              <FormProvider {...methods}>
                <>
                  {!profile?.role && step === 1 && (
                    <UserTypeSelection onSelectUserType={onSelectUserType} currentUserType={userType} />
                  )}
                  {step === 2 && userType && getContent[userType]}
                </>
              </FormProvider>
              <div className={classes.stepSection}>
                {step !== 1 && (
                  <Button variant="outlined" color="success" onClick={onPrevStep}>
                    {t('back')}
                  </Button>
                )}
                {!profile?.role && <ProgressBar currentStep={step} totalStep={2} />}

                {step === 1 && (
                  <Button variant="outlined" color="success" onClick={onNextStep} disabled={!userType}>
                    {t('next')}
                  </Button>
                )}
                {step === 2 && (
                  <Button type="submit" variant="outlined" color="success" onClick={methods.handleSubmit(onSubmit)}>
                    {t('finish')}
                  </Button>
                )}
              </div>
            </form>
          </div>
        </LoadingOverlay>
      </ProtectedRoute>
    </Container>
  )
}

export default ProfileSetting
