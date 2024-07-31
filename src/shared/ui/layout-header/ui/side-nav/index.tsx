'use client'
import { Drawer, useMediaQuery, useTheme } from '@mui/material'
import { PinkBrownBase, White } from '@/shared/consts/colors'
import { Routes } from '@/shared/routes'
import useStyles from './styles'
import { Link } from '@/navigation'
import { ISideNavProps } from './types'
import { usePathname } from '@/navigation'
import cn from 'classnames'
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
import { useTranslations } from 'next-intl'
import LocalFloristIcon from '@mui/icons-material/LocalFlorist'
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew'
import CakeIcon from '@mui/icons-material/Cake'
import RestaurantIcon from '@mui/icons-material/Restaurant'

export const SideNav = (props: ISideNavProps) => {
  const { profile } = useSelector(getProfile)
  const { isOpen, setOpen, linkClickHandler } = props
  const pathname = usePathname()

  const t = useTranslations('Menu')
  const { user } = useAuth()

  const initialLinks = [
    {
      title: t('home'),
      url: Routes.home,
      icon: <HomeIcon />,
    },
    {
      title: t('showman'),
      url: Routes.Showman,
      icon: <CampaignIcon />,
    },
    {
      title: t('photographers'),
      url: Routes.Photographer,
      icon: <MonochromePhotosIcon />,
    },
    {
      title: t('djs'),
      url: Routes.Dj,
      icon: <HeadsetMicIcon />,
    },
    {
      title: t('musicians'),
      url: Routes.Musicians,
      icon: <MusicNoteIcon />,
    },
    {
      title: t('equipment_rental'),
      url: Routes.EquipmentRental,
      icon: <SpeakerIcon />,
    },
    {
      title: t('cars_rental'),
      url: Routes.CarsRental,
      icon: <DirectionsCarIcon />,
    },
    {
      title: t('costume_rental'),
      url: Routes.CostumeRental,
      icon: <StorefrontIcon />,
    },
    {
      title: t('florists_decorators'),
      url: Routes.FloristsDecorators,
      icon: <LocalFloristIcon />,
    },
    {
      title: t('dancers_entertainers'),
      url: Routes.DancersEntertainers,
      icon: <AccessibilityNewIcon />,
    },
    {
      title: t('restaurants'),
      url: Routes.Restaurants,
      icon: <RestaurantIcon />,
    },
    {
      title: t('cake'),
      url: Routes.Cakes,
      icon: <CakeIcon />,
    },
  ]

  const theme = useTheme()
  const { classes } = useStyles()

  const content = (
    <div className={classes.container}>
      <div className={classes.logoSection} />
      <div className={classes.linkWrapper}>
        {user && (
          <Link
            href={Routes.Profile}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.Profile })}
            onClick={linkClickHandler}
          >
            <AccountCircleIcon />
            {t('my_profile')}
          </Link>
        )}

        {user && profile?.role === UserType.PROVIDER && (
          <Link
            href={Routes.RequestList}
            className={cn(classes.link, { [classes.linkActive]: pathname == Routes.RequestList })}
            onClick={linkClickHandler}
          >
            <ListAltIcon />
            {t('request_list')}
          </Link>
        )}
        {initialLinks.map((item) => {
          return (
            <Link
              href={item.url}
              className={cn(classes.link, { [classes.linkActive]: pathname == item.url })}
              key={item.title}
              onClick={linkClickHandler}
            >
              {item.icon && item.icon}
              {item.title}
            </Link>
          )
        })}
      </div>
    </div>
  )

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
