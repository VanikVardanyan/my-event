'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { useSelector } from 'react-redux'
import { getClient } from '@/store/selectors'
import { Container } from '../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { cakesData } from '@/shared/data/cakes'
import { djData } from '@/shared/data/dj'
import { dress } from '@/shared/data/dress'
import { floristData } from '@/shared/data/florist'
import { photographerData } from '@/shared/data/photo'
import { rentCarData } from '@/shared/data/rent-car'
import { restaurantData } from '@/shared/data/restaurant'
import { showmanData } from '@/shared/data/showman'
import { instrumentsRenalData } from '@/shared/data/instrument'
import { musicianData } from '@/shared/data/musiciant'
import { danceData } from '@/shared/data/dance'
import { useTranslations } from 'next-intl'
import { IInstagramProfile } from '../../../shared/data/types'

const DirectUsers = [
  ...cakesData,
  ...djData,
  ...dress,
  ...floristData,
  ...photographerData,
  ...rentCarData,
  ...restaurantData,
  ...showmanData,
  ...instrumentsRenalData,
  ...musicianData,
  ...danceData,
]

const FavoritesPage = () => {
  const { classes } = useStyles()

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)
  const { favorites } = useSelector(getClient)
  const t = useTranslations('Favorites')

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

  if (loading) return <LoadingOverlay loading />

  // @ts-ignore
  const favoriteProviderDirectUsers = providerUsers.filter((user: { id: string }) =>
    (favorites.direct as string[]).includes(user.id as string)
  )

  const favoriteProviderInstagramUsers: IInstagramProfile[] = DirectUsers.filter((item: IInstagramProfile) =>
    (favorites.instagram as string[]).includes(item.username as string)
  )

  if (!loading && !favoriteProviderDirectUsers.length && !favoriteProviderInstagramUsers.length) {
    return (
      <Container>
        <div className={classes.notFavorites}>{t('empty')}</div>
      </Container>
    )
  }

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {favoriteProviderDirectUsers.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {favoriteProviderInstagramUsers.map((service: IInstagramProfile) => (
            <UserCardMini key={service.username} {...service} />
          ))}
        </div>
      </div>
    </Container>
  )
}

export default FavoritesPage
