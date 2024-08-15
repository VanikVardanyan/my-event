'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'

import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { djData } from '@/shared/data/dj'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { Metadata } from 'next'
import axios from 'axios'

// export const metadata: Metadata = {
//   title: 'Van Event - Դիջեյներ',
//   description:
//     'Գտեք լավագույն դիջեյներին ձեր միջոցառման համար: Van Event-ն առաջարկում է դիջեյների լայն ընտրանի, որոնք պատրաստ են ձեր միջոցառման համար:',
//   keywords: 'դիջեյներ, միջոցառումներ, դիջեյների ծառայություններ, Van Event',
//   openGraph: {
//     title: 'Van Event - Դիջեյներ',
//     description:
//       'Գտեք լավագույն դիջեյներին ձեր միջոցառման համար: Van Event-ն առաջարկում է դիջեյների լայն ընտրանի, որոնք պատրաստ են ձեր միջոցառման համար:',
//     url: 'https://www.van-event.app/arm/dj',
//     images: ['https://www.van-event.app/arm/images/dj.jpg'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Դիջեյներ',
//     description:
//       'Գտեք լավագույն դիջեյներին ձեր միջոցառման համար: Van Event-ն առաջարկում է դիջեյների լայն ընտրանի, որոնք պատրաստ են ձեր միջոցառման համար:',
//     images: ['https://www.van-event.app/images/dj.jpg'],
//   },
// }

const ShowMan = () => {
  const { classes } = useStyles()
  const t = useTranslations('Shared')

  const [providerUsers, setProviderUsers] = useState<any>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`/api/services-list?profession=${encodeURIComponent(Professions.Djs)}`)
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
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {providerUsers.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {djData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
