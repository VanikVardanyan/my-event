import { useState } from 'react'
import useStyles from './styles'
import { Box, Button, Card } from '@mui/material'
import { useAuth } from '../../lib/auth-context'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import ResponsesModal from './ui/response-list'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { deleteDoc } from 'firebase/firestore'
import { Dispatch } from '@/store/store'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslations } from 'next-intl'
import { IRequestTypes } from '@/app/[locale]/profile/ui/request-create-modal/types'

export const RequestCard = (
  props: IRequestTypes & { responses: any[]; id: string; isMe?: boolean; updateAll: () => void }
) => {
  const { service, city, amount, date, personQuantity, location, responses, id, isMe } = props
  const { profile } = useSelector(getProfile)
  const { classes } = useStyles()
  const { user } = useAuth()

  const t = useTranslations('RequestList')
  const p = useTranslations('Professions')

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const dispatch = Dispatch()

  const handleRespond = async () => {
    setLoading(true)
    try {
      const requestRef = doc(db, 'requests', id)
      if (user) {
        await updateDoc(requestRef, {
          responses: arrayUnion({
            userId: user.uid,
            userName: profile?.name || user.displayName, // имя пользователя или email
            userAvatar: profile?.avatar || '', // ссылка на аватар пользователя
          }),
        })
      }
      if (props.updateAll) {
        props.updateAll()
      }
      setLoading(false)
    } catch (error) {
      console.error('Error responding to request:', error)
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setLoading(true)
    try {
      const requestRef = doc(db, 'requests', id)
      await deleteDoc(requestRef)
      setLoading(false)
      dispatch(asyncSetProfileThunk())
    } catch (error) {
      console.error('Error deleting request:', error)
      setLoading(false)
    }
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <Card className={classes.root}>
      <h3 className={classes.title}>{p(service)}</h3>
      <div className={classes.content}>
        <div className={classes.label}>
          {t('city')}: <span className={classes.description}>{city}</span>
        </div>
        <div>
          {t('guests_count')}: <span className={classes.description}>{personQuantity}</span>
        </div>
        <div>
          {t('location')}: <span className={classes.description}>{location}</span>
        </div>
        <div>
          {t('date')}: <span className={classes.description}>{date}</span>
        </div>
        <div>
          {t('budget')}: <span className={classes.description}>{amount}dram</span>
        </div>
      </div>
      <div>
        {t('responses_count')}: <span className={classes.description}>{responses.length}</span>
      </div>
      {isMe && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {responses.length > 0 && (
            <Button variant="contained" onClick={handleOpenModal} sx={{ mt: 1 }}>
              {t('view_responses')}
            </Button>
          )}

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            disabled={loading}
            sx={{ mt: 1 }}
          >
            {t('delete')}
          </Button>
        </Box>
      )}
      {!isMe && (
        <Button variant="contained" color="success" onClick={handleRespond} sx={{ mt: 2 }}>
          {t('respond')}
        </Button>
      )}

      <ResponsesModal open={openModal} handleClose={handleCloseModal} responses={responses} />
    </Card>
  )
}
