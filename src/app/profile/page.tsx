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
import { useAuth } from '../../shared/lib/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Routes } from '../../shared/routes'

const Profile = () => {
  const { profile, loading } = useSelector(getProfile)
  const { loading: authLoading } = useAuth()
  const t = useTranslations('Shared')
  const router = useRouter()

  const { classes } = useStyles()
  const isBusiness = profile?.role === UserType.PROVIDER

  if (loading || authLoading) {
    // TODO: Add loading spinner
    return <div>Loadingooo...</div>
  }
  if (!profile?.role) {
    router.push(Routes.ProfileSetting)
    return null
  }

  return (
    <ProtectedRoute>
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
    </ProtectedRoute>
  )
}

export default Profile
