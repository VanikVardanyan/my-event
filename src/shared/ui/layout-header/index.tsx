'use client'

import { useState } from 'react'
import { InputSearch } from '../input-search'

import useStyles, { LoginButton } from './styles'
import { SideNav } from './ui/side-nav'
import { Avatar, IconButton, Menu, MenuItem, Skeleton, useMediaQuery, useTheme } from '@mui/material'
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
import { HeartIcon, NavigateIcon } from '../../icons'
import { UserType } from '../../types/user.types'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { Black, TextGreyLighten25 } from '../../consts/colors'
import { clearSlice } from '../../../store/features/client-slice'
import { SignIn } from '../sign-in'
import MailOutlineIcon from '@mui/icons-material/MailOutline'
import MarkunreadIcon from '@mui/icons-material/Markunread'
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer'

export const LayoutHeader = () => {
  const { classes } = useStyles()
  const t = useTranslations()

  const [isOpenMenu, setOpenMenu] = useState(false)
  const { user, setUser, loading, setLoading } = useAuth()
  const { profile, loading: ProfileLoading } = useSelector(getProfile)
  const dispatch = Dispatch()
  const router = useRouter()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const openPopup = Boolean(anchorEl)
  const openPopupHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const theme = useTheme()
  const MdUp = useMediaQuery(theme.breakpoints.up('md'))
  const SmUp = useMediaQuery(theme.breakpoints.up('sm'))

  const menuClickHandler = () => {
    setOpenMenu(!isOpenMenu)
  }

  const linkClickHandler = () => {
    setOpenMenu(false)
  }

  const goToMessages = () => {
    router.push(Routes.Messages)
  }

  const signOutHandler = async () => {
    handleClose()
    await signOut(auth).then(() => {
      router.push(Routes.home)
      setUser(null)
      setTimeout(() => {
        dispatch(setProfile(null))
        dispatch(clearSlice())
      }, 0)
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
        {/* {!profile && (
          <Link href={Routes.home} className={classes.logoLink}>
            <Image src="/logo/svg/logo-no-background.svg" alt="logo" width={100} height={40} />
          </Link>
        )}
        {SmUp && user && profile && (
          <Link href={Routes.home} className={classes.logoLink}>
            <Image src="/logo/svg/logo-no-background.svg" alt="logo" width={100} height={40} />
          </Link>
        )} */}
        <div className={classes.hamburg}>
          <button onClick={menuClickHandler} className={classes.hamburgerSection}>
            <NavigateIcon fill={Black} />
          </button>
        </div>
      </div>

      <div className={classes.searchSection}>
        <InputSearch />
        <SwitchLanguage />
        {!user && <SignIn />}
        {user && (
          <>
            <IconButton
              style={{ width: 40, height: 40 }}
              id="basic-button"
              aria-controls={openPopup ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={openPopup ? 'true' : undefined}
              onClick={openPopupHandler}
            >
              <Avatar alt="Remy Sharp" src={profile?.avatar || '/default.jpg'} />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openPopup}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
              sx={{
                top: '20px',
              }}
            >
              <MenuItem>
                <Link href={Routes.Profile} onClick={handleClose} className={classes.profilePopupItem}>
                  <AccountCircleIcon /> {t('my_profile')}
                </Link>
              </MenuItem>
              {user && profile && profile.role === UserType.CLIENT && (
                <MenuItem onClick={handleClose}>
                  <Link href={Routes.Favorites} className={classes.profilePopupItem}>
                    <HeartIcon style={{ width: 24, height: 24 }} fill={TextGreyLighten25} /> {t('favorites')}
                  </Link>
                </MenuItem>
              )}
              <MenuItem onClick={signOutHandler} className={classes.profilePopupItem}>
                <LogoutIcon /> {t('sign_out')}
              </MenuItem>
            </Menu>
          </>
        )}
      </div>
      <SideNav setOpen={menuClickHandler} isOpen={isOpenMenu} linkClickHandler={linkClickHandler} />
    </header>
  )
}
