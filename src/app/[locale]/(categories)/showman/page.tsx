'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { showmanData } from '../../../../shared/data/showman'
import { UserCardMini } from '../../../../shared/ui/user-card-mini'
import { Metadata } from 'next'

// export const metadata: Metadata = {
//   title: 'Van Event - Շոումեններ',
//   description:
//     'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
//   keywords: 'շոումեններ, միջոցառումներ, շոումենների ծառայություններ, Van Event',
//   openGraph: {
//     title: 'Van Event - Շոումեններ',
//     description:
//       'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
//     url: 'https://www.van-event.app/showman',
//     images: ['https://www.van-event.app/images/showman.jpg'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Շոումեններ',
//     description:
//       'Իմացեք բոլոր շոումենների մասին, որոնք մատչելի են ձեր միջոցառման համար: Գրանցվեք Van Event հարթակում և գտնեք լավագույն շոումեններին:',
//     images: ['https://www.van-event.app/images/showman.jpg'],
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
          where('profession', 'array-contains', Professions.Showman)
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

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {providerUsers.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {showmanData.map((item, i) => {
            return <UserCardMini key={item.user.pk} {...item.user} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
