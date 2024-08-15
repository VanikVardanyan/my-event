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
import { useRouter } from '@/navigation'
import { Routes } from '@/shared/routes'
import { Loader } from '@/shared/ui/Loader'
import { Container } from '../styles'
import { useEffect } from 'react'
import { LoadingOverlay } from '../../../shared/ui/loading-overlay'
import { Alert } from '@mui/material'

const Profile = () => {
  const { profile, loading } = useSelector(getProfile)
  const { loading: authLoading, user } = useAuth()

  const t = useTranslations('Shared')
  const router = useRouter()
  const { classes } = useStyles()
  const isBusiness = profile?.role === UserType.PROVIDER
  const loadingProfile = loading || authLoading

  useEffect(() => {
    if (loadingProfile) {
      return
    }
    if (user && !profile?.role) {
      router.push(Routes.ProfileSetting)
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
        <div className={classes.root}>
          <>
            {isBusiness && (
              <>
                <ProfileHeader {...profile} isMe />
                <ProfileCreatives images={profile?.images || []} isMe />
              </>
            )}
            {!isBusiness && <UserInfo />}
          </>
        </div>
      </Container>
    </ProtectedRoute>
  )
}

export default Profile
