'use client'

import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'
import { setProfile, setProfileLoading, setUserId } from '../../store/features/profile-slice'
import { UserType } from '../types/user.types'
import { IProfile } from '../../store/features/profile-slice/types'
import { asyncSetFavoritesThunk } from '../../store/features/client-slice'
import { Dispatch } from '../../store/store'
import { usePathname, useRouter } from '../../navigation'
import { Routes } from '../routes'

const AuthContext = createContext<{
  user: (User & { profile: null | IProfile }) | null
  loading: boolean
  role: null | UserType
  setUser: (user: any) => void
  setLoading: (loading: boolean) => void
}>({
  user: null,
  loading: false,
  role: null,
  setUser: () => {},
  setLoading: () => {},
})

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState<UserType | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  const redirectPathnamesForUser = [Routes.Signin, Routes.Register, Routes.ForgotPassword].includes(pathname as Routes)

  const dispatch = Dispatch()

  useEffect(() => {
    setLoading(true)
    dispatch(setProfileLoading(true))
    if (user && redirectPathnamesForUser) {
      router.push(Routes.Profile)
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        const fetchProfile = async () => {
          const profileDoc: any = await getDoc(doc(db, 'profiles', user.uid))

          if (profileDoc?.data()?.role) {
            setRole(profileDoc.data().role)
          }
          if (profileDoc.exists()) {
            dispatch(setProfile(profileDoc.data()))
            dispatch(setUserId(user.uid))
          }
          if (profileDoc?.data()?.role && profileDoc?.data()?.role === UserType.CLIENT) {
            dispatch(asyncSetFavoritesThunk({ id: user.uid }))
          }
          setLoading(false)
        }
        fetchProfile()
      } else {
        setLoading(false)
      }
    })
    dispatch(setProfileLoading(false))

    return () => unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ user, loading, role, setUser, setLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
