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
    description: 'Cook description',
    image: '/main/default.png',
    link: Routes.Showman,
  },
  {
    name: Professions.Photographers,
    description: 'Photographers description',
    image: '/main/default.png',
    link: Routes.Photographer,
  },
  {
    name: Professions.Musicians,
    description: 'Musicians description',
    image: '/main/default.png',
    link: Routes.Musicians,
  },
  {
    name: Professions.Djs,
    description: 'Djs description',
    image: '/main/default.png',
    link: Routes.Dj,
  },
  {
    name: Professions.CostumeRental,
    description: 'CostumeRental description',
    image: '/main/default.png',
    link: Routes.CostumeRental,
  },
  {
    name: Professions.EquipmentRental,
    description: 'EquipmentRental description',
    image: '/main/default.png',
    link: Routes.EquipmentRental,
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
          <Button variant="contained" color="primary" fullWidth onClick={clickHandler}>
            {t('start')}
          </Button>
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
