import { useState } from 'react'
import { IRequestTypes } from '@/app/profile/ui/request-create-modal/types'
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

export const RequestCard = (props: IRequestTypes & { responses: any[]; id: string; isMe?: boolean }) => {
  const { service, city, amount, date, personQuantity, location, responses, id, isMe } = props
  const { profile } = useSelector(getProfile)
  const { classes } = useStyles()
  const { user } = useAuth()

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
      <h3 className={classes.title}>{service}</h3>
      <div className={classes.content}>
        <div className={classes.label}>
          Город: <span className={classes.description}>{city}</span>
        </div>
        <div>
          Количество гостей: <span className={classes.description}>{personQuantity}</span>
        </div>
        <div>
          Место: <span className={classes.description}>{location}</span>
        </div>
        <div>
          Дата: <span className={classes.description}>{date}</span>
        </div>
        <div>
          Бюджет: <span className={classes.description}>{amount}dram</span>
        </div>
      </div>
      <div>
        Количество откликов: <span className={classes.description}>{responses.length}</span>
      </div>
      {isMe && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {responses.length > 0 && (
            <Button variant="contained" onClick={handleOpenModal}>
              Посмотреть отклики
            </Button>
          )}

          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
            disabled={loading}
          >
            Удалить
          </Button>
        </Box>
      )}
      {!isMe && (
        <Button variant="contained" color="success" onClick={handleRespond}>
          Откликнуться
        </Button>
      )}

      <ResponsesModal open={openModal} handleClose={handleCloseModal} responses={responses} />
    </Card>
  )
}
