'use client'

import { lazy } from 'react'

const Register = lazy(() => import('./ui/form'))

const RegisterInPage = () => {
  return <Register />
}

export default RegisterInPage
