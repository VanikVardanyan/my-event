'use client'
import Image from 'next/image'
import useStyles from './styles'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import { Routes } from '../../shared/routes'

export default function Home() {
  const { classes } = useStyles()
  const History = useRouter()

  const clickHandler = () => {
    History.push(Routes.Main)
  }
  return (
    <main>
      <div className={classes.root}>
        <div className={classes.content}>
          <h3 className={classes.title}>Организуйте ваши мероприятия легко и эффективно</h3>
          <p className={classes.description}>
            Организуйте свои мероприятия легко и быстро. На нашей платформе вы найдете лучших профессионалов для фото,
            музыки, аренды оборудования и многое другое. Регистрируйтесь сегодня, чтобы предложить свои услуги или найти
            идеального исполнителя для вашего события.
          </p>
          <Button variant="contained" color="primary" fullWidth onClick={clickHandler}>
            Начать
          </Button>
        </div>
        <Image src="/event-main.jpg" alt="event" width={300} height={300} className={classes.image} />
      </div>
    </main>
  )
}
