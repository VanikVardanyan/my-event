'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { Professions } from '@/shared/types/user.types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { showmanData } from '@/shared/data/showman'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import axios from 'axios'

export const ShowManRoot = () => {
  const { classes } = useStyles()

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/services-list?profession=${encodeURIComponent(Professions.Showman)}`)
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
    <div className={classes.root}>
      <div className={classes.servicesListWrapper}>
        {providerUsers.map((service: any) => (
          <ServicePost key={service.id} {...service} />
        ))}
        {showmanData.map((item) => {
          return <UserCardMini key={item.user.username} {...item.user} />
        })}
      </div>
    </div>
  )
}
