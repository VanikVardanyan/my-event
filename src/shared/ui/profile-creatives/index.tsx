import Image from 'next/image'
import useStyles, { AddButton, VisuallyHiddenInput } from './styles'
import { Skeleton } from '@mui/material'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import { db } from '../../lib/firebaseConfig'
import { useAuth } from '../../lib/auth-context'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import { Dispatch } from '@/store/store'
import { useState } from 'react'
import { ImageAction } from './ui/image-action'
import { useTranslations } from 'next-intl'
import { LoadingOverlay } from '../loading-overlay'
import { v4 as uuidv4 } from 'uuid'
import { getPresignedUrl } from '../image-uploader/lib/getPresignedUrl'

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
  console.log(props.images[images.length - 1])
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
      const maxSizeInBytes = 8 * 1024 * 1024 // 1 МБ в байтах

      for (let i = 0; i < files.length; i++) {
        const file = files[i]

        const uniqueId = uuidv4()
        const url = await getPresignedUrl(`images/${uniqueId}_${file.name}`)
        const uploadResponse = await fetch(url, {
          method: 'PUT',
          body: file,
        })
        uploadedImageUrls.push(`https://van-event.b-cdn.net/images/${uniqueId}_${file.name}`)
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
  const imageAccept = '.jpg, .jpeg, .png, .gif, .bmp'

  return (
    <div>
      <LoadingOverlay loading={loading} />
      {isMe && (
        // @ts-ignore
        <AddButton size="small" component="label" variant="contained" startIcon={<LibraryAddIcon />} sx={{ mb: 2 }}>
          {loading && 'loading...'}
          {!loading && t('add_image')}
          <VisuallyHiddenInput multiple type="file" onChange={handleChangeMultipleFile} accept={imageAccept} />
        </AddButton>
      )}

      <div className={classes.imagesWrapper}>
        {!loading &&
          images.map((item, i) => {
            return (
              <div key={i} className={classes.imageWrapper}>
                <Image src={item} alt="image" width={307} height={307} className={classes.image} />
                {isMe && <ImageAction item={item} loading={loading} setLoading={setLoading} userAuth={userAuth} />}
              </div>
            )
          })}
        {loading &&
          images.map((item, i) => {
            return (
              <div key={i} className={classes.imageWrapper}>
                <Skeleton width={304} height={307} variant="rectangular" />
              </div>
            )
          })}
      </div>
    </div>
  )
}
