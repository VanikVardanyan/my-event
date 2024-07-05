'use client'
import Image from 'next/image'
import useStyles from './styles'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Routes } from '../../shared/routes'
import { useTranslations } from 'next-intl'

export default function Home() {
  const { classes } = useStyles()
  const History = useRouter()
  const t = useTranslations('Main')

  const clickHandler = () => {
    History.push(Routes.Main)
  }
  return (
    <main>
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
    </main>
  )
}
