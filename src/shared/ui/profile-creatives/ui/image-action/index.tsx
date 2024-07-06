import { Box, Button, ClickAwayListener, Fade, IconButton, Modal, Popper } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db, storage } from '../../../../lib/firebaseConfig'
import { deleteObject, ref } from 'firebase/storage'
import { Dispatch } from '@/store/store'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import useStyles from './styles'
import { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  width: 'calc(100% - 10px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
}

interface ImageActionProps {
  loading: boolean
  setLoading: (loading: boolean) => void
  userAuth: any
  item: string
}

export const ImageAction = (props: ImageActionProps) => {
  const { loading, userAuth, item } = props
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const [removeLoading, setRemoveLoading] = useState(false)

  const dispatch = Dispatch()

  const { classes } = useStyles()

  const handleDeleteImage = async (imageUrl: string) => {
    setRemoveLoading(true)
    try {
      if (!userAuth?.user?.uid) return
      const userProfileRef = doc(db, 'profiles', userAuth.user?.uid)
      const userProfileSnap = await getDoc(userProfileRef)
      const currentProfile = userProfileSnap.data()

      const updatedImages = (currentProfile?.images || []).filter((img: string) => img !== imageUrl)
      const updatedProfile = {
        ...currentProfile,
        images: updatedImages,
      }
      await setDoc(doc(db, 'profiles', userAuth.user.uid), updatedProfile)

      const imageRef = ref(storage, imageUrl)
      await deleteObject(imageRef)
      setRemoveLoading(false)

      await dispatch(asyncSetProfileThunk())
    } catch (error) {
      console.error('Error deleting image:', error)
      setRemoveLoading(false)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  return (
    <div>
      <IconButton className={classes.menuIcon} onClick={handleClick} disabled={loading}>
        <MoreVertIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClick}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button onClick={() => handleDeleteImage(item)} startIcon={<DeleteIcon />} disabled={removeLoading}>
            Удалить изображения
          </Button>
        </Box>
      </Modal>
    </div>
  )
}
