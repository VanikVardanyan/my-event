import { use, useRef, useState } from 'react'
import useStyles, { MoreButton } from './styles'
import { Button, Divider } from '@mui/material'
import { useAuth } from '../../lib/auth-context'
import { doc, updateDoc, getDocs, collection, setDoc, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebaseConfig'

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
import { ServiceCard } from './ui/service-card'

const formatNumber = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export const RequestCard = (props: IRequestTypes & { id: string; isMe?: boolean; updateAll?: () => void }) => {
  const { service, city, amount, date, personQuantity, location, id, isMe, other, title, services, type, userId } =
    props
  const { profile } = useSelector(getProfile)
  const { classes } = useStyles()
  const router = useRouter()
  const { user } = useAuth()
  const btnRef = useRef(null)

  const t = useTranslations()

  const [loading, setLoading] = useState(false)
  const [openInfoModal, setOpenInfoModal] = useState(false)

  const hasResponded = (service: any) => {
    return service.respondents?.some((respondent: any) => respondent.userId === user?.uid)
  }

  const dispatch = Dispatch()

  const messageHandler = async (messageText: string) => {
    const author_id = user?.uid

    if (!author_id || !userId) return

    const message = {
      id: crypto.randomUUID(), // Генерируем уникальный ID для сообщения
      created_at: new Date().toISOString(), // Текущая дата и время
      message: messageText, // Текст сообщения
      author_id: user?.uid, // ID автора сообщения
      is_read: false, // По умолчанию сообщение не прочитано
    }
    const threadsRef = collection(db, 'threads')
    // @ts-ignore
    const q: Query<DocumentData> = query(threadsRef, where('participants', 'array-contains', author_id))

    const querySnapshot = await getDocs(q)

    let existingThread = null

    querySnapshot.forEach((doc) => {
      const thread = doc.data()
      // @ts-ignore
      if (thread.participants.includes(userId)) {
        existingThread = thread
      }
    })

    if (existingThread) {
    } else {
      const newThreadRef = doc(threadsRef)
      const newThread = {
        id: newThreadRef.id,
        participants: [author_id, userId],
        messages: [message],
      }

      await setDoc(newThreadRef, newThread)
    }
  }

  const handleRespond = async (serviceId: string, message?: string) => {
    setLoading(true)
    const requests: any = await getDocs(collection(db, 'requests'))
    const requestsData = requests.docs.map((doc: any) => ({ ...doc.data(), id: doc.id }))
    const currentServices: any = requestsData.find((item: any) => item.id === id).services

    try {
      const requestRef = doc(db, 'requests', id)

      if (user) {
        const updatedServices = currentServices.map((service: any) => {
          if (service.id === serviceId) {
            // Проверяем, есть ли уже отклик от текущего пользователя
            const existingRespondentIndex = service?.respondents?.findIndex(
              (respondent: any) => respondent.userId === user.uid
            )

            let updatedRespondents = [...(service.respondents || [])]

            if (existingRespondentIndex !== -1) {
              // Если отклик существует, обновляем его
              updatedRespondents[existingRespondentIndex] = {
                ...updatedRespondents[existingRespondentIndex],
                userName: profile?.name || user.displayName,
                userAvatar: profile?.avatar || '',
                isApprove: false, // Обновляемое поле, если нужно
              }
            } else {
              // Если отклика нет, добавляем новый
              updatedRespondents.push({
                userId: user.uid,
                userName: profile?.name || user.displayName,
                userAvatar: profile?.avatar || '',
                isApprove: false,
              })
            }

            return {
              ...service,
              respondents: updatedRespondents,
            }
          }
          return service
        })

        // Обновляем документ в Firestore с новым массивом services
        await updateDoc(requestRef, {
          services: updatedServices,
        })
        if (message) {
          await messageHandler(message)
        }
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
    if (!isMe) return
    router.push(`${Routes.Event}/${id}`)
  }

  if (!isMe) {
    return (
      <div className={classes.requestCard}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.content}>
          <div className={classes.label}>
            <span className={classes.infoTitle}> {t('event_types')}: </span>
            <span className={classes.description}>{t(type.toLocaleLowerCase())}</span>
          </div>
        </div>
        <div className={classes.servicesTitle}>{t('services')}</div>
        <div className={classes.requestCardServices}>
          {services.map((service, index) => (
            <>
              <ServiceCard key={index} service={service} hasResponded={hasResponded} handleRespond={handleRespond} />
              {index !== services.length - 1 && <Divider />}
            </>
          ))}
        </div>
        <div className={classes.requestCardGroup}>
          <div>
            <span className={classes.infoTitle}>{t('date')}: </span>
            <span className={classes.description}>{date}</span>
          </div>
          <div>
            <span className={classes.infoTitle}>{t('guests_count')}: </span>{' '}
            <span className={classes.description}>{personQuantity}</span>
          </div>
          {other && (
            <div className={classes.otherWrapper}>
              <span className={classes.infoTitle}>{t('description')}: </span>
              <div className={cn(classes.description, classes.other)}>{other}</div>
            </div>
          )}
          <div>
            <MoreButton variant="contained" onClick={handleOpenInfoModal} size="small">
              {t('more_info')}
            </MoreButton>
          </div>
        </div>
        <RequestInfoModal open={openInfoModal} handleClose={handleCloseInfoModal} info={props} />
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <div onClick={goToDetail}>
        <h3 className={classes.title}>{title}</h3>
        <div className={classes.content}>
          <div className={classes.label}>
            <span className={classes.infoTitle}> {t('event_types')}: </span>
            <span className={classes.description}>{t(type.toLocaleLowerCase())}</span>
          </div>
          {!isMe && (
            <>
              <div className={classes.label}>
                <span className={classes.infoTitle}> {t('city')}: </span>
                <span className={classes.description}>{t(city)}</span>
              </div>
              <div>
                <span className={classes.infoTitle}>{t('date')}: </span>
                <span className={classes.description}>{date}</span>
              </div>
              <div>
                <span className={classes.infoTitle}>{t('guests_count')}: </span>{' '}
                <span className={classes.description}>{personQuantity}</span>
              </div>
              <div>
                <span className={classes.infoTitle}>{t('location')}: </span>
                <span className={classes.description}>{location}</span>
              </div>
            </>
          )}

          {totalBudget && (
            <div>
              <span className={classes.infoTitle}>{t('total_budget')}: </span>
              <span className={classes.description}>{formatNumber(totalBudget.toString())} AMD</span>
            </div>
          )}
          {isMe && (
            <div className={classes.percentWrapper}>
              <div className={classes.percentTitle}>{t('event_ready_percent', { percent: fullWidth })}</div>
              <ProgressLine fillWidth={fullWidth} />
            </div>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        {isMe && (
          <>
            <Button
              type="button"
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
        {isMe && (
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
        )}
        {isMe && (
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
        )}
      </div>
    </div>
  )
}
