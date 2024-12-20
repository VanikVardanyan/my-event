'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { musicianData } from '@/shared/data/musiciant'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { Metadata } from 'next'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { Routes } from '../../../../shared/routes'
import { BreadcrumbsList } from '../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../shared/ui/category-title'

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

const breads = [
  {
    label: 'Բաժիններ',
    href: Routes.Categories,
  },
  {
    label: 'Ծառայություններ',
    href: Routes.Services,
  },
]

const Musicians = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.Musicians)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.Musicians} />

      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Musicians} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {musicianData.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default Musicians
