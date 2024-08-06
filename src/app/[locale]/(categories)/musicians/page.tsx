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
import { musicianData } from '../../../../shared/data/musiciant'
import { UserCardMini } from '../../../../shared/ui/user-card-mini'
import { Metadata } from 'next'

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
    const fetchProviderUsers = async () => {
      try {
        const usersRef = collection(db, 'profiles')
        const q = query(
          usersRef,
          where('role', '==', 'provider'),
          where('profession', 'array-contains', Professions.Musicians)
        )
        const querySnapshot = await getDocs(q)

        const usersList: any = []
        querySnapshot.forEach((doc) => {
          usersList.push({ id: doc.id, ...doc.data() })
        })

        setProviderUsers(usersList)
      } catch (error) {
        console.error('Ошибка при загрузке пользователей:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProviderUsers()
  }, [])

  if (loading) return <LoadingOverlay loading />

  const data = providerUsers.filter((item: any) => item?.isApprovedUser)

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {data.map((service: any) => (
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
