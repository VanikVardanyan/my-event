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
import { useFetchProviders } from '@/shared/hook/useFetchProviders'

const ShowMan = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.CarsRental)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
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
