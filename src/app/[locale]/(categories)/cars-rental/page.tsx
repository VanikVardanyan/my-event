'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { rentCarData } from '@/shared/data/rent-car'
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

const ShowMan = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.CarsRental)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.CarsRental} />

      <BreadcrumbsList className={classes.bread} currentLabel={Professions.CarsRental} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {rentCarData.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
