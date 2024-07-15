'use client'

import { useState } from 'react'
import { InputSearch } from '../input-search'
import useStyles, { LoginButton } from './styles'
import { SideNav } from './ui/side-nav'
import { Avatar, IconButton, Skeleton, useMediaQuery, useTheme } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from '@/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebaseConfig'
import { useRouter } from '@/navigation'
import { Routes } from '../../routes'
import { useAuth } from '../../lib/auth-context'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { Dispatch } from '@/store/store'
import { setProfile, setProfileLoading } from '@/store/features/profile-slice'
import { useTranslations } from 'next-intl'
import { SwitchLanguage } from '../switch-language'
import LogoutIcon from '@mui/icons-material/Logout'
import Image from 'next/image'
import PersonIcon from '@mui/icons-material/Person'
import { HeartIcon } from '../../icons'
import { UserType } from '../../types/user.types'

export const LayoutHeader = () => {
  const { classes } = useStyles()
  const t = useTranslations('Menu')

  const [isOpenMenu, setOpenMenu] = useState(false)
  const { user, setUser, loading, setLoading } = useAuth()
  const { profile, loading: ProfileLoading } = useSelector(getProfile)
  const dispatch = Dispatch()

  const router = useRouter()

  const theme = useTheme()
  const MdUp = useMediaQuery(theme.breakpoints.up('md'))
  const SmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const menuClickHandler = () => {
    setOpenMenu(!isOpenMenu)
  }

  const linkClickHandler = () => {
    setOpenMenu(false)
  }

  const signOutHandler = async () => {
    setLoading(true)
    await signOut(auth).then(async () => {
      setUser(null)
      dispatch(setProfileLoading(true))
      dispatch(setProfile(null))
      router.push(Routes.Main)
      setLoading(false)
    })
  }

  const isLoading = loading || ProfileLoading

  if (isLoading) {
    return (
      <header className={classes.root}>
        <Skeleton variant="rounded" width={24} height={24} />
        <div className={classes.searchSection}>
          <Skeleton variant="rounded" width={320} height={40} />
          <Skeleton variant="rounded" width={42} height={42} />
        </div>
      </header>
    )
  }

  return (
    <header className={classes.root}>
      <div className={classes.hamburgWrapper}>
        {!profile && (
          <Link href={Routes.home} className={classes.logoLink}>
            <Image src="/logo/svg/logo-no-background.svg" alt="logo" width={100} height={40} />
          </Link>
        )}
        {SmUp && user && profile && (
          <Link href={Routes.home} className={classes.logoLink}>
            <Image src="/logo/svg/logo-no-background.svg" alt="logo" width={100} height={40} />
          </Link>
        )}
        <div className={classes.hamburg}>
          <button onClick={menuClickHandler} className={classes.hamburgerSection}>
            <MenuIcon color="inherit" />
          </button>
          <span className={classes.hamburgText}>{t('services')}</span>
        </div>
      </div>

      <div className={classes.searchSection}>
        <InputSearch />
        <SwitchLanguage />

        {!user && (
          <>
            {MdUp && (
              <LoginButton variant="outlined" LinkComponent={Link} href={Routes.Signin} style={{ height: 40 }}>
                {t('login')}
              </LoginButton>
            )}
            {!MdUp && (
              <IconButton href={Routes.Signin} LinkComponent={Link} style={{ height: 40 }}>
                <PersonIcon color="inherit" />
              </IconButton>
            )}
          </>
        )}
        {user && profile && profile.role === UserType.CLIENT && (
          <IconButton href={Routes.Favorites} LinkComponent={Link} className={classes.favoritIcon}>
            <HeartIcon style={{ width: 24, height: 24 }} />
          </IconButton>
        )}

        {user && (
          <>
            <Link href={Routes.Profile}>
              <Avatar alt="Remy Sharp" src={profile?.avatar || '/default.jpg'} />
            </Link>
            <IconButton onClick={signOutHandler}>
              <LogoutIcon />
            </IconButton>
          </>
        )}
      </div>
      <SideNav setOpen={menuClickHandler} isOpen={isOpenMenu} linkClickHandler={linkClickHandler} />
    </header>
  )
}
