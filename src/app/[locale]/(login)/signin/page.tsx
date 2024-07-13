'use client'

import { lazy, useEffect } from 'react'
import { useAuth } from '@/shared/lib/auth-context'
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { Loader } from '@/shared/ui/Loader'

const SignIn = lazy(() => import('./ui/form'))

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

  // if (loading) {
  //   return <Loader />
  // }

  return <SignIn />
}

export default SignInPage
