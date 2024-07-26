'use client'
import useStyles, { Container, StartButton } from './styles'
import { useRouter } from '@/navigation'
import { Routes } from '../../shared/routes'
import { useTranslations } from 'next-intl'
import { Professions } from '../../shared/types/user.types'
import { ServiceCard } from '../../shared/ui/service-card'
import { useRef } from 'react'
import { useAuth } from '../../shared/lib/auth-context'

interface IService {
  name: Professions
  description: string
  image: string
  link: Routes
}

const serviceListMock: IService[] = [
  {
    name: Professions.Showman,
    description: 'showman_description',
    image: '/main/showman.jpg',
    link: Routes.Showman,
  },
  {
    name: Professions.Photographers,
    description: 'photographers_description',
    image: '/main/photographer.jpg',
    link: Routes.Photographer,
  },
  {
    name: Professions.Musicians,
    description: 'musicians_description',
    image: '/main/musician.jpg',
    link: Routes.Musicians,
  },
  {
    name: Professions.Djs,
    description: 'djs_description',
    image: '/main/dj.jpg',
    link: Routes.Dj,
  },
  {
    name: Professions.Restaurants,
    description: 'restaurant_services_description',
    image: '/main/restaurant.jpg',
    link: Routes.Restaurants,
  },
  {
    name: Professions.CostumeRental,
    description: 'costume_rental_description',
    image: '/main/dress.jpg',
    link: Routes.CostumeRental,
  },
  {
    name: Professions.EquipmentRental,
    description: 'equipment_rental_description',
    image: '/main/equipment.jpg',
    link: Routes.EquipmentRental,
  },
  {
    name: Professions.floristsDecorators,
    description: 'florists_decorators_description',
    image: '/main/florist.jpg',
    link: Routes.FloristsDecorators,
  },
  {
    name: Professions.DancersEntertainers,
    description: 'dancers_entertainers_description',
    image: '/main/dance.jpg',
    link: Routes.DancersEntertainers,
  },
  {
    name: Professions.CarsRental,
    description: 'car_rental_description',
    image: '/main/car.jpg',
    link: Routes.CarsRental,
  },
  {
    name: Professions.Cake,
    description: 'cake_services_description',
    image: '/main/cakes.jpg',
    link: Routes.Cakes,
  },
]

// export const metadata: Metadata = {
//   title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//   description:
//     'Van Event-ն առաջարկում է միջոցառումների լայն ընտրանի ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ, դիջեյներ և ավտոմեքենաների վարձույթ։ Գրանցում և հարցումների ստեղծում մատչելի են օգտվողների և ծառայության մատուցողների համար:',
//   keywords:
//     'միջոցառումներ, շոումեններ, լուսանկարիչներ, դիջեյներ, ավտոմեքենաների վարձույթ, միջոցառումների ծառայություններ',
//   openGraph: {
//     title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//     description:
//       'Van Event-ն առաջարկում է միջոցառումների ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ և ավտոմեքենաների վարձույթ։ Գրանցվեք, որպեսզի ստեղծեք հարցումներ և ստանաք առաջարկություններ ծառայության մատուցողներից:',
//     url: 'https://www.van-event.app/',
//     images: ['https://www.van-event.app/logo/png/logo-color.png'],
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Van Event - Մասնագիտացված հարթակ միջոցառումների համար',
//     description:
//       'Van Event-ն առաջարկում է միջոցառումների ծառայություններ, ներառյալ շոումեններ, լուսանկարիչներ և ավտոմեքենաների վարձույթ։ Գրանցվեք, որպեսզի ստեղծեք հարցումներ և ստանաք առաջարկություններ ծառայության մատուցողներից:',
//     images: ['https://www.van-event.app/logo/png/logo-color.png'],
//   },
// }

export default function Home() {
  const { classes } = useStyles()
  const History = useRouter()
  const { user } = useAuth()
  const t = useTranslations('Main')

  const categoryRef = useRef<HTMLDivElement>(null)

  const handleStartClick = () => {
    const fixedElementHeight = 62

    if (categoryRef.current) {
      const yOffset = -fixedElementHeight
      const y = categoryRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div className={classes.root}>
        <div className={classes.content}>
          <h3 className={classes.title}>{t('organize_your_events')}</h3>
          <p className={classes.description}>{t('organize_your_events_quickly')}</p>
          <StartButton size="large" onClick={handleStartClick}>
            {t('start')}
          </StartButton>
        </div>
      </div>
      <Container>
        <h2 className={classes.caterories} ref={categoryRef}>
          {t('categories')}
        </h2>
        <div className={classes.cardsWrapper}>
          {serviceListMock.map((service) => (
            <ServiceCard {...service} key={service.link} />
          ))}
        </div>
      </Container>
    </div>
  )
}
