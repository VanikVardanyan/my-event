'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { rentCarData } from '@/shared/data/rent-car'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import axios from 'axios'

const ShowMan = () => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/services-list?profession=${encodeURIComponent(Professions.CarsRental)}`)
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
          {rentCarData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
          {/* {providerUsers.length === 0 && !loading && <div>{t('current_list_is_empty')}</div>} */}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
