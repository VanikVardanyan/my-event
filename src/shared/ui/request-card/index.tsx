import { useRef, useState } from 'react'
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
import cn from 'classnames'
import RequestInfoModal from './ui/info-modal'

export const RequestCard = (
  props: IRequestTypes & { responses: any[]; id: string; isMe?: boolean; updateAll: () => void }
) => {
  const { service, city, amount, date, personQuantity, location, responses, id, isMe, other } = props
  const { profile } = useSelector(getProfile)
  const { classes } = useStyles()
  const { user } = useAuth()

  const btnRef = useRef(null)

  const t = useTranslations('RequestList')
  const p = useTranslations('Professions')

  const [loading, setLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)

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

  const handleOpenInfoModal = () => {
    setOpenInfoModal(true)
  }

  const handleCloseInfoModal = () => {
    setOpenInfoModal(false)
  }

  const handleOpenModal = () => {
    setOpenModal(true)
  }

  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>{p(service)}</h3>
      <div className={classes.content}>
        <div className={classes.label}>
          <span className={classes.infoTitle}> {t('city')}: </span>
          <span className={classes.description}>{city}</span>
        </div>
        <div>
          <span className={classes.infoTitle}>{t('guests_count')}: </span>{' '}
          <span className={classes.description}>{personQuantity}</span>
        </div>
        <div>
          <span className={classes.infoTitle}>{t('location')}: </span>
          <span className={classes.description}>{location}</span>
        </div>
        <div>
          <span className={classes.infoTitle}>{t('date')}: </span>
          <span className={classes.description}>{date}</span>
        </div>
        <div>
          <span className={classes.infoTitle}>{t('budget')}: </span>
          <span className={classes.description}>{amount} AMD</span>
        </div>
        {responses.length > 0 && (
          <div>
            <span className={classes.infoTitle}>{t('responses_count')}: </span>
            <span className={classes.description}>{responses.length}</span>
          </div>
        )}
        {other && (
          <div className={classes.otherWrapper}>
            <span className={classes.infoTitle}>{t('description')}: </span>
            <div className={cn(classes.description, classes.other)}>{other}</div>
          </div>
        )}
      </div>

      <div className={classes.actions}>
        {isMe && (
          <>
            {responses.length > 0 && (
              <Button variant="contained" onClick={handleOpenModal} size="small">
                {t('view_responses')}
              </Button>
            )}

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
              disabled={loading}
            >
              {t('delete')}
            </Button>
          </>
        )}
        {!isMe && (
          <Button variant="contained" color="success" onClick={handleRespond} size="small">
            {t('respond')}
          </Button>
        )}
        <Button variant="contained" onClick={handleOpenInfoModal} size="small" ref={btnRef}>
          {t('more_info')}
        </Button>
      </div>

      <ResponsesModal open={openModal} handleClose={handleCloseModal} responses={responses} />
      <RequestInfoModal open={openInfoModal} handleClose={handleCloseInfoModal} info={props} />
    </div>
  )
}
