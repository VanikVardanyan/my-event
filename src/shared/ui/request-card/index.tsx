import { useRef, useState } from 'react'
import useStyles, { MoreButton } from './styles'
import { Box, Button, Card } from '@mui/material'
import { useAuth } from '../../lib/auth-context'
import { doc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'
import ResponsesModal from './ui/response-list'
import EditIcon from '@mui/icons-material/Edit'
import { useSelector } from 'react-redux'
import { getProfile } from '@/store/selectors'
import { deleteDoc } from 'firebase/firestore'
import { Dispatch } from '@/store/store'
import { asyncSetProfileThunk } from '@/store/features/profile-slice'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTranslations } from 'next-intl'
import { IRequestTypes } from './types'
import cn from 'classnames'
import RequestInfoModal from './ui/info-modal'
import { Link, useRouter } from '../../../navigation'
import { Routes } from '../../routes'
import { ProgressLine } from '../progress-line'
import { getDoneServicesPercent } from '../../utils/numbers'
import { ServiceSearchStatus } from '../../../app/[locale]/event/create/types'

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const RequestCard = (
  props: IRequestTypes & { responses: any[]; id: string; isMe?: boolean; updateAll: () => void }
) => {
  const { service, city, amount, date, personQuantity, location, responses, id, isMe, other, title, services, type } =
    props
  const { profile } = useSelector(getProfile)
  const { classes } = useStyles()
  const router = useRouter()
  const { user } = useAuth()

  const btnRef = useRef(null)

  const t = useTranslations('RequestList')
  const cityT = useTranslations('Citys')
  const eventTypesT = useTranslations('EventTypes')

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

  const calculateTotalBudget = (): number => {
    return services.reduce((total, service) => {
      // Удаление пробелов и преобразование строки в число
      const amount = parseFloat(service.amount.replace(/\s/g, ''))
      return total + amount
    }, 0)
  }

  const totalBudget = services ? calculateTotalBudget() : null
  const doneServicesLength = services.filter((service) => service.status === ServiceSearchStatus.Done).length
  const allServices = services.length

  const fullWidth = getDoneServicesPercent(allServices, doneServicesLength)
  const goToDetail = () => {
    router.push(`${Routes.Event}/${id}`)
  }

  return (
    <div className={classes.root} onClick={goToDetail}>
      <h3 className={classes.title}>{title}</h3>
      <div className={classes.content}>
        <div className={classes.label}>
          <span className={classes.infoTitle}> {t('event_types')}: </span>
          <span className={classes.description}>{eventTypesT(type.toLocaleLowerCase())}</span>
        </div>
        {/* <div className={classes.label}>
          <span className={classes.infoTitle}> {t('city')}: </span>
          <span className={classes.description}>{cityT(city)}</span>
        </div> */}
        {/* <div>
          <span className={classes.infoTitle}>{t('date')}: </span>
          <span className={classes.description}>{date}</span>
        </div> */}
        {/* <div>
          <span className={classes.infoTitle}>{t('guests_count')}: </span>{' '}
          <span className={classes.description}>{personQuantity}</span>
        </div> */}
        {/* <div>
          <span className={classes.infoTitle}>{t('location')}: </span>
          <span className={classes.description}>{location}</span>
        </div> */}
        {totalBudget && (
          <div>
            <span className={classes.infoTitle}>{t('total_budget')}: </span>
            <span className={classes.description}>{formatNumber(totalBudget.toString())} AMD</span>
          </div>
        )}
        {/* {responses.length > 0 && (
          <div>
            <span className={classes.infoTitle}>{t('responses_count')}: </span>
            <span className={classes.description}>{responses.length}</span>
          </div>
        )} */}
        {/* {other && (
          <div className={classes.otherWrapper}>
            <span className={classes.infoTitle}>{t('description')}: </span>
            <div className={cn(classes.description, classes.other)}>{other}</div>
          </div>
        )} */}
        <div className={classes.percentWrapper}>
          <div className={classes.percentTitle}>{t('event_ready_percent', { percent: fullWidth })}</div>
          <ProgressLine fillWidth={fullWidth} />
        </div>
      </div>

      <div className={classes.actions}>
        {isMe && (
          <>
            {/* {responses.length > 0 && (
              <Button variant="contained" onClick={handleOpenModal} size="small">
                {t('view_responses')}
              </Button>
            )} */}
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
        {/* {!isMe && (
          <Button variant="contained" color="success" onClick={handleRespond} size="small">
            {t('respond')}
          </Button>
        )} */}
        <MoreButton
          variant="contained"
          onClick={handleOpenInfoModal}
          size="small"
          ref={btnRef}
          LinkComponent={Link}
          href={`${Routes.Event}/${id}`}
        >
          {t('more_info')}
        </MoreButton>
        <MoreButton
          variant="contained"
          onClick={handleOpenInfoModal}
          size="small"
          ref={btnRef}
          LinkComponent={Link}
          href={`${Routes.CreateEvent}/?id=${id}`}
          startIcon={<EditIcon />}
        >
          {t('event_edit')}
        </MoreButton>
      </div>

      {/* <ResponsesModal open={openModal} handleClose={handleCloseModal} responses={responses} />
      <RequestInfoModal open={openInfoModal} handleClose={handleCloseInfoModal} info={props} /> */}
    </div>
  )
}
