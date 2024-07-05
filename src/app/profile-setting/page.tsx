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
import { useRouter } from 'next/navigation'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { Dispatch } from '@/store/store'
interface IFormValues {
  name: string
  role: string
  profession?: string[] | [] | null
  nickname?: string | null
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

  const userAuth = useAuth()
  const { profile, loading } = useSelector(getProfile)
  const dispatch = Dispatch()

  const [userType, setUserType] = useState<UserType | ''>('')

  const [step, setStep] = useState<number>(1)

  const schema = yup.object().shape({
    name: yup.string().min(2, 'минимум 2 символа').required('Обязательное поле'),
    role: yup.string().required('Обязательное поле'),
    profession: yup.array().when('role', {
      is: UserType.PROVIDER,
      then: () => yup.array().required('Обязательное поле'),
      otherwise: () => yup.array(),
    }),
    nickname: yup.string(),
    email: yup.string().email('Неверный email'),
    phone: yup.string(),
    avatar: yup.mixed(),
    facebook: yup.string().url('Неверный формат'),
    instagram: yup.string().url('Неверный формат'),
    youtube: yup.string().url('Неверный формат'),
    tiktok: yup.string().url('Неверный формат'),
    description: yup.string(),
  })

  const methods = useForm({
    defaultValues: {
      name: '',
      role: '',
      profession: undefined,
      nickname: '',
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
    try {
      let avatarImage = ''

      if (data.avatar) {
        const storageRef = ref(storage, `avatar/${data.avatar.name}`)
        const uploadTask = uploadBytesResumable(storageRef, data.avatar)
        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
              console.error(error)
              reject(error)
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              avatarImage = downloadURL
              resolve()
            }
          )
        })
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
      router.push(Routes.Profile)
    } catch (error) {
      console.error('Error submitting form:', error)
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

  if (loading || userAuth.loading) return <div>Loading...</div>

  return (
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
              Назад
            </Button>
          )}
          {!profile?.role && <ProgressBar currentStep={step} totalStep={2} />}

          {step === 1 && (
            <Button variant="outlined" color="success" onClick={onNextStep} disabled={!userType}>
              Далее
            </Button>
          )}
          {step === 2 && (
            <Button type="submit" variant="outlined" color="success" onClick={methods.handleSubmit(onSubmit)}>
              Завершить
            </Button>
          )}
        </div>
      </form>
    </div>
  )
}

export default ProfileSetting
