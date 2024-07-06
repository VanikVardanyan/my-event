'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Loader } from '@/shared/ui/Loader'

const MainPage = () => {
  const { classes } = useStyles()

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProviderUsers = async () => {
      try {
        const usersRef = collection(db, 'profiles')
        const q = query(usersRef, where('role', '==', 'provider'))
        const querySnapshot = await getDocs(q)

        const usersList: any = []
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() })
        })

        setProviderUsers(usersList)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      } finally {
        setLoading(false)
      }
    }

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
