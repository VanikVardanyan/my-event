'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { restaurantData } from '@/shared/data/restaurant'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'

const RestaurantsPage = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.Restaurants)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
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
