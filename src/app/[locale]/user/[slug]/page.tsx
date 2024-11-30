'use client'

import { doc, getDoc } from 'firebase/firestore'
import { useRouter } from '@/navigation'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { db } from '@/shared/lib/firebaseConfig'
import { ProfileHeader } from '@/shared/ui/profile-header'
import { ProfileCreatives } from '@/shared/ui/profile-creatives'
import { Box } from '@mui/material'
import useStyles from './styles'
import { Loader } from '@/shared/ui/Loader'
import { Container } from '../../styles'
import { LoadingOverlay } from '@/shared/ui/loading-overlay'

const UserPage = () => {
  const router: { slug: string } = useParams()
  const history = useRouter()
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { classes } = useStyles()

  useEffect(() => {
    if (router.slug) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'profiles', router.slug))
        if (userDoc.exists()) {
          setUserData(userDoc.data())
        } else {
          history.push('/404')
        }
        setLoading(false)
      }
      fetchUserData()
    }
  }, [router.slug])

  return (
    <Container>
      <div className={classes.root}>
        {loading ? (
          <LoadingOverlay loading />
        ) : (
          <div>
            <ProfileHeader {...userData} />
            <Box sx={{ mt: 5 }}>
              <ProfileCreatives images={userData?.images || []} />
            </Box>
          </div>
        )}
      </div>
    </Container>
  )
}

export default UserPage
