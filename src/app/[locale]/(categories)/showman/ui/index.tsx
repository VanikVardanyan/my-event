'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { showmanData } from '@/shared/data/showman'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'

export const ShowManRoot = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.Showman)

  if (loading) return <LoadingOverlay loading />

  return (
    <div className={classes.root}>
      <div className={classes.servicesListWrapper}>
        {usersList.map((service: any) => (
          <ServicePost key={service.id} {...service} />
        ))}
        {showmanData.map((item) => {
          return <UserCardMini key={item.username} {...item} />
        })}
      </div>
    </div>
  )
}

const rtt = []
