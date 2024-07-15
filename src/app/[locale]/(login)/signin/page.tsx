'use client'

import dynamic from 'next/dynamic'

const SignIn = dynamic(() => import('./ui/form'))

const SignInPage = () => {
  return <SignIn />
}

export default SignInPage
