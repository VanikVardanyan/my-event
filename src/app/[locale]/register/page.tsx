'use client'

import { lazy } from 'react'

const Register = lazy(() => import('./ui/form'))

const RegisterInPage = () => {
  return (
    <div>
      <Register />
    </div>
  )
}

export default RegisterInPage
