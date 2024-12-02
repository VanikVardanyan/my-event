import { Avatar, Drawer, Toolbar, Tooltip } from '@mui/material'
import { useState } from 'react'
import { White } from '../../consts/colors'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { ProfileRoutes, Routes } from '../../routes'
import {
  HomeOutlined as HomeIcon,
  MessageOutlined as MessageIcon,
  NotificationsOutlined as NotificationsIcon,
  EventOutlined as EventIcon,
  FavoriteBorder as FavoriteIcon,
  PaymentOutlined as PaymentIcon,
  WorkOutline as WorkIcon,
} from '@mui/icons-material'
import { Link, usePathname } from '@/navigation'
import cn from 'classnames'

export const LayoutProfile = () => {
  const [openMenu, setOpenMenu] = useState(false)
  const { classes } = useStyles()
  const { profile } = useSelector(getProfile)
  const pathname = usePathname()

  const toggleDrawer = () => {
    setOpenMenu(!openMenu)
  }

  const initialLinks = [
    {
      title: 'Իմ պրոֆիլը',
      url: ProfileRoutes.Profile,
      icon: <HomeIcon />,
    },
    {
      title: 'Հաղորդագրություններ',
      url: ProfileRoutes.Messages,
      icon: <MessageIcon />,
    },
    {
      title: 'Ծանուցումներ',
      url: ProfileRoutes.Notification,
      icon: <NotificationsIcon />,
    },
    {
      title: 'Իմ միջոցառումները',
      url: ProfileRoutes.Events,
      icon: <EventIcon />,
    },
    {
      title: 'Ընտրյալներ',
      url: ProfileRoutes.Favorites,
      icon: <FavoriteIcon />,
    },
    {
      title: 'Վճարումներ',
      url: ProfileRoutes.Payments,
      icon: <PaymentIcon />,
    },
    {
      title: 'Մասնագիտություններ',
      url: ProfileRoutes.Professions,
      icon: <WorkIcon />,
    },
  ]

  const linkClickHandler = () => {}

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <div className={classes.profileInfo}>
          <Avatar alt="Remy Sharp" src={profile?.avatar || '/default.jpg'} className={classes.avatar} />
          <div className={classes.profileDescription}>
            <Tooltip title={profile?.name}>
              <div className={classes.profileName}>{profile?.name}</div>
            </Tooltip>
            <Tooltip title={profile?.email}>
              <div className={classes.profileGmail}>{profile?.email}</div>
            </Tooltip>
          </div>
        </div>
        <div className={classes.linkWrapper}>
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
    </div>
  )
}
