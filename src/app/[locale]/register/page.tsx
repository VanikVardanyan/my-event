'use client'

import { useEffect } from 'react'
import { Register } from './ui/form'
import { useAuth } from '@/shared/lib/auth-context'
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'

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
