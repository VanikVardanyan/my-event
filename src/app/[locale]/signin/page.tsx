'use client'

import { useEffect } from 'react'
import { useAuth } from '@/shared/lib/auth-context'
import { SignIn } from './ui/form'
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { Loader } from '@/shared/ui/Loader'

const SignInPage = () => {
  const { user, loading } = useAuth()

  const history = useRouter()

  useEffect(() => {
    if (!loading && user) {
      if (user?.profile) {
        history.push(Routes.Profile)
        return
      } else {
        history.push(Routes.ProfileSetting)
      }
    }
  }, [loading])

  if (loading) return <Loader />

  return <SignIn />
}

export default SignInPage
