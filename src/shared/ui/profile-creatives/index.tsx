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
import imageCompression from 'browser-image-compression'
import { Tooltip } from '@/shared/ui/tooltip'

interface IImages {
  images: string[] | []
  isMe?: boolean
}

const options = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1000,
  useWebWorker: true,
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
        const compressedFile = await imageCompression(file, options)

        const uniqueId = uuidv4()
        const url = await getPresignedUrl(`images/${uniqueId}_${file.name}`)
        const uploadResponse = await fetch(url, {
          method: 'PUT',
          body: compressedFile,
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

  const isDisabled = images.length >= 6

  return (
    <div>
      <LoadingOverlay loading={loading} />
      {isMe && (
        <div className={classes.addImagesWrapper}>
          <AddButton
            size="small"
            disabled={isDisabled}
            // @ts-ignore
            component="label"
            variant="contained"
            startIcon={<LibraryAddIcon />}
          >
            {loading && 'loading...'}
            {!loading && t('add_image')}
            <VisuallyHiddenInput
              disabled={isDisabled}
              type="file"
              onChange={handleChangeMultipleFile}
              accept={imageAccept}
            />
          </AddButton>
          {isDisabled && <div className={classes.maxError}>{t('max_image')}</div>}
        </div>
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
