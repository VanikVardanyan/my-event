'use client'

import { ServicePost } from '@/shared/ui/service-post'
import useStyles from './styles'
import { Professions } from '@/shared/types/user.types'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'
import { photographerData } from '@/shared/data/photo'
import { UserCardMini } from '@/shared/ui/user-card-mini'
import { useFetchProviders } from '../../../../shared/hook/useFetchProviders'
import { Routes } from '../../../../shared/routes'
import { BreadcrumbsList } from '../../../../shared/ui/breadcrumbs'
import { CategoryTitle } from '../../../../shared/ui/category-title'

// export const metadata: Metadata = {
//   title: 'Van Event - Լուսանկարիչներ',
//   description:
//     'Գտեք լավագույն լուսանկարիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է լայն ընտրանի լուսանկարիչների ծառայություններ:',
//   keywords: 'լուսանկարիչներ, միջոցառումներ, լուսանկարիչների ծառայություններ, Van Event',
//   openGraph: {
//     title: 'Van Event - Լուսանկարիչներ',
//     description:
//       'Գտեք լավագույն լուսանկարիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է լայն ընտրանի լուսանկարիչների ծառայություններ:',
//     url: 'https://www.van-event.app/photographer',
//     images: ['https://www.van-event.app/images/photographer.jpg'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Լուսանկարիչներ',
//     description:
//       'Գտեք լավագույն լուսանկարիչներին ձեր միջոցառման համար: Van Event-ն առաջարկում է լայն ընտրանի լուսանկարիչների ծառայություններ:',
//     images: ['https://www.van-event.app/images/photographer.jpg'],
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

const Photographer = () => {
  const { classes } = useStyles()
  const { loading, usersList, error } = useFetchProviders(Professions.Photographers)

  if (loading) return <LoadingOverlay loading />

  return (
    <Container>
      <CategoryTitle title={Professions.Photographers} />

      <BreadcrumbsList className={classes.bread} currentLabel={Professions.Photographers} breads={breads} />
      <div className={classes.root}>
        <div className={classes.servicesListWrapper}>
          {usersList.map((service: any) => (
            <ServicePost key={service.id} {...service} />
          ))}

          {photographerData.map((item, i) => {
            return <UserCardMini {...item} key={item?.username} />
          })}
        </div>
      </div>
    </Container>
  )
}

export default Photographer
