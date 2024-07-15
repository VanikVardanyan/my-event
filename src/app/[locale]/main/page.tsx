'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Loader } from '@/shared/ui/Loader'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { useAuth } from '@/shared/lib/auth-context'

const MainPage = () => {
  const { classes } = useStyles()
  const { profile } = useSelector(getProfile)
  const { user } = useAuth()

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  const fetchProviderUsers = async () => {
    try {
      const usersRef = collection(db, 'profiles')
      const q = query(usersRef, where('role', '==', 'provider'))
      const querySnapshot = await getDocs(q)

      const usersList: any = []
      querySnapshot.forEach((doc) => {
        usersList.push({ id: doc.id, ...doc.data() })
      })
      console.log('usersList', usersList)
      setProviderUsers(usersList)
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProviderUsers()
  }, [])

  if (loading) return <Loader />

  return (
    <div className={classes.root}>
      <div className={classes.servicesListWrapper}>
        {providerUsers.map((service: any) => (
          <ServicePost key={service.id} {...service} />
        ))}
      </div>
    </div>
  )
}

export default MainPage
