'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { floristData, tarosiks } from '@/shared/data/florist'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import axios from 'axios'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'

const FloristPage = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.floristsDecorators)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {floristData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
          {tarosiks.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default FloristPage
