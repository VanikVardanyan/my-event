'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'

import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { dress } from '@/shared/data/dress'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { Routes } from '../../../../shared/routes'
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

const CostumeRental = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.CostumeRental)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.CostumeRental} />
      <BreadcrumbsList className={classes.bread} currentLabel={Professions.CostumeRental} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {dress.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default CostumeRental
