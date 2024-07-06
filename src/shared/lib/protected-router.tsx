'use client'

import { useRouter } from '@/navigation'
import { ReactNode, useLayoutEffect } from 'react'
import { useAuth } from './auth-context'
import { UserType } from '../types/user.types'
import { Routes } from '../routes'
import { useSelector } from 'react-redux'
import { getProfile } from '../../store/selectors'

interface IProtectedRoute {
  children: ReactNode
  requiredRole?: UserType
}

export const ProtectedRoute = ({ children, requiredRole }: IProtectedRoute) => {
  const { user, loading, role } = useAuth()
  const { profile } = useSelector(getProfile)
  const router = useRouter()

  useLayoutEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(Routes.Main)
      } else if (requiredRole && profile?.role !== requiredRole) {
        router.push(Routes.Profile)
      }
    }
  }, [user, role, loading, router, requiredRole])

  return children
}
