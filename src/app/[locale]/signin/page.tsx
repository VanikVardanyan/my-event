'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/shared/lib/auth-context'
import { SignIn } from './ui/form'
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'

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

  return <SignIn />
}

export default SignInPage
