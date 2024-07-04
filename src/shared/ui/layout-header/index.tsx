'use client'

import { useState } from 'react'
import { InputSearch } from '../input-search'
import useStyles from './styles'
import { SideNav } from './ui/side-nav'
import { Avatar, Button, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebaseConfig'
import { useRouter } from 'next/navigation'
import { Routes } from '../../routes'
import { useAuth } from '../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Dispatch } from '@/store/store'
import { setProfile } from '@/store/features/profile-slice'

export const LayoutHeader = () => {
  const { classes } = useStyles()
  const [isOpenMenu, setOpenMenu] = useState(false)
  const { user, setUser, loading } = useAuth()
  const { profile, loading: ProfileLoading } = useSelector(getProfile)
  const dispatch = Dispatch()

  const route = useRouter()

  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const menuClickHandler = () => {
    setOpenMenu(!isOpenMenu)
  }

  const linkClickHandler = () => {
    setOpenMenu(false)
  }

  const signOutHandler = async () => {
    await signOut(auth).then(() => {
      route.push(Routes.Main)
      dispatch(setProfile({}))
      setUser(null)
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

  return (
    <header className={classes.root}>
      {!lgUp && (
        <button onClick={menuClickHandler} className={classes.hamburgerSection}>
          <MenuIcon />
        </button>
      )}

      <div className={classes.searchSection}>
        <InputSearch />
        {!user && (
          <>
            <Button variant="outlined">
              <Link href={'/signin'}>Вход</Link>
            </Button>
            <Button variant="outlined">
              <Link href={'/register'}>Регистрация</Link>
            </Button>
          </>
        )}

        {user && (
          <>
            <Link href={Routes.Profile}>
              <Avatar alt="Remy Sharp" src={profile?.avatar || '/default.jpg'} />
            </Link>
            <Button variant="outlined" onClick={signOutHandler}>
              Выйти
            </Button>
          </>
        )}
      </div>
      <SideNav setOpen={menuClickHandler} isOpen={isOpenMenu} />
    </header>
  )
}
