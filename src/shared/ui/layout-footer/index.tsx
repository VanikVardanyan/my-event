'use client'

import { useState } from 'react'
import { InputSearch } from '../input-search'
import useStyles from './styles'
import { SideNav } from './ui/side-nav'
import { Avatar, Button, IconButton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebaseConfig'
import { usePathname } from 'next/navigation'
import { useRouter } from '@/navigation'
import { Routes } from '../../routes'
import { useAuth } from '../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Dispatch } from '@/store/store'
import { setProfile } from '@/store/features/profile-slice'
import { useTranslations } from 'next-intl'
import { SwitchLanguage } from '../switch-language'
import LogoutIcon from '@mui/icons-material/Logout'
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import { MenuAction } from './ui/menu-modal'

export const LayoutFooter = () => {
  const { classes } = useStyles()
  const t = useTranslations('Menu')
  const pathname = usePathname()

  const [isOpenMenu, setOpenMenu] = useState(false)
  const { user, setUser, loading } = useAuth()
  const { profile, loading: ProfileLoading } = useSelector(getProfile)
  const dispatch = Dispatch()

  const router = useRouter()

  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const menuClickHandler = () => {
    setOpenMenu(!isOpenMenu)
  }

  const signOutHandler = async () => {
    await signOut(auth).then(async () => {
      setUser(null)
      dispatch(setProfile(null))
      router.push(Routes.Main)
    })
  }

  const isLoading = loading || ProfileLoading

  if (isLoading) {
    return (
      <header className={classes.root}>
        {!lgUp && (
          <button onClick={menuClickHandler} className={classes.hamburgerSection}>
            <MenuIcon />
          </button>
        )}
      </header>
    )
  }

  const linkClickHandler = () => {
    setOpenMenu(false)
  }

  return (
    <footer className={classes.root}>
      {!lgUp && (
        <button onClick={menuClickHandler} className={classes.hamburgerSection}>
          <MenuIcon />
        </button>
      )}
      <InputSearch />

      {user && (
        <>
          <Link href={Routes.Profile}>
            <Avatar alt="Remy Sharp" src={profile?.avatar || '/default.jpg'} />
          </Link>
        </>
      )}
      <SwitchLanguage />

      {user && (
        <IconButton onClick={signOutHandler}>
          <LogoutIcon />
        </IconButton>
      )}
      {!user && <MenuAction />}

      <SideNav setOpen={menuClickHandler} isOpen={isOpenMenu} linkClickHandler={linkClickHandler} />
    </footer>
  )
}