'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'

import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { djData } from '@/shared/data/dj'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { Metadata } from 'next'
import { useFetchProviders } from '@/shared/hook/useFetchProviders'
import { Routes } from '@/shared/routes'
import { BreadcrumbsList } from '../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../shared/ui/category-title'

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
  const { loading, usersList, error } = useFetchProviders(Professions.Djs)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.Djs} />
      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Djs} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}
          {djData.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default ShowMan
