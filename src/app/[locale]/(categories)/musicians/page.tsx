'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Suspense, useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'
import { Loader } from '@/shared/ui/Loader'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { musicianData } from '@/shared/data/musiciant'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { Metadata } from 'next'
import axios from 'axios'

// export const metadata: Metadata = {
//   title: 'Van Event - Երգիչներ',
//   description:
//     'Գտեք լավագույն երգիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է երաժիշտների լայն ընտրանի, որոնք պատրաստ են ձեզ օգնել:',
//   keywords: 'երգիչներ, երաժիշտներ, միջոցառումներ, Van Event',
//   openGraph: {
//     title: 'Van Event - Երգիչներ',
//     description:
//       'Գտեք լավագույն երգիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է երաժիշտների լայն ընտրանի, որոնք պատրաստ են ձեզ օգնել:',
//     url: 'https://www.van-event.app/arm/musicians',
//     images: ['https://www.van-event.app/arm/images/musicians.jpg'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Երգիչներ',
//     description:
//       'Գտեք լավագույն երգիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է երաժիշտների լայն ընտրանի, որոնք պատրաստ են ձեզ օգնել:',
//     images: ['https://www.van-event.app/arm/images/musicians.jpg'],
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
        const response = await axios.get(`/api/services-list?profession=${encodeURIComponent(Professions.Musicians)}`)
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
          {musicianData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
