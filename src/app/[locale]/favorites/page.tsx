'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Loader } from '@/shared/ui/Loader'
import { useSelector } from 'react-redux'
import { getClient } from '@/store/selectors'
import { Container } from '../styles'

const FavoritesPage = () => {
  const { classes } = useStyles()

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const { favorites } = useSelector(getClient)

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

  useEffect(() => {
    fetchProviderUsers()
  }, [])

  if (loading) return <Loader />
  // @ts-ignore
  const favoriteProviderUsers = providerUsers.filter((user: { id: string }) => favorites.includes(user.id as string))

  if (!loading && !favoriteProviderUsers.length) {
    return <div>У вас нет избранных</div>
  }

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {favoriteProviderUsers.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FavoritesPage
