'use client'

import { useAuth } from '@/shared/lib/auth-context'
import { useRouter } from '@/navigation'
import { Loader } from '@/shared/ui/Loader'
import { lazy, useEffect } from 'react'
import { Routes } from '@/shared/routes'

const Register = lazy(() => import('./ui/form'))

const RegisterInPage = () => {
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

  return (
    <div>
      <Register />
    </div>
  )
}

export default RegisterInPage
