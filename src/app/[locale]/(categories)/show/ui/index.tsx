'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { useTranslations } from 'next-intl'

export const ShowManRoot = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  const { loading, usersList, error } = useFetchProviders(Professions.Restaurants)

  if (loading) return <LoadingOverlay loading />

  return (
    <div className={classes.root}>
      <div className={classes.servicesListWrapper}>
        {usersList.map((service: any) => (
          <ServicePost key={service.id} {...service} />
        ))}
        {/* {showmanData.map((item) => {
          return <UserCardMini key={item.user.username} {...item.user} />
        })} */}
        {usersList.length === 0 && !loading && <div>{t('current_list_is_empty')}</div>}
      </div>
    </div>
  )
}
