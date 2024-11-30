'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { useTranslations } from 'next-intl'
import { showmanData } from '../../../../../shared/data/showman'
import { UserCardMini } from '../../../../../shared/ui/user-card-mini'
import { Routes } from '../../../../../shared/routes'
import { BreadcrumbsList } from '../../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../../shared/ui/category-title'

const breads = [
  {
    label: 'Բաժիններ',
    href: Routes.Categories,
  },
  {
    label: 'Ծառայություններ',
    href: Routes.Services,
  },
]

export const ShowManRoot = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  const { loading, usersList, error } = useFetchProviders(Professions.Restaurants)

  if (loading) return <LoadingOverlay loading />

  return (
    <div>
      <CategoryTitle title={Professions.Show} />

      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Show} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {showmanData.map((item) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
          {usersList.length === 0 && !loading && <div>{t('current_list_is_empty')}</div>}
        </div>
      </div>
    </div>
  )
}
