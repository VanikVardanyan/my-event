import Image from 'next/image'
import useStyles, { VisuallyHiddenInput } from './styles'
import { Button } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../../lib/firebaseConfig'
import { useAuth } from '../../lib/auth-context'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { Dispatch } from '@/store/store'
import { useState } from 'react'
import { ImageAction } from './ui/image-action'
import { useTranslations } from 'next-intl'
import { LoadingOverlay } from '../loading-overlay'
import axios from 'axios'

interface IImages {
  images: string[] | []
  isMe?: boolean
}

export const ProfileCreatives = (props: IImages) => {
  const { images, isMe } = props
  const { classes } = useStyles()
  const userAuth = useAuth()
  const dispatch = Dispatch()
  const [loading, setLoading] = useState(false)

  const t = useTranslations('Profile')

  const handleChangeMultipleFile = async (event: any) => {
    setLoading(true)
    try {
      if (!userAuth?.user?.uid) return
      const userProfileRef = doc(db, 'profiles', userAuth.user?.uid)
      const userProfileSnap = await getDoc(userProfileRef)
      const currentProfile = userProfileSnap.data()

      const files = event.target.files
      const uploadedImageUrls: string[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const storageRef = ref(storage, `images/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            'state_changed',
            () => {},
            (error) => {
              console.error(error)
              reject(error)
            },
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
              uploadedImageUrls.push(downloadURL)
              resolve()
            }
          )
        })
      }
      if (currentProfile?.images) {
        const updatedImages = [...(currentProfile.images || []), ...uploadedImageUrls]
        const updatedProfile = {
          ...currentProfile,
          images: updatedImages,
        }
        await setDoc(doc(db, 'profiles', userAuth.user.uid), updatedProfile)
        setLoading(false)
        await dispatch(asyncSetProfileThunk())
        return
      }

      const updatedProfile = {
        ...currentProfile,
        images: uploadedImageUrls,
      }
      setLoading(false)
      await setDoc(doc(db, 'profiles', userAuth.user.uid), updatedProfile)
      await dispatch(asyncSetProfileThunk())
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <LoadingOverlay loading={loading}>
      {isMe && (
        <Button component="label" variant="contained" startIcon={<LibraryAddIcon />} sx={{ mb: 2 }}>
          {loading && 'loading...'}
          {!loading && t('add_image')}
          <VisuallyHiddenInput multiple type="file" onChange={handleChangeMultipleFile} />
        </Button>
      )}
      <div className={classes.imagesWrapper}>
        {images.map((item, i) => {
          return (
            <div key={i} className={classes.imageWrapper}>
              <Image src={item} alt="image" width={307} height={307} className={classes.image} />
              {isMe && <ImageAction item={item} loading={loading} setLoading={setLoading} userAuth={userAuth} />}
            </div>
          )
        })}
      </div>
    </LoadingOverlay>
  )
}
