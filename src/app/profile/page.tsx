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

const Profile = () => {
  const { profile, loading } = useSelector(getProfile)
  const t = useTranslations('Shared')

  const { classes } = useStyles()
  const isBusiness = profile?.role === UserType.PROVIDER

  if (loading || !profile) {
    // TODO: Add loading spinner
    return <div>Loadingooo...</div>
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
