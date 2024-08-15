'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { restaurantData } from '@/shared/data/restaurant'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import axios from 'axios'

const RestaurantsPage = () => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/services-list?profession=${encodeURIComponent(Professions.Restaurants)}`)
        const usersList = await response.data
        setProviderUsers(usersList)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {providerUsers.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {restaurantData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default RestaurantsPage
