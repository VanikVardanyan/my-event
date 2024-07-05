'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useLayoutEffect } from 'react'
import { useAuth } from './auth-context'
import { UserType } from '../types/user.types'
import { Routes } from '../routes'

interface IProtectedRoute {
  children: ReactNode
  requiredRole?: UserType
}

export const ProtectedRoute = ({ children, requiredRole }: IProtectedRoute) => {
  const { user, loading, role } = useAuth()
  const router = useRouter()

  useLayoutEffect(() => {
    if (!loading) {
      if (!user) {
        router.push(Routes.Signin)
      } else if (requiredRole && role !== requiredRole) {
        router.push(Routes.Profile)
      }
    }
  }, [user, role, loading, router, requiredRole])

  return children
}
