'use client'
import Image from 'next/image'
import useStyles, { Container } from './styles'
import { Button } from '@mui/material'
import { useRouter } from '@/navigation'
import { Routes } from '../../shared/routes'
import { useTranslations } from 'next-intl'
import { Professions } from '../../shared/types/user.types'
import { ServiceCard } from '../../shared/ui/service-card'

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
]

export default function Home() {
  const { classes } = useStyles()
  const History = useRouter()
  const t = useTranslations('Main')

  const clickHandler = () => {
    History.push(Routes.home)
  }

  return (
    <Container>
      <div className={classes.root}>
        <div className={classes.content}>
          <h3 className={classes.title}>{t('organize_your_events')}</h3>
          <p className={classes.description}>{t('organize_your_events_quickly')}</p>
        </div>
        <Image src="/event-main.jpg" alt="event" width={300} height={300} className={classes.image} />
      </div>
      <div className={classes.cardsWrapper}>
        {serviceListMock.map((service) => (
          <ServiceCard {...service} key={service.link} />
        ))}
      </div>
    </Container>
  )
}
