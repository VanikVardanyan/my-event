'use client'
import { Drawer, useMediaQuery, useTheme } from '@mui/material'
import { DarkGreen } from '@/shared/consts/colors'
import { Routes } from '@/shared/routes'
import useStyles from './styles'
import Link from 'next/link'
import { ISideNavProps } from './types'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { useState } from 'react'
import { useAuth } from '../../../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getProfile } from '../../../../../store/selectors'
import { UserType } from '../../../../types/user.types'

const initialLinks = [
  {
    title: 'Главная',
    url: Routes.Main,
  },
  {
    title: 'Шоумены',
    url: Routes.Showman,
  },
  {
    title: 'Фотографы',
    url: Routes.Photographer,
  },
  {
    title: 'Диджеи',
    url: Routes.Dj,
  },
  {
    title: 'Музыканты',
    url: Routes.Musicians,
  },
  {
    title: 'Аренда оборудования',
    url: Routes.EquipmentRental,
  },
  {
    title: 'Аренда автомобилей',
    url: Routes.CarsRental,
  },
  {
    title: 'Аренда костюмов',
    url: Routes.CostumeRental,
  },
]

export const SideNav = (props: ISideNavProps) => {
  const { profile, loading } = useSelector(getProfile)
  const { isOpen, setOpen } = props
  const pathname = usePathname()
  const { user } = useAuth()

  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))
  const { classes } = useStyles()

  const content = (
    <div>
      <div className={classes.logoSection}>Logo</div>
      <div className={classes.linkWrapper}>
        {user && (
          <Link
            href={Routes.Profile}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.Profile })}
          >
            Мой профиль
          </Link>
        )}

        {user && profile?.role === UserType.PROVIDER && (
          <Link
            href={Routes.RequestList}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.RequestList })}
          >
            Список заказов
          </Link>
        )}
        {initialLinks.map((item) => {
          return (
            <Link
              href={item.url}
              className={cn(classes.link, { [classes.linkActive]: pathname == item.url })}
              key={item.title}
            >
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            width: 280,
            background: DarkGreen,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    )
  }

  return (
    <Drawer
      anchor="left"
      onClose={setOpen}
      open={isOpen}
      PaperProps={{
        sx: {
          width: 280,
          background: DarkGreen,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}
