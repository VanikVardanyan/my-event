'use client'

import useStyles from './styles'
import { UserInfo } from './ui/user-info'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { UserType } from '@/shared/types/user.types'
import { ProfileHeader } from '@/shared/ui/profile-header'
import { ProfileCreatives } from '@/shared/ui/profile-creatives'
import { ProtectedRoute } from '@/shared/lib/protected-router'
import { useTranslations } from 'next-intl'
import { useAuth } from '@/shared/lib/auth-context'
import { Link, useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { Container } from '../styles'
import { useEffect } from 'react'
import { LoadingOverlay } from '../../../shared/ui/loading-overlay'
import { Alert, Avatar } from '@mui/material'
import { Button } from '../../../shared/ui/button'
import EditIcon from '@mui/icons-material/Edit'
import { Black, White } from '../../../shared/consts/colors'

const Profile = () => {
  const { profile, loading } = useSelector(getProfile)
  const { loading: authLoading, user } = useAuth()

  const t = useTranslations()
  const router = useRouter()
  const { classes } = useStyles()
  const isBusiness = profile?.role === UserType.PROVIDER
  const loadingProfile = loading || authLoading

  useEffect(() => {
    if (loadingProfile) {
      return
    }
    if (profile?.role === UserType.CLIENT && localStorage.getItem('prevData')) {
      router.push(Routes.CreateEvent)
    }
  }, [profile, user, loading, authLoading, loadingProfile])

  if (loadingProfile) {
    return <LoadingOverlay loading />
  }

  return (
    <ProtectedRoute>
      <Container>
        {!profile?.isApprovedUser && (
          <Alert severity="error" sx={{ marginBottom: 5 }}>
            {t('blocked')}
          </Alert>
        )}
        <h4>Իմ Պրոֆիլը</h4>
        <div className={classes.root}>
          <div className={classes.profileAvatar}>
            <div>
              <Avatar src={profile?.avatar || ''} style={{ width: 128, height: 128 }} />
            </div>
            <div className={classes.nameSection}>
              <div>{profile?.name}</div>
              <div>
                <div className={classes.greyText}>{profile?.email}</div>
                <div className={classes.greyText}>{profile?.country || 'Not a country'}</div>
              </div>
            </div>
            <div className={classes.nameSection}>
              <div />
              <div className={classes.greyText}>Հեռախոսահամար</div>
              <div>{profile?.phone || 'not a phone number'}</div>
            </div>
            {/* <>
            {isBusiness && (
              <>
                <ProfileHeader {...profile} isMe />
                <ProfileCreatives images={profile?.images || []} isMe />
              </>
            )}
            {!isBusiness && <UserInfo />}
          </> */}
          </div>
          <Button
            startIcon={<EditIcon />}
            bg_color={White}
            btn_color={Black}
            LinkComponent={Link}
            href={Routes.ProfileSetting}
          >
            Edit
          </Button>
        </div>
      </Container>
    </ProtectedRoute>
  )
}

export default Profile
