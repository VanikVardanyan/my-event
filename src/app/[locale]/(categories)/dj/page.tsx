'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/shared/lib/firebaseConfig'
import { Professions } from '@/shared/types/user.types'
import { useTranslations } from 'next-intl'
import { Loader } from '@/shared/ui/Loader'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { djData } from '../../../../shared/data/dj'
import { UserCardMini } from '../../../../shared/ui/user-card-mini'
import { Metadata } from 'next'

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
    const fetchProviderUsers = async () => {
      try {
        const usersRef = collection(db, 'profiles')
        const q = query(
          usersRef,
          where('role', '==', 'provider'),
          where('profession', 'array-contains', Professions.Djs)
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
          {djData.map((item, i) => {
            return <UserCardMini {...item.user} key={item.user?.username} />
          })}
          {/* {providerUsers.length === 0 && !loading && <div>{t('current_list_is_empty')}</div>} */}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
