'use client'
import { Drawer, useMediaQuery, useTheme } from '@mui/material'
import { DarkGreen, White } from '@/shared/consts/colors'
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
import HomeIcon from '@mui/icons-material/Home'
import MonochromePhotosIcon from '@mui/icons-material/MonochromePhotos'
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic'
import MusicNoteIcon from '@mui/icons-material/MusicNote'
import SpeakerIcon from '@mui/icons-material/Speaker'
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import StorefrontIcon from '@mui/icons-material/Storefront'
import CampaignIcon from '@mui/icons-material/Campaign'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ListAltIcon from '@mui/icons-material/ListAlt'
import Image from 'next/image'

const initialLinks = [
  {
    title: 'Главная',
    url: Routes.Main,
    icon: <HomeIcon />,
  },
  {
    title: 'Шоумены',
    url: Routes.Showman,
    icon: <CampaignIcon />,
  },
  {
    title: 'Фотографы',
    url: Routes.Photographer,
    icon: <MonochromePhotosIcon />,
  },
  {
    title: 'Диджеи',
    url: Routes.Dj,
    icon: <HeadsetMicIcon />,
  },
  {
    title: 'Музыканты',
    url: Routes.Musicians,
    icon: <MusicNoteIcon />,
  },
  {
    title: 'Аренда оборудования',
    url: Routes.EquipmentRental,
    icon: <SpeakerIcon />,
  },
  {
    title: 'Аренда автомобилей',
    url: Routes.CarsRental,
    icon: <DirectionsCarIcon />,
  },
  {
    title: 'Аренда костюмов',
    url: Routes.CostumeRental,
    icon: <StorefrontIcon />,
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
      <div className={classes.logoSection}>
        <Image src="/logo.png" alt="logo" width={200} height={100} />
      </div>
      <div className={classes.linkWrapper}>
        {user && (
          <Link
            href={Routes.Profile}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.Profile })}
          >
            <AccountCircleIcon />
            Мой профиль
          </Link>
        )}

        {user && profile?.role === UserType.PROVIDER && (
          <Link
            href={Routes.RequestList}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.RequestList })}
          >
            <ListAltIcon />
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
              {item.icon && item.icon}
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
            background: White,
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
          background: White,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  )
}
