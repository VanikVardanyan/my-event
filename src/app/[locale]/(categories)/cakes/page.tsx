'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { cakesData } from '@/shared/data/cakes'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { Breadcrumbs, Typography } from '@mui/material'
import { Link } from '../../../../navigation'
import { Routes } from '../../../../shared/routes'
import { useTranslations } from 'next-intl'
import { BreadcrumbsList } from '../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../shared/ui/category-title'

const breads = [
  {
    label: 'Բաժիններ',
    href: Routes.Cakes,
  },
  {
    label: 'Ծառայություններ',
    href: Routes.Services,
  },
]

const CakesPage = () => {
  const { classes } = useStyles()

  const { loading, usersList, error } = useFetchProviders(Professions.Cake)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.Cake} />
      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Cake} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {cakesData.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default CakesPage
